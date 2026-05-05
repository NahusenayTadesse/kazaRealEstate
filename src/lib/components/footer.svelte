<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import {
		IconBrandFacebook,
		IconBrandInstagram,
		IconBrandLinkedin,
		IconBrandTelegram,
		IconBrandTwitter,
		IconBrandWhatsapp,
		IconBrandX
	} from '@tabler/icons-svelte';

	const footerLinks = {
		company: [
			{ label: 'Home', href: '/' },
			{ label: 'About Us', href: '/about' },
			{ label: 'Properties', href: '/properties' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Contact', href: '/contact' }
		],

		resources: [
			{ label: 'Blog', href: '/blog' },
			{ label: 'Market Reports', href: '#' },
			{ label: 'Buying Guide', href: '#' },
			{ label: 'FAQs', href: '/#faq' }
		]
	};
</script>

<a
	href="https://wa.me/251911216413"
	target="_blank"
	rel="noopener noreferrer"
	class="fixed right-6 bottom-8 z-50 flex items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:outline-none"
	aria-label="Chat with us on WhatsApp"
>
	<IconBrandWhatsapp class="size-8" />
</a>

<footer class="bg-secondary text-secondary-foreground">
	<div class="container mx-auto px-4 py-12 lg:py-16">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-2">
				<div class="mb-4 flex items-center gap-2">
					<a href="/">
						<img
							src="/logo.webp"
							loading="lazy"
							alt="Kaza Real Estate logo"
							class="h-16 w-auto object-contain"
						/>
					</a>
				</div>
				<p class="mb-6 max-w-sm text-sm text-secondary-foreground/80">
					Connecting you to modern homes, luxury apartments, and high-value investment properties
					across Addis Ababa since 2012.
				</p>
				<div class="flex gap-3">
					<a
						href="https://facebook.com/kazarealestateet.com"
						class="flex size-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<IconBrandFacebook class="size-5" />
					</a>
					<a
						href="https://instagram.com/kazarealestateet.com"
						class="flex size-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<IconBrandInstagram class="size-5" />
					</a>
					<a
						href="https://twitter.com/kazarealestateet.com"
						class="flex size-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<IconBrandX class="size-5" />
					</a>
					<a
						href="https://linkedin.com/kazarealestateet.com"
						class="flex size-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<IconBrandLinkedin class="size-5" />
					</a>

					<a
						href="https://t.me/kazarealestateet.com"
						class="flex size-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<IconBrandTelegram class="size-5" />
					</a>
				</div>
			</div>

			<!-- Links -->
			<div>
				<h4 class="mb-4 font-semibold">Company</h4>
				<ul class="flex flex-col gap-2">
					{#each footerLinks.company as link (link.label)}
						<li>
							<a
								href={link.href}
								class="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- <div>
				<h4 class="mb-4 font-semibold">Services</h4>
				<ul class="flex flex-col gap-2">
					{#each footerLinks.services as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div> -->

			<div>
				<h4 class="mb-4 font-semibold">Resources</h4>
				<ul class="flex flex-col gap-2">
					{#each footerLinks.resources as link (link.label)}
						<li>
							<a
								href={link.href}
								class="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<Separator class="my-8 bg-secondary-foreground/10" />

		<div
			class="flex flex-col items-center justify-between gap-4 text-sm text-secondary-foreground/60 sm:flex-row"
		>
			<p>© {new Date().getFullYear()} Kaza Real Estate. All rights reserved.</p>
		</div>
	</div>
</footer>
