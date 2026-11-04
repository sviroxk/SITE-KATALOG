import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteShell } from '../components/site/site-shell'
import './globals.css'

export const metadata: Metadata = {
  title: 'VEYRA — твоя медиа-вселенная',
  description: 'VEYRA — личная медиа-вселенная для фильмов, игр и книг. Открывай новое и собирай собственные коллекции.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  )
}
