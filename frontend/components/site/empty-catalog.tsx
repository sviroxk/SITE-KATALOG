import Link from 'next/link'

export function EmptyCatalog({ kind, title, description, backHref = '/', backLabel = 'На главную' }: {
  kind: 'movie' | 'game' | 'book' | 'library' | 'collection'
  title: string
  description: string
  backHref?: string
  backLabel?: string
}) {
  const symbols = { movie: '✧', game: '⌘', book: '❧', library: '◈', collection: '✳' }
  return (
    <section className="empty-catalog" aria-labelledby="empty-title">
      <div className={`empty-orbit empty-orbit-${kind}`} aria-hidden="true">
        <span>{symbols[kind]}</span>
      </div>
      <p className="section-kicker">РАЗДЕЛ КАТАЛОГА</p>
      <h2 id="empty-title">{title}</h2>
      <p className="empty-description">{description}</p>
      <p className="empty-honesty">Подключение источников и данных появится в следующих обновлениях.</p>
      <Link href={backHref} className="secondary-cta">{backLabel}<span aria-hidden="true"> ↗</span></Link>
    </section>
  )
}
