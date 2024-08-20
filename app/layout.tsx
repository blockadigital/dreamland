import './globals.css';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Raleway } from 'next/font/google';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/lib/config/wagmi';
import { Toaster } from 'sonner';
import Web3ModalProvider from '@/components/provider/web3modal-provider';
import MainLayout from '@/components/layouts/main';
import QueryProvider from '@/components/provider/query-provider';
import NextTopLoader from 'nextjs-toploader';

const sans = Raleway({
    subsets: ['latin'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get('cookie'));

    return (
        <html lang="en">
            <body className={`${sans.className} h-screen overflow-hidden antialiased`}>
                <Web3ModalProvider initialState={initialState}>
                    <QueryProvider>
                        <MainLayout>{children}</MainLayout>
                    </QueryProvider>
                </Web3ModalProvider>
                <Toaster position="top-center" />
                <NextTopLoader color="#fff" />
            </body>
        </html>
    );
}
