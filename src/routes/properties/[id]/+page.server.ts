import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { db } from '$lib/server/db';
import {
	properties as event,
	propertyImages as productImages,
	propertyTypes,
	amenities as venueFeatures,
	propertyToAmenities,
	inquiries
} from '$lib/server/db/schema';

import { quote } from './schema';
import { eq, getTableColumns } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const form = await superValidate(zod4(quote));

	const product = await db
		.select({
			...getTableColumns(event),
			type: propertyTypes.name
		})
		.from(event)
		.leftJoin(propertyTypes, eq(propertyTypes.id, event.propertyType))
		.where(eq(event.slug, id))
		.limit(1)
		.then((rows) => rows[0]);

	if (!product) return error(404, 'Property Not Found');

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.propertyId, product.id));

	const images = result.map((img) => img.url);

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
		.where(eq(propertyToAmenities.propertyId, product.id));

	const amenity = await db
		.select({
			value: venueFeatures.id,
			name: venueFeatures.name,
			description: venueFeatures.description
		})
		.from(venueFeatures);

	return {
		product,
		form,
		amenity,
		images,
		types,
		features
	};
};

export const actions: Actions = {
	quote: async ({ request }) => {
		const form = await superValidate(request, zod4(quote));

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const { id, name, phone, email, emailMessage } = form.data;

		try {
			await db
				.insert(inquiries)
				.values({ name, phone, email, message: emailMessage, propertyId: id });

			// const adminMail = adminContactTemplate(form.data);
			// sendEmail(USER, adminMail.subject, adminMail.html);

			// const userMail = customerContactTemplate(name, subject);
			// sendEmail(email, userMail.subject, userMail.html);

			return message(form, { type: 'success', text: 'Inquiry Successfully Sent!' });
		} catch (err) {
			return message(form, {
				type: 'error',
				text: 'Error Sending Inquiry: ' + err?.message
			});
		}
	}
};
