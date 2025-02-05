import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Redirect to home if user is already logged in
    if (locals.isAuthenticated) {
        throw redirect(302, '/');
    }

    const form = await superValidate(zod(loginSchema));
    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals, cookies }) => {
        const form = await superValidate(request, zod(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const { token, record } = await locals.pb
                .collection('users')
                .authWithPassword(form.data.email, form.data.password);

            // Set the cookie
            const cookieOptions = {
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: 'strict'
            };

            // Store the auth data in a cookie
            cookies.set('pb_auth', locals.pb.authStore.exportToCookie(), cookieOptions);

            // Redirect immediately after successful login
        } catch (error) {
            console.error('Login error:', error);

            return message(form, {
                type: 'error',
                text: 'Invalid email or password'
            });
        }
        return  redirect(303, '/login');

    }
};