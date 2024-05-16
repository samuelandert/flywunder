<script lang="ts">
	import '../app.postcss';
	import { Drawer, AppShell, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<QueryClientProvider client={data.queryClient}>
	<Drawer bgDrawer="bg-white" height="h-auto">
		<ComposeView view={$drawerStore.meta} />
	</Drawer>

	<nav class="p-4 text-white bg-gray-800">
		<ul class="flex space-x-4">
			<li><a href="/" class="hover:text-gray-300">Home</a></li>
			<li><a href="/countries" class="hover:text-gray-300">Countries</a></li>
			<li><a href="/todos" class="hover:text-gray-300">Todos</a></li>
			<li><a href="/edit" class="hover:text-gray-300">Edit</a></li>
		</ul>
	</nav>

	<AppShell>
		<slot />
	</AppShell>
</QueryClientProvider>