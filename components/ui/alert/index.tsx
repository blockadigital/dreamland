import { Icon } from '@iconify/react';
import React, { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const alert = cva('flex h-14 items-center gap-2 rounded-xl border pl-4 pr-8 font-medium', {
    variants: {
        intent: {
            base: ['border-gray-300 text-gray-600'],
            success: ['border-success-300 text-success-600'],
            error: ['border-danger-300 text-danger-600']
        }
    }
});

type Props = VariantProps<typeof alert> & ComponentProps<'div'>;

const Alert = ({ children, intent = 'base', className, ...props }: Props) => {
    return (
        <div className={cn(alert({ intent }), className)} {...props}>
            <Icon icon="tabler:alert-circle" className="shrink-0 text-xl" />
            <p className="whitespace-nowrap text-inherit">{children}</p>
        </div>
    );
};

export default Alert;
