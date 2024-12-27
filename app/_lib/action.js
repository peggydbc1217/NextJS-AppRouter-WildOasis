//bridge between client and server
'use server';
import { signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/app/_lib/supabase';
import { revalidatePath } from 'next/cache';
import { getBookings } from '@/app/_lib/action';
import { redirect } from 'next/navigation';

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

export async function deleteReservation(bookingId) {
    const session = await getServerSession();
    if (!session) {
        return { error: 'Unauthorized' };
    }

    const guestBookings = await getBookings(session.user.guestId);
    if (!guestBookings.map(booking => booking.id).includes(bookingId)) {
        return { error: 'Unauthorized' };
    }

    const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
    //1. authenticate user
    const session = await getServerSession();
    if (!session) {
        return { error: 'Unauthorized' };
    }
    
    const bookingId = formData.get('bookingId'); // hidden input

    //2. authorize user
    const guestBookings = await getBookings(session.user.guestId);
    if (!guestBookings.map(booking => booking.id).includes(bookingId)) {
        return { error: 'Unauthorized' };
    }

    //3. update booking
    const updatedFields = {
        numGuests: formData.get('numGuests'),
        observations: formData.get('observations').slice(0, 200),//protect from malicious input
    }


    const { error } = await supabase
        .from("bookings")
        .update(updatedFields)
        .eq("id", bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }

    //4. revalidate the page
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);

    //5. redirect user
    redirect('/account/reservations');
}