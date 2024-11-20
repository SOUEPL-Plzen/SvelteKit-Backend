import { date } from 'drizzle-orm/mysql-core';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';


/*
            npx drizzle-kit generate - Create migrations documentions jason
            npx drizzle-kit push - Pushed schema.ts to db

            alt + shift + a = coment celý blok

*/

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(), // Primární klíč
	name: text('name').notNull(),   // Jméno, nesmí být null
	age: integer('age').notNull()   // Věk, nesmí být null
});

export const sekce = sqliteTable('sekce', {
	id: integer('id').primaryKey(), // Primární klíč
	name: text('name').notNull(),   // Jméno, nesmí být null
	description: text('description').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});
