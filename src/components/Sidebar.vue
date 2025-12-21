<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavSection } from '@/utils/docs-logic'

const props = defineProps<{
	sections: NavSection[]
}>()

const route = useRoute()
const expandedSection = ref<string | null>(null)

// 根据当前路由自动展开对应的 section
const currentPath = computed(() => route.path)

watch(
	currentPath,
	(path) => {
		for (const section of props.sections) {
			if (section.items.some((item) => item.href === path)) {
				expandedSection.value = section.title
				break
			}
		}
	},
	{ immediate: true }
)

function toggleSection(title: string) {
	if (expandedSection.value === title) {
		expandedSection.value = null
	} else {
		expandedSection.value = title
	}
}

function isItemActive(href: string): boolean {
	return route.path === href
}
</script>

<template>
	<aside class="sidebar">
		<div
			v-for="section in sections"
			:key="section.title"
			class="sidebar__section"
			:class="{ expanded: expandedSection === section.title }"
		>
			<div class="sidebar__section-title" @click="toggleSection(section.title)">
				{{ section.title }}
			</div>
			<div class="sidebar__items">
				<RouterLink
					v-for="item in section.items"
					:key="item.href"
					:to="item.href"
					class="sidebar__item"
					:class="{ active: isItemActive(item.href) }"
				>
					{{ item.title }}
				</RouterLink>
			</div>
		</div>
	</aside>
</template>
