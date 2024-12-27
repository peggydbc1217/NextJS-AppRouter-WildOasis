"use client";

import { ReservationCard } from '@/app/_components/ReservationCard';
import { useOptimistic } from 'react';
import { deleteReservation } from '@/app/_lib/action';

export function ReservationList({ bookings }) {

    //delete a booking
    const [optimisticBookings, updateOptimisticBookings] = useOptimistic(bookings, (state, bookingId) => {
        const newBookings = state.filter(booking => booking.id !== bookingId);
        return newBookings;
    });

    async function handleDelete(bookingId) {
        updateOptimisticBookings(bookingId);
        await deleteReservation(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
            ))}
        </ul>
    )
}