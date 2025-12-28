<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavSection } from '@/utils/docs-logic'

const props = defineProps<{ sections: NavSection[] }>()
const route = useRoute()
const expanded = ref<string | null>(null)

watch(() => route.path, p => {
  expanded.value = props.sections.find(s => s.items.some(i => i.href === p))?.title || null
}, { immediate: true })

const toggle = (t: string) => expanded.value = expanded.value === t ? null : t
const isActive = (h: string) => route.path === h
</script>

<template>
  <aside class="sidebar">
    <div v-for="s in sections" :key="s.title" class="sidebar__section" :class="{ expanded: expanded === s.title }">
      <div class="sidebar__section-title" @click="toggle(s.title)">
        <span class="tree-toggle" :class="{ expanded: expanded === s.title }">▶</span>
        {{ s.title }}
      </div>
      <div class="sidebar__items">
        <RouterLink v-for="i in s.items" :key="i.href" :to="i.href" class="sidebar__item" :class="{ active: isActive(i.href) }">
          <span class="tree-node">├</span>
          {{ i.title }}
        </RouterLink>
      </div>
    </div>
  </aside>
</template>
