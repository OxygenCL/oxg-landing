"use client"

import Link from "next/link"
import { BarChart3, Calendar, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// ─── Mini Product UI Previews ─────────────────────────────────────────────────

function OxyPulseMini() {
  const ots = [
    { id: "OT-082", equipo: "Bomba P-3",    estado: "Crítico",   dot: "#ef4444" },
    { id: "OT-083", equipo: "Motor M-7",    estado: "En curso",  dot: "#f59e0b" },
    { id: "OT-084", equipo: "Compresor C2", estado: "Pendiente", dot: "#3b82f6" },
  ]
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100" style={{ fontSize: 10 }}>
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "#4361ee" }} />
          <span className="font-bold text-gray-900" style={{ fontSize: 9 }}>OxyPulse</span>
        </div>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>Panel de Mantenimiento</span>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-1 px-2.5 pt-2.5 pb-2">
        {[
          { v: "42",  l: "OT activas",    c: "#111827" },
          { v: "94%", l: "Disponibilidad",c: "#4361ee" },
          { v: "3",   l: "Críticos",       c: "#ef4444" },
        ].map((k, i) => (
          <div key={i} className="rounded px-1.5 py-1.5 text-center bg-gray-50 border border-gray-100">
            <div className="font-bold" style={{ fontSize: 12, color: k.c, lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: 7, color: "#9ca3af", marginTop: 2 }}>{k.l}</div>
          </div>
        ))}
      </div>
      {/* OT list */}
      <div className="px-2.5 pb-2.5 space-y-1">
        {ots.map((ot, i) => (
          <div key={i} className="flex items-center justify-between rounded px-2 py-1 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: ot.dot }} />
              <span style={{ fontSize: 8, color: "#374151", fontWeight: 600 }}>{ot.id}</span>
              <span style={{ fontSize: 8, color: "#9ca3af" }}>{ot.equipo}</span>
            </div>
            <span style={{ fontSize: 7, color: ot.dot, fontWeight: 600 }}>{ot.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OxyPlannerMini() {
  const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO"]
  const orders = [
    { id: "OPX_CF_2022",  start: 0, width: 5, color: "#4361ee" },
    { id: "OPX_BOM_2002", start: 1, width: 4, color: "#3b82f6" },
    { id: "OPX_BBK_2003", start: 3, width: 4, color: "#60a5fa" },
  ]
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100" style={{ fontSize: 10 }}>
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "#4361ee" }} />
          <span className="font-bold text-gray-900" style={{ fontSize: 9 }}>OxyPlanner</span>
        </div>
        <div className="flex gap-2">
          {[{ v: "1990h", c: "#4361ee" }, { v: "70%", c: "#4361ee" }].map((k, i) => (
            <span key={i} className="font-bold" style={{ fontSize: 9, color: k.c }}>{k.v}</span>
          ))}
        </div>
      </div>
      {/* Gantt */}
      <div className="px-2.5 pt-2.5 pb-2">
        {/* Month headers */}
        <div className="grid mb-1" style={{ gridTemplateColumns: "56px 1fr" }}>
          <div />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${months.length}, 1fr)` }}>
            {months.map(m => <div key={m} className="text-center text-gray-400" style={{ fontSize: 6.5 }}>{m}</div>)}
          </div>
        </div>
        {/* Rows */}
        <div className="space-y-1.5">
          {orders.map((o, i) => (
            <div key={i} className="grid items-center" style={{ gridTemplateColumns: "56px 1fr" }}>
              <span style={{ fontSize: 7, color: "#9ca3af", paddingRight: 4 }}>{o.id.slice(0, 10)}</span>
              <div className="relative h-3.5 rounded bg-gray-50 border border-gray-100">
                <div className="absolute top-0.5 bottom-0.5 rounded" style={{
                  left: `${(o.start / months.length) * 100}%`,
                  width: `${(o.width / months.length) * 100}%`,
                  background: o.color + "20",
                  border: `1px solid ${o.color}50`,
                }} />
              </div>
            </div>
          ))}
        </div>
        {/* Heatmap strip */}
        <div className="flex gap-0.5 mt-2 pt-2 border-t border-gray-100">
          {["#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#fca5a5","#f87171","#ef4444"].map((c, i) => (
            <div key={i} className="flex-1 rounded-sm h-2.5" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AdvisoryMini() {
  const phases = [
    { n: "Diagnóstico",     done: true  },
    { n: "Implementación",  done: true  },
    { n: "Mejora Continua", done: false },
  ]
  const metrics = [
    { label: "OEE",          before: 62, after: 78 },
    { label: "MTTR",         before: 4.2, after: 1.8 },
    { label: "Disponib.",    before: 84, after: 96 },
  ]
  return (
    <div className="rounded-xl overflow-hidden mb-5 bg-white border border-gray-100" style={{ fontSize: 10 }}>
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "#4361ee" }} />
          <span className="font-bold text-gray-900" style={{ fontSize: 9 }}>Advisory</span>
        </div>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>Roadmap de mejora</span>
      </div>
      {/* Timeline */}
      <div className="px-3 pt-3 pb-1">
        <div className="flex items-center gap-0">
          {phases.map((p, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: p.done ? "#4361ee" : "#f3f4f6", border: `1.5px solid ${p.done ? "#4361ee" : "#e5e7eb"}` }}>
                  {p.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="mt-1 text-center" style={{ fontSize: 7, color: p.done ? "#6b7280" : "#d1d5db", lineHeight: 1.3 }}>{p.n}</span>
              </div>
              {i < phases.length - 1 && <div className="h-px flex-1 mb-4" style={{ background: "#e5e7eb" }} />}
            </div>
          ))}
        </div>
      </div>
      {/* Metrics before/after */}
      <div className="px-2.5 pb-2.5 pt-1 space-y-1">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <span style={{ fontSize: 7.5, color: "#9ca3af", width: 52 }}>{m.label}</span>
            <div className="flex-1 h-2 rounded-full bg-gray-100">
              <div className="h-2 rounded-full" style={{ width: `${m.after}%`, background: "linear-gradient(90deg,#4361ee,#60a5fa)" }} />
            </div>
            <span style={{ fontSize: 7.5, color: "#4361ee", fontWeight: 700, width: 24, textAlign: "right" }}>{m.after}{typeof m.after === "number" && m.after < 10 ? "" : "%"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const products = [
  {
    Mini: OxyPulseMini,
    icon: BarChart3,
    name: "OxyPulse",
    tagline: "Tu mantenimiento, bajo control",
    description: "Gestiona activos, OTs, planes preventivos e inventario. Tus técnicos en planta, tu jefe en el panel.",
    href: "/oxypulse",
  },
  {
    Mini: OxyPlannerMini,
    icon: Calendar,
    name: "OxyPlanner",
    tagline: "Deja de replanificar en Excel",
    description: "Secuencia órdenes de producción, simula escenarios y reprograma en tiempo real cuando cambia la planta.",
    href: "/oxyplanner",
  },
  {
    Mini: AdvisoryMini,
    icon: Users,
    name: "Advisory",
    tagline: "Más que software. Un socio industrial.",
    description: "Diagnóstico, implementación acompañada y mejora continua para operaciones que quieren el siguiente nivel.",
    href: "/advisory",
  },
]

// Ease function: smooth out the linear scroll progress
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function ProductsOverviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 → 1 as you scroll through

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      // Animation starts when section is 90% down the viewport
      // Animation completes when section top reaches 20% from top
      const start = vh * 0.85
      const end = vh * 0.1
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const p = easeOutCubic(progress)

  // Phase breakdown:
  // 0.0 – 0.3  → card appears + vertical stem
  // 0.3 – 0.6  → horizontal bar expands
  // 0.6 – 0.8  → vertical drops appear
  // 0.7 – 1.0  → cards spread + fade in
  const stemP   = Math.max(0, Math.min(1, (p - 0.0) / 0.3))
  const barP    = Math.max(0, Math.min(1, (p - 0.3) / 0.3))
  const dropP   = Math.max(0, Math.min(1, (p - 0.6) / 0.2))
  const cardsP  = Math.max(0, Math.min(1, (p - 0.65) / 0.35))

  return (
    <section id="plataforma" className="py-28 bg-[#f0f4ff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#4361ee] uppercase tracking-widest block mb-4">
            Nuestros Productos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 whitespace-nowrap mx-auto">
            3 soluciones, un solo ecosistema.
          </h2>
        </div>

        {/* Animated tree */}
        <div ref={sectionRef}>

          {/* Central brand card */}
          <div className="flex justify-center">
            <div
              className="w-52 h-52 rounded-2xl flex flex-col items-center justify-center shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)",
                opacity: stemP,
                transform: `scale(${0.85 + stemP * 0.15})`,
                transition: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/logo-v2-3.svg" alt="Oxygen" className="w-[450%] h-auto" />
            </div>
          </div>

          {/* SVG Lines — scroll-driven */}
          <div className="relative flex justify-center" style={{ height: "80px" }}>
            <svg
              viewBox="0 0 600 80"
              className="absolute w-full max-w-3xl h-full"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Vertical stem */}
              <line
                x1="300" y1="0" x2="300" y2="35"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
                opacity={stemP}
              />

              {/* Horizontal bar — expands from center outward */}
              {/* Left half */}
              <line
                x1="300" y1="35"
                x2={300 - barP * 200}
                y2="35"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
              />
              {/* Right half */}
              <line
                x1="300" y1="35"
                x2={300 + barP * 200}
                y2="35"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
              />

              {/* Vertical drops — appear after bar reaches each point */}
              {/* Left drop — appears when barP >= ~0.8 */}
              <line
                x1="100" y1="35" x2="100" y2="78"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
                opacity={Math.max(0, Math.min(1, (barP - 0.7) / 0.3))}
              />
              {/* Center drop */}
              <line
                x1="300" y1="35" x2="300" y2="78"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
                opacity={dropP}
              />
              {/* Right drop */}
              <line
                x1="500" y1="35" x2="500" y2="78"
                stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="5 4"
                opacity={Math.max(0, Math.min(1, (barP - 0.7) / 0.3))}
              />
            </svg>
          </div>

          {/* Product cards — spread from center on scroll */}
          <div className="grid md:grid-cols-3 gap-5">
            {products.map((product, i) => {
              // Each card starts near center and spreads to its natural position
              const spread = 1 - cardsP
              const xOffset = i === 0 ? spread * 260 : i === 2 ? -spread * 260 : 0

              return (
                <div
                  key={product.name}
                  className="bg-white rounded-2xl border border-[#e0e7ff] p-6 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 transition-shadow"
                  style={{
                    opacity: cardsP,
                    transform: `translateX(${xOffset}px) translateY(${spread * 16}px)`,
                  }}
                >
                  {/* Mini product UI preview — fixed height so titles align */}
                  <div className="h-52 w-full flex items-center justify-center mb-2 overflow-hidden">
                    <div className="w-full">
                      <product.Mini />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs font-semibold text-[#4361ee] mb-3">{product.tagline}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
                    {product.description}
                  </p>
                  <Link
                    href={product.href}
                    className="text-xs font-semibold text-[#4361ee] uppercase tracking-wider inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    saber más →
                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
