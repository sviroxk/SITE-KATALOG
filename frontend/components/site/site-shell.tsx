import type { ReactNode } from 'react'
import { CosmicBackground } from './cosmic-background'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <CosmicBackground />
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  )
}
