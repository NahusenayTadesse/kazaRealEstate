<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		ArrowRightIcon,
		CalendarHeartIcon,
		MapPinIcon,
		TrendingUpIcon,
		BadgeCheckIcon,
		ZapIcon,
		UsersIcon,
		Send,
		PhoneIcon,
		QuoteIcon,
		CoffeeIcon,
		MicIcon
	} from '@lucide/svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-svelte';
	import FAQ from '$lib/components/faq.svelte';
	import Slider from '$lib/components/slider.svelte';
	import Catalog from '$lib/components/catalog.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import ServiceGrid from '$lib/components/services/service-grid.svelte';

	const socialLinks = [
		{ name: 'Instagram', url: '#', icon: IconBrandInstagram, color: 'hover:text-primary' },
		{ name: 'TikTok', url: '#', icon: IconBrandTiktok, color: 'hover:text-primary' },
		{ name: 'Facebook', url: '#', icon: IconBrandFacebook, color: 'hover:text-primary' },
		{ name: 'Telegram', url: '#', icon: Send, color: 'hover:text-primary' }
	];

	// Business Units based on the Project Brief
	const units = [
		{
			name: 'Yebehir Events',
			description:
				'Full-service event management specializing in corporate clients, brand activations, and high-energy private events with a focus on cinematic experiences.',
			icon: CalendarHeartIcon,
			short: 'EVENTS'
		},
		{
			name: '4 Kilo Plaza',
			description:
				'Our central, flexible venue in Addis Ababa. Designed for corporate meetings, lifestyle events, and brand showcases with premium amenities.',
			icon: MapPinIcon,
			short: 'VENUE'
		},
		{
			name: 'Sales & Sponsorship',
			description:
				'Strategic partnership acquisition and event-based marketing. We connect global and local brands with target audiences to generate revenue.',
			icon: TrendingUpIcon,
			short: 'SALES'
		},
		{
			name: 'Brand Activations',
			description:
				'Creating high-impact experiences that build brand credibility and engage the youth market in Addis Ababa.',
			icon: ZapIcon,
			short: 'BRAND'
		}
	];

	let { data } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>About Us | Event Management & 4 Kilo Plaza Venue Addis Ababa</title>
	<meta
		name="title"
		content="Yebehir Ventures | Event Management & 4 Kilo Plaza Venue Addis Ababa"
	/>
	<meta
		name="description"
		content="Ahead of the curve. Yebehir Ventures provides premium event management, corporate brand experiences, and venue rentals at 4 Kilo Plaza, Addis Ababa."
	/>
	<meta
		name="keywords"
		content="Yebehir Ventures, Event Management Ethiopia, 4 Kilo Plaza, Venue Rental Addis Ababa, Corporate Events Addis, Brand Activations Ethiopia, Sponsorship Marketing"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://yebehir.com/" />
	<meta property="og:title" content="Yebehir Ventures | Ahead of the curve" />
	<meta
		property="og:description"
		content="We create, manage, and monetize events. Discover full-service event production and venue bookings at 4 Kilo Plaza."
	/>
	<meta property="og:image" content="/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://yebehir.com/" />
	<meta property="twitter:title" content="Yebehir Ventures | Event Management & Venue Operations" />
	<meta
		property="twitter:description"
		content="Leading multi-service event company in Addis Ababa. Specializing in event production, venue operations, and sales-driven brand experiences."
	/>
	<meta property="twitter:image" content="/logo.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://yebehir.com/" />

	<!-- Favicon / Theming -->
	<link rel="icon" type="image/png" href="/logo.png" />
	<meta name="theme-color" content="#091B38" />
</svelte:head>

<section
	class="relative overflow-hidden bg-muted/30 bg-cover bg-center px-4 py-20 text-white sm:py-32"
	style="background-image: url('/event (3).webp')"
>
	<div class="absolute inset-0 bg-primary/60"></div>

	<div class="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
		<div
			class="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium tracking-widest text-white uppercase"
		>
			Ahead of the curve
		</div>

		<h1
			class="text-center text-4xl font-extrabold tracking-tight text-accent sm:text-5xl lg:text-6xl"
		>
			We Create, Manage & <span class="text-primary">Monetize</span> Events.
		</h1>

		<p class="mx-auto max-w-2xl text-lg text-accent sm:text-xl">
			A multi-service platform in Addis Ababa integrating event management, premium venue providing,
			and sales-driven brand partnerships.
		</p>

		<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
			<Button size="lg" href="/quote" class="gap-2">
				Request a Quote
				<ArrowRightIcon class="size-4" />
			</Button>
			<Button href="/services" size="lg" class="text-primary dark:text-white" variant="outline"
				>Our Services</Button
			>
		</div>

		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
		>
			<p class="text-sm text-muted-foreground">Join our community</p>
			<div class="grid grid-cols-4 gap-3">
				{#each socialLinks as social}
					<a
						href={social.url}
						class="flex flex-col items-center gap-2 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary/5 {social.color}"
					>
						<social.icon class="h-6 w-6" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="relative">
				<div class="aspect-square overflow-hidden rounded-2xl border border-border">
					<img src="/event (2).webp" alt="Yebehir Events" class="h-full w-full object-cover" />
				</div>
				<div
					class="absolute -right-2 -bottom-6 max-w-xs rounded-xl bg-primary p-6 text-primary-foreground shadow-xl lg:-right-6"
				>
					<p class="text-sm font-semibold tracking-tight uppercase">
						Redefining the event landscape in Addis Ababa
					</p>
				</div>
			</div>

			<div class="space-y-6">
				<div>
					<h2 class="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Our Identity</h2>
					<p class="mb-4 text-lg leading-relaxed text-muted-foreground">
						Yebehir Ventures is not just an event company. We are a unique hybrid that combines
						world-class management with venue operations and sponsorship tools.
					</p>
					<p class="text-lg leading-relaxed text-muted-foreground">
						Our mission is to create experiences that don't just entertain—they generate qualified
						leads, attract brand partnerships, and provide high-energy lifestyle moments.
					</p>
				</div>

				<Card class="border-primary/20 bg-primary/5 shadow-none">
					<CardHeader>
						<CardTitle class="flex items-center gap-2 text-lg">
							<BadgeCheckIcon class="size-5 text-primary" />
							The Yebehir Edge
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-muted-foreground italic">
							"We don't just organize events—we create experiences, generate revenue opportunities,
							and connect brands with audiences."
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</section>

<section class="bg-muted/30 px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Our Core Pillars</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Integrating three vital components of the event economy
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<Card class="border-border transition-all duration-300 hover:border-primary/50">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
						<CalendarHeartIcon class="size-6" />
					</div>
					<CardTitle>Management</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">
						Cinematic management for corporate, brand, and private functions with end-to-end
						execution.
					</p>
				</CardContent>
			</Card>

			<Card class="border-border transition-all duration-300 hover:border-primary/50">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
						<MapPinIcon class="size-6" />
					</div>
					<CardTitle>Venue</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">
						Operating 4 Kilo Plaza—a premium, central venue designed for flexibility and impact.
					</p>
				</CardContent>
			</Card>

			<Card class="border-border transition-all duration-300 hover:border-primary/50">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
						<TrendingUpIcon class="size-6" />
					</div>
					<CardTitle>Monetization</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">
						Acting as a sales tool to drive sponsorship and event-based marketing for our partners.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<section
	class="relative bg-cover bg-center px-4 py-20 sm:py-32"
	style="background-image: url('/event (3).webp')"
>
	<div class="absolute inset-0 bg-primary/60"></div>
	<div class="relative z-10 mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2
				class="mb-4 text-3xl font-bold tracking-tighter text-primary-foreground uppercase sm:text-4xl"
			>
				Service Ecosystem
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-primary-foreground/80">
				Comprehensive solutions tailored for high-impact results
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<Card class="border-white/20 bg-background/10 text-primary-foreground backdrop-blur-md">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-white/20 p-3">
						<UsersIcon class="size-6" />
					</div>
					<CardTitle>Target Audience</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-primary-foreground/80">We deliver value to:</p>
					<ul class="flex flex-col gap-2 text-sm">
						<li class="flex gap-2"><span>•</span> Corporate Clients (Banks, Telecom, FMCG)</li>
						<li class="flex gap-2"><span>•</span> Brands & Sponsors seeking engagement</li>
						<li class="flex gap-2"><span>•</span> Event Organizers and SMEs</li>
						<li class="flex gap-2"><span>•</span> The energetic youth audience of Addis</li>
					</ul>
				</CardContent>
			</Card>

			<Card class="border-white/20 bg-background/10 text-primary-foreground backdrop-blur-md">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-white/20 p-3">
						<CoffeeIcon class="size-6" />
					</div>
					<CardTitle>Event Add-ons</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-primary-foreground/80">Premium essentials including:</p>
					<ul class="flex flex-col gap-2 text-sm">
						<li class="flex gap-2"><span>•</span> Professional Catering Services</li>
						<li class="flex gap-2"><span>•</span> Coffee & Beverage Stations</li>
						<li class="flex gap-2"><span>•</span> Sponsorship Acquisition Support</li>
						<li class="flex gap-2"><span>•</span> Visual Media & Content Production</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

{#if data?.servicesItems.length}
	<ServiceGrid services={data.servicesItems} />
	<br />
{/if}

<section class="mx-auto max-w-7xl px-6 py-24 md:py-32">
	<div class="mb-16 md:mb-20">
		<h3
			class="mt-4 text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl lg:text-6xl"
		>
			Business <span class="text-primary dark:text-accent">Units</span>
		</h3>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each units as unit (unit.short)}
			<div
				class="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30"
			>
				<div
					class="absolute inset-x-0 top-0 h-1 bg-accent opacity-0 transition group-hover:opacity-100"
				></div>

				<div class="flex items-center justify-between">
					<div class="flex size-14 items-center justify-center rounded-full bg-primary text-accent">
						<unit.icon class="size-7" />
					</div>
					<span class="text-xs font-bold tracking-widest text-muted-foreground uppercase"
						>{unit.short}</span
					>
				</div>

				<div class="grow space-y-2">
					<p class="text-2xl font-bold tracking-tight text-foreground">{unit.name}</p>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{unit.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

{#if data?.imagesList?.length > 0}
	<Slider imagesList={data?.imagesList} />
{/if}

{#if data?.testimonialList.length > 0}
	<main class="flex flex-col items-center justify-center px-4 py-12 md:py-20">
		<!-- Section Header -->
		<div class="mb-12 max-w-2xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">What Our Customers Say</h2>
			<p class="text-lg text-muted-foreground">
				Don't just take our word for it. Here's what people are saying about their experience.
			</p>
		</div>

		<!-- Testimonial Carousel -->
		<Testimonial testimonials={data.testimonialList} />
	</main>
{/if}

<FAQ />

<section
	class="relative bg-muted bg-cover bg-center px-4 py-20 sm:py-32"
	style="background-image: url('/event (4).webp')"
>
	<div class="absolute inset-0 bg-primary/60"></div>
	<div class="relative z-10 mx-auto max-w-4xl">
		<div
			class="space-y-8 rounded-2xl border border-border p-8 text-center shadow-2xl supports-backdrop-filter:bg-background/80 sm:p-12"
		>
			<div class="flex flex-col gap-4">
				<h2 class="text-3xl font-bold text-foreground sm:text-4xl">Plan Your Event With Us</h2>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					Experience the unique combination of premium management and strategic monetization.
				</p>
			</div>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/quote" size="lg" class="gap-2">
					Get Your Quote
					<ArrowRightIcon class="size-4" />
				</Button>
				<Button href="tel:+251911000000" size="lg" variant="outline">
					<PhoneIcon class="size-4" />
					Contact Sales
				</Button>
			</div>

			<div class="border-t border-border pt-4">
				<p class="text-sm text-muted-foreground">
					Notification emails and quote tracking handled via contact@yebehir.com
				</p>
			</div>
		</div>
	</div>
</section>
