PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_properties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`short_summary` text,
	`property_type` integer,
	`listing_type` text NOT NULL,
	`status` integer DEFAULT true,
	`price` real NOT NULL,
	`currency` text DEFAULT 'ETB',
	`city` text DEFAULT 'Addis Ababa',
	`location_id` integer,
	`address` text,
	`show_address` integer DEFAULT true,
	`google_maps_url` text,
	`bedrooms` integer,
	`bathrooms` integer,
	`size_sqm` real,
	`floor_number` integer,
	`total_floors` integer,
	`year_built` integer,
	`featured_image` text NOT NULL,
	`raw_plan` text,
	`video_tour_url` text,
	`created_at` integer,
	FOREIGN KEY (`property_type`) REFERENCES `property_types`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_properties`("id", "title", "slug", "description", "short_summary", "property_type", "listing_type", "status", "price", "currency", "city", "location_id", "address", "show_address", "google_maps_url", "bedrooms", "bathrooms", "size_sqm", "floor_number", "total_floors", "year_built", "featured_image", "raw_plan", "video_tour_url", "created_at") SELECT "id", "title", "slug", "description", "short_summary", "property_type", "listing_type", "status", "price", "currency", "city", "location_id", "address", "show_address", "google_maps_url", "bedrooms", "bathrooms", "size_sqm", "floor_number", "total_floors", "year_built", "featured_image", "raw_plan", "video_tour_url", "created_at" FROM `properties`;--> statement-breakpoint
DROP TABLE `properties`;--> statement-breakpoint
ALTER TABLE `__new_properties` RENAME TO `properties`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_property_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`url` text NOT NULL,
	`display_order` integer DEFAULT 0,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_property_images`("id", "property_id", "url", "display_order") SELECT "id", "property_id", "url", "display_order" FROM `property_images`;--> statement-breakpoint
DROP TABLE `property_images`;--> statement-breakpoint
ALTER TABLE `__new_property_images` RENAME TO `property_images`;--> statement-breakpoint
CREATE TABLE `__new_property_to_amenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`amenity_id` integer,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_property_to_amenities`("id", "property_id", "amenity_id") SELECT "id", "property_id", "amenity_id" FROM `property_to_amenities`;--> statement-breakpoint
DROP TABLE `property_to_amenities`;--> statement-breakpoint
ALTER TABLE `__new_property_to_amenities` RENAME TO `property_to_amenities`;