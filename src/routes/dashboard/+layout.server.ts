import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import {} from '$lib/server/db/schema';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	const name = locals?.user?.name;

	return {
		name
	};
};
