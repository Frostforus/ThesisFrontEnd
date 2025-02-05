import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Get the auth cookie
    const cookie = event.cookies.get('pb_auth');

    if (cookie) {
        try {
            // Load the auth data from the cookie into pocketbase
            pb.authStore.loadFromCookie(`pb_auth=${cookie}`);

            // Verify the token is still valid
            if (pb.authStore.isValid) {
                try {
                    await pb.collection('users').authRefresh();
                } catch (err) {
                    // Clear the auth store on failed refresh
                    pb.authStore.clear();
                    event.cookies.delete('pb_auth', { path: '/' });
                }
            }
        } catch (_) {
            // Clear invalid/expired auth data
            pb.authStore.clear();
            event.cookies.delete('pb_auth', { path: '/' });
        }
    }

    // Add pb and user to event.locals
    event.locals.pb = pb;
    event.locals.isAuthenticated = pb.authStore.isValid;
    //event.locals.user = pb.authStore.baseModel;

    const response = await resolve(event);

    // Set the cookie if we have valid auth
    if (pb.authStore.isValid) {
        response.headers.set(
            'set-cookie',
            pb.authStore.exportToCookie({ httpOnly: true, secure: true, sameSite: 'strict' })
        );
    }

    return response;
};