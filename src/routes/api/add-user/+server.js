import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';

export async function POST({ request }) {
	try {
		const { name, age } = await request.json();

		if (!name || !age) {
			return json({ error: 'Jméno a věk jsou povinné.' }, { status: 400 });
		}

		await db.insert(user).values({ name, age });
		return json({ message: 'Uživatel přidán.' }, { status: 200 });
		
	} catch (error) {
		console.error('Chyba při přidávání uživatele:', error);
		return json({ error: 'Interní chyba serveru.' }, { status: 500 });
	}
}
