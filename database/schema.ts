import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const users = pgTable('users', {
    id: varchar('id', { length: 128 })
        .$defaultFn(() => createId())
        .primaryKey(),
    avatar: varchar('avatar', { length: 256 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    address: varchar('address', { length: 256 }).notNull().unique(),
    isAdmin: boolean('is_admin').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const categories = pgTable('categories', {
    id: varchar('id', { length: 128 })
        .$defaultFn(() => createId())
        .primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    createdBy: varchar('created_by', { length: 128 })
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const items = pgTable('items', {
    id: varchar('id', { length: 128 })
        .$defaultFn(() => createId())
        .primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    site: varchar('site', { length: 256 }).notNull(),
    description: text('description').notNull(),
    isAproved: boolean('is_aproved').default(false),
    isWaiting: boolean('is_waiting').default(true),
    isRejected: boolean('is_rejected').default(false),
    note: text('note'),
    createdBy: varchar('created_by', { length: 128 })
        .references(() => users.id)
        .notNull(),
    categoryId: varchar('category_id', { length: 128 })
        .references(() => categories.id)
        .notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
