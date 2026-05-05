<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import {
		BuildingIcon,
		AwardIcon,
		MapPin,
		Heart,
		Shield,
		ArrowRightIcon,
		Phone,
		Mail
	} from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';

	import {
		ShieldCheckIcon,
		HeartIcon,
		MapPinIcon,
		GemIcon,
		SparklesIcon,
		HandshakeIcon
	} from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import Slider from '$lib/components/slider.svelte';
	import Faq from '$lib/components/faq.svelte';

	const stats = [
		{
			value: '100+',
			label: 'Properties Sold',
			description: 'Premium homes delivered to satisfied families'
		},
		{
			value: '12+',
			label: 'Years Experience',
			description: 'Trusted expertise in Addis Ababa real estate'
		},
		{
			value: '2.5B+',
			label: 'ETB in Sales',
			description: 'Total property value transacted'
		},
		{
			value: '98%',
			label: 'Client Satisfaction',
			description: 'Clients who recommend our services'
		}
	];

	const coreValues = [
		{
			title: 'Integrity First',
			description:
				'We believe in complete transparency. Every property listing, every price, every detail is presented honestly to help you make informed decisions.',
			icon: Shield
		},
		{
			title: 'Client-Centric',
			description:
				'Your dream home is our mission. We listen, understand, and work tirelessly to match you with properties that fit your lifestyle and aspirations.',
			icon: Heart
		},
		{
			title: 'Local Expertise',
			description:
				'Born and raised in Addis Ababa, we know every neighborhood, every emerging area, and every hidden gem the city has to offer.',
			icon: MapPin
		},
		{
			title: 'Premium Quality',
			description:
				'We curate only the finest properties. Each listing undergoes rigorous verification to ensure it meets our high standards.',
			icon: GemIcon
		},
		{
			title: 'Innovation',
			description:
				'From virtual tours to digital contracts, we leverage technology to make your property journey seamless and modern.',
			icon: SparklesIcon
		},
		{
			title: 'Long-term Partnership',
			description:
				"Our relationship doesn't end at closing. We're your lifelong real estate partners for all future property needs.",
			icon: HandshakeIcon
		}
	];

	let { data } = $props();
</script>

<svelte:head>
	<title>About Us | Luxury Apartments & Villas in Addis Ababa</title>
	<meta
		name="description"
		content="Kaza Real Estate and Trading PLC offers premium property sales and rentals in Addis Ababa. Specialized services for Diaspora and local investors in Bole, CMC, and beyond."
	/>
	<meta
		name="keywords"
		content="Real Estate Ethiopia, Apartments for sale Addis Ababa, Kaza Real Estate, Diaspora housing Ethiopia, Luxury villas Addis"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kazarealestateet.com/" />
	<meta property="og:title" content="Kaza Real Estate | Modern & Professional Property Solutions" />
	<meta
		property="og:description"
		content="Discover your dream home in Addis Ababa with Kaza. Modern apartments and villas with 24/7 security and premium amenities."
	/>
	<meta property="og:image" content="/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Kaza Real Estate | Luxury Properties in Addis Ababa" />
	<meta
		property="twitter:description"
		content="Specializing in high-end residential and commercial properties for local and Diaspora clients."
	/>
	<meta property="twitter:image" content="/logo.png" />
</svelte:head>

<section
	class="relative overflow-hidden bg-linear-to-br from-secondary via-secondary/80 to-background py-20 lg:py-32"
>
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="absolute inset-0"
			style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
		></div>
	</div>

	<div class="relative container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<div in:fade={{ duration: 600 }} class="mb-6 flex items-center justify-center gap-2">
				<Badge variant="outline" class="border-primary/30 bg-primary/10 px-4 py-1.5 text-primary">
					<AwardIcon class="mr-2 size-4" />
					Established 2012
				</Badge>
			</div>

			<h1
				in:fly={{ y: 30, duration: 700, delay: 100 }}
				class="mb-6 text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl lg:text-6xl"
			>
				Building Dreams,
				<br />
				<span class="text-primary">One Home at a Time</span>
			</h1>

			<p
				in:fly={{ y: 30, duration: 700, delay: 200 }}
				class="mx-auto mb-8 max-w-2xl text-lg text-secondary-foreground/80 sm:text-xl"
			>
				Kaza Real Estate has been at the forefront of Addis Ababa's property market for over a
				decade. We don't just sell properties—we help families find their perfect homes and
				investors discover opportunities that build lasting wealth.
			</p>

			<div
				in:fly={{ y: 30, duration: 700, delay: 300 }}
				class="flex items-center justify-center gap-4"
			>
				<div class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
					<BuildingIcon class="size-5 text-primary" />
					<span class="text-sm font-medium text-secondary-foreground">Premium Properties</span>
				</div>
				<div class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
					<AwardIcon class="size-5 text-primary" />
					<span class="text-sm font-medium text-secondary-foreground">Award Winning Service</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div class="absolute -bottom-24 -left-24 size-48 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute -top-24 -right-24 size-48 rounded-full bg-primary/10 blur-3xl"></div>
</section>

<section class="bg-background py-16 lg:py-24">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				Our Track Record Speaks
			</h2>
			<p class="mx-auto max-w-2xl text-muted-foreground">
				Numbers that reflect our commitment to excellence and the trust our clients place in us.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each stats as stat, index (stat.value)}
				<div in:fly={{ y: 40, duration: 600, delay: index * 100 }}>
					<Card
						class="group hover:shadow-lg-xl hover:shadow-lg-primary/5 relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-muted/50 to-muted p-6 text-center transition-all duration-300 hover:border-primary/20"
					>
						<div
							class="absolute -top-8 -right-8 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
						></div>
						<div class="relative">
							<p class="mb-2 text-4xl font-bold text-primary lg:text-5xl">{stat.value}</p>
							<p class="mb-1 text-lg font-semibold text-foreground">{stat.label}</p>
							<p class="text-sm text-muted-foreground">{stat.description}</p>
						</div>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-background py-16 lg:py-24">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<Badge class="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Our Values</Badge>
			<h2 class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				What Sets Us Apart
			</h2>
			<p class="mx-auto max-w-2xl text-muted-foreground">
				Our core values guide every interaction, every transaction, and every relationship we build.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each coreValues as value, index (value.title)}
				<div in:fly={{ y: 40, duration: 600, delay: index * 100 }}>
					<Card
						class="group hover:shadow-lg-xl hover:shadow-lg-primary/5 h-full border-2 border-transparent transition-all duration-300 hover:border-primary/20"
					>
						<CardHeader>
							<div
								class="mb-4 flex size-14 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 transition-transform duration-300 group-hover:scale-110"
							>
								<value.icon class="size-7 text-primary" />
							</div>
							<CardTitle class="text-xl">{value.title}</CardTitle>
							<CardDescription class="text-base leading-relaxed">
								{value.description}
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			{/each}
		</div>
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
<Faq />

<section class="bg-linear-to-br from-secondary via-secondary to-secondary/90 py-16 lg:py-24">
	<div class="container mx-auto px-4">
		<div in:fly={{ y: 40, duration: 700 }}>
			<Card
				class="shadow-lg-2xl relative overflow-hidden border-0 bg-background/95 p-8 backdrop-blur-sm lg:p-12"
			>
				<!-- Background Decoration -->
				<div class="absolute -top-20 -right-20 size-40 rounded-full bg-primary/10 blur-3xl"></div>
				<div class="absolute -bottom-20 -left-20 size-40 rounded-full bg-primary/10 blur-3xl"></div>

				<div class="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
					<!-- Content -->
					<div>
						<h2 class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Ready to Find Your <span class="text-primary">Dream Property?</span>
						</h2>
						<p class="mb-6 text-lg text-muted-foreground">
							Whether you're looking to buy your first home, invest in real estate, or find the
							perfect rental, our team is here to guide you every step of the way.
						</p>
						<div class="flex flex-wrap gap-4">
							<Button href="/contact-us" size="lg" class="gap-2">
								Schedule a Consultation
								<ArrowRightIcon class="size-4" />
							</Button>
							<Button href="/properties" size="lg" variant="outline">Browse Properties</Button>
						</div>
					</div>

					<!-- Contact Info -->
					<div class="flex flex-col gap-4 lg:pl-8">
						<div
							class="flex items-start gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
						>
							<div
								class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
							>
								<Phone class="size-5 text-primary" />
							</div>
							<a href="tel:+251911216413" class="flex flex-col gap-1">
								<p class="font-semibold text-foreground">Call Us</p>
								<p class="text-muted-foreground">+251 911 21 64 13</p>
								<p class="text-sm text-muted-foreground">Mon-Sat, 9AM-6PM</p>
							</a>
						</div>

						<div
							class="flex items-start gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
						>
							<div
								class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
							>
								<Mail class="size-5 text-primary" />
							</div>
							<a href="mailto:info@kazarealestateeet.com" class="flex flex-col gap-1">
								<p class="font-semibold text-foreground">Email Us</p>
								<p class="text-muted-foreground">info@kazarealestateeet.com</p>
								<p class="text-sm text-muted-foreground">We respond within 24 hours</p>
							</a>
						</div>
					</div>

					<div
						class="flex items-start gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
					>
						<div
							class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
						>
							<MapPinIcon class="size-5 text-primary" />
						</div>
						<div>
							<p class="font-semibold text-foreground">Visit Us</p>
							<p class="text-muted-foreground">CMC Road, Addis Ababa</p>
							<p class="text-sm text-muted-foreground">Near St. Gabriel Church</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</section>
