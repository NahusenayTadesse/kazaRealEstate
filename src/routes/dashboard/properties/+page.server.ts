import { db } from '$lib/server/db';
import {
	propertyTypes,
	properties as venueDetails,
	propertyToAmenities as venueFeatures
} from '$lib/server/db/schema';
import type { PageServerLoad } from '../$types';
import { getTableColumns, count, eq } from 'drizzle-orm';
export const load: PageServerLoad = async () => {
	// First, get products
	const eventList = await db
		.select({
			...getTableColumns(venueDetails),
			features: count(venueFeatures.id),
			type: propertyTypes.name
		})
		.from(venueDetails)
		.leftJoin(venueFeatures, eq(venueDetails.id, venueFeatures.propertyId))
		.leftJoin(propertyTypes, eq(propertyTypes.id, venueDetails.propertyType))
		.groupBy(venueDetails.id);

	return {
		eventList
	};
};
