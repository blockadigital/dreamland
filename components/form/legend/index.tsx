import React, { ComponentProps } from 'react';
import { Legend as HeadlessLegend } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
} & ComponentProps<typeof HeadlessLegend>;

const Legend = ({ className, children, ...props }: Props) => {
    return (
        <HeadlessLegend className={cn('text-lg font-bold', className)} {...props}>
            {children}
        </HeadlessLegend>
    );
};

export default Legend;
