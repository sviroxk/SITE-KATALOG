'use client'

import type { CSSProperties, PointerEvent, ReactNode } from 'react'

export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`)
    event.currentTarget.style.setProperty('--light-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--light-y', `${y * 100}%`)
  }

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--light-x', '50%')
    event.currentTarget.style.setProperty('--light-y', '50%')
  }

  return (
    <div
      className={`tilt-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{ '--tilt-x': '0deg', '--tilt-y': '0deg', '--light-x': '50%', '--light-y': '50%' } as CSSProperties}
    >
      {children}
    </div>
  )
}
