import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const locations = sqliteTable('locations', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(), // Bole, Piassa, etc.\
	googleMaps: text('google_maps')
});

export const propertyTypes = sqliteTable('property_types', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description')
});

export const properties = sqliteTable('properties', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(), // e.g., "Luxury 4 Bedroom Villa"
	slug: text('slug').notNull(),
	description: text('description'),
	shortSummary: text('short_summary'),

	// Basic Info
	propertyType: integer('property_type').references(() => propertyTypes.id),
	listingType: text('listing_type', { enum: ['Sale', 'Rent'] }).notNull(),
	status: integer('status', { mode: 'boolean' }).default(true),

	// Pricing
	price: real('price').notNull(),
	currency: text('currency').default('ETB'), // Defaulting to ETB per questionnaire

	// Location
	city: text('city').default('Addis Ababa'),
	locationId: integer('location_id').references(() => locations.id),
	address: text('address'),
	showAddressPublicly: integer('show_address', { mode: 'boolean' }).default(true),
	googleMapsUrl: text('google_maps_url'),

	// Details
	bedrooms: integer('bedrooms'),
	bathrooms: integer('bathrooms'),
	sizeSqm: real('size_sqm'), // Square meters
	floorNumber: integer('floor_number'),
	totalFloors: integer('total_floors'),
	yearBuilt: integer('year_built'),

	// Media
	featuredImage: text('featured_image').notNull(),
	videoTourUrl: text('video_tour_url'),

	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const amenities = sqliteTable('amenities', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	description: text('description')
});

export const propertyToAmenities = sqliteTable('property_to_amenities', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	propertyId: integer('property_id').references(() => properties.id),
	amenityId: integer('amenity_id').references(() => amenities.id)
});

/**
 * Property Gallery Images
 */
export const propertyImages = sqliteTable('property_images', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	propertyId: integer('property_id').references(() => properties.id),
	imageUrl: text('url').notNull(),
	displayOrder: integer('display_order').default(0)
});

// --- Lead & Contact System ---

/**
 * Inquiries generated via contact forms
 */
export const inquiries = sqliteTable('inquiries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	propertyId: integer('property_id').references(() => properties.id), // Specific property inquiry
	name: text('name').notNull(),
	phone: text('phone').notNull(),
	email: text('email'),
	message: text('message'),
	status: text('status', { enum: ['New', 'Contacted', 'Closed'] }).default('New'),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export * from './auth.schema';
