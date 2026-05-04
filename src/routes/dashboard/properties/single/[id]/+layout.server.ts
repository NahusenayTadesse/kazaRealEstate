import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import {
	deleteFeature,
	edit,
	editFeature,
	editGallery,
	addFeature,
	addVideo,
	editVideo,
	deleteVideo
} from './schema';

import { db } from '$lib/server/db';
import {
	properties as event,
	propertyImages as productImages,
	propertyTypes,
	amenities as venueFeatures,
	propertyToAmenities
} from '$lib/server/db/schema';
import { eq, sql, getTableColumns } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { id } = params;

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.propertyId, Number(id)));

	const images = result.map((img) => img.url);

	const product = await db
		.select({
			...getTableColumns(event),
			type: propertyTypes.name
		})
		.from(event)
		.leftJoin(propertyTypes, eq(propertyTypes.id, event.propertyType))
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	const types = await db
		.select({
			value: propertyTypes.id,
			name: propertyTypes.name
		})
		.from(propertyTypes);

	const features = await db
		.select({
			id: venueFeatures.id,
			name: venueFeatures.name,
			description: venueFeatures.description
		})
		.from(propertyToAmenities)
		.leftJoin(venueFeatures, eq(venueFeatures.id, propertyToAmenities.amenityId))
		.where(eq(propertyToAmenities.propertyId, Number(id)));

	const amenity = await db
		.select({
			value: venueFeatures.id,
			name: venueFeatures.name,
			description: venueFeatures.description
		})
		.from(venueFeatures);

	const addForm = await superValidate(zod4(addFeature));
	const addVideoForm = await superValidate(zod4(addVideo));
	const editForm = await superValidate(zod4(editFeature));
	const editVideoForm = await superValidate(zod4(editVideo));
	const deleteForm = await superValidate(zod4(deleteFeature));
	const form = await superValidate(
		{ ...product, amenities: features.map((f) => f.id) },
		zod4(edit)
	);
	const galleryEdit = await superValidate(zod4(editGallery));

	return {
		product,
		addForm,
		addVideoForm,
		editVideoForm,
		editForm,
		deleteForm,
		amenity,
		form,
		images,
		types,
		features,
		galleryEdit
	};
};
