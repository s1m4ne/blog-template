'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'

export type TagVariant = 'default' | 'pill' | 'bubble' | 'count'

interface Props {
  text: string
  variant?: TagVariant
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
  isLink?: boolean
}

const Tag = ({
  text,
  variant = 'default',
  size = 'md',
  showCount = false,
  className = '',
  isLink = true,
}: Props) => {
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount || {}
  const originalTagMapping = tagInfo.originalTagMapping || {}

  const displayTag = originalTagMapping[slug(text)] || text
  const count = tagCounts[slug(text)] || 0

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-0.5',
    lg: 'text-sm px-3 py-1',
  }

  const variantClasses = {
    default:
      'text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 font-mono font-medium',
    pill: 'rounded-full border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    bubble:
      'rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800',
    count:
      'rounded-full border border-gray-200 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative',
  }

  const handleClick = (e) => {
    e.stopPropagation()
  }

  if (!isLink) {
    return (
      <span className={`inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
        {displayTag}
        {showCount && variant === 'count' && (
          <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
            {count}
          </span>
        )}
      </span>
    )
  }

  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label={`View posts tagged ${displayTag}`}
      onClick={handleClick}
    >
      {displayTag}
      {showCount && variant === 'count' && (
        <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
          {count}
        </span>
      )}
    </Link>
  )
}

export default Tag
