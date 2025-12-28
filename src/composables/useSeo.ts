import { onMounted, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { setMeta, setJsonLd, crumbData, articleData, type SeoMetaData } from '@/utils/seo'

export function seo(meta: Ref<SeoMetaData> | SeoMetaData) {
  const r = useRoute()
  const run = () => {
    const m = (meta as any).value ?? meta
    setMeta(m)
    if (r.path === '/') return
    const b = crumbData(r.path)
    setJsonLd(m.title && m.description && m.canonical
      ? { '@context': 'https://schema.org', '@graph': [b, articleData(m.title, m.description, m.canonical)] }
      : b)
  }
  onMounted(run)
  if ((meta as any).value) watch(meta, run, { deep: true })
}
