import React from 'react';
import { getSelf } from '@/actions/auth';
import dynamic from 'next/dynamic';
//? Hydration error, don't know why
// import ProfileForm from '@/components/partials/profile-form';
const ProfileForm = dynamic(() => import('@/components/partials/profile-form'), { ssr: false });

type Props = {};

const page = async (props: Props) => {
    const result = await getSelf();

    return (
        <>
            <h2 className="text-3xl">Profile</h2>
            <div className="grid grid-cols-2 gap-10">
                <ProfileForm profile={result} />
            </div>
        </>
    );
};

export default page;
