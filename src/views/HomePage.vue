<script setup lang="ts">
import { HOME } from '@/utils/docs-logic'
import { seo } from '@/composables/useSeo'

seo({
  title: 'Vadli Documentation - Cross-Platform App Development Framework',
  description: 'Comprehensive documentation for Vadli, a powerful framework for building cross-platform applications. Learn core concepts, API references, and step-by-step tutorials.',
  canonical: 'https://vadli-docs.onecat.dev/',
  ogType: 'website'
})
</script>

<template>
  <div class="home">
    <section class="home__hero">
      <h1 class="home__title">{{ HOME.title }}</h1>
      <p class="home__subtitle">{{ HOME.subtitle }}</p>
      <div class="home__actions">
        <RouterLink :to="HOME.primary.href" class="home__btn home__btn--primary">{{ HOME.primary.title }}</RouterLink>
        <RouterLink :to="HOME.secondary.href" class="home__btn home__btn--secondary">{{ HOME.secondary.title }}</RouterLink>
      </div>
    </section>
    <section class="home__features">
      <div v-for="f in HOME.features" :key="f.title" class="home__feature">
        <h3 class="home__feature-title">{{ f.title }}</h3>
        <p class="home__feature-desc">{{ f.desc }}</p>
        <RouterLink :to="f.href" class="home__feature-link">{{ f.label }}</RouterLink>
      </div>
    </section>
  </div>
</template>
