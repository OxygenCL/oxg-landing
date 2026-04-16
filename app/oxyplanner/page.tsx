"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Calendar, GitBranch, RefreshCw, Eye, FlaskConical, FileSpreadsheet, Brain, HelpCircle, Zap, Cpu, Sliders, Link2, Bell } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { prefix: "−", num: 95,  decimals: 0, suffix: "%",   label: "Tiempo de planificación", sub: "de horas a minutos por semana" },
  { prefix: "+", num: 12,  decimals: 0, suffix: "%",   label: "Utilización de capacidad", sub: "sobre línea de base pre-implementación" },
  { prefix: "+", num: 5,   decimals: 0, suffix: "%",   label: "Throughput de producción", sub: "sin agregar turnos ni equipos" },
  { prefix: "",  num: 8,   decimals: 0, suffix: " min", label: "Reprogramación ante falla", sub: "desde 2–4 horas con planificación manual" },
]

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "El Efecto Dominó",
    desc: "Falla una máquina o entra un pedido urgente: actualizar el plan significa tocar decenas de filas en múltiples planillas. Una hora de trabajo para un cambio de 10 minutos. Algo siempre queda desincronizado.",
  },
  {
    icon: Brain,
    title: "El plan vive en la cabeza del planificador",
    desc: "Sabe qué máquinas están sobrecargadas, qué órdenes tienen prioridad y dónde están los cuellos de botella — pero no puede compartir ese conocimiento ni respaldarlo con datos cuando alguien lo cuestiona.",
  },
  {
    icon: HelpCircle,
    title: "No puedes simular antes de comprometerte",
    desc: "El cliente llama pidiendo un pedido urgente. Dices que sí sin saber realmente el impacto. Después viene el atraso, la explicación y la pérdida de confianza.",
  },
]

const featureCards = [
  {
    icon: GitBranch,
    title: "Gantt multi-mes con drag & drop",
    desc: "Arrastra órdenes en el Gantt para reprogramar. Capacidad, disponible, utilizado y % utilización siempre visibles en la cabecera.",
    highlight: true,
  },
  {
    icon: Sliders,
    title: "Simulación de escenarios",
    desc: "Antes de comprometerte con un cliente, simula el impacto. OxyPlanner muestra exactamente qué se atrasa, cuánto, y qué opciones tienes — en segundos.",
    highlight: false,
  },
  {
    icon: RefreshCw,
    title: "Rutas auto-generadas",
    desc: "Importas tus órdenes con las operaciones y el orden de ejecución — OxyPlanner genera las rutas de fabricación automáticamente.",
    highlight: false,
  },
  {
    icon: Eye,
    title: "Proyección de carga 14 días",
    desc: "Ve las horas comprometidas para los próximos 14 días por clase de máquina. Detecta sobrecargas antes de que ocurran.",
    highlight: false,
  },
  {
    icon: FlaskConical,
    title: "Rendimientos por parámetro",
    desc: "Define tiempos en HH/Ton, seg/Metro Lineal o seg/unitario. El sistema calcula automáticamente cuánto tarda cada operación según el peso, largo o cantidad del ítem.",
    highlight: false,
  },
  {
    icon: Calendar,
    title: "Calendarios y disponibilidad",
    desc: "Define horarios por clase de equipo con excepciones (feriados, turnos extra). Ajusta horas disponibles por día con un clic.",
    highlight: false,
  },
  {
    icon: Link2,
    title: "Integración nativa con Strumis",
    desc: "OxyPlanner lee la estructura de Strumis: órdenes, rutas y operaciones. Una vez configurada la integración, los datos fluyen directo al plan de producción sin entrada manual.",
    highlight: true,
  },
  {
    icon: Bell,
    title: "Notificaciones automáticas al equipo",
    desc: "Cuando se reprograma una orden, el equipo afectado recibe una notificación automática. Sin llamadas de último minuto ni mensajes manuales.",
    highlight: false,
  },
]

const oxyIntelligence = [
  {
    icon: Zap,
    title: "Secuenciación óptima",
    desc: "Sugiere el orden más eficiente considerando rutas, máquinas y dependencias de cada orden.",
  },
  {
    icon: Eye,
    title: "Detección de conflictos",
    desc: "Identifica sobrecargas y cuellos de botella antes de que ocurran — no después de que el cliente llame.",
  },
  {
    icon: Cpu,
    title: "Simulación predictiva",
    desc: "Modela el impacto de cambios antes de aplicarlos al plan real. Compara escenarios y elige el óptimo.",
  },
]

const deepDives = [
  {
    id: "secuenciacion",
    label: "SECUENCIACIÓN",
    title: "Tu plan de producción construido sobre la realidad, no sobre supuestos",
    desc: "Importas tus órdenes desde Excel con las operaciones y su orden de ejecución. OxyPlanner genera las rutas automáticamente, asigna capacidad real y construye un Gantt ejecutable.",
    points: [
      "Importación de órdenes desde Excel con rutas auto-generadas",
      "Jerarquía configurable: Proyecto → OP → Fase → Contrato",
      "Prioridad por fecha de entrega y urgencia del pedido",
      "TON, metros lineales, cantidad: unidades de medida reales de planta",
    ],
    mockup: "gantt" as const,
  },
  {
    id: "reprogramacion",
    label: "REPROGRAMACIÓN DINÁMICA",
    title: "La planta cambia. El plan también",
    desc: "Falla una máquina, entra una urgencia, cambia una fecha de entrega. Ajusta el Gantt con drag & drop y el sistema recalcula la utilización en tiempo real. Sin planillas intermedias.",
    points: [
      "Drag & drop directo sobre el Gantt para reprogramar",
      "Utilización de capacidad actualizada al instante",
      "Notificaciones automáticas al equipo afectado al reprogramar",
      "Disponibilidad por clase de equipo ajustable por día (+/−)",
      "Calendarios con excepciones: feriados, paros programados, turnos extra",
      "Sincronización con Strumis para metalmecánica de acero estructural",
      "API REST para integración con tu ERP o sistemas externos",
    ],
    mockup: "reprog" as const,
    reversed: true,
  },
  {
    id: "escenarios",
    label: "SIMULACIÓN DE ESCENARIOS",
    title: "Decide con datos antes de comprometer capacidad",
    desc: "¿Puedo entregar ese pedido urgente sin atrasar los otros? El dashboard muestra TON planificadas vs disponibles, utilización % y proyección de carga para los próximos 14 días.",
    points: [
      "Dashboard: TON por clase de máquina vs disponibles",
      "Horas requeridas vs disponibles por centro de trabajo",
      "Proyección de carga comprometida próximos 14 días",
      "Ratio planificadas / no planificadas en tiempo real",
    ],
    mockup: "escenarios" as const,
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

// Full Figma-faithful hero mockup (dark theme with sidebar, KPIs, Gantt, heatmap)
function HeroMockup() {
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP"]
  const orders = [
    { id: "OPX_CF_2022", label: "Proyecto / Contratista A", start: 0, width: 5, color: "#4361ee" },
    { id: "OPX_BOM_2002", label: "Proyecto / Contratista B", start: 1, width: 4, color: "#3b82f6" },
    { id: "OPX_BBK_2003", label: "Proyecto / Contratista C", start: 3, width: 5, color: "#60a5fa" },
  ]
  const kpis = [
    { value: "2843h", label: "Total", hi: false },
    { value: "853h",  label: "Disponible", hi: false },
    { value: "1990h", label: "Utilizado",  hi: true  },
    { value: "70%",   label: "Utilización",hi: true  },
  ]
  const heatmap = [
    ["#1e3a5f","#1e40af","#2563eb","#3b82f6","#60a5fa","#93c5fd","#bfdbfe","#dbeafe"],
    ["#1e40af","#2563eb","#3b82f6","#1d4ed8","#ef4444","#dc2626","#b91c1c","#7f1d1d"],
  ]

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ background: "white", fontSize: 11 }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-3 text-gray-400" style={{ fontSize: 9 }}>OxyPlanner — Planificación de Planta</span>
      </div>

      {/* App shell */}
      <div className="flex" style={{ minHeight: 310 }}>

        {/* ── Sidebar ── */}
        <div className="flex-shrink-0 flex flex-col py-4" style={{ width: 148, background: "#f8f9fb", borderRight: "1px solid #e5e7eb" }}>
          {/* Logo */}
          <div className="px-4 mb-5 flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "#4361ee" }}>
              <span style={{ fontSize: 8, color: "white", fontWeight: 800 }}>O</span>
            </div>
            <span className="font-bold text-gray-800" style={{ fontSize: 10 }}>OxyPlanner</span>
          </div>
          {[
            { label: "Inicio", active: false, sub: false },
            { label: "Planificación", active: true,  sub: false },
            { label: "Órdenes de Trabajo", active: false, sub: true  },
            { label: "Capacidad",          active: false, sub: true  },
            { label: "Dependencias",       active: false, sub: true  },
            { label: "Config. Recursos",   active: false, sub: false },
          ].map((item, i) => (
            <div key={i} style={{ paddingLeft: item.sub ? 22 : 14, paddingRight: 14, paddingTop: 5, paddingBottom: 5 }}>
              <div className="flex items-center gap-1.5">
                {item.active && <div className="w-1 h-1 rounded-full" style={{ background: "#4361ee", flexShrink: 0 }} />}
                <span style={{ fontSize: item.sub ? 9 : 10, color: item.active ? "#4361ee" : "#9ca3af", fontWeight: item.active ? 600 : 400 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
          {/* User avatar at bottom */}
          <div className="mt-auto px-4 flex items-center gap-2 pt-4" style={{ borderTop: "1px solid #e5e7eb" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#1e40af" }}>
              <span style={{ fontSize: 8, color: "white", fontWeight: 700 }}>JR</span>
            </div>
            <span style={{ fontSize: 9, color: "#9ca3af" }}>Jefe de Planta</span>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-4 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-800" style={{ fontSize: 12 }}>Planificación de Planta</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22d3ee" }} />
              <span className="font-semibold px-2 py-1 rounded" style={{ fontSize: 8, background: "#4361ee", color: "white" }}>
                Sincronizar con Strumis
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {kpis.map((k, i) => (
              <div key={i} className="rounded-lg px-2 py-2" style={{
                background: k.hi ? "#eef2ff" : "#f9fafb",
                border: `1px solid ${k.hi ? "#c7d2fe" : "#e5e7eb"}`,
              }}>
                <div className="font-bold" style={{ fontSize: 13, color: k.hi ? "#4361ee" : "#0a2434", lineHeight: 1.2 }}>{k.value}</div>
                <div style={{ fontSize: 7.5, color: "#9ca3af", marginTop: 1 }}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="rounded px-2 py-1.5 mb-3 flex items-center gap-2" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
            <div className="w-3 h-3 rounded-full border border-gray-300" />
            <span style={{ fontSize: 9, color: "#d1d5db" }}>Buscar Orden &gt; Proyecto</span>
          </div>

          {/* Gantt header (months) */}
          <div className="grid mb-1" style={{ gridTemplateColumns: "88px 1fr" }}>
            <div />
            <div className="grid" style={{ gridTemplateColumns: `repeat(${months.length}, 1fr)` }}>
              {months.map(m => (
                <div key={m} className="text-center" style={{ fontSize: 7.5, color: "#9ca3af", paddingBottom: 3 }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Gantt rows */}
          <div className="space-y-1.5">
            {orders.map((order, i) => (
              <div key={i} className="grid items-center" style={{ gridTemplateColumns: "88px 1fr" }}>
                <div className="pr-2">
                  <div style={{ fontSize: 8, color: "#374151", fontWeight: 600, lineHeight: 1.3 }}>{order.label}</div>
                  <div style={{ fontSize: 7, color: "#9ca3af" }}>{order.id}</div>
                </div>
                <div className="relative h-5 rounded" style={{ background: "#f3f4f6" }}>
                  <div
                    className="absolute top-0.5 bottom-0.5 rounded flex items-center"
                    style={{
                      left: `${(order.start / months.length) * 100}%`,
                      width: `${(order.width / months.length) * 100}%`,
                      background: order.color + "22",
                      border: `1px solid ${order.color}66`,
                    }}
                  >
                    <span style={{ fontSize: 6.5, color: order.color, fontWeight: 700, paddingLeft: 4 }}>{order.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resource heatmap */}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 7.5, color: "#9ca3af", marginBottom: 4 }}>Utilización de recursos</div>
            <div className="space-y-1">
              {heatmap.map((row, ri) => (
                <div key={ri} className="flex gap-0.5">
                  {row.map((color, ci) => (
                    <div key={ci} className="flex-1 rounded-sm h-4" style={{ background: color + "bb" }} />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function GanttMockup() {
  const orders = [
    { id: "OP-441", product: "Pieza A-12", line: "Línea 1", start: 0,  width: 3, color: "#4361ee" },
    { id: "OP-442", product: "Pieza B-7",  line: "Línea 1", start: 3,  width: 2, color: "#1d4ed8" },
    { id: "OP-443", product: "Pieza C-3",  line: "Línea 2", start: 0,  width: 4, color: "#4361ee" },
    { id: "OP-444", product: "Pieza D-9",  line: "Línea 2", start: 4,  width: 1, color: "#10b981" },
    { id: "OP-445", product: "Pieza A-12", line: "Línea 3", start: 1,  width: 3, color: "#f59e0b" },
  ]
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"]
  const lines = ["Línea 1", "Línea 2", "Línea 3"]
  const ordersByLine = lines.map(l => orders.filter(o => o.line === l))

  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPlanner</span>
        </div>
        <div className="flex gap-1">
          {["Plan", "Capacidad", "Escenarios", "KPIs"].map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: t === "Plan" ? "rgba(255,255,255,0.15)" : "transparent", color: t === "Plan" ? "white" : "rgba(255,255,255,0.4)", fontWeight: t === "Plan" ? 600 : 400 }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900 text-sm">Plan Semanal — Semana 47</p>
          <p className="text-gray-400" style={{ fontSize: 11 }}>12 órdenes · 3 líneas · 94% capacidad utilizada</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 10 }}>Aprobado</span>
          <span className="bg-[#4361ee]/10 text-[#4361ee] px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 10 }}>Exportar</span>
        </div>
      </div>
      <div className="p-4">
        {/* Gantt header */}
        <div className="grid mb-1" style={{ gridTemplateColumns: "80px 1fr", fontSize: 10 }}>
          <div />
          <div className="grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {days.map(d => <div key={d} className="text-center text-gray-400 font-medium pb-1">{d}</div>)}
          </div>
        </div>
        {/* Gantt rows */}
        <div className="space-y-2">
          {ordersByLine.map((lineOrders, li) => (
            <div key={li} className="grid items-center" style={{ gridTemplateColumns: "80px 1fr" }}>
              <span className="text-gray-500 font-medium pr-2" style={{ fontSize: 10 }}>{lines[li]}</span>
              <div className="relative h-7 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                {lineOrders.map((o) => (
                  <div
                    key={o.id}
                    className="absolute top-1 bottom-1 rounded flex items-center px-1.5"
                    style={{
                      left: `${(o.start / 5) * 100}%`,
                      width: `${(o.width / 5) * 100}%`,
                      background: o.color + "22",
                      border: `1px solid ${o.color}44`,
                    }}
                  >
                    <span className="font-semibold truncate" style={{ fontSize: 9, color: o.color }}>{o.product}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Capacity bar */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between mb-1" style={{ fontSize: 10, color: "#9ca3af" }}>
            <span>Capacidad utilizada</span>
            <span className="font-bold text-gray-700">94%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100">
            <div className="h-1.5 rounded-full" style={{ width: "94%", background: "linear-gradient(90deg,#4361ee,#1e40af)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ReprogMockup() {
  const timeline = [
    { time: "08:14", event: "Falla detectada en Línea 2", type: "alert" },
    { time: "08:15", event: "OxyPlanner inicia recálculo automático", type: "system" },
    { time: "08:22", event: "Nuevo plan generado — 3 órdenes reasignadas", type: "success" },
    { time: "08:23", event: "Notificación enviada al equipo", type: "success" },
  ]
  const rerouted = [
    { id: "OP-443", from: "Línea 2", to: "Línea 3", status: "Reasignada", delay: "0 min" },
    { id: "OP-444", from: "Línea 2", to: "Línea 1", status: "Reasignada", delay: "12 min" },
  ]
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPlanner</span>
        </div>
        <span className="text-white/50 text-xs">Alerta de reprogramación · hoy 08:22</span>
      </div>
      <div className="px-4 py-3 border-b border-gray-100 bg-amber-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
        <p className="font-semibold text-amber-800 text-xs">Falla en Línea 2 — Plan recalculado automáticamente en 8 min</p>
      </div>
      <div className="p-4 space-y-4">
        {/* Timeline */}
        <div className="space-y-2">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-400 font-mono flex-shrink-0" style={{ fontSize: 10, marginTop: 1 }}>{t.time}</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: t.type === "alert" ? "#ef4444" : t.type === "success" ? "#10b981" : "#6b7280" }} />
                <span className="text-gray-700" style={{ fontSize: 11 }}>{t.event}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Rerouted orders */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
            <span className="text-gray-500 font-semibold" style={{ fontSize: 11 }}>Órdenes reasignadas</span>
          </div>
          {rerouted.map((r, i) => (
            <div key={i} className="px-3 py-2.5 border-b border-gray-50 last:border-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-[#4361ee]">{r.id}</span>
                <span className="text-gray-400 text-xs">{r.from}</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="font-semibold text-gray-700 text-xs">{r.to}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "#10b981" }}>+{r.delay}</span>
                <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 10 }}>{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EscenariosMockup() {
  const scenarios = [
    { name: "Escenario A", label: "Plan base", otd: 94, util: 88, throughput: 142, selected: false },
    { name: "Escenario B", label: "Pedido urgente", otd: 89, util: 97, throughput: 148, selected: true },
    { name: "Escenario C", label: "Optimizado", otd: 96, util: 91, throughput: 145, selected: false },
  ]
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white" style={{ fontSize: 12 }}>
      <div className="bg-[#0A2434] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs font-bold">OxyPlanner</span>
        </div>
        <span className="text-white/50 text-xs">Simulación de escenarios</span>
      </div>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900 text-sm">Comparar escenarios</p>
          <p className="text-gray-400" style={{ fontSize: 11 }}>3 escenarios · Semana 47</p>
        </div>
        <span className="bg-[#4361ee]/10 text-[#4361ee] px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 10 }}>+ Nuevo escenario</span>
      </div>
      <div className="p-4 space-y-3">
        {scenarios.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border p-3"
            style={{ borderColor: s.selected ? "#4361ee" : "#e5e7eb", background: s.selected ? "#f0f3ff" : "white" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold text-gray-900" style={{ fontSize: 11 }}>{s.name}</span>
                <span className="text-gray-400 ml-2" style={{ fontSize: 10 }}>{s.label}</span>
              </div>
              {s.selected && <span className="bg-[#4361ee] text-white px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 9 }}>Seleccionado</span>}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "OTD", val: `${s.otd}%`, good: s.otd >= 94 },
                { key: "Utilización", val: `${s.util}%`, good: s.util <= 95 },
                { key: "Throughput", val: `${s.throughput} u/d`, good: true },
              ].map((m, mi) => (
                <div key={mi} className="text-center">
                  <p className="font-bold" style={{ fontSize: "0.95rem", color: m.good ? "#111827" : "#ef4444" }}>{m.val}</p>
                  <p className="text-gray-400" style={{ fontSize: 9 }}>{m.key}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
      const t = Math.min((ts - start) / DURATION, 1)
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
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transitionDelay: `${delay}ms` }}
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
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: highlight ? "#4361ee" : "#f3f4f6" }}>
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
  mockup: "gantt" | "reprog" | "escenarios"; reversed?: boolean; alt?: boolean
}) {
  const { ref, visible } = useReveal(0.08)
  const MockupEl = mockup === "gantt" ? GanttMockup : mockup === "reprog" ? ReprogMockup : EscenariosMockup
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

export default function OxyPlannerPage() {
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
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.75) 0%, rgba(15,30,61,0.65) 55%, rgba(10,36,52,0.75) 100%)" }} />
          <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.12) 0%, transparent 65%)", transform: "translate(-25%, -25%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(30,64,175,0.10) 0%, transparent 65%)", transform: "translate(30%, 30%)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                <Calendar className="w-3.5 h-3.5" style={{ color: "#60a5fa" }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>APS · POTENCIADO POR OXYGEN INTELLIGENCE</span>
              </div>

              <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.2vw, 2.9rem)" }}>
                Deja de replanificar en Excel. Empieza a planificar con inteligencia.
              </h1>

              <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.08rem" }}>
                OxyPlanner secuencia tus órdenes de producción considerando las restricciones reales de tu planta, reprograma automáticamente ante cualquier cambio y simula escenarios antes de comprometerte.
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

              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Compatible con</p>
                <div className="flex items-center gap-6 flex-wrap">
                  {["Tekla", "Strumis", "SAP", "IBM", "Microsoft Dynamics AX"].map(l => (
                    <span key={l} className="text-sm font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Full app mockup (Figma-faithful) */}
            <div className="hidden lg:block">
              <HeroMockup />
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

      {/* ── 3. EL PROBLEMA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>EL PROBLEMA</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              La planificación en Excel no fue diseñada para tu planta
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="rounded-2xl border border-gray-100 p-8 bg-gray-50">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "#fee2e2" }}>
                    <Icon className="w-5 h-5" style={{ color: "#ef4444" }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-base">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE CARDS ── */}
      <section id="funcionalidades" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>FUNCIONALIDADES</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Todo lo que necesita tu equipo de planificación
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              Seis módulos pensados para el jefe de producción que quiere planificar con confianza y responder ante imprevistos sin caos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── 5. STRUMIS WOW ── */}
      <section className="relative overflow-hidden py-28" style={{ background: "#080f1a" }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: "#1e40af", transform: "translateY(-50%)" }} />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "#3b82f6", transform: "translateY(-50%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: "rgba(67,97,238,0.4)", background: "rgba(67,97,238,0.12)", color: "#60a5fa" }}>
              <Link2 className="w-3.5 h-3.5" /> Integración nativa
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-16">
            <h2 className="font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}>
              ¿Ya usas Strumis?<br />
              <span style={{ display: "inline-block", background: "linear-gradient(90deg, #4361ee, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Intégralo con OxyPlanner.
              </span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed">
              OxyPlanner está diseñado para leer la estructura de Strumis: órdenes, rutas, operaciones y materiales. Una vez configurada la integración, los datos fluyen directo al plan de producción, sin importaciones manuales ni doble entrada.
            </p>
          </div>

          {/* Flow visual */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-16 flex-wrap">
            {/* Strumis box */}
            <div className="rounded-2xl border px-8 py-6 text-center flex-shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", minWidth: 160 }}>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Sistema origen</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/STRUMIS.png" alt="Strumis" style={{ height: 36, width: 150, objectFit: "cover", objectPosition: "left center", margin: "0 auto", filter: "brightness(0) invert(1)" }} />
              <p className="text-white/50 text-xs mt-1">ERP Metalmecánica</p>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-24 h-px" style={{ background: "linear-gradient(90deg, rgba(67,97,238,0.3), #4361ee)" }} />
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: "#4361ee", background: "rgba(67,97,238,0.2)" }}>
                  <RefreshCw className="w-3 h-3" style={{ color: "#60a5fa" }} />
                </div>
                <div className="w-16 sm:w-24 h-px" style={{ background: "linear-gradient(90deg, #4361ee, rgba(34,211,238,0.3))" }} />
              </div>
              <span className="text-white/60 text-xs mt-1">Sync automático</span>
            </div>

            {/* OxyPlanner box */}
            <div className="rounded-2xl border px-8 py-6 text-center flex-shrink-0"
              style={{ borderColor: "rgba(67,97,238,0.5)", background: "rgba(67,97,238,0.1)", minWidth: 160 }}>
              <p className="text-[#60a5fa] text-xs uppercase tracking-widest mb-2">Destino</p>
              <p className="text-white font-bold text-xl tracking-wide">OXYPLANNER</p>
              <p className="text-white/50 text-xs mt-1">Plan de producción activo</p>
            </div>
          </div>

          {/* 3 benefits */}
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
            {[
              { num: "01", title: "Estructura importada con precisión", desc: "OPs, rutas, operaciones y fechas se leen directamente desde Strumis. La configuración inicial requiere revisión y ajuste según tu operación." },
              { num: "02", title: "Un solo sistema de registro", desc: "Cada cambio validado en Strumis se refleja en el plan de producción activo. Sin copiar, sin conciliar, sin errores por doble entrada." },
              { num: "03", title: "Implementación guiada", desc: "El equipo de Oxygen trabaja contigo para mapear la estructura de datos correctamente. La integración se hace bien desde el inicio." },
            ].map((b) => (
              <div key={b.num} className="rounded-xl p-6 border" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xs font-bold" style={{ color: "#4361ee" }}>{b.num}</span>
                <h4 className="text-white font-semibold mt-2 mb-2 text-sm">{b.title}</h4>
                <p className="text-white/65 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/nosotros#contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "#4361ee" }}
            >
              Contactar con ventas <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/50 text-xs mt-3">Compatibilidad verificada con Strumis v7 y v8</p>
          </div>
        </div>
      </section>

      {/* ── 6. ANTES VS DESPUÉS ── */}
      <section className="py-24" style={{ background: "#f8f9ff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>RESULTADOS</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Lo que cambia cuando planificas con OxyPlanner
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2">
              <div className="px-6 py-4 font-bold text-sm text-gray-500 bg-gray-100 border-b border-gray-200">Antes (Excel)</div>
              <div className="px-6 py-4 font-bold text-sm border-b border-gray-200" style={{ background: "#eef2ff", color: "#4361ee" }}>Con OxyPlanner</div>
            </div>
            {[
              ["Replanificar ante un cambio: 2–8 horas", "Replanificar ante un cambio: minutos"],
              ["Visibilidad de capacidad: ninguna", "Capacidad en tiempo real por clase de máquina"],
              ["Simular un pedido urgente: imposible", "Simulación de escenario en segundos"],
              ["El plan vive en la cabeza del planificador", "Plan compartido, trazable y actualizado"],
              ["Sobrecargas: te enteras cuando ya es tarde", "Alertas proactivas antes de comprometerte"],
            ].map(([before, after], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-gray-100 last:border-0">
                <div className="px-6 py-4 text-sm text-gray-500 bg-white flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                  {before}
                </div>
                <div className="px-6 py-4 text-sm font-medium flex items-center gap-2" style={{ background: "#f5f7ff", color: "#1e1b4b" }}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: "#4361ee" }}>✓</span>
                  {after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DEEP DIVES ── */}
      {deepDives.map((d, i) => (
        <DeepDive key={d.id} {...d} alt={i % 2 === 1} />
      ))}

      {/* ── 7. OXYGEN INTELLIGENCE ── */}
      <section className="py-24" style={{ background: "#0A2434" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "#818cf8" }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>OXYGEN INTELLIGENCE</span>
              </div>
              <h2 className="font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}>
                OxyPlanner no solo planifica. Aprende.
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.03rem" }}>
                OxyPlanner está potenciado por Oxygen Intelligence, la capa de IA de Oxygen. No es un Gantt estático, es un sistema que aprende los patrones de tu planta, entiende las restricciones reales y recomienda la secuencia óptima en cada momento.
              </p>
              <Link
                href="/nosotros#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "#4361ee" }}
              >
                Contactar con ventas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {oxyIntelligence.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="rounded-2xl p-6 border flex gap-5 items-start" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(67,97,238,0.3)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#818cf8" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. QUOTE ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Lo que dicen nuestros clientes
          </p>
          <blockquote className="font-semibold text-white leading-relaxed mb-8" style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}>
            &quot;Antes tardábamos tres horas los lunes para armar el plan de la semana. Con OxyPlanner son 15 minutos. Y cuando algo falla en planta, el sistema ya nos dice cómo reorganizarnos.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "rgba(255,255,255,0.12)" }}>
              MC
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Marcela Contreras</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Jefa de Producción — Planta de Alimentos, Colombia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. INTEGRATIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>INTEGRACIONES</span>
          <h2 className="mt-3 font-bold text-gray-900 text-2xl mb-4">Conecta con los sistemas que ya usas</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12 text-sm leading-relaxed">
            OxyPlanner se integra con tu ERP y con OxyPulse para tener en un solo lugar la planificación de producción y el mantenimiento de equipos.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Tekla", color: "#4361ee" },
              { name: "Strumis", color: "#122D87" },
              { name: "SAP", color: "#0070f3" },
              { name: "IBM", color: "#1F70C1" },
              { name: "Microsoft Dynamics AX", color: "#1e40af" },
              { name: "OxyPulse", color: "#4361ee" },
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

      {/* ── 10. CTA ── */}
      <section className="py-24 border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
            ¿Listo para planificar sin planillas?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            En 30 minutos te mostramos OxyPlanner con datos de tu tipo de planta. Sin presentaciones genéricas.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/nosotros#contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: "#4361ee" }}
            >
              Contactar con ventas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
