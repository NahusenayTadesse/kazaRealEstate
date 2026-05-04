PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_property_to_amenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`property_id` integer,
	`amenity_id` integer,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_property_to_amenities`("id", "property_id", "amenity_id") SELECT "id", "property_id", "amenity_id" FROM `property_to_amenities`;--> statement-breakpoint
DROP TABLE `property_to_amenities`;--> statement-breakpoint
ALTER TABLE `__new_property_to_amenities` RENAME TO `property_to_amenities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;