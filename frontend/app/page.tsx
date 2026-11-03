import Link from 'next/link'

const navItems = [
  { href: '/movies', label: 'Кино' },
  { href: '/games', label: 'Игры' },
  { href: '/books', label: 'Книги' },
  { href: '/library', label: 'Медиатека' },
  { href: '/collections', label: 'Коллекции' }
]

const categories = [
  {
    href: '/movies',
    label: 'Фильмы и сериалы',
    description: 'Большие истории и новые открытия',
    symbol: '✦',
    icon: '▣',
    className: 'category-card-movies'
  },
  {
    href: '/games',
    label: 'Видеоигры',
    description: 'Миры, в которые хочется вернуться',
    symbol: '⌘',
    icon: '◈',
    className: 'category-card-games'
  },
  {
    href: '/books',
    label: 'Книги',
    description: 'Страницы для каждого настроения',
    symbol: '❧',
    icon: '▤',
    className: 'category-card-books'
  }
]

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="SITE KATALOG — главная">
      <span className="brand-mark" aria-hidden="true">S</span>
      <span>SITE</span><span>KATALOG</span>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Brand />
        <nav className="main-nav" aria-label="Основная навигация">
          {navItems.map(({ href, label }) => (
            <Link className="nav-link" href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="search-trigger" type="button" aria-label="Поиск">⌕</button>
          <Link className="profile-trigger" href="/library">
            <span className="profile-dot" aria-hidden="true">Я</span>
            Мой каталог
          </Link>
        </div>
      </header>

      <main>
        <div className="hero-wrap">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> ТВОЯ МЕДИАВСЕЛЕННАЯ</div>
              <h1 id="hero-title">Всё, что любишь.<br /><em>В одном месте.</em></h1>
              <p className="hero-description">
                Фильмы, игры и книги, которые хочется сохранить. Собирай свою коллекцию, отмечай любимое и открывай новое.
              </p>
              <Link className="hero-cta" href="/movies">
                Исследовать каталог <span className="hero-cta-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit" />
              <div className="orbit orbit-two" />
              <div className="art-disc">
                <span className="art-glyph">✳</span>
                <span className="art-label">YOUR STORY · YOUR COLLECTION</span>
              </div>
              <div className="float-card float-card-one">
                <span className="float-icon">✦</span>
                <span className="float-text"><strong>Твоя подборка</strong><small>избранные истории</small></span>
              </div>
              <div className="float-card float-card-two">
                <span className="float-icon">◉</span>
                <span className="float-text"><strong>Продолжай открывать</strong><small>мир за миром</small></span>
              </div>
            </div>
          </section>
        </div>

        <section className="content-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">ТВОЯ СЛЕДУЮЩАЯ ИСТОРИЯ</p>
              <h2 id="catalog-title">Исследуй каталоги</h2>
            </div>
            <Link className="text-link" href="/movies">Смотреть всё <span aria-hidden="true">→</span></Link>
          </div>
          <div className="category-grid">
            {categories.map(({ href, label, description, symbol, icon, className }) => (
              <Link className={`category-card ${className}`} data-symbol={symbol} href={href} key={href}>
                <div className="category-content">
                  <span className="category-icon" aria-hidden="true">{icon}</span>
                  <h3>{label}</h3>
                  <p>{description}</p>
                </div>
                <span className="category-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section feature-row" aria-label="Возможности каталога">
          <article className="feature-panel">
            <p className="section-kicker">ЛИЧНОЕ ПРОСТРАНСТВО</p>
            <h3>Твоя медиатека.<br />Твои правила.</h3>
            <p>Сохраняй то, что посмотрел, прошёл или прочитал. Возвращайся к важному в любой момент.</p>
            <Link className="feature-link" href="/library">Открыть медиатеку <span aria-hidden="true">→</span></Link>
            <span className="feature-panel-icon" aria-hidden="true">▤</span>
          </article>
          <article className="feature-panel collection-panel">
            <p className="section-kicker">СОБИРАЙ И ДЕЛИСЬ</p>
            <h3>Коллекции с<br />твоим характером.</h3>
            <p>Объединяй любимое в тематические подборки.</p>
            <Link className="feature-link" href="/collections">Мои коллекции <span aria-hidden="true">→</span></Link>
            <span className="feature-panel-icon" aria-hidden="true">✧</span>
          </article>
        </section>

        <section className="content-section stats-strip" aria-label="Разделы каталога">
          <div className="stat"><span className="stat-number">01</span><span className="stat-label">Кино и сериалы</span></div>
          <div className="stat"><span className="stat-number">02</span><span className="stat-label">Игровые миры</span></div>
          <div className="stat"><span className="stat-number">03</span><span className="stat-label">Книжные полки</span></div>
        </section>
      </main>

      <footer className="footer">
        <Brand />
        <span>Собирай истории, которые остаются с тобой.</span>
        <nav className="footer-links" aria-label="Дополнительная навигация">
          <Link href="/library">Медиатека</Link>
          <Link href="/collections">Коллекции</Link>
        </nav>
      </footer>
    </div>
  )
}
