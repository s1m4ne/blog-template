import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  // tag-data.json の新しい構造に対応
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount || {}
  const originalTagMapping = tagInfo.originalTagMapping || {}

  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  // タグの最大カウント数と最小カウント数を取得
  const maxCount = Math.max(...Object.values(tagCounts))
  const minCount = Math.min(...Object.values(tagCounts))

  // フォントサイズを計算する関数（より控えめな範囲で）
  const calculateFontSize = (count: number) => {
    // 最小サイズ0.75rem、最大サイズ1.5remで計算（大きすぎないように調整）
    if (maxCount === minCount) return 0.875 // すべてのタグのカウントが同じ場合
    const fontSize = 0.75 + ((count - minCount) / (maxCount - minCount)) * 0.75
    return fontSize.toFixed(1)
  }

  return (
    <div className="flex flex-col items-start justify-start pt-9 pb-8">
      <div className="mb-4">
        <h2 className="text-4xl font-bold">Tags</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{sortedTags.length} tags</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          const count = tagCounts[t]
          const fontSize = calculateFontSize(count)
          // 表示用のタグ名に元の大文字小文字を使用
          const displayTag = originalTagMapping[t] || t

          return (
            <div key={t} className="group relative">
              <Link
                href={`/tags/${slug(t)}`}
                className="inline-block rounded-full border border-gray-200 bg-gray-100 px-3 py-1 transition-all hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                style={{ fontSize: `${fontSize}rem` }}
                aria-label={`View posts tagged ${displayTag}`}
              >
                {displayTag}
                <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                  {count}
                </span>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
