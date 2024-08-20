'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Button from '@/components/ui/button';
import { updateProfile } from '@/actions/auth';
import { useFormState } from 'react-dom';
import { User } from '@/database/schema';
import Form from '@/components/form';
import Alert from '@/components/ui/alert';
import { useAccount } from 'wagmi';
import { signOut } from 'next-auth/react';
import Legend from '@/components/form/legend';
import Field from '@/components/form/field';
import Label from '@/components/form/label';
import Input from '@/components/form/input';

type Props = {
    profile: User;
};

const initialState = {
    message: '',
    errors: {},
    success: false
};

const ProfileForm = ({ profile }: Props) => {
    const { address } = useAccount();
    const [state, formAction] = useFormState(updateProfile, initialState);

    useEffect(() => {
        if (!address || address !== profile?.address) signOut({ callbackUrl: '/' });
    }, [address, profile?.address]);

    return (
        <>
            <Form action={formAction}>
                <Legend>Edit Profile</Legend>
                {state?.message && <Alert intent={state.success ? 'success' : 'error'}>{state.message}</Alert>}
                <div className="space-y-4">
                    <input type="hidden" value={profile?.id} name="id" />
                    <div className="grid gap-1">
                        <Label>Avatar</Label>
                        <RadioGroup defaultValue={profile?.avatar} className="flex flex-wrap gap-2" name="avatar">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Field key={i} className="flex items-center gap-2">
                                    <Radio
                                        value={`${i + 1}.png`}
                                        className="rounded-full border-2 border-dashed border-transparent data-[checked]:border-gray-800"
                                    >
                                        <Image
                                            className="size-16 rounded-full object-cover"
                                            src={`/pfp/${i + 1}.png`}
                                            width={40}
                                            height={40}
                                            alt="pfp"
                                        />
                                    </Radio>
                                </Field>
                            ))}
                        </RadioGroup>
                        <p className="text-sm font-medium text-danger-500">{state?.errors?.avatar}</p>
                    </div>
                    <Field>
                        <Label>Address</Label>
                        <Input name="address" disabled value={profile?.address} />
                    </Field>
                    <Field>
                        <Label>Name</Label>
                        <Input
                            className={`${state?.errors?.name ? 'border-danger-500' : 'border-gray-300'}`}
                            placeholder="Kimmy Pow"
                            name="name"
                            defaultValue={profile?.name}
                        />
                        <p className="text-sm font-medium text-danger-500">{state?.errors?.name}</p>
                    </Field>
                </div>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
};

export default ProfileForm;
