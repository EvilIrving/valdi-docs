import { onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  updateMetaTags,
  addStructuredData,
  generateBreadcrumbData,
  generateArticleData,
  type SeoMetaData
} from '@/utils/seo'

export function useSeo(meta: Ref<SeoMetaData> | SeoMetaData) {
  const route = useRoute()

  const updateSeo = () => {
    const metaData = typeof meta === 'object' && 'value' in meta ? meta.value : meta
    updateMetaTags(metaData)

    // Add breadcrumb structured data
    if (route.path !== '/') {
      const breadcrumbData = generateBreadcrumbData(route.path)
      addStructuredData(breadcrumbData)

      // Add article structured data if available
      if (metaData.title && metaData.description && metaData.canonical) {
        const articleData = generateArticleData(
          metaData.title,
          metaData.description,
          metaData.canonical
        )

        // Combine breadcrumb and article data
        addStructuredData({
          '@context': 'https://schema.org',
          '@graph': [breadcrumbData, articleData]
        })
      }
    }
  }

  onMounted(() => {
    updateSeo()
  })

  // If meta is reactive, watch for changes
  if (typeof meta === 'object' && 'value' in meta) {
    watch(meta, () => {
      updateSeo()
    }, { deep: true })
  }

  return {
    updateSeo
  }
}
