<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DocsLayout from '../components/DocsLayout.vue'
import { resolveDocRoute } from '@/utils/docs-logic'

const props = defineProps<{
	category: string
	slug: string | string[]
}>()

const route = useRoute()

const fullSlug = computed(() => {
	// 组合 category 和 slug 形成完整的 slug
	const slugPart = Array.isArray(props.slug) ? props.slug.join('/') : props.slug
	return `${props.category}/${slugPart}`
})

const docResult = computed(() => resolveDocRoute(fullSlug.value))

const isNotFound = computed(() => docResult.value.status === 404)
const isError = computed(() => docResult.value.status === 500)
const content = computed(() => docResult.value.data?.content || '')
</script>

<template>
	<DocsLayout>
		<div v-if="isNotFound" class="not-found">
			<div class="not-found__code">404</div>
			<p class="not-found__message">Document not found</p>
			<RouterLink to="/" class="home__btn home__btn--primary">Back to Home</RouterLink>
		</div>

		<div v-else-if="isError" class="not-found">
			<div class="not-found__code">500</div>
			<p class="not-found__message">An error occurred</p>
			<RouterLink to="/" class="home__btn home__btn--primary">Back to Home</RouterLink>
		</div>

		<div v-else class="docs-content__wrapper">
			<pre class="docs-content__text">{{ content }}</pre>
		</div>
	</DocsLayout>
</template>
