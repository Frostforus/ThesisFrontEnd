import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const signupSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});

export const load = async () => {
    const form = await superValidate(signupSchema);
    return { form };
};

export const actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, signupSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const user = await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: form.data.email.toLowerCase(),
                    password: form.data.password
                },
                attributes: {
                    email: form.data.email.toLowerCase()
                }
            });
            const session = await auth.createSession(user.userId);
            locals.auth.setSession(session);
        } catch (e) {
            return message(form, "Email already in use", { status: 400 });
        }

        throw redirect(302, "/dashboard");
    }
};