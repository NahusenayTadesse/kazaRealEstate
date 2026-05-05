<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { MailIcon, SendIcon, PhoneIcon, MessageSquareIcon, MapPinIcon } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { IconBrandInstagram, IconBrandTiktok, IconBrandLinkedin } from '@tabler/icons-svelte';

	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	// Social links - Updated for Kaza Branding
	const socialLinks = [
		{
			icon: IconBrandInstagram,
			name: 'Instagram',
			url: 'https://www.instagram.com/kazarealestate/'
		},
		{
			icon: IconBrandTiktok,
			name: 'TikTok',
			url: 'https://www.tiktok.com/@kazarealestate'
		},
		{
			icon: IconBrandLinkedin,
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/kazarealestate/'
		}
	];

	// Contact info - Updated with WhatsApp and Addis Location
	const contactInfo = [
		{
			icon: MailIcon,
			label: 'Email Us',
			value: 'contact@kazarealestateet.com',
			href: 'mailto:contact@kazarealestateet.com'
		},
		{
			icon: MessageSquareIcon,
			label: 'WhatsApp',
			value: '+251 911 216 413',
			href: 'https://wa.me/251911216413'
		},
		{
			icon: PhoneIcon,
			label: 'Call Directly',
			value: '+251 911 216 413',
			href: 'tel:+251911216413'
		},
		{
			icon: MapPinIcon,
			label: 'Visit Us',
			value: 'Addis Ababa, Ethiopia',
			href: '#'
		}
	];

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else {
				toast.success($message.text);
			}
		}
	});
</script>

<svelte:head>
	<title>Contact Kaza Real Estate | Luxury Properties in Addis Ababa</title>
	<meta
		name="description"
		content="Inquire about luxury apartments, villas, and commercial properties in Addis Ababa. Specialized services for Diaspora and local investors."
	/>
	<meta
		name="keywords"
		content="Kaza Real Estate, Addis Ababa properties, Diaspora real estate Ethiopia, Bole apartments, villas for sale Addis"
	/>
	<meta property="og:url" content="https://kazarealestateet.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Contact Kaza Real Estate | Modern & Professional" />
	<meta
		property="og:description"
		content="Ready to find your next property? Contact Kaza Real Estate for expert guidance in the Ethiopian market."
	/>
	<meta property="og:image" content="/logo.png" />
	<meta property="twitter:image" content="/logo.png" />
</svelte:head>

<div class="min-h-dvh w-full bg-background text-foreground transition-colors">
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-primary sm:text-5xl">Get in Touch</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Whether you are looking to buy, rent, or invest, our team is here to guide you through the
				Addis Ababa property market.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Card class="border-2 shadow-sm">
					<CardHeader>
						<CardTitle>Property Inquiry Form</CardTitle>
						<CardDescription>
							Fill out the form below and one of our agents will get back to you within 24 hours.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form class="space-y-6" action="?/contact" method="POST" use:enhance>
							<div class="grid gap-6 sm:grid-cols-2">
								<InputComp
									{form}
									{errors}
									type="text"
									name="name"
									label="Full Name"
									placeholder="Abebe Kebede"
								/>
								<InputComp
									type="email"
									{form}
									{errors}
									name="email"
									label="Email Address"
									placeholder="your@email.com"
								/>
							</div>

							<div class="grid gap-6 sm:grid-cols-2">
								<InputComp
									type="tel"
									{form}
									{errors}
									name="phoneNumber"
									label="Phone Number"
									placeholder="+251 911 216 413"
								/>
								<InputComp
									{form}
									{errors}
									type="text"
									name="subject"
									label="Interested In"
									placeholder="e.g., 3 Bedroom Apartment in Bole"
								/>
							</div>

							<InputComp
								{form}
								{errors}
								type="textarea"
								name="contactMessage"
								label="How can we help?"
								placeholder="Tell us about your property requirements..."
							/>

							<Button type="submit" class="w-full gap-2 py-6 text-lg font-bold">
								{#if $delayed}
									<LoadingBtn name="Sending Inquiry..." />
								{:else}
									<SendIcon class="h-5 w-5" />
									Send Inquiry
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Contact Info & Social -->
			<div class="space-y-6">
				<!-- Direct Contact -->
				<Card class="border-2 border-primary/20 bg-primary/5">
					<CardHeader>
						<CardTitle class="text-lg">Quick Contact</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						{#each contactInfo as info}
							<a
								href={info.href}
								class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-background"
							>
								<div
									class="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
								>
									<info.icon class="h-4 w-4" />
								</div>
								<div class="flex-1">
									<p class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
										{info.label}
									</p>
									<p class="text-sm font-semibold">{info.value}</p>
								</div>
							</a>
						{/each}
					</CardContent>
				</Card>

				<!-- Social Media -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Connect With Us</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-3 gap-3">
							{#each socialLinks as social}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-primary hover:text-primary"
									title={social.name}
								>
									<social.icon class="h-5 w-5" />
									<span class="text-[10px] font-bold uppercase">{social.name}</span>
								</a>
							{/each}
						</div>
					</CardContent>
				</Card>

				<!-- Hours -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Office Hours</CardTitle>
					</CardHeader>
					<CardContent class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-muted-foreground">Mon - Fri</span>
							<span class="font-semibold">8:30 AM - 5:30 PM</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Saturday</span>
							<span class="font-semibold">8:30 AM - 12:30 PM</span>
						</div>
						<p class="mt-4 text-xs text-muted-foreground italic">
							* Available via WhatsApp for urgent inquiries on Sundays.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>
