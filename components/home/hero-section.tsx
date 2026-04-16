"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"


const rotatingWords = ["menores costos", "mayor rentabilidad", "mayor eficiencia"]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [scrollP, setScrollP] = useState(0)

  // Rotating text
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotatingWords.length)
        setVisible(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  // Haz de luz vinculado al scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      // Empieza cuando el hero empieza a salir por arriba
      const raw = Math.abs(rect.top) / (rect.height * 0.6)
      setScrollP(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // El haz va de -20% a 120% del ancho
  const beamX = -20 + scrollP * 140 // porcentaje

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0A2434] text-center"
    >
      {/* ── Todo el fondo en un contenedor con overflow-hidden propio ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video background */}
        <video
          key={pathname}
          src="/hero-bg2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,36,52,0.45) 0%, rgba(10,36,52,0.35) 50%, rgba(10,36,52,0.6) 100%)" }} />
        {/* Blobs */}
        <div className="absolute -top-10 -left-10 w-[650px] h-[650px] rounded-full bg-[#122D87] opacity-25 blur-[120px] animate-blob" />
        <div className="absolute -top-20 left-1/3 w-[550px] h-[550px] rounded-full bg-[#4361ee] opacity-20 blur-[110px] animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#192B6A] opacity-25 blur-[120px] animate-blob" style={{ animationDelay: "-8s" }} />
        <div className="absolute bottom-10 -left-10 w-[450px] h-[450px] rounded-full bg-[#1e40af] opacity-15 blur-[130px] animate-blob" style={{ animationDelay: "-10s" }} />
      </div>

      {/* ── Haz de luz scroll-driven ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse 18% 80% at ${beamX}% 50%, rgba(255,255,255,0.13) 0%, rgba(67,97,238,0.07) 40%, transparent 70%)`,
        }}
      />

      {/* ── Contenido ── */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16">
        <h1
          className="font-bold"
          style={{
            fontSize: "clamp(1.4rem, 7.5vw, 6.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
          }}
        >
          {/* Línea 1 */}
          <span className="block relative" style={{ color: "rgba(255,255,255,0.95)" }}>
            IA industrial para
            <span
              className="hero-sweep-overlay"
              aria-hidden="true"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >IA industrial para</span>
          </span>

          {/* Línea 2 — rotatorio con gradiente */}
          <span
            className="block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(12px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              background: "linear-gradient(90deg, #4361ee, #60a5fa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: scrollP > 0.05 ? `brightness(${1 + scrollP * 0.4})` : "none",
            }}
          >
            {rotatingWords[index]}
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-xl mx-auto">
          La plataforma de Oxygen ayuda a equipos industriales en LATAM a planificar, priorizar y decidir con datos reales.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/nosotros#contacto"
            className="px-8 py-4 text-base font-semibold bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contactar con ventas
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrollP > 0.05 ? 0 : 0.4 }}
      >
        <span className="text-white text-xs tracking-widest uppercase">scroll</span>
        {/* Mouse icon */}
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="white" strokeWidth="1.5"/>
          <rect x="10" y="6" width="2" height="6" rx="1" fill="white">
            <animate attributeName="y" values="6;12;6" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

    </section>
  )
}
