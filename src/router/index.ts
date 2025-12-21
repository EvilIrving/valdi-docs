import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import DocPage from '@/views/DocPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/docs/:slug+',
      name: 'docs',
      component: DocPage,
      props: route => ({ category: 'docs', slug: route.params.slug })
    },
    {
      path: '/api/:slug+',
      name: 'api',
      component: DocPage,
      props: route => ({ category: 'api', slug: route.params.slug })
    },
    {
      path: '/codelabs/:slug+',
      name: 'codelabs',
      component: DocPage,
      props: route => ({ category: 'codelabs', slug: route.params.slug })
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
