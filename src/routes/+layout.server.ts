import { db } from '$lib/server/db';
import { eq, getTableColumns } from 'drizzle-orm';

import { testimonials, blog, blogCategories, gallery, properties } from '$lib/server/db/schema';
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
	const portfolioItems = await db.select().from(properties);

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
