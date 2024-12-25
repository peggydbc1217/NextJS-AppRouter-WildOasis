'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter(); //useRouter is a hook that allows us to navigate to a different page
    const pathname = usePathname();

    const activeFilter = searchParams.get('capacity') || 'all';

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border-primary-800 flex">
            <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter} />
            <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter} />
            <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter} />
            <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter} />
        </div>
    );
}


function Button({ filter, handleFilter, activeFilter }) {
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 'bg-primary-700 text-white' : ''}`} onClick={() => handleFilter(filter)}>{filter}</button>
    );
}

export default Filter;