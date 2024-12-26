import { getCabin } from "@/app/_components/CabinContext";
import { getBookedDatesByCabinId } from "@/out/data-service";

export async function GET(request, { params }) {
    const { cabinId } = params;
    try {
        const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
        return NextResponse.json({ cabin, bookedDates });
    } catch (error) {
        return NextResponse.json({ error: 'Cabin not found' }, { status: 404 });
    }
}