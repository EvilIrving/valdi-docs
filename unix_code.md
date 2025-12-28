# Code Style Guide - Unix Philosophy

## 1. 命名：短而精确

```typescript
// ✓ Unix 风格
load, search, play, isPlaying, off, res, p, a, w

// ✗ 冗长
loadWordsFromServer, handleSearchInputChange, audioElement
```

**原则**：上下文足够时用缩写，作用域越小名字越短

## 2. 函数：单一职责，10行内

```typescript
// ✓ 一个函数做一件事
function search(e: Event) {
  searchQuery = (e.target as HTMLInputElement).value;
  clearTimeout(debounce);
  debounce = setTimeout(() => { hasMore = true; load(true); }, 300);
}
```

**原则**：能拆则拆，能内联则内联

## 3. 状态：最小化

```typescript
// ✓ 合并相关状态
let playing = $state<{ id: string; accent: Accent } | null>(null);

// ✗ 分散状态
let playingWordId = $state<string | null>(null);
let playingUkWordId = $state<string | null>(null);
```

**原则**：一个概念一个变量

## 4. 条件：提前返回

```typescript
// ✓ Guard clause
async function load(reset = false) {
  if (isLoading || (!hasMore && !reset)) return;
  // 主逻辑...
}
```

**原则**：先排除异常，再走正常流程

## 5. 表达式：紧凑

```typescript
// ✓ 一行搞定
words = reset ? json.data : [...words, ...json.data];
a.play().catch(() => (playing = null));
```

**原则**：能用表达式就不用语句

## 6. 类型：按需标注

```typescript
// ✓ 必要时标注
let words = $state<Word[]>([]);

// ✓ 可推断时省略
const off = reset ? 0 : offset;
```

## 7. 错误处理：静默或日志

```typescript
// ✓ 简单处理
if (json.error) return console.error(json.error);
a.play().catch(() => (playing = null));
```

**原则**：失败就失败，别假装没事

## 8. 注释：无

```typescript
// ✓ 代码即文档
function isPlaying(word: Word, accent: Accent) {
  return playing?.id === word.id && playing?.accent === accent;
}
```

**原则**：好代码不需要注释

## 9. 代码量指标

| 指标 | 目标 |
|------|------|
| 函数体 | ≤ 15 行 |
| 文件 | ≤ 150 行 |
| 参数 | ≤ 3 个 |
| 嵌套 | ≤ 2 层 |
| 状态变量 | ≤ 10 个 |

## 哲学总结

> **Do one thing well. Make it composable. Keep it small.**
