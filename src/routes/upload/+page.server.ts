import type {PageServerLoad, Actions} from './$types';
import {superValidate} from 'sveltekit-superforms/server';
import {uploadSchema} from '$lib/schemas';
import {fail} from '@sveltejs/kit';
import {zod} from "sveltekit-superforms/adapters";

export const load = (async () => {
    const form = await superValidate(zod(uploadSchema));
    return {form};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({request}) => {
        const form = await superValidate(request, zod(uploadSchema));
        console.log(form);
        if (!form.valid) {
            return fail(400, {form});
        }

        // Handle your form submission here
        // e.g., process the audio file, save to database, etc.

        return {form};
    }
} satisfies Actions;