<script lang="ts">
	import { createQuery } from '../../lib/wundergraph';

	const todosQuery = createQuery({
		operationName: 'Todos',
		input: {}
	});
</script>

<div class="results">
	{#if $todosQuery.isLoading}
		<p>Loading...</p>
	{:else if $todosQuery.error}
		<pre>Error: {JSON.stringify($todosQuery.error, null, 2)}</pre>
	{:else}
		<ul>
			{#each $todosQuery.data as todo}
				<li>{todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}</li>
			{/each}
		</ul>
	{/if}
</div>
