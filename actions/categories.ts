'use server';

import { categories, items, users } from '@/database/schema';
import { authOptions } from '@/lib/config/auth';
import { db } from '@/lib/config/db';
import { count, desc, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    avatar: z.enum([
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        '11.png',
        '12.png'
    ])
});

export const getCategories = async () => {
    const result = await db
        .select({
            id: categories.id,
            title: categories.title,
            itemsCount: count(items.id)
        })
        .from(categories)
        .leftJoin(items, eq(items.categoryId, categories.id))
        .groupBy(categories.id)
        .orderBy(desc(categories.createdAt));
    return result;
};

export const getTopContributors = async () => {
    const result = await db
        .select({
            id: users.id,
            name: users.name,
            address: users.address,
            avatar: users.avatar,
            itemsCount: count(items.id)
        })
        .from(users)
        .leftJoin(items, eq(items.createdBy, users.id))
        .groupBy(users.id)
        .orderBy(desc(count(items.id)));

    return result;
};

export const updateProfile = async (prev: any, form: FormData) => {
    const validated = schema.safeParse({
        id: form.get('id'),
        name: form.get('name'),
        avatar: form.get('avatar')
    });

    if (!validated.success) {
        return {
            success: false,
            message: 'Failed to update profile!',
            errors: validated.error.flatten().fieldErrors
        };
    }

    const { id, ...data } = validated.data;

    await db.update(users).set(data).where(eq(users.id, id));

    revalidatePath('/profile');

    return { success: true, message: 'Profile updated successfully' };
};
