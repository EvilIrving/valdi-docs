<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import { getDocsNavigation, getApiNavigation, getCodelabsNavigation } from '@/utils/docs-logic'

const route = useRoute()

const navigation = computed(() => {
	const path = route.path
	if (path.startsWith('/api/')) {
		return getApiNavigation()
	} else if (path.startsWith('/codelabs/')) {
		return getCodelabsNavigation()
	} else {
		return getDocsNavigation()
	}
})
</script>

<template>
	<div class="docs-layout">
		<Sidebar :sections="navigation" />
		<main class="docs-content">
			<slot />
		</main>
	</div>
</template>
