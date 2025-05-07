'use client'

import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import BlogPostsList from '@/layouts/BlogPostsList'
import TagsSidebar from '@/layouts/TagsSidebar'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  return (
    <>
      <div>
        <div className="pt-3 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-8">
          <BlogPostsList
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
          />
          <TagsSidebar />
        </div>
      </div>
    </>
  )
}
