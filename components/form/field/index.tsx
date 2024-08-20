import React, { ComponentProps } from 'react';
import { Field as HeadlessField } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
} & ComponentProps<typeof HeadlessField>;

const Field = ({ children, className, ...props }: Props) => {
    return (
        <HeadlessField className={cn('grid gap-1', className)} {...props}>
            {children}
        </HeadlessField>
    );
};

export default Field;
