<script lang="ts">
	import { onMount } from 'svelte';
	import { ShieldCheckIcon, UsersIcon, BuildingIcon } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const pillars = [
		{
			icon: ShieldCheckIcon,
			title: 'Trusted',
			desc: 'Transparent dealings and honest guidance at every step of the process.',
			accent: '#D4AF5A'
		},
		{
			icon: UsersIcon,
			title: 'Client-First',
			desc: 'Serving families, businesses, and diaspora investors with equal dedication.',
			accent: '#8BA7CC'
		},
		{
			icon: BuildingIcon,
			title: 'Local Expertise',
			desc: "Deep knowledge of Addis Ababa's prime neighbourhoods since 2017.",
			accent: '#A8C5A0'
		}
	];

	let section: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.15 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<section bind:this={section} class="about relative overflow-hidden bg-background py-28 lg:py-36">
	<!-- Subtle orb -->
	<div class="about-orb" aria-hidden="true"></div>
	<!-- Noise -->
	<div class="noise" aria-hidden="true"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
		<div class="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
			<!-- LEFT: text -->
			<div class="flex flex-col gap-8 lg:col-span-5">
				{#if visible}
					<div in:fly={{ y: 30, duration: 700, delay: 0, easing: cubicOut }}>
						<div class="eyebrow-tag mb-6 inline-flex items-center gap-3 rounded-full px-5 py-2">
							<span class="pulse-dot"></span>
							<span
								class="text-[11px] font-black tracking-[0.35em] text-[#D4AF5A] uppercase"
								style="font-family: 'DM Sans', sans-serif;"
							>
								Who We Are
							</span>
						</div>

						<h2
							class="leading-[0.9] tracking-tight text-foreground"
							style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900;"
						>
							Built on<br />
							<em class="text-[#D4AF5A] not-italic">Trust.</em>
						</h2>
					</div>

					<div in:fly={{ y: 30, duration: 700, delay: 150, easing: cubicOut }}>
						<div class="divider-line"></div>
						<p class="mt-6 text-lg leading-relaxed" style="font-family: 'DM Sans', sans-serif;">
							Kaza Real Estate and Trading PLC was founded with a single conviction — that finding
							the right property should feel empowering, not overwhelming. Based in Addis Ababa, we
							specialize in residential apartment sales across the city's most sought-after
							neighbourhoods.
						</p>
						<p class="mt-4 text-base leading-relaxed" style="font-family: 'DM Sans', sans-serif;">
							Whether you're a local family searching for your forever home, a business owner
							expanding your footprint, or a diaspora investor exploring opportunities from abroad —
							we're here to guide you with honesty and care.
						</p>
					</div>

					<div in:fly={{ y: 20, duration: 600, delay: 280, easing: cubicOut }}>
						<a
							href="/about"
							class="cta-ghost inline-flex items-center gap-3"
							style="font-family: 'DM Sans', sans-serif;"
						>
							<span>Our Full Story</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14M13 6l6 6-6 6" />
							</svg>
						</a>
					</div>
				{/if}
			</div>

			<!-- RIGHT: pillars -->
			<div class="flex flex-col gap-4 lg:col-span-7">
				{#if visible}
					{#each pillars as pillar, i (pillar.title)}
						<div in:fly={{ x: 40, duration: 650, delay: 100 + i * 130, easing: cubicOut }}>
							<div class="pillar-card" style="--accent: {pillar.accent};">
								<div
									class="pillar-icon-wrap"
									style="background: {pillar.accent}18; border-color: {pillar.accent}38;"
								>
									<pillar.icon class="size-5" style="color: {pillar.accent};" />
								</div>
								<div class="flex-1">
									<h3 class="mb-1 text-xl font-black">
										{pillar.title}
									</h3>
									<p
										class="text-sm leading-relaxed text-zinc-400"
										style="font-family: 'DM Sans', sans-serif;"
									>
										{pillar.desc}
									</p>
								</div>
								<div class="pillar-accent-bar" style="background: {pillar.accent};"></div>
							</div>
						</div>
					{/each}

					<!-- Stat strip -->
					<div
						class="stat-strip mt-2 grid grid-cols-3 divide-x"
						in:fade={{ duration: 600, delay: 550 }}
					>
						{#each [['100+', 'Properties'], ['8+', 'Years Active'], ['98%', 'Satisfaction']] as [val, lbl] (val)}
							<div class="flex flex-col items-center px-4 py-5">
								<span
									class="text-2xl leading-none font-black text-[#D4AF5A]"
									style="font-family: 'Cormorant Garamond', serif;">{val}</span
								>
								<span
									class="mt-1 text-[10px] tracking-widest text-zinc-500 uppercase"
									style="font-family: 'DM Sans', sans-serif;">{lbl}</span
								>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Orb ──────────────────────────────────── */
	.about-orb {
		position: absolute;
		width: 700px;
		height: 700px;
		top: -200px;
		right: -200px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(30, 60, 120, 0.18) 0%, transparent 65%);
		filter: blur(80px);
		pointer-events: none;
		z-index: 0;
	}

	/* ── Noise ────────────────────────────────── */
	.noise {
		position: absolute;
		inset: 0;
		z-index: 1;
		opacity: 0.03;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 200px 200px;
	}

	/* ── Eyebrow ──────────────────────────────── */
	.eyebrow-tag {
		background: rgba(212, 175, 90, 0.08);
		border: 1px solid rgba(212, 175, 90, 0.28);
		backdrop-filter: blur(8px);
	}
	.pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #d4af5a;
		box-shadow: 0 0 0 0 rgba(212, 175, 90, 0.6);
		animation: pulse 2s ease-out infinite;
		flex-shrink: 0;
	}
	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(212, 175, 90, 0.6);
		}
		70% {
			box-shadow: 0 0 0 8px rgba(212, 175, 90, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(212, 175, 90, 0);
		}
	}

	/* ── Divider line ─────────────────────────── */
	.divider-line {
		height: 1px;
		background: linear-gradient(90deg, #d4af5a 0%, rgba(139, 167, 204, 0.4) 50%, transparent 100%);
		width: 180px;
		animation: expandDivider 1s ease-out 0.4s both;
	}
	@keyframes expandDivider {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 180px;
			opacity: 1;
		}
	}

	/* ── Ghost CTA ────────────────────────────── */
	.cta-ghost {
		color: #d4af5a;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-decoration: none;
		border-bottom: 1px solid rgba(212, 175, 90, 0.35);
		padding-bottom: 3px;
		transition:
			border-color 0.2s ease,
			opacity 0.2s ease;
	}
	.cta-ghost:hover {
		border-color: #d4af5a;
		opacity: 0.85;
	}

	/* ── Pillar cards ─────────────────────────── */
	.pillar-card {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 20px 22px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-left: 3px solid var(--accent);
		backdrop-filter: blur(12px);
		overflow: hidden;
		transition:
			background 0.3s ease,
			transform 0.2s ease;
	}
	.pillar-card:hover {
		background: rgba(255, 255, 255, 0.055);
		transform: translateX(4px);
	}
	.pillar-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		border: 1px solid;
		flex-shrink: 0;
		margin-top: 2px;
	}
	.pillar-accent-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		opacity: 0;
		transform: scaleX(0);
		transform-origin: left;
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
	}
	.pillar-card:hover .pillar-accent-bar {
		transform: scaleX(1);
		opacity: 0.5;
	}

	/* ── Stat strip ───────────────────────────── */
	.stat-strip {
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.025);
		divide-color: rgba(255, 255, 255, 0.07);
		overflow: hidden;
	}
	/* Tailwind divide-x doesn't carry the color — override */
	.stat-strip > * + * {
		border-left: 1px solid rgba(255, 255, 255, 0.07);
	}
</style>
