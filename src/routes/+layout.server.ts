import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals,url }) => {
    return {
        user: locals.user,
        url: url.pathname,
        isAuthenticated: locals.isAuthenticated,

    };
};