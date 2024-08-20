import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@/components/ui/button';

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <form className="flex items-end gap-2">
            <div className="grid w-full gap-1">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className={`inline-flex h-14 w-full rounded-xl border border-gray-300 px-6 ring-offset-2 transition-all focus:border-gray-800 focus:outline-none`}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Icons, Learn, Hosting, Web3, Illustrations, ... Girlfriend (?)"
                />
            </div>
            <Button icon="tabler:search" type="submit">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
