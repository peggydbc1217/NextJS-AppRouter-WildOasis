//bridge between client and server
'use server';
import { signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/app/_lib/supabase';
import { revalidatePath } from 'next/cache';


export async function signInAction() {
    await signIn('Google', {
        redirectTo: '/account',
    });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
    //nextjs give us a formData object(web api)

    //1. authenticate user
    const session = await getServerSession();
    if (!session) {
        //error automatically handled by error boundary(error.js)
        //we don't need to handle it by try catch here
        return { error: 'Unauthorized' };
    }

    //2. treat all inputs asunsafe
    const nationalID = formData.get('nationalID');
    if (!/^[a-zA-Z0-9]{6, 12}$/.test(nationalId)) {
        return { error: 'Invalid national ID' };
    }

    const nationality = formData.get('nationality').split('%')[0];
    const countryFlag = formData.get('nationality').split('%')[1];

    const updateData = {
        nationality,
        countryFlag,
        nationalID,
    }

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId)
        .select()
        .single();

    if (error) {
        throw new Error("Guest could not be updated");
    }

    revalidatePath('/account/profile');

    return data;
}