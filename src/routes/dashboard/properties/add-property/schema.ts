import { z } from 'zod/v4';

export const add = z.object({
	title: z.string('Title must be at least 5 characters').max(100),
	shortSummary: z.string('Summary is too required'),
	description: z.string().optional(),
	slug: z.string(),
	price: z.coerce.number().positive('Price must be greater than 0'),
	propertyType: z.number().optional(),
	amenities: z.coerce.number().optional().array(),

	// --- Location ---
	city: z.string().min(1, { message: 'City is required' }),
	address: z.string().min(1, { message: 'Address is required' }),
	googleMapsUrl: z.string().optional(),

	// --- Specs (Coerce strings to numbers since form data is always strings) ---
	bedrooms: z.coerce.number().int().positive(),
	bathrooms: z.coerce.number().min(0),
	sizeSqm: z.coerce.number().positive('Size must be greater than 0').optional(),
	floorNumber: z.coerce.number().int().optional(),
	totalFloors: z.coerce.number().int().optional(),
	yearBuilt: z.coerce
		.number()
		.int()
		.min(1800)
		.max(new Date().getFullYear() + 5)
		.default(new Date().getFullYear())
		.optional(),

	// --- Media ---
	// Note: For SvelteKit File uploads, we validate the File object
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional(),

	videoTourUrl: z.url('Please enter a valid YouTube/Video URL').optional()
});
