'use server';

import { signIn, signOut } from 'next-auth/react';

export async function signInAction() {
    if (typeof window !== 'undefined') {
        await signIn('Google', {
            redirectTo: '/account',
        });
    } else {
        console.error('signInAction is being called on the server, which is not supported.');
    }
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}