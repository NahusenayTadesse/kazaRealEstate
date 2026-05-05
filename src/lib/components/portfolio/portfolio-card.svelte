<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { BedDoubleIcon, BathIcon, RulerIcon, MapPinIcon, BuildingIcon } from '@lucide/svelte';

	interface PropertyType {
		id: number;
		name: string;
		description?: string | null;
	}

	interface Property {
		id: number;
		title: string;
		slug: string;
		description?: string | null;
		shortSummary?: string | null;
		propertyType?: PropertyType | null;
		status: boolean;
		price: number;
		currency: string;
		city: string;
		address?: string | null;
		showAddressPublicly: boolean;
		googleMapsUrl?: string | null;
		bedrooms?: number | null;
		bathrooms?: number | null;
		sizeSqm?: number | null;
		floorNumber?: number | null;
		totalFloors?: number | null;
		yearBuilt?: number | null;
		featuredImage: string;
		rawPlan?: string | null;
		videoTourUrl?: string | null;
	}

	interface Props {
		property: Property;
	}

	const { property }: Props = $props();

	/** Format price with currency */
	const formatPrice = (price: number, currency: string): string => {
		return new Intl.NumberFormat('en-ET', {
			style: 'currency',
			currency: currency === 'ETB' ? 'ETB' : currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(price);
	};

	/** Navigate to property detail page */
	const handleClick = () => {
		window.location.href = `/properties/${property.slug}`;
	};

	/** Handle keyboard navigation */
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	};
</script>

<a
	class="group hover:shadow-lg-xl hover:shadow-lg-primary/10 cursor-pointer overflow-hidden rounded-xl border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1"
	href="/properties/{property.slug}"
	role="link"
	tabindex="0"
	aria-label="View {property.title}"
>
	<!-- Image Container -->
	<div class="relative aspect-4/3 overflow-hidden">
		<img
			src="/files/{property.featuredImage}"
			alt={property.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>

		<!-- Status Badge -->
		<div class="absolute top-3 left-3 flex gap-2">
			{#if property.status}
				<Badge class="bg-emerald-500 text-white hover:bg-emerald-600">Available</Badge>
			{:else}
				<Badge variant="secondary" class="bg-muted/90 backdrop-blur-sm">Sold</Badge>
			{/if}

			{#if property.propertyType}
				<Badge variant="outline" class="bg-background/90 backdrop-blur-sm">
					{property.propertyType}
				</Badge>
			{/if}
		</div>

		<!-- Price Tag -->
		<div class="absolute right-3 bottom-3">
			<div
				class="shadow-lg-lg rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground"
			>
				{formatPrice(property.price, property.currency)}
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="p-4">
		<!-- Title -->
		<h3
			class="mb-2 line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
		>
			{property.title}
		</h3>

		<!-- Location -->
		{#if property.showAddressPublicly && (property.city || property.address)}
			<div class="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
				<MapPinIcon class="size-4 shrink-0" />
				<span class="line-clamp-1">
					{#if property.address}
						{property.address}, {property.city}
					{:else}
						{property.city}
					{/if}
				</span>
			</div>
		{/if}

		<!-- Short Summary -->
		{#if property.shortSummary}
			<p class="mb-4 line-clamp-2 text-sm text-muted-foreground">
				{property.shortSummary}
			</p>
		{/if}

		<!-- Property Features -->
		<div class="flex flex-wrap items-center gap-4 border-t pt-4 text-sm text-muted-foreground">
			{#if property.bedrooms}
				<div class="flex items-center gap-1.5" title="Bedrooms">
					<BedDoubleIcon class="size-4 text-primary" />
					<span>{property.bedrooms} Beds</span>
				</div>
			{/if}

			{#if property.bathrooms}
				<div class="flex items-center gap-1.5" title="Bathrooms">
					<BathIcon class="size-4 text-primary" />
					<span>{property.bathrooms} Baths</span>
				</div>
			{/if}

			{#if property.sizeSqm}
				<div class="flex items-center gap-1.5" title="Size">
					<RulerIcon class="size-4 text-primary" />
					<span>{property.sizeSqm.toLocaleString()} m²</span>
				</div>
			{/if}

			{#if property.floorNumber && property.totalFloors}
				<div class="flex items-center gap-1.5" title="Floor">
					<BuildingIcon class="size-4 text-primary" />
					<span>Floor {property.floorNumber}/{property.totalFloors}</span>
				</div>
			{/if}
		</div>
	</div>
</a>
