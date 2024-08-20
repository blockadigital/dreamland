'use client';

import React, { ReactNode } from 'react';
import { config, projectId, metadata } from '@/lib/config/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { State, WagmiProvider } from 'wagmi';
import { siweConfig } from '@/lib/config/siwe';

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    siweConfig,
    enableSwaps: false,
    themeMode: 'light',
    enableOnramp: false
});

export default function Web3ModalProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            {children}
        </WagmiProvider>
    );
}
