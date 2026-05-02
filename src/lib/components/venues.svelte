<script lang="ts">
	import { Calendar, SquareArrowOutUpRight } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';

	// ── Types ─────────────────────────────────────────────────────────────────
	type VenueDetail = {
		id: number;
		name: string;
		description: string | null;
		capacity: number | null;
		location: string | null;
		featuredImage: string | null;
		bookingPolicy: string | null;
	};

	type Props = {
		venues: VenueDetail[];
		/** Fallback image when featuredImage is null */
		fallbackImage?: string;
	};

	// ── Props & State ─────────────────────────────────────────────────────────
	let { venues, fallbackImage = '/logo.webp' }: Props = $props();

	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let direction = $state<'left' | 'right'>('right');

	// ── Derived ───────────────────────────────────────────────────────────────
	const isSingle = $derived(venues.length === 1);
	const current = $derived(venues[currentIndex]);
	const hasMultiple = $derived(venues.length > 1);
	const imageSrc = $derived(current?.featuredImage ?? fallbackImage);

	// ── Helpers ───────────────────────────────────────────────────────────────
	function resolveImage(venue: VenueDetail): string {
		return venue.featuredImage ? `/files/${venue?.featuredImage}` : fallbackImage;
	}

	function navigate(dir: 'left' | 'right'): void {
		if (isAnimating || !hasMultiple) return;
		direction = dir;
		isAnimating = true;
		setTimeout(() => {
			currentIndex =
				dir === 'right'
					? (currentIndex + 1) % venues.length
					: (currentIndex - 1 + venues.length) % venues.length;
			isAnimating = false;
		}, 320);
	}

	function goTo(index: number): void {
		if (isAnimating || index === currentIndex) return;
		direction = index > currentIndex ? 'right' : 'left';
		isAnimating = true;
		setTimeout(() => {
			currentIndex = index;
			isAnimating = false;
		}, 320);
	}

	function formatCapacity(n: number | null): string {
		if (n === null) return '—';
		return n.toLocaleString();
	}
</script>

<!-- ── Single Venue ───────────────────────────────────────────────────────── -->
{#if isSingle}
	{@const venue = venues[0]}
	<article
		class="relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
		style="min-height: 540px;"
	>
		<!-- Hero image -->
		<a href="/venues/{venue.id}" class="absolute inset-0 h-full w-full">
			<img src={resolveImage(venue)} alt={venue.name} class="h-full w-full object-cover" />
			<!-- Gradient overlay -->
			<div
				class="absolute inset-0"
				style="background: linear-gradient(to top, hsl(var(--card)) 0%, hsl(var(--card) / 0.72) 40%, hsl(var(--card) / 0.08) 100%);"
			></div>
		</a>

		<!-- Content -->
		<div class="relative flex h-full flex-col justify-end px-10 pt-72 pb-12">
			<!-- Location pill -->
			{#if venue.location}
				<span
					class="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-primary px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
				>
					<svg
						class="h-3 w-3"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
						<circle cx="12" cy="10" r="3" />
					</svg>
					{venue.location}
				</span>
			{/if}

			<h1 class="mb-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
				{venue.name}
			</h1>

			{#if venue.description}
				<p class="mb-6 max-w-2xl text-base leading-relaxed text-secondary">
					{venue.description}
				</p>
			{/if}

			<!-- Stats row -->
			<div class="flex flex-wrap items-center gap-6">
				{#if venue.capacity !== null}
					<div class="flex items-center gap-2 text-sm text-card-foreground">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</span>
						<span>
							<span class="font-semibold text-white">{formatCapacity(venue.capacity)}</span>
							<span class="ml-1 text-white">capacity</span>
						</span>
					</div>
				{/if}

				{#if venue.bookingPolicy}
					<div class="flex items-center gap-2 text-sm text-card-foreground">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
							<Calendar size="16" />
						</span>
						<span class="max-w-xs truncate text-white/80">{venue.bookingPolicy}</span>
					</div>
				{/if}
			</div>
			<Button class="mt-8 w-30 py-3" size="lg" href="/venues/{venue.id}"
				><SquareArrowOutUpRight /> View Details</Button
			>
		</div>
	</article>

	<!-- ── Carousel ───────────────────────────────────────────────────────────── -->
{:else if hasMultiple}
	<div class="relative w-full" role="region" aria-label="Venue carousel">
		<!-- Main card -->
		<div
			class="relative overflow-hidden rounded-xl border border-border bg-card shadow-xl"
			style="min-height: 480px;"
		>
			<!-- Sliding image + overlay -->
			<a
				href="/venues/{current?.id}"
				class="absolute inset-0 transition-opacity duration-300"
				style="opacity: {isAnimating ? 0 : 1};"
			>
				<img src={imageSrc} alt={current?.name} class="h-full w-full object-cover" />
				<div
					class="absolute inset-0"
					style="background: linear-gradient(to top, hsl(var(--card)) 0%, hsl(var(--card) / 0.65) 45%, hsl(var(--card) / 0.05) 100%);"
				></div>
			</a>

			<!-- Content block -->
			<div
				class="relative flex h-full flex-col justify-end px-8 pt-64 pb-10 transition-all duration-300"
				style="opacity: {isAnimating ? 0 : 1}; transform: translateX({isAnimating
					? direction === 'right'
						? '-18px'
						: '18px'
					: '0'});"
			>
				{#if current?.location}
					<span
						class="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
					>
						<svg
							class="h-3 w-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
							<circle cx="12" cy="10" r="3" />
						</svg>
						{current.location}
					</span>
				{/if}

				<h2 class="mb-2 text-3xl font-bold tracking-tight text-card-foreground">
					{current?.name}
				</h2>

				{#if current?.description}
					<p class="mb-5 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
						{current.description}
					</p>
				{/if}

				<div class="flex flex-wrap gap-4">
					{#if current?.capacity !== null && current?.capacity !== undefined}
						<span
							class="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary"
						>
							<svg
								class="h-3.5 w-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
							{formatCapacity(current.capacity)} guests
						</span>
					{/if}

					{#if current?.bookingPolicy}
						<span
							class="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
						>
							<svg
								class="h-3.5 w-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
							<span class="max-w-[180px] truncate">{current.bookingPolicy}</span>
						</span>
					{/if}
				</div>
			</div>

			<!-- Prev / Next buttons -->
			<button
				onclick={() => navigate('left')}
				disabled={isAnimating}
				aria-label="Previous venue"
				class="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all duration-150 hover:bg-background hover:shadow-xl disabled:opacity-40"
			>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>

			<button
				onclick={() => navigate('right')}
				disabled={isAnimating}
				aria-label="Next venue"
				class="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all duration-150 hover:bg-background hover:shadow-xl disabled:opacity-40"
			>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<polyline points="9 18 15 12 9 6" />
				</svg>
			</button>

			<!-- Counter badge -->
			<span
				class="absolute top-4 right-4 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-semibold text-foreground tabular-nums backdrop-blur-sm"
			>
				{currentIndex + 1} / {venues.length}
			</span>
		</div>

		<!-- Dot indicators -->
		<div
			class="mt-4 flex items-center justify-center gap-2"
			role="tablist"
			aria-label="Venue slides"
		>
			{#each venues as venue, i}
				<button
					role="tab"
					aria-selected={i === currentIndex}
					aria-label="Go to venue {i + 1}: {venue.name}"
					onclick={() => goTo(i)}
					class="h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none {i ===
					currentIndex
						? 'w-6 bg-primary'
						: 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70'}"
				></button>
			{/each}
		</div>

		<!-- Thumbnail strip (visible if ≥ 3 venues) -->
		{#if venues.length >= 3}
			<div class="mt-3 flex gap-2 overflow-x-auto pb-1">
				{#each venues as venue, i}
					<button
						onclick={() => goTo(i)}
						aria-label="Go to {venue.name}"
						class="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none {i ===
						currentIndex
							? 'border-primary shadow-md'
							: 'border-border opacity-60 hover:opacity-90'}"
					>
						<img src={resolveImage(venue)} alt={venue.name} class="h-full w-full object-cover" />
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ── Empty state ────────────────────────────────────────────────────────── -->
{:else}
	<div
		class="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground"
	>
		<p class="text-sm">No venues to display.</p>
	</div>
{/if}
