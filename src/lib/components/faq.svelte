<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import { MapPin, House, Globe, Phone, ShieldCheck, Banknote } from '@lucide/svelte';

	const features = [
		{
			id: 'property-types',
			title: 'What types of properties do you list?',
			description:
				'We specialize in modern residential and commercial properties across Addis Ababa, including luxury apartments, villas, and prime land listings for sale and rent.',
			icon: House
		},
		{
			id: 'service-locations',
			title: 'Which areas of Addis Ababa do you cover?',
			description:
				'Our core operations are centered in premium neighborhoods such as Bole, Kazanchis, Sarbet, Piassa, and CMC.',
			icon: MapPin
		},
		{
			id: 'diaspora-services',
			title: 'Do you offer services for Diaspora clients?',
			description:
				'Yes, we provide specialized support for Diaspora clients, ensuring a professional and transparent process for property acquisition and investment from abroad.',
			icon: Globe
		},
		{
			id: 'viewing-contact',
			title: 'How can I schedule a property viewing?',
			description:
				'You can call us directly, send a message via WhatsApp, or fill out the inquiry form on the property listing page to arrange a visit[cite: 1].',
			icon: Phone
		},
		{
			id: 'amenities-standards',
			title: 'What features come standard with your listings?',
			description:
				'Most of our modern apartments and villas include essential amenities such as 24/7 security, dedicated parking, elevators, backup generators, and water tanks[cite: 1].',
			icon: ShieldCheck
		},
		{
			id: 'currency-payments',
			title: 'Which currencies do you accept for transactions?',
			description:
				'While our primary pricing is listed in Ethiopian Birr (ETB), we can facilitate discussions regarding various payment structures depending on the specific property and client requirements[cite: 1].',
			icon: Banknote
		}
	];
</script>

<div
	class="min-h-dvh bg-linear-to-br from-primary/5 via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="mx-auto w-full">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold text-foreground sm:text-5xl">FAQ</h1>
			<p class="text-lg text-muted-foreground">Frequently asked questions about our services.</p>
		</div>

		<!-- Accordion -->
		<Accordion
			type="single"
			collapsible
			class="grid w-9/10 grid-cols-1 items-center gap-3 space-y-3 justify-self-center lg:grid-cols-2"
		>
			{#each features as feature (feature.id)}
				<AccordionItem
					value={feature.id}
					class="hover:shadow-lg-md transition-shadow-lg overflow-hidden rounded-lg border border-border shadow-lg duration-200"
				>
					<AccordionTrigger
						class="px-6 py-4 transition-colors duration-200 hover:bg-accent/5 data-[state=open]:bg-primary/5"
					>
						<div class="flex items-center gap-4 text-left">
							<div class="shrink-0 rounded-lg bg-primary p-2">
								<feature.icon class="size-5 text-accent" />
							</div>
							<h3 class="text-lg font-semibold text-foreground">{feature.title}</h3>
						</div>
					</AccordionTrigger>
					<AccordionContent class="border-t border-border bg-card/50 px-6 py-4">
						<p class="leading-relaxed text-muted-foreground">{feature.description}</p>
					</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</div>
