import { getCategories } from '@/actions/categories';
import SearchBar from '@/components/partials/search-bar';
import Alert from '@/components/ui/alert';
import { Button } from '@headlessui/react';
import { Icon } from '@iconify/react';

export default async function Home() {
    const result = await getCategories();

    return (
        <>
            <SearchBar />
            <div className="grid grid-cols-3 gap-8">
                <Button className="flex flex-col items-center justify-center gap-4 rounded-xl border p-10 transition-all hover:bg-gray-100">
                    <div className="grid size-14 place-items-center rounded-full border text-xl">
                        <Icon icon="tabler:plus" />
                    </div>
                    <span className="text-lg font-bold text-gray-600">Click to Submit New Category</span>
                </Button>
                {result.length > 0 ? (
                    result.map((item) => (
                        <div className="rounded-xl border" key={item.id}>
                            <a
                                href="#"
                                className="group relative grid h-40 place-items-center overflow-hidden rounded-xl p-4"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-cyan-500 transition-all group-hover:rotate-12 group-hover:scale-[1.45]"></div>
                                <h2 className="relative text-center text-3xl text-white transition-all group-hover:-rotate-6">
                                    {item.title}
                                </h2>
                            </a>
                            <div className="flex items-center justify-between p-4">
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Icon className="text-lg" icon="tabler:database" />
                                        <span>{item.itemsCount} Items</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Icon className="text-lg" icon="tabler:bookmark" />
                                        <span>0 Bookmarks</span>
                                    </div>
                                </div>
                                <button className="grid size-14 place-items-center rounded-full border border-gray-400 text-xl transition-all hover:bg-gray-200">
                                    <Icon icon="tabler:bookmark" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <Alert className="col-span-full">I don't have anything to show right now :((</Alert>
                )}
            </div>
        </>
    );
}
