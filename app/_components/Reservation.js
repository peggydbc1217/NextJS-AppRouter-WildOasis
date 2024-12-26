import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }) {

    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);

    const session = await getServerSession();

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
            <DateSelector settings={settings} bookedDates={bookedDates} />
            {session?.user?.email ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
        </div>
    )
}