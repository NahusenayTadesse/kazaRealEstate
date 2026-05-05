import { z } from 'zod/v4';

export type DeleteTestimonial = z.infer<typeof deleteTestimonial>;

export const quote = z.object({
	id: z.number(),
	name: z.string('Name is required'),
	phone: z.string('Phone is required').min(10).max(15),
	email: z.email('Email is required'),
	emailMessage: z.string('Message is required').nonempty('Message is required')
});

export type QuoteSchema = z.infer<typeof quote>;
