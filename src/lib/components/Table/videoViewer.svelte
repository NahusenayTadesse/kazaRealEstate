<script lang="ts">
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import { Video } from '@lucide/svelte';

	interface Props {
		videoUrl: string;
		class?: string;
		dialog?: boolean;
	}

	let { videoUrl, class: className, dialog = false }: Props = $props();

	let videoId = $derived.by(() => {
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = videoUrl?.match(regex);
		return match ? match[1] : null;
	});
</script>

{#if dialog}
	<DialogComp variant="ghost" title="View Video" IconComp={Video}>
		<div class="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
			<iframe
				src="https://www.youtube.com/embed/{videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="absolute inset-0 h-full w-full"
			></iframe>
		</div>
	</DialogComp>
{:else}
	<div
		class="relative aspect-video {className} w-full max-w-80 min-w-50 overflow-hidden rounded-lg border bg-muted"
	>
		<iframe
			src="https://www.youtube.com/embed/{videoId}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="absolute inset-0 h-full w-full"
		></iframe>
	</div>
{/if}
