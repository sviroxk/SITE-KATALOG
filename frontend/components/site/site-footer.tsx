import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">SITE <span>KATALOG</span></Link>
      <p>Коллекция историй. Твоя собственная вселенная.</p>
      <span className="footer-note">© VEYRA</span>
    </footer>
  )
}
