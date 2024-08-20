import { getTopContributors } from '@/actions/categories';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Sidebar = async (props: Props) => {
    const result = await getTopContributors();

    return (
        <aside className="flex w-full max-w-[350px] shrink-0 flex-col -space-y-px">
            <div className="border bg-white p-8">
                <h1 className="text-3xl">Find all the things you need here :))</h1>
            </div>
            <div className="relative flex-1 overflow-y-scroll rounded-bl-3xl border bg-white">
                <div className="space-y-4 p-8">
                    <h2 className="text-lg">Top Contributors</h2>
                    <div className="space-y-2">
                        {result?.map((contributor) => (
                            <div className="flex items-center gap-4 rounded-xl border p-4" key={contributor.id}>
                                <Image
                                    alt={contributor.address}
                                    width={40}
                                    height={40}
                                    src={`/pfp/${contributor.avatar}`}
                                    className="size-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="line-clamp-1" title={contributor.name}>
                                        {contributor.name}
                                    </h3>
                                    <p title={contributor.address}>
                                        {contributor.address.slice(0, 6)}...{contributor.address.slice(-4)}
                                    </p>
                                </div>
                                <span className="grid size-12 place-items-center rounded-full bg-primary-800 text-white">
                                    {contributor.itemsCount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
