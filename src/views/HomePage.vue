<script setup lang="ts">
import { HOME_CONTENT } from '@/utils/docs-logic'
import { useSeo } from '@/composables/useSeo'

// SEO for homepage
useSeo({
	title: 'Vadli Documentation - Cross-Platform App Development Framework',
	description: 'Comprehensive documentation for Vadli, a powerful framework for building cross-platform applications. Learn core concepts, API references, and step-by-step tutorials.',
	canonical: 'https://vadli-docs.onecat.dev/',
	ogType: 'website'
})
</script>

<template>
	<div class="home">
		<section class="home__hero">
			<h1 class="home__title">{{ HOME_CONTENT.title }}</h1>
			<p class="home__subtitle">{{ HOME_CONTENT.subtitle }}</p>
			<div class="home__actions">
				<RouterLink :to="HOME_CONTENT.primaryAction.href" class="home__btn home__btn--primary">
					{{ HOME_CONTENT.primaryAction.label }}
				</RouterLink>
				<RouterLink :to="HOME_CONTENT.secondaryAction.href" class="home__btn home__btn--secondary">
					{{ HOME_CONTENT.secondaryAction.label }}
				</RouterLink>
			</div>
		</section>

		<section class="home__features">
			<div v-for="feature in HOME_CONTENT.features" :key="feature.title" class="home__feature">
				<h3 class="home__feature-title">{{ feature.title }}</h3>
				<p class="home__feature-desc">{{ feature.description }}</p>
				<RouterLink :to="feature.linkHref" class="home__feature-link">
					{{ feature.linkLabel }}
				</RouterLink>
			</div>
		</section>
	</div>
</template>
