import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import BlogCard from '@/components/BlogCard'

const MAX_DISPLAY = 12

export default function Home({ posts }) {
  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex items-center justify-between">
            {/* 以前のスタイルから変更されたタイトルスタイル */}
            <div className="pt-3">
              <h2 className="text-4xl font-bold">Latest</h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              View all posts →
            </Link>
          </div>
          <p className="text-sm leading-5 text-gray-600 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <div className="space-y-4">
          {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}

          {posts.slice(0, MAX_DISPLAY).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
