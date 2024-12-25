import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";

export default async function Reservation({ cabin }) {

    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
            <DateSelector settings={settings} bookedDates={bookedDates} />
            <ReservationForm cabin={cabin} />
        </div>
    )
}