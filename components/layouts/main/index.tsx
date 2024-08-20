import Header from '@/components/partials/header';
import Sidebar from '@/components/partials/sidebar';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <video
                className="absolute inset-0 size-full bg-black object-cover"
                autoPlay
                loop
                muted
                controls={false}
                src="/bg.mp4"
            />
            <div className="relative flex h-full max-h-screen flex-col -space-y-px p-6">
                <Header />
                <div className="flex flex-1 -space-x-px overflow-hidden">
                    <Sidebar />
                    <main className="h-full w-full space-y-8 overflow-x-visible overflow-y-scroll rounded-br-3xl border bg-white p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
