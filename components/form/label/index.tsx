import React, { ComponentProps } from 'react';
import { Label as HeadlessLabel } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
} & ComponentProps<typeof HeadlessLabel>;

const Label = ({ children, className, ...props }: Props) => {
    return (
        <HeadlessLabel className={cn('font-medium text-gray-800', className)} {...props}>
            {children}
        </HeadlessLabel>
    );
};

export default Label;
