<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { MailIcon, Send, PhoneIcon, MapPinIcon, MessageCircleIcon, MapPin } from '@lucide/svelte';
	let email = $state('');

	const handleNewsletterSubmit = (e: Event) => {
		e.preventDefault();
		console.log('Newsletter signup:', email);
		email = '';
	};

	import { IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok } from '@tabler/icons-svelte';

	const socialLinks = [
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/yebehir',
			icon: IconBrandInstagram,
			color: 'hover:text-pink-500'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@yebehir',
			icon: IconBrandTiktok,
			color: 'hover:text-black dark:hover:text-white'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/yebehir-marketing/',
			icon: IconBrandLinkedin,
			color: 'hover:text-blue-400'
		}
	];

	const menuItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About Us', href: '/about-us' },

		{ label: 'Services', href: '/services' },
		{ label: 'Events', href: '/events' },

		{ label: 'Contact', href: '/contact' }
	];
</script>

<footer class="border-t bg-card/10 text-card-foreground">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Newsletter Section -->

		<!-- Footer Links Grid -->
		<div
			class="align-center mb-8 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3"
		>
			<!-- Company Info -->
			<div>
				<img src="/logoDark.webp" class="block w-30 dark:hidden" alt="Yebehir Logo" />
				<img src="/logo.webp" class="hidden w-18 dark:block" alt="Yebehir Logo" />
				<h4 class="mb-4 font-semibold">Yebhir Ventures</h4>

				<div class="flex flex-col gap-2 text-sm">
					<a
						href="https://maps.app.goo.gl/KMrgwGNNbsE2SAeV7"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-foreground/70"
					>
						<MapPinIcon class="size-4 shrink-0" />
						<span>Yohannes Guest House, Hayahulet, Addis Ababa</span>
					</a>
					<a
						href="tel:+251930109760"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-foreground/70"
					>
						<PhoneIcon class="size-4 shrink-0" />
						<span>+251930109760</span>
					</a>
					<a
						href="tel:+251930109760"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-foreground/70"
					>
						<PhoneIcon class="size-4 shrink-0" />
						<span>+251930109760</span>
					</a>
					<a
						href="mailto:contact@yebehir.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-foreground/70"
					>
						<MailIcon class="size-4 shrink-0" />
						<span>contact@yebehir.com</span>
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="lg:w-lg">
				<h4 class="mb-4 font-semibold">Quick Links</h4>
				<ul class="flex flex-col gap-2 text-sm">
					{#each menuItems as item (item.href)}
						<li>
							<a href={item.href} class="text-foreground/70 transition-colors hover:text-foreground"
								>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Customer Service -->
			<div>
				<h4 class="mb-4 flex gap-2 font-semibold"><MapPin /> Location</h4>
				<section class="relative h-32 w-full">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5823625085322!2d38.779322850608956!3d9.010520800748324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8592f498d563%3A0x97f1598563cbd7aa!2sYebehir%20Marketing!5e0!3m2!1sen!2set!4v1777583510761!5m2!1sen!2set"
						style="border:0;"
						class="w-full rounded-3xl"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Map"
					></iframe>
				</section>
			</div>

			<!-- Legal -->
			<!-- <div>
				<h4 class="mb-4 font-semibold">Legal</h4>
				<ul class="flex flex-col gap-2 text-sm">
					<li>
						<a href="#" class="text-foreground/70 transition-colors hover:text-foreground"
							>Privacy Policy</a
						>
					</li>
					<li>
						<a href="#" class="text-foreground/70 transition-colors hover:text-foreground"
							>Terms of Service</a
						>
					</li>
					<li>
						<a href="#" class="text-foreground/70 transition-colors hover:text-foreground"
							>Cookie Policy</a
						>
					</li>
					<li>
						<a href="#" class="text-foreground/70 transition-colors hover:text-foreground"
							>Accessibility</a
						>
					</li>
				</ul>
			</div>
		</div> -->

			<!-- Social Links -->
			<div class="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
				<p class="text-sm text-foreground/70">Follow us on social media</p>
				<div class="grid grid-cols-4 gap-3">
					{#each socialLinks as social (social.name)}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class={[
								'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary hover:shadow-lg',
								social.color
							]}
							title={social.name}
						>
							<social.icon class="h-6 w-6" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Copyright -->
		</div>
	</div>

	<div class="-mt-24 justify-self-center border-t pt-8 text-center text-sm text-foreground/70">
		<p class="">
			&copy; {new Date().getFullYear()} Yebehir Marketing. All rights reserved.
		</p>
		<p class="text-center text-[8px] text-foreground/60">
			Powered by <a
				href="https://nahusenaytadesse.vercel.app"
				target="_blank"
				rel="noopener noreferrer">NT</a
			>
		</p>
	</div>
</footer>
