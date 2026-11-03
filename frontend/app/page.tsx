import Link from 'next/link'

const catalogLinks = [
  { href: '/movies', label: 'Фильмы и сериалы' },
  { href: '/games', label: 'Игры' },
  { href: '/books', label: 'Книги' },
  { href: '/library', label: 'Моя библиотека' },
  { href: '/collections', label: 'Коллекции' }
]

export default function HomePage() {
  return (
    <main>
      <h1>SITE KATALOG</h1>
      <p>Каталог фильмов, игр и книг с личной медиатекой и коллекциями.</p>
      <nav aria-label="Разделы каталога">
        <ul>
          {catalogLinks.map(({ href, label }) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
