// scripts/rss.mjs

import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags?.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => {
  // ◆ 空配列ガード
  if (!posts || posts.length === 0) {
    console.warn('⚠️ RSS: 投稿記事が見つかりませんでした。空のフィードを生成します。')
    const now = new Date().toUTCString()
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(config.title)}</title>
    <link>${config.siteUrl}/blog</link>
    <description>${escape(config.description)}</description>
    <language>${config.language}</language>
    <managingEditor>${config.email} (${config.author})</managingEditor>
    <webMaster>${config.email} (${config.author})</webMaster>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`
  }

  // ◆ 通常のフィード生成
  const latestBuildDate = new Date(posts[0].date).toUTCString()
  const itemsXml = posts.map((post) => generateRssItem(config, post)).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(config.title)}</title>
    <link>${config.siteUrl}/blog</link>
    <description>${escape(config.description)}</description>
    <language>${config.language}</language>
    <managingEditor>${config.email} (${config.author})</managingEditor>
    <webMaster>${config.email} (${config.author})</webMaster>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`
}

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  // draft が true でないものを公開記事とみなす
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  const sortedPosts = sortPosts(publishPosts)

  // — ブログ全体フィード
  const blogFeed = generateRss(config, sortedPosts, page)
  writeFileSync(`./${outputFolder}/${page}`, blogFeed)

  // — タグごとフィード
  for (const tag of Object.keys(tagData)) {
    const postsByTag = sortedPosts.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
    const tagFeed = generateRss(config, postsByTag, `tags/${tag}/${page}`)
    const rssDir = path.join(outputFolder, 'tags', tag)
    mkdirSync(rssDir, { recursive: true })
    writeFileSync(path.join(rssDir, page), tagFeed)
  }
}

const rss = () => {
  try {
    generateRSS(siteMetadata, allBlogs)
    console.log('✅ RSS feed generated...')
  } catch (e) {
    console.warn('⚠️ RSS generation failed, but build will continue:', e)
  }
}

export default rss
