"use client"

import { useEffect, useRef, useState } from "react"

const results = [
  {
    category: "Disponibilidad",
    prefix: "+",
    value: 90,
    suffix: "%",
    description: "Cumplimiento preventivo en el primer trimestre",
  },
  {
    category: "Eficiencia",
    prefix: "-",
    value: 40,
    suffix: "%",
    description: "Reducción de detenciones no planificadas",
  },
  {
    category: "Decisiones",
    prefix: "",
    value: 3,
    suffix: "x",
    description: "Más velocidad para priorizar con datos ante Gerencia",
  },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.9
      const end = vh * 0.15
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const p = easeOutCubic(progress)

  // Phase 0.0→0.4: cards appear as one merged block
  // Phase 0.4→1.0: cards split apart + numbers count up
  const splitP = Math.max(0, Math.min(1, (p - 0.35) / 0.65))
  const countP = Math.max(0, Math.min(1, (p - 0.45) / 0.55))
  const appearP = Math.max(0, Math.min(1, p / 0.4))

  // Card x offsets: left goes left, right goes right, center stays
  const offsets = [-1, 0, 1]

  return (
    <section className="py-12 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-semibold text-[#4361ee] uppercase tracking-widest block mb-4">
            Resultados típicos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance max-w-2xl mx-auto">
            Lo que logran nuestros clientes con Oxygen
          </h2>
        </div>

        {/* Cards — split animation */}
        <div ref={sectionRef} className="relative flex justify-center">
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
            {results.map((result, i) => {
              // Gap between cards grows from 0 to normal as splitP goes 0→1
              // Left card moves left, right card moves right
              const xShift = offsets[i] * (1 - splitP) * 200

              // Animated number
              const displayValue = Math.round(result.value * countP)

              return (
                <div
                  key={result.category}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A2434] to-[#122D87] p-8 flex flex-col justify-end"
                  style={{
                    aspectRatio: "4/3",
                    opacity: appearP,
                    transform: `translateX(${xShift}px)`,
                    // Shadow grows as they separate
                    boxShadow: splitP > 0.1
                      ? `0 ${splitP * 24}px ${splitP * 48}px rgba(10,36,52,${splitP * 0.35})`
                      : "none",
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-3">
                      {result.category}
                    </span>
                    <div
                      className="font-bold text-white mb-3"
                      style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1 }}
                    >
                      {result.prefix}{displayValue}{result.suffix}
                    </div>
                    <p
                      className="text-white/75 text-sm leading-relaxed"
                      style={{
                        opacity: splitP,
                        transform: `translateY(${(1 - splitP) * 10}px)`,
                        transition: "none",
                      }}
                    >
                      {result.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
