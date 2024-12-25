import React from 'react'
import CabinCard from './CabinCard'
import { getCabins } from '@/app/_lib/data-service'
// import { unstable_noStore as noStore } from 'next/cache';


export default async function CabinList({ filter }) {
    // noStore();
    const cabins = await getCabins();
    if (!cabins || cabins.length === 0) return null;

    let displayedCabins = cabins;

    if (filter !== 'all') {
        if (filter === 'small') {
            displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3 && cabin.maxCapacity >= 1);
        } else if (filter === 'medium') {
            displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 6 && cabin.maxCapacity >= 4);
        } else if (filter === 'large') {
            displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 10 && cabin.maxCapacity >= 7);
        }
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {
                displayedCabins.map((cabin) => <CabinCard cabin={cabin} key={cabin.id} />)}
        </div>
    );
}


