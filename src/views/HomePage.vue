<script setup lang="ts">
import { HOME } from '@/utils/docs-logic'
import { seo } from '@/composables/useSeo'

seo({
  title: 'Vadli Documentation - Cross-Platform App Development Framework',
  description: 'Comprehensive documentation for Vadli, a powerful framework for building cross-platform applications. Learn core concepts, API references, and step-by-step tutorials.',
  canonical: 'https://vadli-docs.onecat.dev/',
  ogType: 'website'
})

const githubUrl = 'https://github.com/EvilIrving/vadli-docs.git'
</script>

<template>
  <div class="home">
    <section class="home__hero">
      <div class="home__header">
        <h1 class="home__title">Vadli</h1>
        <p class="home__subtitle">{{ HOME.subtitle }}</p>

        <div class="home__actions">
          <RouterLink :to="HOME.primary.href" class="home__btn home__btn--primary">
            Read the Docs
          </RouterLink>
          <a :href="githubUrl" target="_blank" class="home__btn home__btn--secondary">
            <svg viewBox="0 0 16 16" fill="currentColor" style="width:16px;height:16px"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </section>

    <section class="home__features">
      <div v-for="f in HOME.features" :key="f.title" class="home__feature">
        <div class="home__feature-header">
          <div class="home__feature-icon">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a.75.75 0 01.75.75v6.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22V1.75A.75.75 0 018 1z"/></svg>
          </div>
          <h3 class="home__feature-title">{{ f.title }}</h3>
        </div>
        <p class="home__feature-desc">{{ f.desc }}</p>
        <RouterLink :to="f.href" class="home__feature-link">
          Learn more
        </RouterLink>
      </div>
    </section>
  </div>
</template>
