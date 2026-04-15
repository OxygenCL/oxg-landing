"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { Settings2, Sandwich, HardHat, Truck, TreePine, Wheat, Building2, Zap, Fish, Factory, ShoppingCart } from "lucide-react"

const industries = [
  { name: "Metalmecánica",          slug: "metalmecanico", icon: Settings2    },
  { name: "Alimentos y Bebidas",    slug: "alimentos",     icon: Sandwich     },
  { name: "Minería",                slug: "mineria",       icon: HardHat      },
  { name: "Logística",              slug: "logistica",     icon: Truck        },
  { name: "Forestal",               slug: "forestal",      icon: TreePine     },
  { name: "Agrícola",               slug: "agricola",      icon: Wheat        },
  { name: "Construcción",           slug: "construccion",  icon: Building2    },
  { name: "Energía",                slug: "energia",       icon: Zap          },
  { name: "Pesquero y Acuicultura", slug: "pesquero",      icon: Fish         },
  { name: "Manufacturera",          slug: "manufactura",   icon: Factory      },

  { name: "Retail y Facilities",    slug: "retail",        icon: ShoppingCart },
]

const track = [...industries, ...industries]

export function IndustriesSection() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const dragging    = useRef(false)
  const startX      = useRef(0)
  const startScroll = useRef(0)
  const hasDragged  = useRef(false)
  const rafId       = useRef<number>(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // ── Auto-scroll ──────────────────────────────────────────────
    const tick = () => {
      if (!dragging.current) {
        el.scrollLeft += 0.5
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    // ── Mouse drag ───────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      dragging.current  = true
      hasDragged.current = false
      startX.current    = e.clientX
      startScroll.current = el.scrollLeft
      el.style.cursor   = "grabbing"
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - startX.current
      if (Math.abs(dx) > 3) hasDragged.current = true
      el.scrollLeft = startScroll.current - dx
      // seamless wrap
      const half = el.scrollWidth / 2
      if (el.scrollLeft < 0)    el.scrollLeft += half
      if (el.scrollLeft >= half) el.scrollLeft -= half
    }

    const onMouseUp = () => {
      dragging.current  = false
      el.style.cursor   = "grab"
    }

    // ── Touch drag ───────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      dragging.current   = true
      hasDragged.current = false
      startX.current     = e.touches[0].clientX
      startScroll.current = el.scrollLeft
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      const dx = e.touches[0].clientX - startX.current
      if (Math.abs(dx) > 3) hasDragged.current = true
      el.scrollLeft = startScroll.current - dx
      const half = el.scrollWidth / 2
      if (el.scrollLeft < 0)    el.scrollLeft += half
      if (el.scrollLeft >= half) el.scrollLeft -= half
    }

    const onTouchEnd = () => { dragging.current = false }

    el.style.cursor = "grab"

    el.addEventListener("mousedown",  onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup",   onMouseUp)
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove",  onTouchMove,  { passive: true })
    el.addEventListener("touchend",   onTouchEnd)

    return () => {
      cancelAnimationFrame(rafId.current)
      el.removeEventListener("mousedown",  onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup",   onMouseUp)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove",  onTouchMove)
      el.removeEventListener("touchend",   onTouchEnd)
    }
  }, [])

  return (
    <section className="py-24 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-center text-xs font-semibold text-[#4361ee] uppercase tracking-widest mb-4">
          Industrias
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 text-balance">
          Diseñado para las industrias que mueven LATAM
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-hidden select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4 px-4 sm:px-8 lg:px-16 pb-2" style={{ width: "max-content" }}>
          {track.map((industry, i) => {
            const Icon = industry.icon
            return (
              <Link
                key={`${industry.slug}-${i}`}
                href={`/soluciones/${industry.slug}`}
                draggable={false}
                className="group flex-shrink-0 relative rounded-2xl overflow-hidden flex flex-col"
                style={{ width: 270, height: 340, background: "linear-gradient(145deg, #0d1b2e 0%, #12224a 100%)" }}
                onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
              >
                <div className="px-5 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    {industry.name}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <Icon
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{ width: 80, height: 80, color: "rgba(255,255,255,0.12)", strokeWidth: 1 }}
                  />
                </div>

                <div className="px-5 pb-6">
                  <span className="text-white font-bold text-lg leading-tight block">
                    {industry.name}
                  </span>
                  <span className="text-white/40 text-xs mt-1 block group-hover:text-white/70 transition-colors">
                    Ver solución →
                  </span>
                </div>

                <div className="absolute inset-0 bg-[#4361ee]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
