"use client"

import { useEffect, useRef, useState } from "react"

const text = "El sistema operativo para la planta industrial. Mantenimiento, producción e inteligencia, conectados."
const words = text.split(" ")

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function PlatformIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.8
      const end = vh * 0.1
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const p = easeOutCubic(progress)

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: `rgba(67, 97, 238, ${Math.min(1, p * 4)})` }}
        >
          Oxygen Suite Industrial
        </span>

        {/* Palabras iluminándose una a una con el scroll */}
        <div
          ref={sectionRef}
          className="font-bold text-balance"
          style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", lineHeight: 1.35, color: "#0d0d1a" }}
        >
          {words.map((word, i) => {
            const wordP = Math.max(0, Math.min(1, (p - (i / words.length) * 0.7) / 0.35))
            const lightness = Math.round(82 - wordP * 72)
            return (
              <span
                key={i}
                style={{ color: `hsl(225, 15%, ${lightness}%)` }}
              >
                {word}{i < words.length - 1 ? " " : ""}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
