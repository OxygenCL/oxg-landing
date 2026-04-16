"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

// ─── Mockup Components ────────────────────────────────────────────────────────

function IntegrationMockup() {
  const sources = ["SAP / ERP", "Excel / CSV", "OxyPulse", "OxyPlanner"]
  const targets = [
    { name: "OxyPulse",   color: "#4361ee", desc: "Mantenimiento" },
    { name: "OxyPlanner", color: "#3b82f6", desc: "Producción" },
    { name: "Advisory",   color: "#1e40af", desc: "Consultoría" },
  ]
  return (
    <div className="h-full flex flex-col p-6" style={{ background: "#f8faff" }}>
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4361ee" }}>Oxygen Suite</span>
        <h3 className="font-bold text-gray-900 mt-1 text-base">Una capa de datos unificada</h3>
      </div>
      {/* Sources */}
      <div className="flex gap-2 mb-3">
        {sources.map((s, i) => (
          <div key={i} className="flex-1 rounded-lg border text-center py-2 px-1" style={{ background: "white", borderColor: "#e0e7ff" }}>
            <span style={{ fontSize: 9, color: "#374151", fontWeight: 600 }}>{s}</span>
          </div>
        ))}
      </div>
      {/* Arrow down */}
      <div className="flex justify-center mb-3">
        <div className="flex flex-col items-center">
          <div className="w-px h-4" style={{ background: "#c7d2fe" }} />
          <div className="rounded-xl px-5 py-2 font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#4361ee,#1e40af)" }}>
            Oxygen Intelligence
          </div>
          <div className="w-px h-4" style={{ background: "#c7d2fe" }} />
        </div>
      </div>
      {/* Targets */}
      <div className="flex gap-3">
        {targets.map((t, i) => (
          <div key={i} className="flex-1 rounded-xl p-3 border" style={{ background: "white", borderColor: "#e0e7ff" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: t.color + "18" }}>
              <div className="w-3 h-3 rounded" style={{ background: t.color }} />
            </div>
            <div className="font-bold text-gray-900" style={{ fontSize: 11 }}>{t.name}</div>
            <div style={{ fontSize: 9, color: "#9ca3af" }}>{t.desc}</div>
          </div>
        ))}
      </div>
      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid #e0e7ff" }}>
        {[
          { v: "< 1 sem", l: "Implementación" },
          { v: "Sin ERP", l: "Reemplazo necesario" },
          { v: "API REST", l: "Integración flexible" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-bold" style={{ fontSize: 13, color: "#4361ee" }}>{s.v}</div>
            <div style={{ fontSize: 9, color: "#9ca3af" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OxyPulseMockup() {
  const ots = [
    { id: "OT-082", equipo: "Bomba centrífuga P-3",    prioridad: "Crítica",    estado: "En curso",   dot: "#ef4444" },
    { id: "OT-083", equipo: "Motor eléctrico M-7",     prioridad: "Alta",       estado: "Pendiente",  dot: "#f59e0b" },
    { id: "OT-084", equipo: "Compresor de aire C-2",   prioridad: "Media",      estado: "Programada", dot: "#3b82f6" },
    { id: "OT-085", equipo: "Banda transportadora T1", prioridad: "Baja",       estado: "Cerrada",    dot: "#10b981" },
  ]
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: "#4361ee" }}>
            <span style={{ fontSize: 8, color: "white", fontWeight: 800 }}>O</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">OxyPulse</span>
        </div>
        <span style={{ fontSize: 10, color: "#9ca3af" }}>Panel de Mantenimiento</span>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-2 p-4">
        {[
          { v: "42",  l: "OT activas",     c: "#111827" },
          { v: "94%", l: "Disponibilidad", c: "#4361ee" },
          { v: "3",   l: "Críticos",        c: "#ef4444" },
          { v: "38m", l: "Tiempo resp.",    c: "#10b981" },
        ].map((k, i) => (
          <div key={i} className="rounded-xl p-3" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
            <div className="font-bold" style={{ fontSize: 18, color: k.c, lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 3 }}>{k.l}</div>
          </div>
        ))}
      </div>
      {/* OT Table */}
      <div className="flex-1 px-4 pb-4">
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <div className="grid px-3 py-2 bg-gray-50" style={{ gridTemplateColumns: "56px 1fr 64px 64px", gap: 8 }}>
            {["ID", "Equipo", "Prioridad", "Estado"].map(h => (
              <span key={h} style={{ fontSize: 9, color: "#9ca3af", fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {ots.map((ot, i) => (
            <div key={i} className="grid px-3 py-2.5 items-center border-t border-gray-50" style={{ gridTemplateColumns: "56px 1fr 64px 64px", gap: 8 }}>
              <span style={{ fontSize: 10, color: "#4361ee", fontWeight: 600 }}>{ot.id}</span>
              <span style={{ fontSize: 10, color: "#374151" }}>{ot.equipo}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: ot.dot }} />
                <span style={{ fontSize: 9, color: ot.dot, fontWeight: 500 }}>{ot.prioridad}</span>
              </div>
              <span className="rounded-full px-1.5 py-0.5 text-center" style={{ fontSize: 8, color: ot.dot, background: ot.dot + "18", fontWeight: 600 }}>{ot.estado}</span>
            </div>
          ))}
        </div>
        {/* Completion bar */}
        <div className="mt-3 flex items-center gap-3">
          <span style={{ fontSize: 9, color: "#9ca3af" }}>Cumplimiento preventivo</span>
          <div className="flex-1 h-1.5 rounded-full bg-gray-100">
            <div className="h-1.5 rounded-full" style={{ width: "93%", background: "linear-gradient(90deg,#4361ee,#3b82f6)" }} />
          </div>
          <span className="font-bold" style={{ fontSize: 10, color: "#4361ee" }}>93%</span>
        </div>
      </div>
    </div>
  )
}

function OxyPlannerMockup() {
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT"]
  const orders = [
    { id: "OPX_CF_2022",  label: "Proyecto / Contratista A", start: 0, width: 5, color: "#4361ee" },
    { id: "OPX_BOM_2002", label: "Proyecto / Contratista B", start: 1, width: 4, color: "#3b82f6" },
    { id: "OPX_BBK_2003", label: "Proyecto / Contratista C", start: 3, width: 5, color: "#60a5fa" },
    { id: "OPX_STR_2001", label: "Proyecto / Contratista D", start: 5, width: 4, color: "#1d4ed8" },
  ]
  const kpis = [
    { value: "2843h", label: "Total",       hi: false },
    { value: "853h",  label: "Disponible",  hi: false },
    { value: "1990h", label: "Utilizado",   hi: true  },
    { value: "70%",   label: "Utilización", hi: true  },
  ]
  const heatmap = [
    ["#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#fca5a5","#f87171","#ef4444","#dbeafe","#bfdbfe"],
    ["#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#2563eb","#f87171","#ef4444","#dc2626","#bfdbfe","#93c5fd"],
  ]
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-gray-400" style={{ fontSize: 9 }}>OxyPlanner — Planificación de Planta</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 py-3 bg-gray-50" style={{ width: 130, borderRight: "1px solid #e5e7eb" }}>
          <div className="px-3 mb-4 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: "#4361ee" }}>
              <span style={{ fontSize: 7, color: "white", fontWeight: 800 }}>O</span>
            </div>
            <span className="font-bold text-gray-900" style={{ fontSize: 9 }}>OxyPlanner</span>
          </div>
          {[
            { label: "Inicio",             active: false, sub: false },
            { label: "Planificación",       active: true,  sub: false },
            { label: "Órdenes de Trabajo",  active: false, sub: true  },
            { label: "Capacidad",           active: false, sub: true  },
            { label: "Dependencias",        active: false, sub: true  },
            { label: "Config. Recursos",    active: false, sub: false },
          ].map((item, i) => (
            <div key={i} style={{ paddingLeft: item.sub ? 20 : 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4 }}>
              <div className="flex items-center gap-1">
                {item.active && <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#4361ee" }} />}
                <span style={{ fontSize: item.sub ? 8 : 9, color: item.active ? "#4361ee" : "#9ca3af", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-bold text-gray-900" style={{ fontSize: 11 }}>Planificación de Planta</span>
            <span className="font-semibold px-2 py-0.5 rounded" style={{ fontSize: 7, background: "#4361ee", color: "white" }}>Sincronizar con Strumis</span>
          </div>
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-1.5 mb-2.5">
            {kpis.map((k, i) => (
              <div key={i} className="rounded-lg px-1.5 py-1.5" style={{ background: k.hi ? "#eff6ff" : "#f9fafb", border: `1px solid ${k.hi ? "#bfdbfe" : "#e5e7eb"}` }}>
                <div className="font-bold" style={{ fontSize: 12, color: k.hi ? "#4361ee" : "#111827", lineHeight: 1.1 }}>{k.value}</div>
                <div style={{ fontSize: 7, color: "#9ca3af", marginTop: 1 }}>{k.label}</div>
              </div>
            ))}
          </div>
          {/* Month headers */}
          <div className="grid mb-1" style={{ gridTemplateColumns: "72px 1fr" }}>
            <div />
            <div className="grid" style={{ gridTemplateColumns: `repeat(${months.length}, 1fr)` }}>
              {months.map(m => <div key={m} className="text-center text-gray-400" style={{ fontSize: 6.5 }}>{m}</div>)}
            </div>
          </div>
          {/* Orders */}
          <div className="space-y-1.5 mb-2.5">
            {orders.map((o, i) => (
              <div key={i} className="grid items-center" style={{ gridTemplateColumns: "72px 1fr" }}>
                <div className="pr-1.5">
                  <div style={{ fontSize: 7.5, color: "#374151", fontWeight: 600, lineHeight: 1.2 }}>{o.label}</div>
                  <div style={{ fontSize: 6.5, color: "#9ca3af" }}>{o.id}</div>
                </div>
                <div className="relative h-4 rounded bg-gray-50 border border-gray-100">
                  <div className="absolute top-0.5 bottom-0.5 rounded" style={{ left: `${(o.start / months.length) * 100}%`, width: `${(o.width / months.length) * 100}%`, background: o.color + "20", border: `1px solid ${o.color}50` }} />
                </div>
              </div>
            ))}
          </div>
          {/* Heatmap */}
          <div className="pt-2 border-t border-gray-100">
            <div style={{ fontSize: 7, color: "#9ca3af", marginBottom: 3 }}>Utilización de recursos</div>
            {heatmap.map((row, ri) => (
              <div key={ri} className="flex gap-0.5 mb-0.5">
                {row.map((c, ci) => <div key={ci} className="flex-1 rounded-sm h-3" style={{ background: c }} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdvisoryMockup() {
  const phases = [
    { n: "Diagnóstico",     sub: "Semana 1–2",     done: true  },
    { n: "Implementación",  sub: "Mes 1–3",         done: true  },
    { n: "Mejora Continua", sub: "Mes 4+",          done: false },
  ]
  const before = [
    { label: "OEE",              before: 62, after: 78 },
    { label: "Cumplimiento prev.",before: 41, after: 93 },
    { label: "Fallas no plan.",  before: 100, after: 39, inverted: true },
    { label: "MTTR (horas)",     before: 4.2, after: 1.8, inverted: true },
  ]
  return (
    <div className="h-full flex flex-col p-5" style={{ background: "#f8faff" }}>
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4361ee" }}>Advisory</span>
        <h3 className="font-bold text-gray-900 mt-1 text-base">Roadmap de mejora industrial</h3>
      </div>
      {/* Phase timeline */}
      <div className="flex items-start gap-0 mb-5">
        {phases.map((p, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: p.done ? "#4361ee" : "white", border: `2px solid ${p.done ? "#4361ee" : "#e0e7ff"}` }}>
                {p.done
                  ? <svg className="w-4 h-4 text-white" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  : <div className="w-2 h-2 rounded-full" style={{ background: "#c7d2fe" }} />
                }
              </div>
              <div className="mt-1.5 text-center">
                <div className="font-semibold" style={{ fontSize: 10, color: p.done ? "#1f2937" : "#9ca3af" }}>{p.n}</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>{p.sub}</div>
              </div>
            </div>
            {i < phases.length - 1 && (
              <div className="h-px flex-1 mb-8" style={{ background: i === 0 ? "#4361ee" : "#e0e7ff" }} />
            )}
          </div>
        ))}
      </div>
      {/* Before/After metrics */}
      <div className="space-y-2.5">
        {before.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: 10, color: "#6b7280" }}>{m.label}</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{m.before}{typeof m.before === "number" && m.before > 10 ? "%" : ""}</span>
                <span style={{ fontSize: 9, color: "#9ca3af" }}>→</span>
                <span className="font-bold" style={{ fontSize: 10, color: "#4361ee" }}>{m.after}{typeof m.after === "number" && m.after > 10 ? "%" : ""}</span>
              </div>
            </div>
            <div className="relative h-2 rounded-full" style={{ background: "#e0e7ff" }}>
              {/* Before bar (lighter) */}
              <div className="absolute top-0 left-0 h-2 rounded-full" style={{ width: `${Math.min(m.before, 100)}%`, background: "#c7d2fe" }} />
              {/* After bar */}
              <div className="absolute top-0 left-0 h-2 rounded-full" style={{ width: `${Math.min(m.after, 100)}%`, background: "linear-gradient(90deg,#4361ee,#60a5fa)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKUPS = [IntegrationMockup, OxyPulseMockup, OxyPlannerMockup, AdvisoryMockup]

const features = [
  {
    number: "01",
    product: "Oxygen Suite",
    productColor: "#122D87",
    productHref: "/plataforma",
    title: "Del Excel al dato en tiempo real",
    description: "Conectamos tus sistemas existentes y creamos una capa de datos unificada. Sin migraciones dolorosas, sin semanas de implementación.",
    highlights: [
      "El técnico registra desde el celular, sin papel ni demoras.",
      "Historial completo de cada activo desde el primer día.",
      "Conecta con tu ERP o sistemas legados sin reemplazarlos.",
      "Planifica tu producción con IA y reprograma con un drag and drop.",
      "Diagnóstico en planta y mejora continua con Advisory.",
    ],
    kpis: [],
  },
  {
    number: "02",
    product: "OxyPulse",
    productColor: "#122D87",
    productHref: "/oxypulse",
    title: "Control total del mantenimiento.",
    description: "Cada orden de trabajo tiene respaldo en datos de criticidad y disponibilidad. Sin intuición, sin urgencias mal priorizadas.",
    highlights: [
      "Criticidad calculada automáticamente por activo y falla.",
      "Cola de OTs priorizada por impacto real, no por urgencia percibida.",
      "Estado de todo el taller en una sola pantalla.",
    ],
    kpis: [
      { value: "+93%", label: "Cumplimiento preventivo" },
      { value: "38 min", label: "Tiempo de respuesta OT" },
      { value: "-61%", label: "Fallas no planificadas" },
    ],
  },
  {
    number: "03",
    product: "OxyPlanner",
    productColor: "#122D87",
    productHref: "/oxyplanner",
    title: "IA para la planificación de producción",
    description: "Cuando cambia la realidad de planta: fallas, urgencias, ausencias. Solo haces drag and drop en el Gantt y nuestra IA te calcula todo.",
    highlights: [
      "Falla una máquina a las 10am. El Gantt se actualiza a las 10:01.",
      "Simula escenarios antes de comprometerte con el cliente.",
      "Potenciado por Oxygen Intelligence para optimización en tiempo real.",
    ],
    kpis: [
      { value: "+12%", label: "Utilización" },
      { value: "+5%", label: "Throughput" },
      { value: "-95%", label: "Tiempo de planificación" },
    ],
  },
  {
    number: "04",
    product: "Advisory",
    productColor: "#122D87",
    productHref: "/advisory",
    title: "Inteligencia industrial para tu operación.",
    description: "Nuestros clientes superan el 90% de cumplimiento preventivo en el primer trimestre. Sin excepción.",
    highlights: [
      "Diagnóstico en planta durante la primera semana.",
      "Implementación con tu equipo, no desde afuera.",
      "Revisión de KPIs cada 30 días hasta que los números sean reales.",
    ],
    kpis: [
      { value: "+93%", label: "Cumplimiento preventivo" },
      { value: "-61%", label: "Fallas no planificadas" },
      { value: "90 días", label: "Al primer resultado" },
    ],
  },
]

export function StickyScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    textBlockRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index)
            }
          })
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#122D87] uppercase tracking-widest mb-4">
            POR QUÉ OXYGEN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Una plataforma, múltiples momentos de impacto
          </h2>
        </div>

        {/* Sticky Scroll Container */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Sticky Mockup */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_48px_rgba(67,97,238,0.12)] border border-[#e0e7ff] relative">
                {MOCKUPS.map((M, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform: activeIndex === i ? "translateY(0) scale(1)" : "translateY(10px) scale(0.99)",
                      transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                      pointerEvents: activeIndex === i ? "auto" : "none",
                      zIndex: activeIndex === i ? 1 : 0,
                    }}
                  >
                    <M />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Scrolling Text Blocks */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="hidden lg:block absolute left-[15px] top-[calc(60vh/2)] bottom-[calc(60vh/2)] w-px bg-gray-100" />

            {features.map((feature, index) => (
              <div
                key={feature.number}
                ref={(el) => { textBlockRefs.current[index] = el }}
                className="lg:min-h-[55vh] flex items-center"
              >
                <div className={`transition-opacity duration-500 w-full ${
                  activeIndex === index ? "opacity-100" : "lg:opacity-35"
                }`}>
                  {/* Mobile Mockup */}
                  <div className="lg:hidden aspect-video rounded-xl overflow-hidden border border-[#e0e7ff] shadow-sm mb-6 relative">
                    {(() => { const M = MOCKUPS[index]; return <M /> })()}
                  </div>

                  <div className="flex items-start gap-5">
                    {/* Timeline node */}
                    <div className="hidden lg:flex flex-col items-center flex-shrink-0 mt-1 relative z-10">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ring-2 ring-white"
                        style={{
                          background: activeIndex === index ? feature.productColor : "#e5e7eb",
                          color: activeIndex === index ? "#fff" : "#9ca3af",
                        }}
                      >
                        {feature.number}
                      </div>
                    </div>

                    <div className="flex-1">
                      {/* Product chip */}
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                        style={{
                          background: `${feature.productColor}15`,
                          color: feature.productColor,
                        }}
                      >
                        {feature.product}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      {/* Explore link — only show for specific products, not /plataforma */}
                      {feature.productHref !== "/plataforma" && (
                        <Link
                          href={feature.productHref}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-6 transition-gap duration-200 hover:gap-2.5"
                          style={{ color: feature.productColor }}
                        >
                          Ver {feature.product}
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-2.5 mb-6">
                        {feature.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <span
                              className="mt-[3px] w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center"
                              style={{ background: `${feature.productColor}18` }}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5.5l2 2 4-4" stroke={feature.productColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* KPIs */}
                      {feature.kpis.length > 0 && <div className="flex gap-6 pt-4 border-t border-gray-100">
                        {feature.kpis.map((kpi, i) => (
                          <div key={i}>
                            <div className="text-3xl font-bold" style={{ color: feature.productColor }}>
                              {kpi.value}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
                          </div>
                        ))}
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
