import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)

  // タグデータから元のタグ名を取得（存在する場合）
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }

  // tag-data.json の新しい構造に対応
  const originalTagMapping = tagInfo.originalTagMapping || {}
  const originalTag = originalTagMapping[tag] || tag

  return genPageMetadata({
    title: originalTag,
    description: `${siteMetadata.title} ${originalTag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  // tag-data.json の新しい構造に対応
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount || {}
  const tagKeys = Object.keys(tagCounts)

  // タグごとに単一のバージョンを生成（エンコードなし）
  return tagKeys.map((tag) => ({
    tag: tag,
  }))
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)

  // タグデータから元のタグ名を取得（存在する場合）
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const originalTagMapping = tagInfo.originalTagMapping || {}
  const originalTag = originalTagMapping[tag] || tag

  // タイトルに元のタグ名を使用
  const title = originalTag

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
