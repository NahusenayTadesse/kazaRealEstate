<script lang="ts">
	import { ArrowRight, MenuIcon, XIcon } from '@lucide/svelte';
	import DarkMode from './DarkMode.svelte';

	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';

	let isOpen = $state(false);

	const handleMenuClick = () => {
		isOpen = false;
	};
	import { page } from '$app/state';

	const menuItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About Us', href: '/about-us' },

		{ label: 'Services', href: '/services' },
		{ label: 'Events', href: '/events' },
		{ label: 'Blogs', href: '/blogs' },

		{ label: 'Contact', href: '/contact-us' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full bg-background px-2 py-2 backdrop-blur supports-backdrop-filter:bg-primary lg:px-24"
>
	<div class="flex items-center justify-between px-4 md:px-6">
		<!-- Logo/Title -->
		<div class="flex shrink-0 items-center gap-2">
			<a href="/" class="inline-block">
				<img
					src="/logo.webp"
					class="h-12 w-auto object-contain"
					alt="Yebehir"
					fetchpriority="high"
				/>
			</a>

			<!-- <span class="text-xl font-bold text-foreground">Lalo Bakery Solution</span> -->
		</div>

		<!-- Desktop Menu -->
		<nav class="hidden items-center gap-1 md:flex">
			{#each menuItems as item (item.href)}
				<Button
					variant={page.url.pathname === item.href ? 'default' : 'ghost'}
					size="sm"
					class="text-white {page.url.pathname === item.href ? 'bg-[#F2E1D1] text-[#091B38]' : ''}"
					href={item.href}
					onclick={handleMenuClick}
				>
					{item.label}
				</Button>
			{/each}
		</nav>
		<div class="flex flex-row gap-4">
			<div class="hidden flex-row items-center justify-end gap-2 lg:flex">
				<Button href="/quote" size="lg" variant="outline"
					>Get A Quote<ArrowRight class="size-4" /></Button
				>
				<DarkMode />
			</div>

			<!-- Mobile Menu -->
			<div class="md:hidden">
				<Sheet bind:open={isOpen}>
					<SheetTrigger>
						{#snippet child({ props: triggerProps })}
							<Button variant="default" size="icon" {...triggerProps}>
								{#if isOpen}
									<XIcon class="size-5" />
								{:else}
									<MenuIcon class="size-5" />
								{/if}
							</Button>
						{/snippet}
					</SheetTrigger>
					<SheetContent side="right" class="flex w-80 flex-col p-0">
						<nav class="flex flex-1 flex-col gap-1 p-4">
							{#each menuItems as item (item.href)}
								<Button
									variant="ghost"
									href={item.href}
									class="w-full justify-start gap-3 px-3 py-6 text-base font-medium transition-all active:scale-[0.98]"
									onclick={handleMenuClick}
								>
									{#if item.icon}
										<item.icon class="h-5 w-5 opacity-60" />
									{/if}
									{item.label}
								</Button>
							{/each}
						</nav>

						<div class="space-y-4 border-t bg-muted/10 p-4">
							<div class="flex items-center justify-between px-2">
								<span class="text-sm font-medium text-muted-foreground">Interface</span>

								<DarkMode />
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</div>
</header>
