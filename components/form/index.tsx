import { cn } from '@/lib/utils/cn';
import { Fieldset } from '@headlessui/react';
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'form'>;

const Form = ({ children, className, ...props }: Props) => {
    return (
        <Fieldset as="form" className={cn('space-y-6', className)} {...props}>
            {children}
        </Fieldset>
    );
};

export default Form;
