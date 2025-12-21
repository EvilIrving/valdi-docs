<script setup lang="ts">
import { HOME_CONTENT } from '@/utils/docs-logic'
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
