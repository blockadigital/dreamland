import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import ProfileButton from './profile-button';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getSelf } from '@/actions/auth';

type Props = {};

const emojis = [
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cat%20with%20Tears%20of%20Joy.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cat%20with%20Wry%20Smile.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Drooling%20Face.png'
];

const Header = async (props: Props) => {
    const randomEmoji = Math.floor(Math.random() * emojis.length);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: getSelf
    });

    return (
        <header className="flex items-center justify-between rounded-t-3xl border bg-white px-10 py-4">
            <Link href="/" className="flex items-center gap-1">
                <Image unoptimized src={emojis[randomEmoji]} alt="Astonished Face" width="45" height="45" />
                <span className="text-xl font-bold text-gray-800">Dreamland</span>
            </Link>
            <div className="flex gap-2">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ProfileButton />
                </HydrationBoundary>
                <button className="grid size-14 place-items-center rounded-xl border text-xl text-gray-800 transition-all hover:bg-gray-100">
                    <Icon icon="tabler:brand-github" />
                </button>
                <button className="grid size-14 place-items-center rounded-xl border text-xl text-gray-800 transition-all hover:bg-gray-100">
                    <Icon icon="tabler:brand-discord" />
                </button>
            </div>
        </header>
    );
};

export default Header;
