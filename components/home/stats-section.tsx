"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { prefix: "+", num: 8,    suffix: "",  label: "Países conectados",  thousands: false },
  { prefix: "+", num: 500,  suffix: "",  label: "Usuarios activos",   thousands: false },
  { prefix: "+", num: 2000, suffix: "",  label: "Activos conectados", thousands: true  },
]

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

function StatItem({ prefix, num, suffix, label, thousands, delay, index }: {
  prefix: string; num: number; suffix: string; label: string
  thousands?: boolean; delay: number; index: number
}) {
  const [display, setDisplay] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const t = setTimeout(() => {
      const dur = 1600, t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1)
        setDisplay(Math.round(easeOutCubic(p) * num))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [visible, num, delay])

  const formatted = thousands ? display.toLocaleString("es-CL") : display.toString()
  const baseOpacity = index === 0 ? 0.55 : index === 1 ? 0.4 : 0.28
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="flex-1 px-8 py-7 text-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: index < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div
        className="font-bold tracking-tight mb-1 transition-all duration-300"
        style={{
          color: hovered ? "rgba(255,255,255,1)" : `rgba(255,255,255,${baseOpacity})`,
          fontSize: hovered ? "clamp(2.6rem, 5vw, 3.5rem)" : "clamp(1.9rem, 3.5vw, 2.5rem)",
        }}>
        {prefix}{formatted}{suffix}
      </div>
      <div className="text-xs sm:text-sm leading-snug transition-colors duration-300"
        style={{ color: hovered ? "rgba(255,255,255,0.7)" : `rgba(255,255,255,${baseOpacity * 0.6})` }}>
        {label}
      </div>
    </div>
  )
}

function RaysCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    // Generate rays — fan from left to right going UPWARD (like Stripe sunrise)
    const RAY_COUNT = 90
    type Ray = { angle: number; length: number; speed: number; width: number; offset: number }
    const rays: Ray[] = Array.from({ length: RAY_COUNT }, (_, i) => ({
      angle: -Math.PI + (i / (RAY_COUNT - 1)) * Math.PI + (Math.random() - 0.5) * 0.04,
      length: 100 + Math.random() * 300,
      speed: 0.002 + Math.random() * 0.003,
      width: 0.3 + Math.random() * 0.7,
      offset: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const ox = W / 2
      const oy = H * 0.96

      rays.forEach((ray) => {
        const pulse = 0.3 + 0.7 * Math.abs(Math.sin(t * ray.speed * 60 + ray.offset))
        const len = ray.length * pulse

        const ex = ox + Math.cos(ray.angle) * len
        const ey = oy + Math.sin(ray.angle) * len

        const grad = ctx.createLinearGradient(ox, oy, ex, ey)
        grad.addColorStop(0, `rgba(255,255,255,${0.0})`)
        grad.addColorStop(0.3, `rgba(200,210,255,${0.25 * pulse})`)
        grad.addColorStop(0.85, `rgba(255,255,255,${0.55 * pulse})`)
        grad.addColorStop(1, `rgba(255,255,255,0)`)

        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = grad
        ctx.lineWidth = ray.width
        ctx.stroke()

        // Bright tip dot
        if (pulse > 0.7) {
          ctx.beginPath()
          ctx.arc(ex, ey, ray.width * 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${(pulse - 0.7) * 0.8})`
          ctx.fill()
        }
      })

      t++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "320px", display: "block" }}
    />
  )
}

export function StatsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: "linear-gradient(180deg, #06061a 0%, #0a0f3d 40%, #06061a 100%)" }}>

      {/* Título */}
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight text-balance">
          Transformando la manufactura en Iberoamérica
        </h2>
      </div>

      {/* Stats row — bordes full-width */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} index={i} delay={i * 150} />
          ))}
        </div>
      </div>


      <div className="pb-28" />
    </section>
  )
}
