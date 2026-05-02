<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		CalendarHeartIcon,
		MapPinIcon,
		TrendingUpIcon,
		UsersIcon,
		ZapIcon,
		CheckIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	// Highlights based on "Key Differentiation" and "General Information"
	const highlights = [
		{
			icon: CalendarHeartIcon,
			label: 'Full-Service Events',
			description: 'Management for corporate, brand, and private events'
		},
		{
			icon: MapPinIcon,
			label: '4 Kilo Plaza',
			description: 'Central, flexible venue for Addis Ababa events'
		},
		{
			icon: TrendingUpIcon,
			label: 'Sales-Driven',
			description: 'Sponsorships and event-based marketing'
		},
		{
			icon: ZapIcon,
			label: 'Ahead of the Curve',
			description: 'Creating experiences and generating revenue'
		}
	];

	// Core Business Units
	const services = [
		'Event Management',
		'Venue Operations',
		'Sales Division',
		'Sponsorships',
		'Brand Activations',
		'Catering'
	];

	// Target Audience segments for the secondary section
	const audience = [
		{ name: 'Corporate Clients', description: 'Banks, telecom, FMCG, and major companies' },
		{
			name: 'Brands & Sponsors',
			description: 'Connecting brands with high-energy youth audiences'
		}
	];
</script>

<section class="relative px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div transition:fly={{ y: 20, duration: 600 }} class="mb-16 flex flex-col gap-4 text-center">
			<h2 class="text-4xl font-bold sm:text-5xl">About Yebehir Ventures</h2>
			<p class="mx-auto max-w-3xl text-lg">
				A multi-service company specializing in event management, venue operations, and sales-driven
				brand experiences in Addis Ababa.
			</p>
		</div>

		<div class="mb-16 grid gap-8 lg:grid-cols-3">
			<div transition:fly={{ y: 20, duration: 600, delay: 100 }} class="lg:col-span-2">
				<Card
					style="background-image: url('/event (2).webp')"
					class="relative z-0 h-full overflow-hidden border-none bg-cover bg-center text-white shadow-xl"
				>
					<div class="absolute inset-0 -z-1 bg-primary/85"></div>
					<CardHeader>
						<CardTitle class="text-2xl text-[#F2E1D1]">Ahead of the Curve</CardTitle>
						<CardDescription class="text-white/80">More than just an event company</CardDescription>
					</CardHeader>
					<CardContent class="flex flex-col gap-4 text-white">
						<p class="leading-relaxed">
							Yebehir Ventures is a unique platform that integrates event management, venue
							providing, and sales/sponsorship services. We don't just organize events—we create
							experiences, generate revenue opportunities, and connect brands with audiences.
						</p>
						<p class="leading-relaxed">
							Our approach is bold, modern, and premium. Whether operating our central venue at 4
							Kilo Plaza or managing brand activations, our mission is to provide high-energy,
							lifestyle-focused experiences that build credibility.
						</p>
					</CardContent>
				</Card>
			</div>

			<div transition:fly={{ y: 20, duration: 600, delay: 200 }} class="flex flex-col gap-4">
				{#each highlights as highlight (highlight.label)}
					<Card class="border-accent transition-all duration-300 hover:shadow-md">
						<CardContent class="flex gap-2 p-4">
							<div class="shrink-0">
								<div class="flex size-10 items-center justify-center rounded-lg bg-accent/30">
									<highlight.icon class="size-6" />
								</div>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-semibold">{highlight.label}</p>
								<p class="mt-1 text-xs">{highlight.description}</p>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>

		<div transition:fly={{ y: 20, duration: 600, delay: 300 }} class="mb-16">
			<Card class="border-[#F2E1D1] bg-[#F2E1D1]/10 shadow-none">
				<CardHeader>
					<CardTitle class="text-[#091838]">Our Core Services</CardTitle>
					<CardDescription
						>Comprehensive solutions for events, venues, and marketing</CardDescription
					>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
						{#each services as item (item)}
							<div
								class="flex items-center gap-3 rounded-lg border border-[#091838]/10 bg-white p-3 transition-colors duration-300 hover:border-[#F2E1D1]"
							>
								<CheckIcon class="size-4 shrink-0 text-[#091838]" />
								<span class="text-xs font-bold tracking-tighter text-[#091838] uppercase"
									>{item}</span
								>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
