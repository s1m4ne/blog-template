'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'

export default function TagsSidebar() {
  const pathname = usePathname()
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount
  const originalTags = tagInfo.originalTagMapping
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const encodedTagSlug = pathname.split('/tags/')[1]?.split('/')[0]
  const currentTagSlug = encodedTagSlug ? decodeURIComponent(encodedTagSlug) : ''

  return (
    <div className="hidden sm:mt-0 sm:block sm:w-1/4">
      <div className="w-full pt-11">
        <div className="mb-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <h2 className="text-xl font-bold">Tags</h2>
        </div>
        <div className="h-0"></div>

        <div className="mt-2 flex flex-wrap">
          {sortedTags.map((t) => {
            const tagSlug = slug(t)
            const isCurrentTag =
              currentTagSlug === tagSlug ||
              encodedTagSlug === tagSlug ||
              currentTagSlug === t ||
              pathname.includes(`/tags/${tagSlug}`)

            return (
              <Tag
                key={t}
                text={t}
                variant="pill"
                size="md"
                className={`m-1 ${
                  isCurrentTag
                    ? 'dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700 scale-110 border border-gray-300 bg-gray-200 font-bold text-gray-800'
                    : ''
                }`}
              />
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/tags"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            View all tags →
          </Link>
        </div>
      </div>
    </div>
  )
}
