'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  z: number
  radius: number
  phase: number
  twinkle: number
}

const MAX_DPR = 1.5
const FRAME_INTERVAL = 1000 / 30

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false }
    const dimensions = { width: 0, height: 0, dpr: 1 }
    let stars: Star[] = []
    let animationFrame = 0
    let lastFrame = 0
    let previousTime = 0
    let observer: ResizeObserver | undefined
    let disposed = false

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dimensions.width = Math.max(1, rect.width)
      dimensions.height = Math.max(1, rect.height)
      dimensions.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.round(dimensions.width * dimensions.dpr)
      canvas.height = Math.round(dimensions.height * dimensions.dpr)
      context.setTransform(dimensions.dpr, 0, 0, dimensions.dpr, 0, 0)
      const count = Math.min(145, Math.max(45, Math.round((dimensions.width * dimensions.height) / 10500)))
      stars = Array.from({ length: count }, () => ({
        x: random(0, dimensions.width),
        y: random(0, dimensions.height),
        z: random(0.18, 1),
        radius: random(0.35, 1.45),
        phase: random(0, Math.PI * 2),
        twinkle: random(0.12, 0.7)
      }))
    }

    const drawNebula = (time: number) => {
      const drift = Math.sin(time * 0.00012) * 20
      const nebulae = [
        { x: dimensions.width * 0.75 + drift, y: dimensions.height * 0.18, r: Math.max(dimensions.width, dimensions.height) * 0.5, color: '104, 75, 178', alpha: 0.085 },
        { x: dimensions.width * 0.18 - drift * 0.6, y: dimensions.height * 0.7, r: Math.max(dimensions.width, dimensions.height) * 0.42, color: '35, 116, 145', alpha: 0.07 },
        { x: dimensions.width * 0.86, y: dimensions.height * 0.82 - drift * 0.3, r: Math.max(dimensions.width, dimensions.height) * 0.35, color: '58, 104, 69', alpha: 0.045 }
      ]

      for (const nebula of nebulae) {
        const gradient = context.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.r)
        gradient.addColorStop(0, `rgba(${nebula.color}, ${nebula.alpha})`)
        gradient.addColorStop(1, `rgba(${nebula.color}, 0)`)
        context.fillStyle = gradient
        context.fillRect(0, 0, dimensions.width, dimensions.height)
      }
    }

    const render = (time: number) => {
      if (disposed || document.hidden || mediaMotion.matches) {
        animationFrame = 0
        return
      }
      if (time - lastFrame < FRAME_INTERVAL) {
        animationFrame = window.requestAnimationFrame(render)
        return
      }
      lastFrame = time
      const delta = Math.min((time - (previousTime || time)) / 1000, 0.05)
      previousTime = time
      pointer.x += (pointer.targetX - pointer.x) * 0.045
      pointer.y += (pointer.targetY - pointer.y) * 0.045

      context.clearRect(0, 0, dimensions.width, dimensions.height)
      drawNebula(time)

      for (const star of stars) {
        const parallaxX = pointer.active ? (pointer.x - dimensions.width / 2) * star.z * 0.009 : 0
        const parallaxY = pointer.active ? (pointer.y - dimensions.height / 2) * star.z * 0.009 : 0
        let x = star.x + parallaxX
        let y = star.y + parallaxY + Math.sin(time * 0.00016 + star.phase) * star.z * 1.7
        const dx = pointer.x - x
        const dy = pointer.y - y
        const distance = Math.hypot(dx, dy)

        if (pointer.active && !coarsePointer.matches && distance < 115 && distance > 1) {
          const force = ((115 - distance) / 115) * star.z * 6
          x -= (dx / distance) * force
          y -= (dy / distance) * force
        }

        const shimmer = 0.62 + Math.sin(time * 0.001 + star.phase) * star.twinkle
        context.beginPath()
        context.fillStyle = `rgba(218, 231, 255, ${Math.min(0.92, shimmer * (0.32 + star.z * 0.56))})`
        context.arc(x, y, star.radius * (0.65 + star.z * 0.55), 0, Math.PI * 2)
        context.fill()

        if (star.z > 0.82 && Math.sin(time * 0.0006 + star.phase) > 0.96) {
          context.strokeStyle = `rgba(188, 216, 255, ${0.16 + shimmer * 0.13})`
          context.lineWidth = 0.55
          context.beginPath()
          context.moveTo(x - 3.2, y)
          context.lineTo(x + 3.2, y)
          context.moveTo(x, y - 3.2)
          context.lineTo(x, y + 3.2)
          context.stroke()
        }

        star.y += delta * star.z * 1.8
        if (star.y > dimensions.height + 3) {
          star.y = -3
          star.x = random(0, dimensions.width)
        }
      }

      if (pointer.active && !coarsePointer.matches) {
        const glowRadius = 155
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, glowRadius)
        glow.addColorStop(0, 'rgba(131, 179, 255, 0.055)')
        glow.addColorStop(0.45, 'rgba(113, 101, 220, 0.024)')
        glow.addColorStop(1, 'rgba(113, 101, 220, 0)')
        context.fillStyle = glow
        context.fillRect(pointer.x - glowRadius, pointer.y - glowRadius, glowRadius * 2, glowRadius * 2)
      }

      animationFrame = window.requestAnimationFrame(render)
    }

    const start = () => {
      if (disposed || document.hidden || mediaMotion.matches || animationFrame) return
      previousTime = 0
      animationFrame = window.requestAnimationFrame(render)
    }

    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      context.clearRect(0, 0, dimensions.width, dimensions.height)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = event.clientX - rect.left
      pointer.targetY = event.clientY - rect.top
      pointer.active = true
      start()
    }

    const onPointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return
      pointer.active = false
    }
    const onWindowBlur = () => { pointer.active = false }
    const onVisibilityChange = () => document.hidden ? stop() : start()
    const onMotionChange = () => mediaMotion.matches ? stop() : start()

    resize()
    observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('pointerout', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    mediaMotion.addEventListener('change', onMotionChange)
    start()

    return () => {
      disposed = true
      stop()
      observer?.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('pointerout', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mediaMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-canvas" aria-hidden="true" />
}
