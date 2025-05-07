'use client'

import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import Tag from '@/components/Tag'

export default function BlogCard({ post }) {
  const { path, date, title, summary, tags } = post

  return (
    <article className="group">
      <Link href={`/${path}`} aria-label={`Read "${title}"`}>
        <div className="rounded-2xl border border-gray-200 p-5 transition-all hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
          <div className="flex justify-between">
            <div className="w-full space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(date, siteMetadata.locale)}
              </div>

              <h2 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-lg leading-6 font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>

              <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{summary}</p>

              <div className="flex flex-wrap gap-2">
                {tags &&
                  tags.map((tag) => (
                    <Tag key={tag} text={tag} variant="pill" size="sm" isLink={false} />
                  ))}
              </div>
            </div>

            <div className="group-hover:text-primary-500 dark:group-hover:text-primary-400 ml-3 flex items-center self-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
