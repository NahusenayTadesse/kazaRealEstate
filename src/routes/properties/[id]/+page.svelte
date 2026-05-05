<script lang="ts">
	import { formatEthiopianDate } from '$lib/global.svelte.js';
	import Gallery from '$lib/components/gallery.svelte';
	import VideoViewer from '$lib/components/Table/videoViewer.svelte';
	import ImageViewer from '$lib/components/Table/image-viewer.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		Bed,
		Bath,
		Maximize2,
		Layers,
		Calendar,
		MapPin,
		Check,
		Phone,
		Mail,
		Share2,
		Heart,
		ChevronDown,
		Building2,
		ArrowRight
	} from '@lucide/svelte';
	import Quote from './quote.svelte';

	let { data } = $props();

	let images = $derived(data?.images);

	let scrolled = $state(false);

	// Stats for the sticky bar
	let stats = $derived([
		{ icon: Bed, label: 'Bedrooms', value: data.product?.bedrooms },
		{ icon: Bath, label: 'Bathrooms', value: data.product?.bathrooms },
		{ icon: Maximize2, label: 'Sq. Meters', value: data.product?.sizeSqm },
		{
			icon: Layers,
			label: 'Floor',
			value: `${data.product?.floorNumber} / ${data.product?.totalFloors}`
		}
	]);
	let property = $derived(data.product);
	const stripHtml = (html: string | null | undefined) => {
		if (!html) return '';
		return html.replace(/<[^>]*>?/gm, '').trim();
	};
</script>

<svelte:head>
	<title>{data.product?.title} — Kaza Real Estate</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>

	<!-- Primary Meta Tags -->
	<meta name="title" content="{property.title} | Kaza Real Estate" />
	<meta
		name="description"
		content={stripHtml(property.shortSummary) ||
			`Modern ${property.bedrooms} bedroom ${property.propertyType} available in ${property.city}. ${property.sizeSqm}sqm of professional living space.`}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kazarealestateet.com/properties/{property.slug}" />
	<meta property="og:title" content="{property.title} - For {property.listingType}" />
	<meta
		property="og:description"
		content="Explore this {property.propertyType} in {property.city}. Price: {property.price} {property.currency}. View photos and property details."
	/>
	<meta property="og:image" content="/files/{property.featuredImage}" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://kazarealestateet.com/properties/{property.slug}" />
	<meta property="twitter:title" content="{property.title} | Kaza Real Estate" />
	<meta
		property="twitter:description"
		content="Check out this {property.listingType} listing in Addis Ababa."
	/>
	<meta property="twitter:image" content="/files/{property.featuredImage}" />

	<!-- Real Estate Schema.org Markup (Helps Google understand the listing) -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "RealEstateListing",
			"name": "{property.title}",
			"description": "{property.description}",
			"image": "/files/{property.featuredImage}",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "{property.city}",
				"addressCountry": "ET"
			},
			"offers": {
				"@type": "Offer",
				"priceCurrency": "ETB",
				"price": "{property.price}"
			}
		}
	</script>
</svelte:head>

<div class="kaza-body min-h-screen bg-background">
	<!-- ═══════════════════════════════════════════
		HERO
	════════════════════════════════════════════ -->
	<section class="relative h-[60vh] min-h-180 w-full overflow-hidden">
		<!-- Background image -->
		<img
			src="/files/{data.product?.featuredImage}"
			alt={data.product?.title}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<!-- Gradient overlay -->
		<div class="hero-overlay absolute inset-0"></div>

		<!-- Top nav strip -->
		<div class="absolute top-0 right-0 left-0 flex items-center justify-between px-6 py-5 md:px-12">
			<a href="/" class="kaza-display text-xl font-semibold tracking-wide text-white drop-shadow">
				Kaza<span class="font-light italic"> Real Estate</span>
			</a>
			<!-- <div class="flex items-center gap-3">
				<Button
					variant="ghost"
					size="icon"
					class="rounded-full border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
				>
					<Heart class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					class="rounded-full border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
				>
					<Share2 class="h-4 w-4" />
				</Button>
			</div> -->
		</div>

		<!-- Hero content — bottom aligned -->
		<div class="absolute right-0 bottom-0 left-0 px-6 pb-10 md:px-12 md:pb-14">
			<!-- Status + type badges -->
			<div class="mb-3 flex flex-wrap items-center gap-2">
				<span
					class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase
						{data.product?.status ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'}"
				>
					{data.product?.status ? 'Available' : 'Sold'}
				</span>
				{#if data.product?.type}
					<span
						class="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-medium tracking-wider text-white uppercase backdrop-blur"
					>
						{data.product?.type}
					</span>
				{/if}
			</div>

			<!-- Title -->
			<h1
				class="kaza-display mb-3 text-4xl leading-tight font-light text-white drop-shadow-lg md:text-6xl lg:text-7xl"
			>
				{data.product?.title}
			</h1>

			<!-- Location -->
			{#if data.product?.city || data.product?.address}
				<p class="flex items-center gap-1.5 text-sm text-white/80 md:text-base">
					<MapPin class="h-4 w-4 shrink-0 text-white/60" />
					{[data.product?.address, data.product?.city].filter(Boolean).join(', ')}
				</p>
			{/if}
		</div>

		<!-- Scroll cue -->
		<div class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
			<ChevronDown class="h-5 w-5" />
		</div>
	</section>

	<!-- ═══════════════════════════════════════════
		PRICE + STATS BAND
	════════════════════════════════════════════ -->
	<section
		class="sticky top-0 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur"
	>
		<div
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12"
		>
			<!-- Price -->
			<div>
				<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Listing Price
				</p>
				<p class="kaza-display text-3xl font-semibold text-foreground md:text-4xl">
					ETB {Number(data.product?.price).toLocaleString()}
				</p>
			</div>

			<!-- Quick stats -->
			<div class="flex flex-wrap items-center gap-4 md:gap-6">
				{#each stats as stat (stat.value)}
					<div class="flex items-center gap-2 text-sm">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
							<stat.icon class="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<p class="font-medium text-foreground">{stat.value ?? '—'}</p>
							<p class="text-[10px] tracking-wide text-muted-foreground uppercase">{stat.label}</p>
						</div>
					</div>
					<Separator orientation="vertical" class="hidden h-8 last:hidden md:block" />
				{/each}
			</div>

			<!-- CTA -->
			<!-- <Button class="hidden shrink-0 gap-2 rounded-full px-6 md:flex">
				Inquire Now <ArrowRight class="h-4 w-4" />
			</Button> -->

			<Quote data={data?.form} id={data?.product?.id} title={data?.product?.title} />
		</div>
	</section>

	<!-- ═══════════════════════════════════════════
		MAIN CONTENT
	════════════════════════════════════════════ -->
	<div class="mx-auto max-w-6xl px-6 py-14 md:px-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
			<!-- LEFT COLUMN -->
			<div class="flex flex-col gap-14">
				<!-- Short Summary -->
				{#if data.product?.shortSummary}
					<section class="section-reveal" style="animation-delay: 0.05s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">Overview</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div
							class="prose prose-slate prose-p:text-base prose-p:leading-8 prose-headings:kaza-display
							max-w-none leading-relaxed text-muted-foreground"
						>
							{@html data.product?.shortSummary}
						</div>
					</section>
				{/if}

				<!-- Amenities -->
				{#if data?.features?.length}
					<section class="section-reveal" style="animation-delay: 0.1s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">
								Amenities
							</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{#each data.features as amenity (amenity.id)}
								<div
									class="amenity-chip flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3"
								>
									<div
										class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10"
									>
										<Check class="h-3.5 w-3.5 text-primary" />
									</div>
									<span class="text-sm font-medium text-foreground">{amenity.name}</span>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Full Description -->
				{#if data.product?.description}
					<section class="section-reveal" style="animation-delay: 0.15s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">
								Description
							</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div
							class="prose prose-slate prose-p:text-base
							prose-p:leading-8 prose-p:text-muted-foreground prose-headings:font-semibold
							prose-headings:text-foreground max-w-none"
						>
							{@html data.product?.description}
						</div>
					</section>
				{/if}

				<!-- Floor Plan -->
				{#if data.product?.rawPlan}
					<section class="section-reveal" style="animation-delay: 0.2s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">
								Floor Plan
							</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div class="overflow-hidden rounded-2xl border border-border bg-muted/30 p-4">
							<ImageViewer
								class="h-full! w-full! rounded-xl object-contain"
								src={data.product?.rawPlan}
								alt="Floor Plan"
							/>
						</div>
					</section>
				{/if}

				<!-- Gallery -->
				{#if images?.length}
					<section class="section-reveal" style="animation-delay: 0.25s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">Gallery</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div class="overflow-hidden rounded-2xl border border-border">
							<Gallery {images} title={data.product?.title} />
						</div>
					</section>
				{/if}

				<!-- Video Tour -->
				{#if data.product?.videoTourUrl}
					<section class="section-reveal" style="animation-delay: 0.3s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">
								Video Tour
							</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div class="overflow-hidden rounded-2xl border border-border bg-black">
							<VideoViewer videoUrl={data.product?.videoTourUrl} class="max-h-full! max-w-full!" />
						</div>
					</section>
				{/if}

				<!-- Map -->
				{#if data.product?.googleMapsUrl}
					<section class="section-reveal" style="animation-delay: 0.35s">
						<div class="mb-6 flex items-end gap-4">
							<h2 class="kaza-display text-3xl font-light text-foreground md:text-4xl">Location</h2>
							<div class="mb-1.5 h-px flex-1 bg-border"></div>
						</div>
						<div
							class="overflow-hidden rounded-2xl border border-border [&_iframe]:h-80 [&_iframe]:w-full"
						>
							{@html data.product?.googleMapsUrl}
						</div>
					</section>
				{/if}
			</div>
			<!-- /LEFT COLUMN -->

			<!-- RIGHT COLUMN — sticky sidebar -->
			<aside class="flex flex-col gap-6">
				<div class="sticky top-24 flex flex-col gap-5">
					<!-- Property Details Card -->
					<div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
						<h3 class="kaza-display mb-4 text-xl font-semibold text-foreground">
							Property Details
						</h3>
						<ul class="flex flex-col divide-y divide-border text-sm">
							{#each [{ label: 'Type', value: data.product?.type }, { label: 'Status', value: data.product?.status ? 'Available' : 'Sold' }, { label: 'Bedrooms', value: data.product?.bedrooms }, { label: 'Bathrooms', value: data.product?.bathrooms }, { label: 'Size', value: data.product?.sizeSqm ? `${data.product.sizeSqm} m²` : null }, { label: 'Floor', value: data.product?.floorNumber != null ? `${data.product.floorNumber} of ${data.product.totalFloors}` : null }, { label: 'Year Built', value: data.product?.yearBuilt }, { label: 'Listed', value: formatEthiopianDate(data.product?.createdAt) }].filter((r) => r.value != null) as row}
								<li class="flex items-center justify-between py-3">
									<span class="text-muted-foreground">{row.label}</span>
									<span class="font-medium text-foreground">{row.value}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Contact Card -->
					<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
						<!-- Top accent strip -->
						<div class="price-tag px-6 py-4">
							<p class="text-xs font-medium tracking-wider text-white/70 uppercase">
								Listing Price
							</p>
							<p class="kaza-display text-2xl font-semibold text-white">
								ETB {Number(data.product?.price).toLocaleString()}
							</p>
						</div>

						<div class="p-6">
							<p class="mb-4 text-sm text-muted-foreground">
								Interested in this property? Get in touch with our agents today.
							</p>

							<div class="flex flex-col gap-3">
								<Button href="tel:+251 91 121 6413" class="w-full gap-2 rounded-xl">
									<Phone class="h-4 w-4" />
									Request a Call
								</Button>
								<Quote data={data?.form} id={data?.product?.id} title={data?.product?.title} />
							</div>

							<Separator class="my-4" />

							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10"
								>
									<Building2 class="h-5 w-5 text-primary" />
								</div>
								<div>
									<p class="text-sm font-semibold text-foreground">Kaza Real Estate</p>
									<p class="text-xs text-muted-foreground">Verified Listing</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Added on -->
					{#if data.product?.createdAt}
						<p class="text-center text-xs text-muted-foreground">
							Listed on {formatEthiopianDate(data.product.createdAt)}
						</p>
					{/if}
				</div>
			</aside>
		</div>
		<!-- /grid -->
	</div>
	<!-- /main content -->

	<!-- ═══════════════════════════════════════════
		MOBILE FIXED BOTTOM BAR
	════════════════════════════════════════════ -->
	<div
		class="fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur md:hidden"
	>
		<div class="flex items-center gap-3">
			<div class="flex-1">
				<p class="text-xs text-muted-foreground">Listing Price</p>
				<p class="kaza-display text-xl font-semibold">
					ETB {Number(data.product?.price).toLocaleString()}
				</p>
			</div>
			<Button class="gap-2 rounded-full px-6">
				Inquire <ArrowRight class="h-4 w-4" />
			</Button>
		</div>
	</div>

	<!-- spacer for mobile bottom bar -->
	<div class="h-24 md:hidden"></div>
</div>

<style>
	:global(.kaza-display) {
		font-family: 'Cormorant Garamond', Georgia, serif;
	}
	:global(.kaza-body) {
		font-family: 'DM Sans', sans-serif;
	}

	.hero-overlay {
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.08) 0%,
			rgba(0, 0, 0, 0.15) 50%,
			rgba(0, 0, 0, 0.72) 100%
		);
	}

	.stat-card {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	.amenity-chip {
		transition: background 0.18s ease;
	}
	.amenity-chip:hover {
		background: hsl(var(--primary) / 0.08);
	}

	.section-reveal {
		opacity: 0;
		transform: translateY(20px);
		animation: reveal 0.6s ease forwards;
	}
	@keyframes reveal {
		to {
			opacity: 1;
			transform: none;
		}
	}

	.price-tag {
		background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
	}
</style>
