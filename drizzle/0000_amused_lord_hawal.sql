CREATE TABLE `amenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `amenities_name_unique` ON `amenities` (`name`);--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`message` text,
	`status` text DEFAULT 'New',
	`created_at` integer,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`google_maps` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_name_unique` ON `locations` (`name`);--> statement-breakpoint
CREATE TABLE `properties` (
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
	`video_tour_url` text,
	`created_at` integer,
	FOREIGN KEY (`property_type`) REFERENCES `property_types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `property_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`url` text NOT NULL,
	`display_order` integer DEFAULT 0,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `property_to_amenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`amenity_id` integer,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `property_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
