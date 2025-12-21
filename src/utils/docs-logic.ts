// utils/docs-logic.ts
// 独立于 UI 框架的文档与导航逻辑，方便在不同框架中复用。

// ----------------------
// 类型定义
// ----------------------

export interface DocModule {
  default: string;
  metadata?: Record<string, unknown>;
}

export interface Doc {
  slug: string;
  path: string;
  metadata: Record<string, unknown>;
  content: string;
}

export interface NavItem {
  title: string;
  href: string;
  order?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  order: number;
}

// ----------------------
// 文档加载逻辑
// ----------------------

// 这里仍然使用 Vite 风格的 import.meta.glob，
// 但封装在纯 TS 模块中，方便未来迁移时集中替换。
const docModules = import.meta.glob<DocModule>('/src/content/**/*.md', {
  eager: true,
  query: '?raw'
});

export function getAllDocs(): Doc[] {
  const docs: Doc[] = [];

  for (const [path, mod] of Object.entries(docModules)) {
    const slug = path.replace('/src/content/', '').replace('.md', '');

    docs.push({
      slug,
      path,
      metadata: (mod.metadata as Record<string, unknown>) || {},
      content: mod.default
    });
  }

  return docs;
}

export function getDocBySlug(slug: string): Doc | undefined {
  const docs = getAllDocs();
  return docs.find((doc) => doc.slug === slug);
}

export function getDocsByCategory(category: string): Doc[] {
  const docs = getAllDocs();
  return docs.filter((doc) => doc.slug.startsWith(category + '/'));
}

// ----------------------
// 标题提取逻辑
// ----------------------

function extractTitleFromFilename(filename: string): string {
  let title = filename
    .replace(/^\d+-/, '')
    .replace(/^(start|core|native|advanced|performance|workflow|help|stdlib|client-libraries|api)-?/, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ');

  return title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractTitleFromDoc(doc: Doc): string {
  const metadata = doc.metadata as { title?: string };
  if (metadata?.title) return metadata.title;

  const parts = doc.slug.split('/');
  const filename = parts[parts.length - 1];
  // 修复类型错误：确保 filename 存在且不为空
  if (filename && filename.trim() !== '') {
    return extractTitleFromFilename(filename);
  }
  return 'Untitled';
}

// ----------------------
// 导航结构生成
// ----------------------

const DOCS_CATEGORIES: Record<string, { title: string; order: number; prefixes: string[] }> = {
  'getting-started': {
    title: 'Getting Started',
    order: 1,
    prefixes: ['start-']
  },
  'core-concepts': {
    title: 'Core Concepts',
    order: 2,
    prefixes: ['core-', 'control-']
  },
  'native-integration': {
    title: 'Native Integration',
    order: 3,
    prefixes: ['native-']
  },
  navigation: {
    title: 'Navigation',
    order: 4,
    prefixes: ['navigation']
  },
  'client-libraries': {
    title: 'Client Libraries',
    order: 5,
    prefixes: ['client-libraries-', 'advanced-protobuf']
  },
  'standard-library': {
    title: 'Standard Library',
    order: 6,
    prefixes: ['stdlib-', 'glossary']
  },
  advanced: {
    title: 'Advanced Topics',
    order: 7,
    prefixes: ['advanced-']
  },
  performance: {
    title: 'Performance',
    order: 8,
    prefixes: ['performance-']
  },
  workflow: {
    title: 'Workflow',
    order: 9,
    prefixes: ['workflow-', 'command-line']
  },
  misc: {
    title: 'Misc',
    order: 10,
    prefixes: ['third-party', 'faq']
  },
  help: {
    title: 'Help',
    order: 11,
    prefixes: ['help-']
  }
};

const API_SECTIONS: Record<string, { title: string; order: number }> = {
  'api-quick-reference': { title: 'Quick Reference', order: 1 },
  'api-reference-elements': { title: 'Elements', order: 2 },
  'api-style-attributes': { title: 'Style Attributes', order: 3 }
};

const CODELABS_SECTIONS: Record<string, { title: string; order: number }> = {
  getting_started: { title: 'Getting Started', order: 1 },
  advanced_ui: { title: 'Advanced UI', order: 2 },
  integration_with_native: { title: 'Integration with Native', order: 3 },
  shared_business_logic: { title: 'Shared Business Logic', order: 4 }
};

export function getDocsNavigation(): NavSection[] {
  const docs = getDocsByCategory('docs');
  const categorized: Map<string, NavItem[]> = new Map();

  for (const doc of docs) {
    const filename = doc.slug.replace('docs/', '');

    let matchedCategory: string | null = null;
    for (const [catKey, catConfig] of Object.entries(DOCS_CATEGORIES)) {
      if (catConfig.prefixes.some((prefix) => filename.startsWith(prefix))) {
        matchedCategory = catKey;
        break;
      }
    }

    if (filename === 'advanced-protobuf' && matchedCategory === 'advanced') {
      matchedCategory = 'client-libraries';
    }

    if (!matchedCategory) {
      matchedCategory = 'misc';
    }

    if (!categorized.has(matchedCategory)) {
      categorized.set(matchedCategory, []);
    }

    categorized.get(matchedCategory)!.push({
      title: extractTitleFromDoc(doc),
      href: `/${doc.slug}`
    });
  }

  const result: NavSection[] = [];

  for (const [key, items] of categorized) {
    const config = DOCS_CATEGORIES[key];
    items.sort((a, b) => a.title.localeCompare(b.title));

    result.push({
      title: config?.title || key,
      order: config?.order || 99,
      items
    });
  }

  result.sort((a, b) => a.order - b.order);
  return result;
}

export function getApiNavigation(): NavSection[] {
  const docs = getDocsByCategory('api');
  const items: NavItem[] = [];

  for (const doc of docs) {
    const filename = doc.slug.replace('api/', '');
    const config = API_SECTIONS[filename];

    items.push({
      title: config?.title || extractTitleFromDoc(doc),
      href: `/${doc.slug}`,
      order: config?.order || 99
    });
  }

  items.sort((a, b) => (a.order || 99) - (b.order || 99));

  return [
    {
      title: 'API Reference',
      order: 1,
      items
    }
  ];
}

export function getCodelabsNavigation(): NavSection[] {
  const docs = getDocsByCategory('codelabs');
  const sections: Map<string, NavItem[]> = new Map();

  for (const doc of docs) {
    const parts = doc.slug.replace('codelabs/', '').split('/');

    if (parts.length >= 2) {
      const sectionKey = parts[0];
      const filename = parts[parts.length - 1];

      if (sectionKey && filename) {
        if (!sections.has(sectionKey)) {
          sections.set(sectionKey, []);
        }

        const orderMatch = filename.match(/^(\d+)-/);
        // 修复类型错误：确保 orderMatch 存在并且有第一个捕获组
        const order = orderMatch && orderMatch[1] ? parseInt(orderMatch[1], 10) : 99;

        sections.get(sectionKey)!.push({
          title: extractTitleFromDoc(doc),
          href: `/${doc.slug}`,
          order
        });
      }
    } else {
      if (!sections.has('general')) {
        sections.set('general', []);
      }
      sections.get('general')!.push({
        title: extractTitleFromDoc(doc),
        href: `/${doc.slug}`,
        order: 99
      });
    }
  }

  const result: NavSection[] = [];

  for (const [key, items] of sections) {
    const config = CODELABS_SECTIONS[key];
    items.sort((a, b) => (a.order || 99) - (b.order || 99));

    result.push({
      title: config?.title || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      order: config?.order || 99,
      items
    });
  }

  result.sort((a, b) => a.order - b.order);
  return result;
}

export function getFullNavigation(): {
  docs: NavSection[];
  api: NavSection[];
  codelabs: NavSection[];
} {
  return {
    docs: getDocsNavigation(),
    api: getApiNavigation(),
    codelabs: getCodelabsNavigation()
  };
}

// ----------------------
// 路由解析逻辑（框架无关）
// ----------------------

export interface RouteResult<T> {
  status: number;
  data?: T;
  error?: Error;
}

export interface DocRouteData {
  content: string;
  metadata: Record<string, unknown>;
}

export function resolveDocRoute(slug: string): RouteResult<DocRouteData> {
  try {
    const doc = getDocBySlug(slug);
    if (!doc) {
      return {
        status: 404,
        error: new Error('Document not found')
      };
    }

    return {
      status: 200,
      data: {
        content: doc.content,
        metadata: doc.metadata || {}
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// ----------------------
// 首页文案配置
// ----------------------

export interface HomeButtonConfig {
  label: string;
  href: string;
  style: 'primary' | 'secondary';
}

export interface HomeFeatureConfig {
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}

export interface HomeContentConfig {
  title: string;
  subtitle: string;
  primaryAction: HomeButtonConfig;
  secondaryAction: HomeButtonConfig;
  features: HomeFeatureConfig[];
}

export const HOME_CONTENT: HomeContentConfig = {
  title: 'Vadli Documentation',
  subtitle: 'Learn how to build cross-platform applications with Vadli',
  primaryAction: {
    label: 'Get Started',
    href: '/docs/start-introduction',
    style: 'primary'
  },
  secondaryAction: {
    label: 'API Reference',
    href: '/api/api-quick-reference',
    style: 'secondary'
  },
  features: [
    {
      title: 'Documentation',
      description: 'Comprehensive guides covering all aspects of Vadli development.',
      linkHref: '/docs/start-introduction',
      linkLabel: 'Read the docs'
    },
    {
      title: 'Code Labs',
      description: 'Step-by-step tutorials to help you learn by doing.',
      linkHref: '/codelabs/getting_started/1-introduction',
      linkLabel: 'Start learning'
    },
    {
      title: 'API Reference',
      description: 'Detailed API documentation for all elements and attributes.',
      linkHref: '/api/api-quick-reference',
      linkLabel: 'View API'
    }
  ]
};
