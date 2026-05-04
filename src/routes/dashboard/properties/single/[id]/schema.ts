import { z } from 'zod/v4';

export const edit = z.object({
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
	image: z.file('Featured Image is required').max(10000000).optional(),
	plan: z.file('Featured Image is required').max(10000000).optional(),
	videoTourUrl: z.url('Please enter a valid YouTube/Video URL').optional()
});

export const addFeature = z.object({
	name: z.string('Name of Feature is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100)
});

export type AddFeature = z.infer<typeof addFeature>;

export const editFeature = z.object({
	id: z.coerce.string(),
	name: z.string('Name of Featured is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100)
});

export type EditFeature = z.infer<typeof editFeature>;

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;

export const deleteFeature = z.object({
	id: z.coerce.number()
});

export type DeleteFeature = z.infer<typeof deleteFeature>;
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
export const addVideo = z.object({
	videoUrl: z.url('Enter a valid YouTube URL').regex(youtubeRegex, 'Only YouTube URLs are allowed')
});

export type AddVideo = z.infer<typeof addVideo>;
export const editVideo = z.object({
	id: z.coerce.number(),
	videoUrl: z.url('Enter a valid YouTube URL').regex(youtubeRegex, 'Only YouTube URLs are allowed')
});

export type EditVideo = z.infer<typeof editVideo>;
