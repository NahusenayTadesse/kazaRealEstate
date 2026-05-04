<script>
	import Hero from '$lib/components/hero.svelte';
	import About from '$lib/components/about.svelte';
	import Faq from '$lib/components/faq.svelte';
	import ServiceGrid from '$lib/components/services/service-grid.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import PortfolioCard from '$lib/components/portfolio/portfolio-card.svelte';
	import BlogCard from '$lib/components/blogs/portfolio-card.svelte';

	import Testimonial from '$lib/components/testimonial.svelte';
	import Slider from '$lib/components/slider.svelte';
	import Venues from '$lib/components/venues.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Yebehir Ventures | Event Management & 4 Kilo Plaza Venue Addis Ababa</title>
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

<Hero />
<About />
{#if data?.portfolioItems.length}
	<section class="w-full space-y-8 py-12">
		<!-- Section Header -->
		<div class="flex flex-col items-center space-y-2 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-foreground">Featured Events</h2>
			<p class="max-w-150 text-muted-foreground">
				A curated look at our most recent celebrations, corporate gatherings, and milestones.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative px-12">
			<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
				<Carousel.Content class="-ml-4">
					{#each data.portfolioItems as item (item.id)}
						<Carousel.Item class="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
							<div class="h-full transition-all hover:scale-[1.01]">
								<PortfolioCard property={item} />
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				<!-- Styled Navigation -->
				<Carousel.Previous
					class="hidden border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:flex"
				/>
				<Carousel.Next
					class="hidden border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:flex"
				/>
			</Carousel.Root>
		</div>
	</section>
{/if}

{#if data?.blogItems.length}
	<section class="w-full space-y-8 py-12">
		<!-- Section Header -->
		<div class="flex flex-col items-center space-y-2 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-foreground">Blogs</h2>
			<p class="max-w-150 text-muted-foreground">
				Dive into our latest articles, industry deep-dives, and behind-the-scenes looks at how we
				bring vision to life.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative px-12">
			<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
				<Carousel.Content class="-ml-4">
					{#each data.blogItems as item (item.id)}
						<Carousel.Item class="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
							<div class="h-full transition-all hover:scale-[1.01]">
								<BlogCard {item} />
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				<!-- Styled Navigation -->
				<Carousel.Previous
					class="hidden border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:flex"
				/>
				<Carousel.Next
					class="hidden border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:flex"
				/>
			</Carousel.Root>
		</div>
	</section>
{/if}

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
