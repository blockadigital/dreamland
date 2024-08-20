'use client';

import React, { useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/wagmi/react';
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSelf } from '@/actions/auth';
import { useAccount } from 'wagmi';

type Props = {};

const ProfileButton = (props: Props) => {
    const { open } = useWeb3Modal();
    const { address } = useAccount();
    const onWalletOpen = () => open({ view: 'Account' });
    const onConnect = () => open({ view: 'Connect' });

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getSelf()
    });

    return (
        <>
            {address ? (
                <>
                    {data ? (
                        <Menu as="div">
                            <MenuButton className="inline-flex h-14 items-center gap-2 rounded-xl border pl-4 pr-2 text-gray-800 transition-all hover:bg-gray-100">
                                {data?.address.slice(0, 6)}...{data?.address.slice(-4)}
                                <Image
                                    className="size-10 rounded-full object-cover"
                                    src={`/pfp/${data?.avatar}`}
                                    width={40}
                                    height={40}
                                    alt="pfp"
                                />
                            </MenuButton>
                            <MenuItems
                                anchor="bottom"
                                className="mt-2 w-[var(--button-width)] origin-top rounded-xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-400/40 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                transition
                            >
                                <MenuItem>
                                    <Link
                                        href="/profile"
                                        className="flex w-full items-center gap-2 rounded-lg p-2 transition-all data-[focus]:bg-gray-100"
                                    >
                                        <Icon icon="tabler:user" className="text-lg" />
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuSeparator className="my-1 h-px bg-gray-200" />
                                <MenuItem>
                                    <button
                                        onClick={onWalletOpen}
                                        className="flex w-full items-center gap-2 rounded-lg p-2 text-info-600 transition-all data-[focus]:bg-info-50"
                                    >
                                        <Icon icon="tabler:wallet" className="text-lg" />
                                        Wallet
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    ) : (
                        <button className="grid size-14 place-items-center rounded-xl border text-xl text-gray-800 transition-all hover:bg-gray-100">
                            <Icon icon="tabler:loader" className="animate-spin" />
                        </button>
                    )}
                </>
            ) : (
                <button
                    onClick={onConnect}
                    className="inline-flex h-14 items-center gap-2 rounded-xl border bg-white px-8 font-medium text-gray-800 transition-all hover:bg-gray-100"
                >
                    Connect to Submit
                    <Icon icon="tabler:wallet" className="text-lg" />
                </button>
            )}
        </>
    );
};

export default ProfileButton;
