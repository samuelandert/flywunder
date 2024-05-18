<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { createQuery } from '$lib/wundergraph';

	export let data;
	let loading = false;

	let { session } = data;
	$: ({ session } = data);

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const getUserDetailsQuery = createQuery({
		operationName: 'getMe',
		input: {
			userid: session.user.id
		}
	});
</script>

<form method="post" action="?/signout" use:enhance={handleSignOut}>
	<div>
		<button class="button block" disabled={loading}>Sign Out</button>
	</div>
</form>

{#if $getUserDetailsQuery.isLoading}
	<p>Loading user details...</p>
{:else if $getUserDetailsQuery.error}
	<pre>Error: {JSON.stringify($getUserDetailsQuery.error, null, 2)}</pre>
{:else if $getUserDetailsQuery.data}
	<div>
		<h1>User Profile</h1>
		<p>Username: {$getUserDetailsQuery.data.username}</p>
		<p>Full Name: {$getUserDetailsQuery.data.fullName}</p>
		<!-- <img src={$getUserDetailsQuery.data.avatarUrl} alt="User Avatar" /> -->
	</div>
{:else}
	Nothing to see here
{/if}
