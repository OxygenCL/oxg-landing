"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, BarChart3, ClipboardList, CalendarDays, Plug, Users, MessageCircle, QrCode, GitBranch, DollarSign } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { prefix: "+", num: 500,  decimals: 0, suffix: "",    label: "Usuarios activos",         sub: "técnicos y jefes de mantenimiento" },
  { prefix: "+", num: 2000, decimals: 0, suffix: "",    label: "Activos registrados",       sub: "con historial de mantenimiento en el CMMS" },
  { prefix: "+", num: 93,   decimals: 0, suffix: "%",   label: "Cumplimiento preventivo",  sub: "promedio en clientes activos" },
  { prefix: "−", num: 61,   decimals: 0, suffix: "%",   label: "Fallas no planificadas",   sub: "vs. línea de base pre-implementación" },
]

const featureCards = [
  {
    icon: ClipboardList,
    title: "Órdenes de mantenimiento",
    desc: "Correctivas, preventivas, inspecciones y mejoras. Vista lista, calendario con drag & drop, y carga de trabajo por técnico. Sub-órdenes por activo y responsable.",
    highlight: true,
  },
  {
    icon: CalendarDays,
    title: "Planes preventivos automáticos",
    desc: "Frecuencia diaria, semanal, mensual o anual. El siguiente plan se genera automáticamente al cerrar el anterior, con días de anticipación configurables.",
    highlight: false,
  },
  {
    icon: MessageCircle,
    title: "Alertas por WhatsApp",
    desc: "Tus técnicos reciben nuevas OTs y vencimientos directo en WhatsApp. Sin apps nuevas, sin correos ignorados.",
    highlight: false,
  },
  {
    icon: Users,
    title: "Solicitudes de mantenimiento",
    desc: "Cualquier operador reporta una falla desde su teléfono sin necesidad de ser técnico. El jefe la convierte en OT con un clic.",
    highlight: false,
  },
  {
    icon: QrCode,
    title: "QR por activo",
    desc: "Cada activo tiene un código QR único imprimible. El técnico lo escanea desde el teléfono y accede al historial completo, OTs activas y parámetros del equipo — sin buscar nada.",
    highlight: false,
  },
  {
    icon: GitBranch,
    title: "Árbol jerárquico de activos",
    desc: "Organiza tus equipos en una jerarquía configurable: Planta → Línea → Máquina → Componente. Con criticidad por activo (Alta / Media / Baja) y documentos técnicos adjuntos.",
    highlight: false,
  },
  {
    icon: BarChart3,
    title: "KPIs por activo y planta",
    desc: "MTBF, MTTR, cumplimiento preventivo, costo de repuestos y ratio Preventivo/Correctivo — por activo individual o toda la planta. Dashboards personalizados por área o rol.",
    highlight: false,
  },
  {
    icon: DollarSign,
    title: "Costo real por orden de trabajo",
    desc: "Registra el costo por hora de cada técnico. OxyPulse calcula automáticamente el costo total de cada OT: horas hombre + repuestos. Sabe exactamente cuánto cuesta mantener cada activo.",
    highlight: false,
  },
  {
    icon: Plug,
    title: "Parámetros e inventario",
    desc: "Registra parámetros operacionales por activo (horómetro, presión, fases eléctricas, temperatura) y controla el stock de repuestos con alertas de stock mínimo.",
    highlight: false,
  },
]

const deepDives = [
  {
    id: "ordenes",
    label: "ÓRDENES DE TRABAJO",
    title: "Cada OT tiene el contexto que tu equipo necesita",
    desc: "Los operadores reportan fallas desde su teléfono. Los técnicos reciben la tarea por WhatsApp. El jefe ve todo en lista, calendario o carga de trabajo — en tiempo real.",
    points: [
      "3 vistas: Lista, Calendario (drag & drop) y Carga de trabajo por técnico",
      "Alertas automáticas por WhatsApp al asignar o vencer una OT",
      "Tipos: Correctiva, Preventiva, Inspección y Mejora · Prioridades: Programable, Urgencia, Emergencia",
      "Sub-órdenes de trabajo por activo y responsable · Toggle 'Equipo detenido'",
      "Registro de tipo y causa de falla · Cierre con adjuntos y firma desde el teléfono",
    ],
    mockup: "ot" as const,
  },
  {
    id: "preventivos",
    label: "ACTIVOS Y PREVENTIVOS",
    title: "Tus activos con historial completo y planes que se cumplen solos",
    desc: "Cada máquina tiene su ficha completa: historial, parámetros, costos y documentación técnica. Escanea el QR impreso en el activo y tienes todo desde el teléfono, en planta.",
    points: [
      "Árbol jerárquico configurable: Planta → Línea → Máquina → Componente",
      "QR único por activo — escanea y accede al historial completo desde el teléfono",
      "Criticidad por activo (Alta / Media / Baja) · Adjuntos: manuales, planos, videos",
      "Parámetros operacionales: horómetro, presión, temperatura, fases eléctricas",
      "Planes con días de anticipación · Fechas variables desde el cierre del anterior",
    ],
    mockup: "preventivos" as const,
    reversed: true,
  },
  {
    id: "kpis",
    label: "DASHBOARD Y KPIs",
    title: "Métricas que te defienden frente a gerencia",
    desc: "MTBF, MTTR y costos reales en tiempo real — a nivel de planta y por activo individual. Incluye el costo de horas hombre por técnico para que sepas exactamente cuánto cuesta cada intervención.",
    points: [
      "Top 10 activos con más correctivas y horas de detención acumuladas",
      "Ratio Preventivo vs Correctivo por activo y período",
      "Costo real por OT: repuestos + horas hombre ($/h por técnico)",
      "Correctivas por causa y tipo de fallo (mecánica, eléctrica, hidráulica, neumática…)",
      "Dashboards personalizados por área, rol o indicador",
    ],
    mockup: "kpi" as const,
  },
]

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── HTML/CSS Mockups ─────────────────────────────────────────────────────────

function OTMockup() {
  const orders = [
    { id: "OT-1847", asset: "Compresor B-3", type: "Correctiva", priority: "Emergencia", status: "En progreso" },
    { id: "OT-1846", asset: "Bomba P-7", type: "Preventiva", priority: "Programable", status: "Pendiente" },
    { id: "OT-1844", asset: "Motor M-12", type: "Preventiva", priority: "Programable", status: "Completada" },
    { id: "OT-1843", asset: "Banda T-2", type: "Inspección", priority: "Urgencia", status: "En progreso" },
  ]
  const statusColor: Record<string, string> = { "En progreso": "#f59e0b", "Pendiente": "#6b7280", "Completada": "#10b981" }
  const priorityColor: Record<string, string> = { "Emergencia": "#ef4444", "Urgencia": "#f59e0b", "Programable": "#10b981" }
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPulse</span>
        </div>
        <div className="flex gap-1">
          {["Inicio", "OTs", "Activos", "KPIs"].map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: t === "OTs" ? "rgba(255,255,255,0.15)" : "transparent", color: t === "OTs" ? "white" : "rgba(255,255,255,0.4)", fontWeight: t === "OTs" ? 600 : 400 }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900 text-sm">Órdenes de Trabajo</p>
          <p className="text-gray-400" style={{ fontSize: 11 }}>18 abiertas · 4 urgentes</p>
        </div>
        <div className="bg-[#4361ee] text-white px-3 py-1.5 rounded-lg font-semibold cursor-pointer hover:opacity-90">+ Nueva OT</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["ID", "Activo", "Tipo", "Prioridad", "Estado"].map(h => (
              <th key={h} className="px-3 py-2 text-left text-gray-400 font-medium" style={{ fontSize: 11 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id} className="border-b border-gray-50" style={{ background: i === 0 ? "rgba(245,158,11,0.04)" : undefined }}>
              <td className="px-3 py-2.5 font-mono text-[#4361ee] font-semibold">{o.id}</td>
              <td className="px-3 py-2.5 text-gray-800 font-medium">{o.asset}</td>
              <td className="px-3 py-2.5 text-gray-500">{o.type}</td>
              <td className="px-3 py-2.5">
                <span className="px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 10, background: priorityColor[o.priority] + "20", color: priorityColor[o.priority] }}>{o.priority}</span>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[o.status] }} />
                  <span style={{ color: statusColor[o.status] }}>{o.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PreventivosMockup() {
  const weeks = ["S1", "S2", "S3", "S4"]
  const activities = [
    { name: "Compresor B-3", active: [true, false, false, false], done: true },
    { name: "Bomba P-7",     active: [false, true, false, false], done: false },
    { name: "Motor M-12",   active: [false, false, true, false], done: false },
    { name: "Banda T-2",    active: [false, true, false, false], done: false },
    { name: "Caldera C-1",  active: [false, false, false, true], done: false },
  ]
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPulse</span>
        </div>
        <span className="text-white/50 text-xs">Plan Mensual — Octubre 2025</span>
      </div>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900 text-sm">Plan Preventivo</p>
          <p className="text-gray-400" style={{ fontSize: 11 }}>Cumplimiento: 93% · 5 actividades</p>
        </div>
        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 11 }}>En meta</span>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1" style={{ color: "#6b7280" }}>
            <span>Avance del mes</span>
            <span className="font-bold text-gray-900">93%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-2 rounded-full" style={{ width: "93%", background: "linear-gradient(90deg,#4361ee,#10b981)" }} />
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <div className="grid bg-gray-50 border-b border-gray-100 font-medium" style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", color: "#9ca3af", fontSize: 11 }}>
            <div className="p-2">Activo</div>
            {weeks.map(w => <div key={w} className="p-2 text-center">{w}</div>)}
          </div>
          {activities.map((a, i) => (
            <div key={i} className="grid border-b border-gray-50 last:border-0" style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr" }}>
              <div className="p-2 text-gray-700 font-medium">{a.name}</div>
              {a.active.map((on, wi) => (
                <div key={wi} className="p-2 flex items-center justify-center">
                  {on && (
                    <span className="px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 10, background: a.done ? "#d1fae5" : "#e8ecff", color: a.done ? "#059669" : "#4361ee" }}>
                      {a.done ? "✓ Listo" : "Prog."}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KPIMockup() {
  const kpis = [
    { label: "Cumplimiento prev.", value: "93%",   change: "+51pts", up: true },
    { label: "MTBF",               value: "847 h", change: "+2.3x",  up: true },
    { label: "Disponibilidad",     value: "97.4%", change: "+8%",    up: true },
    { label: "Costo mensual",      value: "$4.2M", change: "−18%",   up: false },
  ]
  const months = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const values = [42, 58, 71, 79, 88, 93]
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPulse</span>
        </div>
        <span className="text-white/50 text-xs">Dashboard · Dic 2025</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-xl p-3 border border-gray-100 bg-gray-50/60">
              <p className="text-gray-400 leading-tight mb-1" style={{ fontSize: 10 }}>{k.label}</p>
              <p className="font-bold text-gray-900" style={{ fontSize: "1.1rem" }}>{k.value}</p>
              <p className="font-semibold mt-0.5" style={{ fontSize: 10, color: k.up ? "#10b981" : "#f59e0b" }}>{k.change} vs. inicio</p>
            </div>
          ))}
        </div>
        <div className="border border-gray-100 rounded-xl p-3">
          <p className="text-gray-600 font-semibold mb-3" style={{ fontSize: 11 }}>Cumplimiento preventivo (%)</p>
          <div className="flex items-end gap-1.5" style={{ height: 64 }}>
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(values[i] / 100) * 52}px`,
                    background: i === months.length - 1 ? "linear-gradient(180deg,#4361ee,#1e40af)" : "#e8ecff",
                  }}
                />
                <span className="text-gray-400" style={{ fontSize: 9 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatItem({
  prefix, num, decimals, suffix, label, sub, delay = 0,
}: {
  prefix: string; num: number; decimals: number; suffix: string;
  label: string; sub: string; delay?: number
}) {
  const { ref, visible } = useReveal()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!visible) return
    const DURATION = 1400
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    let start: number | null = null
    let raf: number

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const t = Math.min(elapsed / DURATION, 1)
      setDisplay(parseFloat((num * ease(t)).toFixed(decimals)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [visible, num, decimals, delay])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display)

  return (
    <div
      ref={ref}
      className="py-6 px-4 md:py-10 md:px-8 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="font-bold text-gray-900 mb-1 tabular-nums" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.4rem)" }}>
        {prefix}{formatted}{suffix}
      </p>
      <p className="text-gray-800 font-semibold text-sm">{label}</p>
      <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc, highlight }: { icon: React.ElementType; title: string; desc: string; highlight: boolean }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 border transition-all duration-700 hover:shadow-lg"
      style={{
        borderColor: highlight ? "#c7d2fe" : "#e5e7eb",
        background: highlight ? "#f0f3ff" : "white",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: highlight ? "#4361ee" : "#f3f4f6" }}
      >
        <Icon className="w-5 h-5" style={{ color: highlight ? "white" : "#6b7280" }} />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function DeepDive({
  id, label, title, desc, points, mockup, reversed, alt,
}: {
  id: string; label: string; title: string; desc: string; points: string[];
  mockup: "ot" | "preventivos" | "kpi"; reversed?: boolean; alt?: boolean
}) {
  const { ref, visible } = useReveal(0.08)
  const MockupEl = mockup === "ot" ? OTMockup : mockup === "preventivos" ? PreventivosMockup : KPIMockup
  return (
    <section id={id} className="py-24 scroll-mt-20" style={{ background: alt ? "#f8f9ff" : "white" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)" }}
      >
        <div className={reversed ? "lg:order-2" : ""}>
          <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">{label}</span>
          <h2 className="mt-3 font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}>
            {title}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 text-[1.03rem]">{desc}</p>
          <ul className="space-y-3">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#4361ee" }} />
                <span className="text-gray-700 text-sm">{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/nosotros#contacto"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-all hover:gap-3"
            style={{ color: "#4361ee" }}
          >
            Contactar con ventas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <MockupEl />
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OxyPulsePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="pt-36 pb-24 overflow-hidden relative" style={{ background: "#0A2434" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Video background */}
          <video
            src="/hero-bg2.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          {/* Dark overlay to keep text readable */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.75) 0%, rgba(15,30,61,0.65) 55%, rgba(10,36,52,0.75) 100%)" }} />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 65%)", transform: "translate(25%, -25%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.07) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                <BarChart3 className="w-3.5 h-3.5" style={{ color: "#818cf8" }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>CMMS INTELIGENTE</span>
              </div>

              <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.2vw, 2.9rem)" }}>
                El mantenimiento de tu planta, bajo control.
              </h1>

              <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.08rem" }}>
                OxyPulse automatiza tus planes preventivos, órdenes de trabajo, gestión de fallas y repuestos — con inteligencia artificial integrada.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/nosotros#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: "#4361ee" }}
                >
                  Contactar con ventas <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#funcionalidades"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                >
                  Ver funcionalidades
                </Link>
              </div>

              {/* Integration logos */}
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Integra con</p>
                <div className="flex items-center gap-6 flex-wrap">
                  {["Tekla", "Strumis", "SAP", "IBM", "Microsoft Dynamics AX"].map(l => (
                    <span key={l} className="text-sm font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — KPI mockup */}
            <div className="hidden lg:block">
              <KPIMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => <StatItem key={i} {...s} delay={i * 120} />)}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE CARDS ── */}
      <section id="funcionalidades" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>FUNCIONALIDADES</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Todo lo que necesita tu equipo de mantenimiento
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              Nueve módulos diseñados para el equipo de mantenimiento industrial que quiere resultados reales, no software de demostración.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── 4. DEEP DIVES ── */}
      {deepDives.map((d, i) => (
        <DeepDive key={d.id} {...d} alt={i % 2 === 1} />
      ))}

      {/* ── 5. QUOTE ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Lo que dicen nuestros clientes
          </p>
          <blockquote className="font-semibold text-white leading-relaxed mb-8" style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}>
            &quot;OxyPulse integra planificación preventiva, correctivos e indicadores en un solo lugar. Una herramienta potente, alineada con las mejores prácticas y orientada a la mejora continua.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "rgba(255,255,255,0.12)" }}>
              IG
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Iván Góngora</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Supervisor de Mantenimiento, Ferma S.A
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTEGRATIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>INTEGRACIONES</span>
          <h2 className="mt-3 font-bold text-gray-900 text-2xl mb-4">Conecta con los sistemas que ya usas</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12 text-sm leading-relaxed">
            OxyPulse no reemplaza tu ERP, lo complementa. Sincroniza inventario, mantenimiento, personal y turnos en un solo lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Tekla", color: "#4361ee" },
              { name: "Strumis", color: "#122D87" },
              { name: "SAP", color: "#0070f3" },
              { name: "IBM", color: "#1F70C1" },
              { name: "Microsoft Dynamics AX", color: "#1e40af" },
            ].map((s) => (
              <div
                key={s.name}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center gap-2.5 hover:border-[#4361ee]/30 hover:shadow-sm transition-all"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm font-semibold text-gray-700">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="py-24 border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
            ¿Listo para salir del modo reactivo?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Más de 500 usuarios activos ya gestionan sus operaciones con OxyPulse. Habla con nuestro equipo y ve cómo se adapta a tu planta.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/nosotros#contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: "#4361ee" }}
            >
              Contactar con ventas <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/casos/amcs-digitalizacion-mantenimiento"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Ver caso de éxito de AMCS
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
