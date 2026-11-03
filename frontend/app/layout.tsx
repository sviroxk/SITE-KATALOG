import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'SITE KATALOG — твоя медиа-вселенная',
  description: 'Собирай фильмы, игры и книги в личную медиатеку. Открывай новое и создавай собственные коллекции.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
