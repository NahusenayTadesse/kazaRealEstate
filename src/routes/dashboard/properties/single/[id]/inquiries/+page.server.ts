import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, getTableColumns } from 'drizzle-orm';

import { deleteTestimonial, markRead, schema } from './schema.js';
import { db } from '$lib/server/db';
import { inquiries, properties } from '$lib/server/db/schema';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const readForm = await superValidate(zod4(markRead));
	const deleteForm = await superValidate(zod4(deleteTestimonial));
	const allQuotes = await db
		.select({
			...getTableColumns(inquiries),
			property: properties.title
		})
		.from(inquiries)
		.leftJoin(properties, eq(inquiries.propertyId, properties.id))
		.where(eq(inquiries.propertyId, Number(id)));
	const replyForm = await superValidate(zod4(schema));

	return {
		readForm,
		deleteForm,
		allQuotes,
		replyForm
	};
};

import { HOST, PORT, USER, PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';

export const actions: Actions = {
	read: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.update(inquiries).set({ status: 'Closed' }).where(eq(inquiries.id, id));
			return message(form, { type: 'success', text: 'Quote Successfully Marked as Closed' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while marking quote as read.'
				},
				{ status: 500 }
			);
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(inquiries).where(eq(inquiries.id, id));
			return message(form, { type: 'success', text: 'Quote Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting quote.'
				},
				{ status: 500 }
			);
		}
	},
	reply: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please Check for Errors' }, { status: 400 });
		}

		const { id, name, email, subject, emailMessage } = form.data;

		const domain = 'https://kazarealestateet.com';
		const transporter = nodemailer.createTransport({
			host: HOST,
			port: PORT,
			secure: true,
			auth: {
				user: USER,
				pass: PASSWORD
			}
		});
		await transporter.verify();
		console.log('SMTP ready');
		const currentYear = new Date().getFullYear();

		const htmlContent = `
		<div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #002349; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; border-radius: 8px; overflow: hidden; background-color: #ffffff;">

  <!-- Header with Kaza Dark Blue -->
  <div style="background-color: #002349; text-align: center; padding: 40px 20px; border-bottom: 4px solid #D4AF37;">
    <!-- Replace with your actual logo URL once ready -->
    <img src="" alt="Kaza Real Estate" style="width: 160px; height: auto; display: block; margin: 0 auto;" />
    <p style="color: #D4AF37; font-size: 11px; letter-spacing: 3px; margin-top: 15px; text-transform: uppercase; font-weight: bold;">Modern • Professional • Trusted</p>
  </div>

  <!-- Main Content -->
  <div style="padding: 40px 35px;">
    <h2 style="color: #002349; font-size: 22px; font-weight: bold; margin-top: 0;">Dear ${name},</h2>

    <div style="color: #333333; font-size: 16px;">
      ${emailMessage}
    </div>

    <!-- Call to Action / Sign-off -->
    <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #eeeeee;">
      <p style="margin: 0; font-size: 14px; color: #666;">Best regards,</p>
      <p style="margin: 5px 0 0 0; font-weight: bold; color: #002349; font-size: 18px;">Kaza Real Estate & Trading</p>
      <p style="margin: 2px 0 0 0; font-size: 12px; color: #D4AF37; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Property Sales | Rentals | Investments</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f9f9f9; padding: 30px; text-align: center; font-size: 12px; color: #002349; border-top: 1px solid #eeeeee;">
    <p style="margin: 0 0 10px 0; font-weight: bold; letter-spacing: 1px; color: #002349;">
      &copy; ${currentYear} KAZA REAL ESTATE AND TRADING PLC
    </p>
    <p style="margin: 0; color: #666;">
      Addis Ababa, Ethiopia
    </p>
    <div style="margin-top: 15px;">
      <a href="${domain}/logo.jpg" style="display: inline-block; padding: 10px 20px; background-color: #002349; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">Browse Properties</a>
    </div>
    <p style="margin: 15px 0 0 0; font-size: 11px;">
      <a href="https://wa.me/+251911216413" style="color: #25D366; text-decoration: none; font-weight: bold;">Contact via WhatsApp</a>
    </p>
  </div>
</div>
 `;

		try {
			const info = await transporter.sendMail({
				from: `"Kaza Real Estate" <${USER}>`,
				to: email,
				replyTo: USER,
				subject: subject,
				html: htmlContent
			});
			console.log('MAIL RESULT:', info);
			console.log('Success Before Insert');
			const result = await db
				.update(inquiries)
				.set({ status: 'Contacted' })
				.where(eq(inquiries.id, Number(id)));

			console.log('Success', result);

			return message(form, {
				type: 'success',
				text: 'Email sent successfully.'
			});
		} catch (error) {
			console.error('Error processing message:', error);

			return message(
				form,
				{
					type: 'error',
					text: 'An unexpected error occurred. Please try again later. ' + error?.message
				},
				{ status: 500 }
			);
		}
	}
};
