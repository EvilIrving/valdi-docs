<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import { docsNav, apiNav, labsNav } from '@/utils/docs-logic'

const route = useRoute()

const navigation = computed(() => {
	const p = route.path
	if (p.startsWith('/api/')) return apiNav()
	if (p.startsWith('/codelabs/')) return labsNav()
	return docsNav()
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
