import {Lucia} from "lucia";
import PocketBase from 'pocketbase';
import {dev} from "$app/environment";
import {PUBLIC_POCKETBASE_URL} from '$env/static/public';

// Initialize PocketBase client
const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

// Create a custom adapter for PocketBase
const adapter = {
    async getUser(userId: string) {
        try {
            const user = await pb.collection('users').getOne(userId);
            return {
                id: user.id,
                email: user.email,
                hashedPassword: user.hashed_password
            };
        } catch {
            return null;
        }
    },

    async setUser(user: any) {
        const userData = {
            email: user.email,
            hashed_password: user.hashedPassword
        };

        const record = await pb.collection('users').create(userData);
        return {
            id: record.id,
            ...userData
        };
    },

    async deleteUser(userId: string) {
        await pb.collection('users').delete(userId);
    },

    async getSession(sessionId: string) {
        try {
            const session = await pb.collection('sessions').getOne(sessionId);
            return {
                id: session.id,
                userId: session.user,
                expiresAt: new Date(session.expires_at)
            };
        } catch {
            return null;
        }
    },

    async setSession(session: any) {
        const sessionData = {
            id: session.id,
            user: session.userId,
            expires_at: session.expiresAt
        };

        await pb.collection('sessions').create(sessionData);
    },

    async deleteSession(sessionId: string) {
        await pb.collection('sessions').delete(sessionId);
    }
};

export const auth = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email
        };
    }
});

export type Auth = typeof auth;