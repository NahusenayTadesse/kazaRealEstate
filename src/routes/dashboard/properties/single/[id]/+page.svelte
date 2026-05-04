<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { edit } from './schema.js';
	let { data } = $props();

	import SingleTable from '$lib/components/SingleTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { ArrowLeft, Check, Pencil, Save } from '@lucide/svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import Delete from '$lib/forms/Delete.svelte';
	import SingleView from '$lib/components/SingleView.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let singleTable = $derived([
		{ name: 'Title', value: data.product?.title },
		{ name: 'Type', value: data.product?.type },
		{ name: 'Price', value: 'ETB ' + data.product?.price },
		{ name: 'Bedrooms', value: data.product?.bedrooms + ' Bedrooms' },
		{ name: 'Bathrooms', value: data.product?.bathrooms + ' Bathrooms' },
		{ name: 'Square Meters', value: data.product?.sizeSqm + ' Square Meters' },
		{
			name: 'Floor',
			value: data.product?.floorNumber + ' Floor/' + data.product?.totalFloors + ' Floors'
		},
		{ name: 'Status', value: data.product?.status ? 'available' : 'sold' },

		{ name: 'Added On', value: formatEthiopianDate(data.product?.createdAt) }
	]);

	const { form, errors, enhance, delayed, capture, restore, allErrors, message } = superForm(
		data.form,
		{
			validators: zod4Client(edit),
			resetForm: false,
			dataType: 'json'
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	//   let date = $derived(dateProxy(editForm, 'appointmentDate', { format: 'date'}));

	let editForm = $state(false);
	let editGallery = $state(false);
	import { toast } from 'svelte-sonner';
	import Gallery from '$lib/components/gallery.svelte';
	import EditGallery from './editGallery.svelte';
	import { formatEthiopianDate } from '$lib/global.svelte.js';
	import RichTextEditor from '$lib/formComponents/RichTextEditor.svelte';
	import VideoViewer from '$lib/components/Table/videoViewer.svelte';
	import AddFeatures from './addFeatures.svelte';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	let images = $derived(data?.images);
</script>

<svelte:head>
	<title>Property Details</title>
</svelte:head>

<SingleView
	title={data?.product?.title}
	photo={String(data?.product?.featuredImage)}
	class="w-full!"
>
	<div class="mt-4 flex w-full flex-row flex-wrap items-start justify-start gap-2 pl-4">
		<Button onclick={() => (editForm = !editForm)}>
			{#if !editForm}
				<Pencil class="h-4 w-4" />
				Edit
			{:else}
				<ArrowLeft class="h-4 w-4" />

				Back
			{/if}
		</Button>

		<Delete redirect="/dashboard/blog" />
	</div>

	{#if editForm === false}
		<div class="flex w-full flex-col items-start justify-start gap-4 p-4">
			<SingleTable {singleTable} />

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
					<!-- Section Header -->
					<h2
						class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
					>
						Amenities
					</h2>

					<!-- Injected Content -->
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{#each data?.features as amenity (amenity.id)}
							<div
								class="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
							>
								<!-- Simple Checkmark Icon -->
								<Check />

								<span class="text-sm font-medium text-slate-700">{amenity.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</article>

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
					<!-- Section Header -->
					<h2
						class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
					>
						Short Summary
					</h2>

					<!-- Injected Content -->
					<div
						class="prose prose-slate prose-headings:text-slate-800 prose-p:leading-relaxed prose-li:my-1 max-w-none"
					>
						{@html data?.product?.shortSummary}
					</div>
				</div>
			</article>

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
					<!-- Section Header -->
					<h2
						class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
					>
						Description
					</h2>

					<!-- Injected Content -->
					<div
						class="prose prose-slate prose-headings:text-slate-800 prose-p:leading-relaxed prose-li:my-1 max-w-none"
					>
						{@html data?.product?.description}
					</div>
				</div>
			</article>

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div
					class="items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12"
				>
					<!-- Section Header -->
					<h2
						class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
					>
						Gallery Images
					</h2>
					<div class="p-3 sm:p-6">
						<Button onclick={() => (editGallery = !editGallery)} class="mb-4">
							{#if !editGallery}
								<Pencil class="h-4 w-4" />
								Edit
							{:else}
								<ArrowLeft class="h-4 w-4" />

								Back
							{/if}
						</Button>

						{#if !editGallery}
							<Gallery {images} title={data?.product?.title} />
						{:else}
							<EditGallery data={data?.galleryEdit} bind:images />
						{/if}
					</div>

					<!-- Injected Content -->
				</div>
			</article>

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div
					class="items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12"
				>
					<!-- Section Header -->
					<h2
						class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
					>
						Google Maps
					</h2>
					{@html data?.product?.googleMapsUrl}

					<!-- Injected Content -->
				</div>
			</article>

			{#if data?.product?.videoTourUrl}
				<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
					<div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
						<!-- Section Header -->
						<h2
							class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight text-slate-900"
						>
							Video Tour
						</h2>
						<VideoViewer videoUrl={data?.product?.videoTourUrl} class="max-h-full! max-w-full!" />

						<!-- Injected Content -->
					</div>
				</article>
			{/if}
		</div>
	{/if}
	{#if editForm}
		<div class="w-full p-4">
			<form
				action="?/editProduct"
				use:enhance
				class="flex max-w-full flex-col items-start justify-start gap-4 lg:w-full"
				id="edit"
				method="post"
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
				<section class="flex max-w-3xl flex-col gap-4">
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
						<p class="text-sm text-muted-foreground">
							Upload high-quality visuals to attract buyers.
						</p>
					</div>

					<InputComp
						{form}
						{errors}
						type="file"
						name="image"
						image={data?.product?.featuredImage ?? ''}
						label="Property Featured Image"
						placeholder="Upload Property Featured Image"
						required
					/>

					<InputComp
						{form}
						{errors}
						type="url"
						name="videoTourUrl"
						label="Featured Tour URL"
						placeholder="Enter Featured Video Youtube Tour URL"
					/>
					{#if $form.videoTourUrl}
						<VideoViewer videoUrl={$form.videoTourUrl} class="max-h-lg! max-w-lg!" />
					{/if}
				</section>
				<Button form="edit" type="submit" class="mt-4">
					{#if $delayed}
						<LoadingBtn name="Saving Changes" />
					{:else}
						<Save class="h-4 w-4" />
						Save Changes
					{/if}
				</Button>
			</form>
		</div>
	{/if}
</SingleView>

<!-- <div class="mx-auto my-12 px-4 sm:px-6 lg:px-4">
	<div class="mb-6 border-b border-gray-100 pb-4">
		<nav class="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
			Gallery Images
		</nav>
	</div>

	<div
		class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-shadow hover:shadow-2xl"
	>
		<div class="p-3 sm:p-6">
			<Button onclick={() => (editGallery = !editGallery)} class="mb-4">
				{#if !editGallery}
					<Pencil class="h-4 w-4" />
					Edit
				{:else}
					<ArrowLeft class="h-4 w-4" />

					Back
				{/if}
			</Button>

			{#if !editGallery}
				<Gallery {images} title={data?.product?.title} />
			{:else}
				<EditGallery data={data?.galleryEdit} bind:images />
			{/if}
		</div>
	</div>
</div> -->
