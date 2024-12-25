import CabinCard from "@/app/_components/CabinCard";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";

//generate metadata dynamically
export async function generateMetadata({ params }) {
    const cabin = await getCabin(params.cabinId);
    return {
        title: `Cabin ${cabin.name}`,
    };
}

//generate static paths
export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
    return ids;
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const { cabinId } = resolvedParams;

    const cabin = await getCabin(cabinId);

    if (!cabin) return null;
    const { name } = cabin;

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="text-5xl font-semibold text-center">
                    Reserve {name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>

            </div>
        </div>
    );
}
