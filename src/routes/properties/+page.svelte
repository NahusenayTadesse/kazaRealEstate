<script lang="ts">
	import { SearchIcon, SlidersHorizontalIcon, XIcon, ChevronDownIcon } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import PortfolioCard from '$lib/components/portfolio/portfolio-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	// ── Types ────────────────────────────────────────────────────────────────
	type Property = {
		id: number;
		title: string;
		slug: string;
		description: string | null;
		shortSummary: string | null;
		propertyType: string | null;
		listingType: string;
		status: boolean | null;
		price: number;
		currency: string | null;
		city: string | null;
		address: string | null;
		showAddressPublicly: boolean | null;
		googleMapsUrl: string | null;
		bedrooms: number | null;
		bathrooms: number | null;
		sizeSqm: number | null;
		floorNumber: number | null;
		totalFloors: number | null;
		yearBuilt: number | null;
		featuredImage: string;
		rawPlan: string | null;
		videoTourUrl: string | null;
		createdAt: Date | null;
	};

	// ── Props ─────────────────────────────────────────────────────────────────
	let { data } = $props();

	// ── Filter state ──────────────────────────────────────────────────────────
	let search = $state('');
	let activeListingType = $state('All');
	let activePropertyType = $state('All');
	let priceMin = $state('');
	let priceMax = $state('');
	let showAdvanced = $state(false);
	let typeDropdownOpen = $state(false);

	// Derived unique property types from data
	const propertyTypes = $derived([
		'All',
		...new Set(data?.portfolioItems.map((p) => p.propertyType).filter(Boolean) as string[])
	]);

	// Derived unique listing types
	const listingTypes = $derived([
		'All',
		...new Set(data?.portfolioItems.map((p) => p.listingType).filter(Boolean))
	]);

	// ── Active filter count badge ─────────────────────────────────────────────
	const activeFilterCount = $derived(
		[
			activeListingType !== 'All',
			activePropertyType !== 'All',
			priceMin !== '',
			priceMax !== ''
		].filter(Boolean).length
	);

	// ── Filtered results ──────────────────────────────────────────────────────
	const filtered = $derived(
		data?.portfolioItems.filter((p) => {
			const q = search.toLowerCase();
			const matchesSearch =
				!q ||
				p.title.toLowerCase().includes(q) ||
				p.shortSummary?.toLowerCase().includes(q) ||
				p.description?.toLowerCase().includes(q) ||
				p.address?.toLowerCase().includes(q) ||
				p.city?.toLowerCase().includes(q);

			const matchesListing = activeListingType === 'All' || p.listingType === activeListingType;

			const matchesType = activePropertyType === 'All' || p.propertyType === activePropertyType;

			const min = priceMin ? parseFloat(priceMin) : null;
			const max = priceMax ? parseFloat(priceMax) : null;
			const matchesMin = min === null || p.price >= min;
			const matchesMax = max === null || p.price <= max;

			return matchesSearch && matchesListing && matchesType && matchesMin && matchesMax;
		})
	);

	function clearAll() {
		search = '';
		activeListingType = 'All';
		activePropertyType = 'All';
		priceMin = '';
		priceMax = '';
	}

	function formatPrice(p: number, currency: string | null) {
		return (
			new Intl.NumberFormat('en-ET', {
				maximumFractionDigits: 0
			}).format(p) +
			' ' +
			(currency ?? 'ETB')
		);
	}
</script>

<svelte:head>
	<title>Properties for Sale & Rent in Addis Ababa | Kaza Real Estate</title>
	<meta
		name="description"
		content="Browse premium apartments, villas, and commercial properties for sale and rent in Addis Ababa's top locations like Bole, CMC, and Kazanchis. Quality listings for local and Diaspora clients."
	/>
	<meta
		name="keywords"
		content="Addis Ababa property listings, apartments for sale Ethiopia, villas for rent Addis, Kaza Real Estate archive, real estate Bole, real estate CMC"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kazarealestateet.com/properties" />
	<meta
		property="og:title"
		content="Explore Featured Properties in Addis Ababa | Kaza Real Estate"
	/>
	<meta
		property="og:description"
		content="Find your next investment or dream home. Filter through our exclusive collection of modern residential and commercial properties[cite: 1]."
	/>
	<meta property="og:image" content="/logo.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="Properties for Sale & Rent in Addis Ababa | Kaza Real Estate[cite: 1]"
	/>
	<meta
		name="twitter:description"
		content="View our latest property listings in Ethiopia's most sought-after neighborhoods[cite: 1]."
	/>
	<meta name="twitter:image" content="/logo.png" />

	<!-- Canonical Tag to prevent duplicate content issues with filters -->
	<link rel="canonical" href="https://kazarealestateet.com/properties" />
</svelte:head>

<!-- ── Section wrapper ──────────────────────────────────────────────────── -->
<div class="listings-root relative bg-background">
	<div class="noise" aria-hidden="true"></div>

	<!-- ── Mini hero / filter header ──────────────────────────────────────── -->
	<div class="listings-hero relative overflow-hidden">
		<div class="hero-orb" aria-hidden="true"></div>
		<div class="grid-lines" aria-hidden="true"></div>

		<div class="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
			<!-- Eyebrow -->
			<div class="mb-5 flex items-center gap-3">
				<div class="h-px w-8 bg-primary"></div>
				<span
					class="text-[11px] font-black tracking-[0.3em] text-primary uppercase"
					style="font-family: 'DM Sans', sans-serif;"
				>
					Browse Properties
				</span>
			</div>

			<!-- Headline + count -->
			<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
				<h2
					class="leading-none text-foreground"
					style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 900;"
				>
					Find Your<br /><em class="text-primary not-italic">Property.</em>
				</h2>
				<p class="text-sm text-zinc-500 tabular-nums" style="font-family: 'DM Sans', sans-serif;">
					<span class="text-lg font-bold">{filtered.length}</span>
					/ {data?.portfolioItems.length} listings
				</p>
			</div>

			<!-- ── Search bar ──────────────────────────────────────────────── -->
			<div class="search-wrap mb-4 flex items-center gap-3">
				<div class="search-input-wrap flex flex-1 items-center gap-3">
					<SearchIcon class="size-4 shrink-0 text-zinc-500" />
					<Input
						type="search"
						placeholder="Search by title, location, description…"
						bind:value={search}
						class="search-input flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
						style="font-family: 'DM Sans', sans-serif; font-size: 0.925rem;"
					/>
					{#if search}
						<Button onclick={() => (search = '')} size="icon">
							<XIcon class="size-4" />
						</Button>
					{/if}
				</div>

				<!-- Advanced toggle -->
				<button
					onclick={() => (showAdvanced = !showAdvanced)}
					class="filter-toggle-btn flex items-center gap-2"
					style="font-family: 'DM Sans', sans-serif;"
				>
					<SlidersHorizontalIcon class="size-4" />
					<span class="hidden text-sm font-semibold sm:block">Filters</span>
					{#if activeFilterCount > 0}
						<span class="filter-badge">{activeFilterCount}</span>
					{/if}
				</button>
			</div>

			<!-- ── Listing type pills ──────────────────────────────────────── -->
			<div class="mb-4 flex flex-wrap items-center gap-2">
				{#each propertyTypes as type (type)}
					<button
						onclick={() => (activePropertyType = type)}
						class="pill {activeListingType === type ? 'pill-active' : 'pill-inactive'}"
						style="font-family: 'DM Sans', sans-serif;"
					>
						{type}
					</button>
				{/each}
			</div>

			<!-- ── Advanced filters ────────────────────────────────────────── -->
			{#if showAdvanced}
				<div
					in:fly={{ y: -10, duration: 300, easing: cubicOut }}
					out:fly={{ y: -10, duration: 200, easing: cubicOut }}
					class="advanced-panel mt-2 grid gap-3 sm:grid-cols-3"
				>
					<!-- Property type dropdown -->

					<!-- Min price -->
					<div class="filter-group">
						<Label class="filter-label">Min Price (ETB)</Label>
						<Input
							type="number"
							placeholder="e.g. 1,000,000"
							bind:value={priceMin}
							class="filter-input"
							style="font-family: 'DM Sans', sans-serif;"
						/>
					</div>

					<!-- Max price -->
					<div class="filter-group">
						<Label class="filter-label">Max Price (ETB)</Label>
						<Input
							type="number"
							placeholder="e.g. 10,000,000"
							bind:value={priceMax}
							class="filter-input"
							style="font-family: 'DM Sans', sans-serif;"
						/>
					</div>
				</div>
			{/if}

			<!-- ── Active filter chips ─────────────────────────────────────── -->
			{#if activeFilterCount > 0}
				<div class="mt-4 flex flex-wrap items-center gap-2" in:fade={{ duration: 200 }}>
					{#if activeListingType !== 'All'}
						<div class="chip">
							{activeListingType}
							<button onclick={() => (activeListingType = 'All')}><XIcon class="size-3" /></button>
						</div>
					{/if}
					{#if activePropertyType !== 'All'}
						<div class="chip">
							{activePropertyType}
							<button onclick={() => (activePropertyType = 'All')}><XIcon class="size-3" /></button>
						</div>
					{/if}
					{#if priceMin}
						<div class="chip">
							From {formatPrice(parseFloat(priceMin), 'ETB')}
							<button onclick={() => (priceMin = '')}><XIcon class="size-3" /></button>
						</div>
					{/if}
					{#if priceMax}
						<div class="chip">
							Up to {formatPrice(parseFloat(priceMax), 'ETB')}
							<button onclick={() => (priceMax = '')}><XIcon class="size-3" /></button>
						</div>
					{/if}
					<button
						onclick={clearAll}
						class="ml-1 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-[#D4AF5A]"
						style="font-family: 'DM Sans', sans-serif;"
					>
						Clear all
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ── Property grid ──────────────────────────────────────────────────── -->
	<div class="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-12">
		{#if filtered.length === 0}
			<div
				class="flex flex-col items-center justify-center py-28 text-center"
				in:fade={{ duration: 300 }}
			>
				<div class="empty-icon-wrap mb-6">
					<SearchIcon class="size-7 text-[#D4AF5A]" />
				</div>
				<p
					class="mb-2 text-xl font-bold text-white"
					style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem;"
				>
					No properties found
				</p>
				<p class="mb-6 text-sm text-zinc-500" style="font-family: 'DM Sans', sans-serif;">
					Try adjusting your search or filters
				</p>
				<button onclick={clearAll} class="cta-ghost" style="font-family: 'DM Sans', sans-serif;">
					Clear all filters
				</button>
			</div>
		{:else}
			<div class="property-grid">
				{#each filtered as item (item.id)}
					<div in:fade={{ duration: 300 }}>
						<PortfolioCard property={item} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	/* ── Noise ────────────────────────────────── */
	.noise {
		position: fixed;
		inset: 0;
		z-index: 0;
		opacity: 0.025;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 200px 200px;
	}

	/* ── Hero ─────────────────────────────────── */
	.listings-hero {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}
	.hero-orb {
		position: absolute;
		width: 700px;
		height: 500px;
		top: -200px;
		right: -150px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(212, 175, 90, 0.09) 0%, transparent 65%);
		filter: blur(80px);
		pointer-events: none;
	}
	.grid-lines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: linear-gradient(
			to bottom,
			transparent,
			rgba(0, 0, 0, 0.2) 20%,
			rgba(0, 0, 0, 0.2) 80%,
			transparent
		);
	}

	/* ── Search bar ───────────────────────────── */
	.search-input-wrap {
		flex: 1;
		padding: 12px 18px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 12px;
		backdrop-filter: blur(12px);
		transition:
			border-color 0.2s ease,
			background 0.2s ease;
	}
	.search-input-wrap:focus-within {
		border-color: rgba(212, 175, 90, 0.45);
		background: rgba(255, 255, 255, 0.06);
	}
	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.22);
	}

	/* ── Filter toggle button ─────────────────── */
	.filter-toggle-btn {
		padding: 12px 18px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 12px;
		color: #a1a1aa;
		backdrop-filter: blur(12px);
		transition: all 0.2s ease;
		cursor: pointer;
	}
	.filter-toggle-btn:hover {
		border-color: rgba(212, 175, 90, 0.4);
		color: #d4af5a;
	}
	.filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #d4af5a;
		color: #050d1c;
		font-size: 10px;
		font-weight: 900;
	}

	/* ── Pills ────────────────────────────────── */
	.pill {
		padding: 6px 16px;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid;
		transition: all 0.2s ease;
	}
	.pill-active {
		background: #d4af5a;
		border-color: #d4af5a;
		color: #050d1c;
	}
	.pill-inactive {
		background: transparent;
		border-color: rgba(255, 255, 255, 0.1);
		color: #71717a;
	}
	.pill-inactive:hover {
		border-color: rgba(212, 175, 90, 0.4);
		color: #d4af5a;
	}

	/* ── Advanced panel ───────────────────────── */
	.advanced-panel {
		padding: 16px 20px;
		background: rgba(255, 255, 255, 0.025);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 12px;
		backdrop-filter: blur(12px);
	}
	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.filter-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #52525b;
		font-family: 'DM Sans', sans-serif;
	}
	.filter-select,
	.filter-input {
		padding: 9px 12px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 8px;
		color: #e4e4e7;
		font-size: 0.875rem;
		transition: border-color 0.2s ease;
		cursor: pointer;
	}
	.filter-select:focus,
	.filter-input:focus {
		outline: none;
		border-color: rgba(212, 175, 90, 0.45);
	}
	.filter-input::placeholder {
		color: rgba(255, 255, 255, 0.18);
	}
	.filter-input {
		cursor: text;
	}

	/* ── Dropdown ─────────────────────────────── */
	.dropdown-menu {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 50;
		background: #0c1830;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
	}
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 9px 14px;
		text-align: left;
		font-size: 0.875rem;
		color: #a1a1aa;
		transition:
			background 0.15s ease,
			color 0.15s ease;
		cursor: pointer;
	}
	.dropdown-item:hover {
		background: rgba(212, 175, 90, 0.08);
		color: #d4af5a;
	}
	.dropdown-item-active {
		color: #d4af5a;
		background: rgba(212, 175, 90, 0.1);
	}

	/* ── Active filter chips ──────────────────── */
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px 4px 12px;
		background: rgba(212, 175, 90, 0.1);
		border: 1px solid rgba(212, 175, 90, 0.25);
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		color: #d4af5a;
		font-family: 'DM Sans', sans-serif;
	}
	.chip button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgba(212, 175, 90, 0.2);
		color: #d4af5a;
		cursor: pointer;
		transition: background 0.2s ease;
	}
	.chip button:hover {
		background: rgba(212, 175, 90, 0.4);
	}

	/* ── Property grid ────────────────────────── */
	.property-grid {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(1, 1fr);
	}
	@media (min-width: 640px) {
		.property-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.property-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* ── Empty state ──────────────────────────── */
	.empty-icon-wrap {
		width: 60px;
		height: 60px;
		border-radius: 16px;
		background: rgba(212, 175, 90, 0.1);
		border: 1px solid rgba(212, 175, 90, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cta-ghost {
		color: #d4af5a;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-decoration: none;
		border-bottom: 1px solid rgba(212, 175, 90, 0.35);
		padding-bottom: 3px;
		cursor: pointer;
		background: none;
		transition:
			border-color 0.2s ease,
			opacity 0.2s ease;
	}
	.cta-ghost:hover {
		border-color: #d4af5a;
		opacity: 0.85;
	}
</style>
