<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	// import DialogComp from "$lib/formComponents/DialogComp.svelte";
	// import AddCustomer from "$lib/forms/AddCustomer.svelte";
	import { Plus, Sheet } from '@lucide/svelte';
	let { children } = $props();
</script>

<div class="mb-8 flex flex-row items-center justify-start gap-2">
	<Button
		href="/dashboard/properties"
		variant={page.url.pathname === '/dashboard/properties' ? 'default' : 'outline'}
		><Sheet /> Properties</Button
	>
	<Button
		href="/dashboard/properties/add-property"
		variant={page.url.pathname === '/dashboard/properties/add-property' ? 'default' : 'outline'}
		><Plus /> Add Property</Button
	>
	<Button
		href="/dashboard/properties/types"
		variant={page.url.pathname === '/dashboard/properties/types' ? 'default' : 'outline'}
		><Sheet /> Property Types</Button
	>

	<Button
		href="/dashboard/properties/ameneties"
		variant={page.url.pathname === '/dashboard/properties/ameneties' ? 'default' : 'outline'}
		><Sheet /> Ameneties
	</Button>
</div>

{@render children?.()}
