<script lang="ts">
	import type { Snapshot } from '@sveltejs/kit';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';

	import { Plus, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { add as schema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import Errors from '$lib/formComponents/Errors.svelte';
	import FormCard from '$lib/formComponents/FormCard.svelte';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	let { data } = $props();

	const { form, errors, enhance, delayed, allErrors, capture, restore, message } = superForm(
		data.form,
		{
			taintedMessage: () => {
				return new Promise((resolve) => {
					resolve(window.confirm('Do you want to leave?\nChanges you made may not be saved.'));
				});
			},
			onChange(event) {
				if (event.paths.includes('title')) {
					$form.slug = $form.title?.toLowerCase().replace(/\s+/g, '-');
				}
			},
			validators: zod4Client(schema),
			dataType: 'json'
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	import { toast } from 'svelte-sonner';
	import VideoViewer from '$lib/components/Table/videoViewer.svelte';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	let images = $state([]);
</script>

<svelte:head>
	<title>Add New Venue Item</title>
</svelte:head>
<FormCard title="Add A Property" class="w-full!" description="Add New Property">
	<form
		use:enhance
		action="?/addProperty"
		id="main"
		class="flex flex-col gap-8"
		method="POST"
		enctype="multipart/form-data"
	>
		<Errors allErrors={$allErrors} />

		<!-- SECTION 1: BASIC INFORMATION -->
		<section class="flex flex-col gap-4">
			<div class="border-b pb-2">
				<h3 class="text-lg font-semibold">General Information</h3>
				<p class="text-sm text-muted-foreground">
					Start with the naming and a brief overview of the property.
				</p>
			</div>

			<InputComp
				{form}
				{errors}
				type="text"
				name="title"
				label="Property Title"
				placeholder="Enter Property Title "
				required
			/>

			<InputComp
				{form}
				{errors}
				type="select"
				name="propertyType"
				label="Property Type"
				placeholder="Enter Property Type"
				required
				items={data?.types}
			/>

			<InputComp
				{form}
				{errors}
				type="checkbox"
				name="amenities"
				label="Amenities"
				placeholder="Enter Amenities"
				required
				items={data?.amenity}
			/>

			<InputComp
				{form}
				{errors}
				type="number"
				name="price"
				label="Property Price"
				placeholder="Enter Property Price"
				required
			/>

			<InputComp
				{form}
				{errors}
				type="rich"
				name="shortSummary"
				label="Short Summary "
				placeholder="Enter Short Summary of Property"
				required
			/>

			<InputComp
				{form}
				{errors}
				type="rich"
				name="description"
				label="Property Description"
				placeholder="Enter Property Description"
				required
			/>
		</section>

		<!-- SECTION 2: LOCATION -->
		<section class="flex flex-col gap-4">
			<div class="border-b pb-2">
				<h3 class="text-lg font-semibold">Location Details</h3>
				<p class="text-sm text-muted-foreground">Where is this property located?</p>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<InputComp
					{form}
					{errors}
					type="text"
					name="city"
					label="City"
					placeholder="Enter Property City"
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="address"
					label="Specific Address"
					placeholder="Enter Specific Property Address"
				/>
			</div>

			<InputComp
				{form}
				{errors}
				type="textarea"
				name="googleMapsUrl"
				label="Google Map URL"
				placeholder="Enter Google Map Embed URL"
			/>

			{#if $form.googleMapsUrl}
				{@html $form.googleMapsUrl}
			{/if}
		</section>

		<!-- SECTION 3: SPECIFICATIONS -->
		<section class="flex flex-col gap-4">
			<div class="border-b pb-2">
				<h3 class="text-lg font-semibold">Property Specifications</h3>
				<p class="text-sm text-muted-foreground">Provide the physical details and layout.</p>
			</div>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
				<InputComp
					{form}
					{errors}
					type="number"
					name="bedrooms"
					label="Bedrooms"
					placeholder="Qty"
					required
				/>

				<InputComp
					{form}
					{errors}
					type="number"
					name="bathrooms"
					label="Bathrooms"
					placeholder="Qty"
					required
				/>

				<InputComp
					{form}
					{errors}
					type="number"
					name="sizeSqm"
					label="Size (sqm)"
					placeholder="sqm"
				/>

				<InputComp
					{form}
					{errors}
					type="number"
					name="floorNumber"
					label="Floor Number"
					placeholder="Floor"
				/>
				<InputComp
					{form}
					{errors}
					type="number"
					name="totalFloors"
					label="Total Floors"
					placeholder="Total Floors in the Building"
				/>

				<InputComp
					{form}
					{errors}
					type="number"
					name="yearBuilt"
					label="Year Built"
					placeholder="YYYY"
				/>
			</div>
		</section>

		<!-- SECTION 4: MEDIA -->
		<section class="flex flex-col gap-4">
			<div class="border-b pb-2">
				<h3 class="text-lg font-semibold">Media & Tours</h3>
				<p class="text-sm text-muted-foreground">Upload high-quality visuals to attract buyers.</p>
			</div>

			<InputComp
				{form}
				{errors}
				type="file"
				name="image"
				label="Property Featured Image"
				placeholder="Upload Property Featured Image"
				required
			/>

			<InputComp
				{form}
				{errors}
				type="file"
				name="plan"
				label="Property Raw Plan"
				placeholder="Upload Property Raw Plan"
				required
			/>

			<InputComp
				{form}
				{errors}
				type="gallery"
				name="gallery"
				label="Property Gallery Images"
				placeholder="Upload Property Gallery Images"
				required
				bind:images
			/>

			<InputComp
				{form}
				{errors}
				type="url"
				name="videoTourUrl:"
				label="Featured Tour URL"
				placeholder="Enter Featured Video Youtube Tour URL"
			/>
			{#if $form?.videoTourUrl}
				<VideoViewer videoUrl={$form?.videoTourUrl} class="max-h-lg! max-w-lg!" />
			{/if}
		</section>

		<div class="pt-6">
			<Button type="submit" class="w-full px-8" form="main">
				{#if $delayed}
					<LoadingBtn name="Adding Venue" />
				{:else}
					<Plus class="mr-2 h-4 w-4" />
					Add Property
				{/if}
			</Button>
		</div>

		<InputComp
			{form}
			{errors}
			type="hidden"
			name="slug"
			label=""
			placeholder="Enter Slug"
			required
		/>
	</form>
</FormCard>
