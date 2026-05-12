<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index.js';
	import { X, CloudUpload, FileText, Loader2, Trash2, ImageIcon } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import { filesProxy } from 'sveltekit-superforms';
	import imageCompression from 'browser-image-compression';
	import { toast } from 'svelte-sonner';
	import { onDestroy } from 'svelte';

	let {
		form,
		name,
		placeholder = 'Images or PDFs — max 1 MB per image',
		images = $bindable<string[]>([])
	} = $props();

	const file = filesProxy(form, name);

	// ─── State ────────────────────────────────────────────────────────────────

	let isDragging = $state(false);
	let isProcessing = $state(false);
	let progress = $state({ current: 0, total: 0 });

	/**
	 * Parallel map: File → object-URL (images) or '' (PDFs / other).
	 * Index-aligned with $file. We manage this manually so we never
	 * revoke a URL that is still being displayed.
	 */
	let previewUrls = $state<string[]>([]);

	onDestroy(() => {
		previewUrls.forEach((u) => u && URL.revokeObjectURL(u));
	});

	// ─── Helpers ──────────────────────────────────────────────────────────────

	/** Create a URL only for brand-new entries; reuse existing ones. */
	function syncPreviewUrls(files: File[]) {
		const next: string[] = files.map((f, i) => {
			// If we already have a URL for this exact File object, keep it.
			const existing = previewUrls[i];
			if (existing) return existing;
			return f.type.startsWith('image/') ? URL.createObjectURL(f) : '';
		});

		// Revoke any URLs that are no longer needed (removed files).
		previewUrls.forEach((u, i) => {
			if (u && !next.includes(u)) URL.revokeObjectURL(u);
		});

		previewUrls = next;
	}

	async function compress(f: File): Promise<File> {
		if (!f.type.startsWith('image/')) return f;
		try {
			const blob = await imageCompression(f, {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
				initialQuality: 0.8
			});
			return new File([blob], f.name, { type: blob.type });
		} catch {
			toast.warning(`Couldn't compress ${f.name} — using original`);
			return f;
		}
	}

	async function processInBatches(incoming: File[], batchSize = 4): Promise<File[]> {
		const results: File[] = [];
		for (let i = 0; i < incoming.length; i += batchSize) {
			const batch = incoming.slice(i, i + batchSize);
			const done = await Promise.all(
				batch.map(async (f) => {
					const out = await compress(f);
					progress.current += 1;
					return out;
				})
			);
			results.push(...done);
		}
		return results;
	}

	function toFileList(files: File[]): FileList {
		const dt = new DataTransfer();
		files.forEach((f) => dt.items.add(f));
		return dt.files;
	}

	// ─── Handlers ─────────────────────────────────────────────────────────────

	async function handleFiles(incoming: FileList | null) {
		if (!incoming?.length) return;

		isProcessing = true;
		progress = { current: 0, total: incoming.length };

		try {
			const processed = await processInBatches(Array.from(incoming));
			const merged = [...Array.from($file ?? []), ...processed];
			$file = toFileList(merged);
			syncPreviewUrls(merged);
			toast.success(`${processed.length} file${processed.length !== 1 ? 's' : ''} added`);
		} catch {
			toast.error('Failed to process one or more files');
		} finally {
			isProcessing = false;
			progress = { current: 0, total: 0 };
		}
	}

	function removeNew(index: number) {
		// Revoke only this URL.
		if (previewUrls[index]) URL.revokeObjectURL(previewUrls[index]);

		const next = Array.from($file).filter((_, i) => i !== index);
		previewUrls = previewUrls.filter((_, i) => i !== index);
		$file = toFileList(next);
	}

	function removeExisting(index: number) {
		images = images.filter((_, i) => i !== index);
	}

	function clearNew() {
		previewUrls.forEach((u) => u && URL.revokeObjectURL(u));
		previewUrls = [];
		$file = new DataTransfer().files;
	}

	// ─── Derived ──────────────────────────────────────────────────────────────

	const newFiles = $derived(Array.from($file ?? []));
	const totalCount = $derived(images.length + newFiles.length);
</script>

<!-- ─── Upload Zone ──────────────────────────────────────────────────────── -->
<div class="flex w-full flex-col gap-5">
	<Label
		for={name}
		class="
			group relative flex cursor-pointer flex-col items-center justify-center
			gap-3 rounded-2xl border-2 border-dashed py-10 text-center
			transition-all duration-200
			{isDragging
			? 'border-primary bg-primary/5 shadow-inner'
			: 'border-muted-foreground/20 bg-muted/40 hover:border-primary/40 hover:bg-muted/70'}
		"
		ondragover={(e) => {
			e.preventDefault();
			isDragging = true;
		}}
		ondragleave={() => (isDragging = false)}
		ondrop={(e) => {
			e.preventDefault();
			isDragging = false;
			handleFiles(e.dataTransfer?.files ?? null);
		}}
	>
		<!-- Icon -->
		<div
			class="
				rounded-full border bg-background p-4 shadow-sm
				transition-transform duration-200 group-hover:scale-105
				{isDragging ? 'scale-110 border-primary/40' : ''}
			"
		>
			{#if isProcessing}
				<Loader2 class="h-6 w-6 animate-spin text-primary" />
			{:else}
				<CloudUpload
					class="h-6 w-6 transition-colors {isDragging
						? 'text-primary'
						: 'text-muted-foreground group-hover:text-primary/70'}"
				/>
			{/if}
		</div>

		<!-- Label text -->
		<div class="flex flex-col gap-0.5">
			<p class="text-sm font-semibold">
				{#if isProcessing}
					Optimising {progress.current} / {progress.total}…
				{:else if isDragging}
					Drop to upload
				{:else}
					Click to upload or drag & drop
				{/if}
			</p>
			<p class="text-xs text-muted-foreground">{placeholder}</p>
		</div>

		<!-- Progress bar -->
		{#if isProcessing && progress.total > 0}
			<div class="h-1 w-52 overflow-hidden rounded-full bg-muted" transition:fade>
				<div
					class="h-full rounded-full bg-primary transition-all duration-300"
					style="width: {(progress.current / progress.total) * 100}%"
				></div>
			</div>
		{/if}

		<Input
			id={name}
			type="file"
			class="hidden"
			{name}
			accept="image/*,application/pdf"
			multiple
			onchange={(e) => handleFiles(e.currentTarget.files)}
		/>
	</Label>

	<!-- ─── Gallery ──────────────────────────────────────────────────────────── -->
	{#if totalCount > 0}
		<div class="space-y-3" transition:fade={{ duration: 150 }}>
			<!-- Header -->
			<div class="flex items-center justify-between">
				<p class="text-sm font-semibold">
					Gallery
					<span class="ml-1 font-normal text-muted-foreground">({totalCount})</span>
				</p>

				{#if newFiles.length > 0}
					<Button
						type="button"
						variant="ghost"
						size="sm"
						class="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
						onclick={clearNew}
					>
						<Trash2 class="h-3 w-3" />
						Clear new
					</Button>
				{/if}
			</div>

			<!-- Grid -->
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				<!-- Server-side existing images -->
				{#each images as img, i (img)}
					<div
						class="group relative aspect-square overflow-hidden rounded-xl border bg-muted shadow-sm"
						transition:scale={{ start: 0.92, duration: 150 }}
					>
						<img
							src="/files/{img}"
							alt="Existing file"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>

						<!-- Overlay -->
						<div
							class="absolute inset-0 flex items-start justify-end bg-black/0 p-1.5 transition-colors group-hover:bg-black/40"
						>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								class="h-6 w-6 scale-75 rounded-full opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
								onclick={() => removeExisting(i)}
								aria-label="Remove file"
							>
								<X class="h-3.5 w-3.5" />
							</Button>
						</div>

						<!-- Badge -->
						<div
							class="absolute right-0 bottom-0 left-0 bg-background/80 px-1.5 py-0.5 backdrop-blur-sm"
						>
							<span class="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
								Saved
							</span>
						</div>
					</div>
				{/each}

				<!-- Newly uploaded files -->
				{#each newFiles as f, i (f.name + f.lastModified)}
					<div
						class="group relative aspect-square overflow-hidden rounded-xl border bg-card shadow-sm"
						transition:scale={{ start: 0.92, duration: 150 }}
					>
						{#if f.type.startsWith('image/') && previewUrls[i]}
							<img
								src={previewUrls[i]}
								alt="Preview"
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						{:else}
							<!-- PDF / non-image placeholder -->
							<div class="flex h-full flex-col items-center justify-center gap-2 bg-muted/60 px-2">
								<FileText class="h-8 w-8 shrink-0 text-muted-foreground" />
								<span class="line-clamp-2 text-center text-[10px] text-muted-foreground">
									{f.name}
								</span>
							</div>
						{/if}

						<!-- Overlay -->
						<div
							class="absolute inset-0 flex items-start justify-end bg-black/0 p-1.5 transition-colors group-hover:bg-black/40"
						>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								class="h-6 w-6 scale-75 rounded-full opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
								onclick={() => removeNew(i)}
								aria-label="Remove file"
							>
								<X class="h-3.5 w-3.5" />
							</Button>
						</div>

						<!-- Size badge -->
						<div
							class="absolute right-0 bottom-0 left-0 bg-primary/90 px-1.5 py-0.5 text-white backdrop-blur-sm"
						>
							<span class="text-[10px] font-semibold">
								{(f.size / 1024).toFixed(0)} KB
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
