'use client';

import { cn } from '@/lib/utils/cn';
import { Button as HeadlessButton } from '@headlessui/react';
import { Icon } from '@iconify/react';
import React, { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
    icon?: string;
} & ComponentProps<typeof HeadlessButton>;

const Button = ({ children, icon, className, ...props }: Props) => {
    const { pending } = useFormStatus();

    return (
        <HeadlessButton
            disabled={pending}
            className={cn(
                'inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gray-800 px-8 font-medium text-white transition-all',
                className ?? ''
            )}
            {...props}
        >
            {pending ? (
                <Icon icon="tabler:loader" className="animate-spin text-lg" />
            ) : (
                <>
                    {children}
                    {icon ? <Icon icon={icon} className="text-lg" /> : null}
                </>
            )}
        </HeadlessButton>
    );
};

export default Button;
