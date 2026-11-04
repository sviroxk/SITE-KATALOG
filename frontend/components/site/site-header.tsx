import Link from 'next/link'

const links = [
  { href: '/movies', label: 'Кино и сериалы' },
  { href: '/games', label: 'Игры' },
  { href: '/books', label: 'Книги' }
]

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="VEYRA — главная">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M26.5 3.5 8 26h12.2l-1.1 18.5L40 20.8H27.7L26.5 3.5Z" />
        <path className="brand-mark-cut" d="m26.5 3.5-6.3 22.6h8L19.1 44.5l1.1-18.5H8L26.5 3.5Z" />
      </svg>
      <span className="brand-wordmark">VEYRA</span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="topbar">
      <Brand />
      <nav className="main-nav" aria-label="Основная навигация">
        {links.map(({ href, label }) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className="nav-link nav-collections" href="/collections">Коллекции</Link>
        <Link className="profile-trigger" href="/library">
          <span className="profile-dot" aria-hidden="true">М</span>
          <span>Моя медиатека</span>
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Открыть меню"><span /><span /><span /></summary>
          <nav aria-label="Мобильная навигация">
            {[...links, { href: '/library', label: 'Медиатека' }, { href: '/collections', label: 'Коллекции' }].map(({ href, label }) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
