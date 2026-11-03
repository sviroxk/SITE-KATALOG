import Link from 'next/link'
import { SectionHeading } from '../components/site/section-heading'
import { TiltCard } from '../components/site/tilt-card'

const categories = [
  {
    href: '/movies',
    name: 'Кино и сериалы',
    note: 'Истории на большом экране',
    symbol: '✦',
    code: '01',
    className: 'media-card-cinema'
  },
  {
    href: '/games',
    name: 'Игры',
    note: 'Миры, в которые погружаются',
    symbol: '⌘',
    code: '02',
    className: 'media-card-games'
  },
  {
    href: '/books',
    name: 'Книги',
    note: 'Новые главы и вселенные',
    symbol: '❧',
    code: '03',
    className: 'media-card-books'
  }
]

export default function HomePage() {
  return (
    <>
      <section className="cosmic-hero" aria-labelledby="hero-title">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" /> ЛИЧНАЯ МЕДИАВСЕЛЕННАЯ</div>
          <h1 id="hero-title">Истории,<br /><span>которые остаются.</span></h1>
          <p className="hero-description">
            Фильмы, игры и книги — собранные в одном пространстве. Исследуй миры и создавай собственную коллекцию.
          </p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/movies">Исследовать каталоги <span aria-hidden="true">↗</span></Link>
            <Link className="quiet-cta" href="/library">Моя медиатека <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-index"><span>01</span><i /> <span>КИНО</span><i /> <span>ИГРЫ</span><i /> <span>КНИГИ</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-planet planet-back" />
          <div className="hero-ring ring-back" />
          <div className="hero-planet planet-main"><span className="planet-mark">S</span><span className="planet-caption">YOUR UNIVERSE</span></div>
          <div className="hero-ring ring-front" />
          <div className="planet-satellite satellite-one" />
          <div className="planet-satellite satellite-two" />
          <div className="hero-coordinates">52° 31′ N<br />13° 24′ E</div>
        </div>
        <div className="hero-bottom-note"><span className="scroll-mark">↓</span><span>ПРОКРУТИ, ЧТОБЫ ИССЛЕДОВАТЬ</span><span className="hero-bottom-line" /></div>
      </section>

      <section className="page-section collection-section" aria-labelledby="collection-title">
        <SectionHeading eyebrow="ПРОСТРАНСТВА ДЛЯ ОТКРЫТИЙ" title="Выбери свою вселенную" href="/movies" linkLabel="Все разделы" />
        <div className="media-grid" id="collection-title">
          {categories.map((item) => (
            <TiltCard className={`media-card ${item.className}`} key={item.href}>
              <Link href={item.href} className="media-card-link" aria-label={`Открыть раздел: ${item.name}`}>
                <div className="media-card-art" aria-hidden="true">
                  <span className="media-card-number">{item.code}</span>
                  <span className="media-card-symbol">{item.symbol}</span>
                  <span className="media-card-orbit orbit-a" />
                  <span className="media-card-orbit orbit-b" />
                </div>
                <div className="media-card-copy">
                  <span className="media-card-note">{item.note}</span>
                  <h3>{item.name}</h3>
                  <span className="media-card-open">ОТКРЫТЬ РАЗДЕЛ <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="personal-section" aria-labelledby="personal-title">
        <div className="personal-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="personal-copy">
          <p className="section-kicker">НЕ ПРОСТО СПИСОК</p>
          <h2 id="personal-title">Твоя история<br /><em>собирается здесь.</em></h2>
          <p>Сохраняй то, к чему хочется вернуться. Когда библиотека будет подключена, здесь появятся личные статусы и избранное.</p>
          <Link href="/library" className="secondary-cta">Перейти в медиатеку <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="personal-index" aria-hidden="true"><span>PERSONAL ARCHIVE</span><strong>∞</strong><span>IN PROGRESS</span></div>
      </section>

      <section className="page-section collections-section" aria-labelledby="collections-title">
        <div className="collections-panel">
          <div className="collections-copy">
            <p className="section-kicker">СОБИРАЙ СВОИ МИРЫ</p>
            <h2 id="collections-title">Коллекции —<br />твой взгляд на истории.</h2>
            <p>Объединяй любимое в тематические подборки. Функции создания и сохранения коллекций будут подключены вместе с медиатекой.</p>
            <Link href="/collections" className="secondary-cta">О коллекциях <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="collection-stack" aria-hidden="true">
            <div className="stack-card stack-card-back"><span>VOL. 03</span><strong>AFTER<br />HOURS</strong></div>
            <div className="stack-card stack-card-mid"><span>ARCHIVE / 02</span><strong>OTHER<br />WORLDS</strong></div>
            <div className="stack-card stack-card-front"><span>PERSONAL INDEX</span><strong>THE<br />KEEPERS</strong><i>✳</i></div>
          </div>
        </div>
      </section>

      <section className="closing-line" aria-label="Подпись">
        <span>СОБИРАЙ</span><i /> <span>ИССЛЕДУЙ</span><i /> <span>ВОЗВРАЩАЙСЯ</span>
      </section>
    </>
  )
}
