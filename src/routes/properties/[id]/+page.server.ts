import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { db } from '$lib/server/db';
import {
	venueDetails as event,
	venueImages as productImages,
	venueFeatures,
	venueVideos
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.venueId, Number(id)));

	const images = result.map((img) => img.url);

	const product = await db
		.select()
		.from(event)
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	const features = await db
		.select({
			id: venueFeatures.id,
			name: venueFeatures.name,
			description: venueFeatures.description
		})
		.from(venueFeatures)
		.where(eq(venueFeatures.venueId, Number(id)));

	const videos = await db
		.select({
			id: venueVideos.id,
			videoUrl: venueVideos.videoUrl
		})
		.from(venueVideos)
		.where(eq(venueVideos.venueId, Number(id)));

	return {
		venue: product,
		videos,
		images,
		features
	};
};
