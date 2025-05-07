import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
        <Logo className="h-8 w-8" />
        {typeof siteMetadata.headerTitle === 'string' && (
          <span className="ml-3 text-2xl font-semibold">{siteMetadata.headerTitle}</span>
        )}
      </Link>
      <nav className="flex items-center space-x-4">
        <div className="hidden space-x-4 md:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 text-base font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </nav>
    </header>
  )
}
