import Link from 'next/link'

export function SectionHeading({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {href && linkLabel ? <Link className="text-link" href={href}>{linkLabel}<span aria-hidden="true"> ↗</span></Link> : null}
    </div>
  )
}
