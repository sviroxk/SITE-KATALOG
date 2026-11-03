import Link from 'next/link'

const links = [
  { href: '/movies', label: 'Кино и сериалы' },
  { href: '/games', label: 'Игры' },
  { href: '/books', label: 'Книги' }
]

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="SITE KATALOG — главная">
      <span className="brand-mark" aria-hidden="true">S</span>
      <span>SITE</span><span className="brand-name-muted">KATALOG</span>
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
