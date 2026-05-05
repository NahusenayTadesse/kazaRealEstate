import { db } from '$lib/server/db';
import { eq, getTableColumns } from 'drizzle-orm';

import {
	testimonials,
	blog,
	blogCategories,
	gallery,
	properties,
	propertyTypes
} from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async () => {
	// First, get products

	const testimonialList = await db
		.select({
			name: testimonials.name,
			position: testimonials.position,
			testimonial: testimonials.message,
			avatar: testimonials.avatar
		})
		.from(testimonials);

	// Then, get services
	const portfolioItems = await db
		.select({
			...getTableColumns(properties),
			propertyType: propertyTypes.name
		})
		.from(properties)
		.leftJoin(propertyTypes, eq(properties.propertyType, propertyTypes.id));

	const blogItems = await db
		.select({
			...getTableColumns(blog),
			category: blogCategories.name
		})
		.from(blog)
		.leftJoin(blogCategories, eq(blog.categoryId, blogCategories.id));

	const images = await db.select().from(gallery);

	const imagesList = images.map((img) => img.imageUrl);

	return {
		blogItems,
		testimonialList,
		imagesList,
		portfolioItems
	};
};
