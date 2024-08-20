import React, { ComponentProps } from 'react';
import { Input as HeadlessInput } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
} & ComponentProps<typeof HeadlessInput> &
    ComponentProps<'input'>;

const Input = ({ className, ...props }: Props) => {
    return (
        <HeadlessInput
            className={cn(
                'inline-flex h-14 w-full rounded-xl border px-6 ring-offset-2 transition-all focus:border-gray-800 focus:outline-none',
                className
            )}
            {...props}
        />
    );
};

export default Input;
