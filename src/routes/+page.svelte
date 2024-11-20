<script>
	// Reaktivní proměnné
	let name = $state(''); // $state("") - reaktivita
	let age = $state('');
	let selectedUserName = $state('');
	let selectedUser = $state(null);
	let users = $state([]);

	// Načítání uživatelů z API
	const loadUsers = async () => {
		try {
			const response = await fetch('/api/get-users');
			if (response.ok) users = await response.json();
			else console.error('Chyba při načítání uživatelů:', await response.text());
		} catch (error) {
			console.error('Chyba při načítání uživatelů:', error);
		}
	};

	// Přidání uživatele
	const addUser = async () => {
		if (!name || !age) return alert('Vyplňte jméno a věk.');

		try {
			const response = await fetch('/api/add-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, age }),
			});
			if (response.ok) {
				name = '';
				age = '';
				await loadUsers();
			} else alert('Chyba při přidávání uživatele.');
		} catch (error) {
			console.error('Chyba při přidávání uživatele:', error);
		}
	};

	// Filtrování uživatele podle jména
	$effect(() => {
		selectedUser = users.find((user) => user.name === selectedUserName) || null;
	});

	// Automatické načtení uživatelů při spuštění
	$effect(loadUsers);
</script>

<h1>Správa uživatelů</h1>

<!-- Formulář pro přidání uživatele -->
<div>
	<input type="text" placeholder="Jméno" bind:value={name} />
	<input type="number" placeholder="Věk" bind:value={age} />
	<button onclick={addUser}>Přidat uživatele</button>
</div>

<!-- Výběr uživatele podle jména -->
<div>
	<select bind:value={selectedUserName}>
		<option value="" disabled>Vyber jméno uživatele</option>
		{#each users as user}
			<option value={user.name}>{user.name}</option>
		{/each}
	</select>
</div>

<!-- Zobrazení detailů vybraného uživatele -->
{#if selectedUser}
	<h2>Detail uživatele</h2>
	<p><strong>ID:</strong> {selectedUser.id}</p>
	<p><strong>Jméno:</strong> {selectedUser.name}</p>
	<p><strong>Věk:</strong> {selectedUser.age}</p>
{/if}

<!-- Výpis všech uživatelů -->
<h2>Seznam všech uživatelů</h2>
<ul>
	{#each users as user}
		<li>
			<strong>ID:</strong> {user.id}, 
			<strong>Jméno:</strong> {user.name}, 
			<strong>Věk:</strong> {user.age}
		</li>
	{/each}
</ul>
