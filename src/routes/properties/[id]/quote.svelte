<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { EmailSchema as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Send, Reply, ArrowRight } from '@lucide/svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let {
		data,
		id,
		title
	}: {
		data: SuperValidated<Infer<schema>>;
		id: number;
		title: string;
	} = $props();

	const { form, enhance, errors, delayed, message, allErrors } = superForm(data, {});
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});
	$form.id = id;
</script>

<!-- <SuperDebug data={form} /> -->

<DialogComp
	variant="default"
	title="Inquiry Now"
	description="Inquire for {title}"
	IconComp={Send}
	class="p-3"
>
	<form
		method="post"
		id="reply"
		class="-mt-4 flex h-full flex-col items-start justify-start"
		action="?/quote"
		use:enhance
	>
		<Errors allErrors={$allErrors} />
		<input type="hidden" name="id" bind:value={$form.id} />
		<InputComp {form} {errors} name="name" label="Name" type="text" placeholder="Enter your name" />
		<InputComp
			{form}
			{errors}
			name="phone"
			label="Phone"
			type="tel"
			placeholder="Enter your phone"
		/>
		<InputComp
			{form}
			{errors}
			name="email"
			label="Email"
			type="email"
			placeholder="Enter your email"
		/>

		<InputComp
			{form}
			{errors}
			name="emailMessage"
			label="Message"
			type="textarea"
			placeholder="Enter the message"
		/>

		<input type="hidden" name="id" bind:value={$form.id} />
		<Button type="submit" class="mt-4 w-full" form="reply">
			{#if $delayed}
				<LoadingBtn name="Sending Inquiry" />
			{:else}
				<Send /> Send Property Inquiry
			{/if}
		</Button>
	</form>
</DialogComp>
