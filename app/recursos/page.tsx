"use client"

import { startTransition, useEffect, useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const filterParamMap: Record<string, string> = {
  casos:     "Casos de éxito",
  articulos: "Artículos",
  guias:     "Guías",
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cases = [
  {
    type: "caso",
    slug: "amcs-digitalizacion-mantenimiento",
    tag: "CASO DE ÉXITO",
    industry: "Metalmecánica",
    title: "De la intuición a los datos: cómo AMCS transformó su mantenimiento industrial",
    summary: "Con OxyPulse, AMCS pasó de Excel y memoria a trazabilidad total. Las órdenes de trabajo subieron un 152% y el cumplimiento del plan preventivo mejoró un 31.4%.",
    metrics: ["+152% MOs", "+31.4% preventivo", "100% trazabilidad"],
    available: true,
    date: "2 Feb 2026",
  },
  {
    type: "caso",
    slug: "metalmecanica-cumplimiento-preventivo",
    tag: "CASO DE ÉXITO",
    industry: "Metalmecánica",
    title: "Cómo una planta metalmecánica pasó del 42% al 93% de cumplimiento preventivo en 4 meses",
    summary: "Con OxyPulse y OxyPlanner, el equipo de mantenimiento eliminó el modo reactivo y estableció un sistema de planificación que se cumple.",
    metrics: ["+93% cumplimiento", "-61% fallas", "3.2x ROI"],
    available: true,
    date: "15 Ene 2026",
  },
  {
    type: "caso",
    slug: "mineria-tiempo-paro",
    tag: "PRÓXIMAMENTE",
    industry: "Minería",
    title: "Reducción del 54% en tiempo de paro no planificado en operación minera de cobre",
    summary: "Cómo un equipo de mantenimiento con más de 900 activos críticos pasó de reaccionar a fallas a prevenirlas con datos.",
    metrics: ["-54% paro", "+80% OEE", "12 días de ROI"],
    available: false,
    date: "",
  },
  {
    type: "caso",
    slug: "alimentos-trazabilidad",
    tag: "PRÓXIMAMENTE",
    industry: "Alimentos",
    title: "Trazabilidad completa de mantenimiento en planta de alimentos certificada ISO 22000",
    summary: "Cómo una planta de lácteos logró pasar auditorías de certificación sin preparación especial, usando el historial de OxyPulse como evidencia.",
    metrics: ["100% trazabilidad", "0 no conformidades", "-38% costos"],
    available: false,
    date: "",
  },
]

const articles = [
  {
    type: "articulo",
    tag: "Artículos",
    href: "/blog/excel-a-oxyplanner-planta-metalmecanica",
    title: "De la rigidez del Excel a la agilidad de OxyPlanner: El futuro de la planta metalmecánica",
    date: "20 Mar 2026",
    description: "Cómo transformar la planificación de proyectos complejos en una ventaja competitiva con inteligencia industrial.",
  },
  {
    type: "articulo",
    tag: "Artículos",
    href: "/blog/planta-apta-para-ia",
    title: "¿Tu planta es apta para la IA? Por qué planificar en el caos es un error",
    date: "27 Feb 2026",
    description: "La IA no hace magia si la realidad de tu planta no está registrada en el sistema. Preparando la industria para la transformación real.",
  },
  {
    type: "articulo",
    tag: "Guías",
    href: "/blog/mantenimiento-preventivo-vs-correctivo",
    title: "Mantenimiento Preventivo vs. Correctivo: La guía definitiva",
    date: "17 Feb 2026",
    description: "Entiende las diferencias, cuándo aplicar cada estrategia y cómo un CMMS transforma la gestión de mantenimiento.",
  },
  {
    type: "articulo",
    tag: "Guías",
    href: "/blog/que-es-un-cmms",
    title: "¿Qué es un CMMS y para qué sirve realmente?",
    date: "11 Feb 2026",
    description: "Todo lo que necesitas saber sobre los sistemas CMMS y cómo pueden transformar la gestión de mantenimiento en tu planta.",
  },
]

const filters = ["Todos", "Casos de éxito", "Artículos", "Guías"] as const

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Case card (diseño /casos) ─────────────────────────────────────────────────

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="group rounded-3xl border bg-white overflow-hidden transition-all duration-700 hover:shadow-xl flex flex-col"
      style={{
        borderColor: "#e5e7eb",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="h-1 flex-shrink-0" style={{ background: c.available ? "linear-gradient(90deg,#4361ee,#1e40af)" : "#e5e7eb" }} />
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-widest" style={{ color: c.available ? "#4361ee" : "#9ca3af" }}>
            {c.tag}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{c.industry}</span>
        </div>
        <h2 className="text-gray-900 font-bold text-lg leading-snug mb-4 line-clamp-3">{c.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{c.summary}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {c.metrics.map((m, i) => (
            <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: c.available ? "#f0f3ff" : "#f9fafb", color: c.available ? "#4361ee" : "#9ca3af" }}>
              {m}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          {c.available ? (
            <Link href={`/casos/${c.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#4361ee] group-hover:gap-3 transition-all">
              Leer caso completo <ArrowRight size={14} />
            </Link>
          ) : (
            <span className="text-sm text-gray-400">Próximamente disponible</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Article card ──────────────────────────────────────────────────────────────

function ArticleCard({ a, index }: { a: typeof articles[0]; index: number }) {
  const { ref, visible } = useReveal()
  const tagColors: Record<string, { bg: string; text: string }> = {
    "Artículos":    { bg: "#f0f3ff", text: "#4361ee" },
    "Guías":        { bg: "#fff7ed", text: "#ea580c" },
    "Casos de éxito": { bg: "#f0fdf4", text: "#16a34a" },
  }
  const colors = tagColors[a.tag] ?? { bg: "#f9fafb", text: "#6b7280" }

  return (
    <div
      ref={ref}
      className="group rounded-3xl border bg-white overflow-hidden transition-all duration-700 hover:shadow-xl"
      style={{
        borderColor: "#e5e7eb",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="h-1" style={{ background: "linear-gradient(90deg,#4361ee,#1e40af)" }} />
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: colors.bg, color: colors.text }}>
            {a.tag}
          </span>
          <span className="text-xs text-gray-400">{a.date}</span>
        </div>
        <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4 group-hover:text-[#4361ee] transition-colors">
          {a.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{a.description}</p>
        <Link href={a.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4361ee] hover:gap-2.5 transition-all">
          Leer más <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function RecursosContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(() => {
    const param = searchParams.get("filter")
    return param && filterParamMap[param] ? filterParamMap[param] : "Todos"
  })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [inContentArea, setInContentArea] = useState(false)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const param = searchParams.get("filter")
    const mapped = param && filterParamMap[param] ? filterParamMap[param] : "Todos"
    startTransition(() => { setActiveFilter(mapped) })
  }, [searchParams])

  // Show indicator only when inside the content area
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInContentArea(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Track which section is in view for the side indicator
  useEffect(() => {
    const sections = ["section-casos", "section-articulos", "section-guias"]
    const observers: IntersectionObserver[] = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [activeFilter])

  const showCases    = activeFilter === "Todos" || activeFilter === "Casos de éxito"
  const showArticles = activeFilter === "Todos" || activeFilter === "Artículos"
  const showGuias    = activeFilter === "Todos" || activeFilter === "Guías"

  const filteredArticles = articles.filter((a) => a.tag === "Artículos")
  const filteredGuias    = articles.filter((a) => a.tag === "Guías")
  const filteredSingle   = articles.filter((a) => a.tag === activeFilter)

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 bg-[#0A2434] overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <video src="/hero-bg2.mp4" autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.6 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,36,52,0.45) 0%, rgba(10,36,52,0.35) 50%, rgba(10,36,52,0.6) 100%)" }} />
          <div className="absolute -top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4361ee] opacity-10 blur-[120px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#192B6A] opacity-25 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ background: "rgba(67,97,238,0.25)", color: "#a5b4fc" }}>
            RECURSOS
          </span>
          <h1 className="text-white font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            Aprende cómo los mejores equipos industriales operan con datos
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "1.05rem" }}>
            Casos de éxito, artículos y noticias sobre mantenimiento industrial inteligente en LATAM.
          </p>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0"
            style={{ border: "1px solid #e5e7eb" }}>
            {/* Text side */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-6 w-fit"
                style={{ background: "#f0f3ff", color: "#4361ee" }}>
                DESTACADO
              </span>
              <span className="text-xs font-semibold mb-3" style={{ color: "#4361ee" }}>Caso de éxito · Metalmecánica · 2 Feb 2026</span>
              <h2 className="text-gray-900 font-bold leading-snug mb-4" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                De la intuición a los datos: cómo AMCS transformó su mantenimiento industrial
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Con OxyPulse, AMCS pasó de Excel y memoria a trazabilidad total. Las órdenes de trabajo subieron un 152% y el cumplimiento del plan preventivo mejoró un 31.4%.
              </p>
              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["+152% MOs", "+31.4% preventivo", "100% trazabilidad"].map((m) => (
                  <span key={m} className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "#f0f3ff", color: "#4361ee" }}>
                    {m}
                  </span>
                ))}
              </div>
              <Link href="/casos/amcs-digitalizacion-mantenimiento" className="inline-flex items-center gap-2 text-sm font-semibold w-fit px-5 py-2.5 rounded-xl transition-opacity hover:opacity-80"
                style={{ background: "#4361ee", color: "white" }}>
                Leer caso completo <ArrowRight size={14} />
              </Link>
            </div>
            {/* Visual side */}
            <div className="relative min-h-[260px] md:min-h-0 flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" }}>
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute w-48 h-48 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div className="relative z-10 w-36 h-36 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ background: "rgba(67,97,238,0.35)", border: "1px solid rgba(129,140,248,0.35)", backdropFilter: "blur(8px)" }}>
                <img src="/logos/logo-v2-3.svg" alt="Oxygen" className="w-[160%] h-[160%] object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.9)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full transition-all",
                activeFilter === f
                  ? "text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
              style={activeFilter === f ? { background: "linear-gradient(90deg,#4361ee,#1e40af)" } : {}}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Side section indicator ── */}
      {inContentArea && activeSection && activeFilter === "Todos" && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-start gap-3">
          {[
            { id: "section-casos",     label: "Casos de éxito" },
            { id: "section-articulos", label: "Artículos" },
            { id: "section-guias",     label: "Guías" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 transition-all duration-300 overflow-hidden"
              style={{ opacity: activeSection === id ? 1 : 0.25, height: 20 }}
            >
              <span className="block rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  width: activeSection === id ? 24 : 6,
                  height: 6,
                  background: activeSection === id ? "#4361ee" : "#9ca3af",
                }} />
              <span className="text-xs font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden"
                style={{
                  color: "#4361ee",
                  maxWidth: activeSection === id ? 120 : 0,
                  opacity: activeSection === id ? 1 : 0,
                }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      <section ref={contentRef} className="max-w-5xl mx-auto px-6 lg:px-8 py-20">

        {/* Casos de éxito */}
        {showCases && (
          <div id="section-casos" className="mb-16">
            {activeFilter === "Todos" && (
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: "linear-gradient(#4361ee,#1e40af)" }} />
                Casos de éxito
              </h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} />)}
            </div>
          </div>
        )}

        {/* Artículos */}
        {showArticles && filteredArticles.length > 0 && (
          <div id="section-articulos" className="mb-16">
            {activeFilter === "Todos" && (
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: "linear-gradient(#4361ee,#1e40af)" }} />
                Artículos
              </h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((a, i) => <ArticleCard key={i} a={a} index={i} />)}
            </div>
          </div>
        )}

        {/* Guías */}
        {showGuias && filteredGuias.length > 0 && (
          <div id="section-guias">
            {activeFilter === "Todos" && (
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: "linear-gradient(#4361ee,#1e40af)" }} />
                Guías
              </h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuias.map((a, i) => <ArticleCard key={i} a={a} index={i} />)}
            </div>
          </div>
        )}

      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tu planta podría ser el próximo caso?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Si tu equipo está lidiando con mantenimiento reactivo, baja disponibilidad o planificación que no se cumple, hablemos.
          </p>
          <Link
            href="/nosotros#contacto"
            className="inline-block font-semibold text-white rounded-xl px-8 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: "#4361ee" }}
          >
            Contactar al equipo
          </Link>
        </div>
      </section>

    </div>
  )
}

export default function RecursosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RecursosContent />
    </Suspense>
  )
}
