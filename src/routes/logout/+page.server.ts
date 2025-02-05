// src/routes/logout/+page.server.ts
import {redirect} from "@sveltejs/kit";
import type {Actions} from "./$types";

export const actions: Actions = {
    default: async ({
                        locals: {
                            pb: {authStore}
                        }, cookies
                    }) => {
        if (authStore) {
            authStore.clear();
            // Clear the auth cookie
            cookies.delete('pb_auth', {
                path: '/',
                secure: true,
                sameSite: 'strict'
            });
            throw redirect(303, '/');
        } else {
            console.log('User wasnt signed in');
            throw redirect(303, '/');
        }
    }

};