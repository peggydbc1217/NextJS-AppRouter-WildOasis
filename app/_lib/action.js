'use server';

import { signIn, signOut } from 'next-auth/react';

export async function signInAction() {
    await signIn('google', {
        redirectTo: '/account',
    });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}