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

	<AppShell>
		<slot />
	</AppShell>
</QueryClientProvider>
