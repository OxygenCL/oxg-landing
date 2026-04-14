"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const testimonials = [
  {
    quote:
      "OxyPulse integra planificación preventiva, correctivos e indicadores en un solo lugar. Una herramienta potente, alineada con las mejores prácticas y orientada a la mejora continua.",
    name: "Iván Góngora",
    title: "Supervisor de Mantenimiento",
    company: "Ferma S.A",
    logo: "/logos-web/8.png",
    slug: "",
    initials: "IG",
  },
  {
    quote:
      "Tras evaluar CMMS complejos, elegimos Oxygen por su simpleza. Una herramienta potente que el técnico adopta fácilmente, logrando registros instantáneos.",
    name: "Jorge Huenul",
    title: "Dueño de Maestranza",
    company: "Huemul HHH",
    logo: "/logos-web/7.png",
    slug: "",
    initials: "JH",
  },
  {
    quote:
      "El sistema nos permitió ver con datos en mano dónde se concentraban las solicitudes, permitiéndonos reorganizar y optimizar nuestros recursos técnicos para cubrir esa demanda real.",
    name: "Alfredo Olmos",
    title: "Supervisor de Mantenimiento",
    company: "AMCS",
    logo: "/logos-web/14.png",
    slug: "",
    initials: "AO",
  },
]

const DURATION = 6000 // ms per slide

export function TestimonialSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const goTo = useCallback((index: number) => {
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 250)
    setProgress(0)
    startRef.current = Date.now()
  }, [])

  // Animate progress bar
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Advance to next
        const next = (active + 1) % testimonials.length
        goTo(next)
      }
    }
    startRef.current = Date.now()
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, goTo])

  const t = testimonials[active]

  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-10">
          Nuestros clientes nos avalan
        </span>
        {/* Logo */}
        <div
          className="mx-auto mb-8 transition-opacity duration-250"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-gray-50 border border-gray-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.logo}
              alt={t.company}
              style={{ height: "48px", width: "auto", maxWidth: "72px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Quote */}
        <div className="min-h-[200px] flex items-center justify-center">
          <blockquote
            className="text-xl sm:text-2xl lg:text-[1.75rem] leading-relaxed font-medium text-balance"
            style={{
              color: "#3c4257",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>

        {/* Attribution */}
        <div
          className="mt-8 transition-opacity duration-250"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <p className="text-sm text-gray-800">
            <span className="font-semibold">{t.name},</span>{" "}
            <span className="text-gray-500">
              {t.title}, {t.company}
            </span>
          </p>
          {t.slug && (
            <a
              href={`/casos/${t.slug}`}
              className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#4361ee] hover:gap-2 transition-all duration-200"
            >
              Lee la historia
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        {/* Company nav tabs */}
        <div className="mt-16 flex items-center justify-center gap-0 border-t border-gray-100">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative flex-1 max-w-[180px] pt-5 pb-3 flex flex-col items-center"
            >
              {/* Progress bar on top */}
              <span className="absolute top-0 left-0 h-[2px] w-full bg-gray-100" />
              <span
                className="absolute top-0 left-0 h-[2px] bg-gray-900"
                style={{
                  width: i === active ? `${progress * 100}%` : i < active ? "100%" : "0%",
                  transition: i === active ? "none" : "width 0.3s ease",
                }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: i === active ? "#0a2434" : "#9ca3af" }}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
