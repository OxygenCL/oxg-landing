"use client"

import { use, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"

// ─── Case Study Data ────────────────────────────────────────────────────────

const caseStudies: Record<string, CaseStudy> = {
  "amcs-digitalizacion-mantenimiento": {
    slug: "amcs-digitalizacion-mantenimiento",
    tag: "CASO DE ÉXITO",
    title: "De la intuición a los datos: cómo AMCS transformó su mantenimiento industrial",
    industry: "Metalmecánica",
    companySize: "200 – 500 empleados",
    country: "Chile",
    products: ["OxyPulse"],
    about: "Empresa líder en infraestructura con líneas de producción de maquinaria de gran tonelaje y equipos de corte de alta precisión, que operaba con Excel y carpetas compartidas como sistema central de mantenimiento.",
    accentColor: "#4361ee",
    heroGradient: "from-[#0A2434] via-[#122D4A] to-[#0A2434]",
    contents: [
      { id: "resumen", label: "Resumen" },
      { id: "impacto", label: "Impacto" },
      { id: "que-cambio", label: "Qué cambió" },
      { id: "como-lo-logramos", label: "Cómo lo logramos" },
      { id: "faq", label: "Preguntas frecuentes" },
    ],
    summary: [
      "En AMCS, la gestión de activos críticos vivía en un entorno vulnerable: planillas de Excel y carpetas compartidas en la nube. Cualquier técnico podía borrar una celda por accidente. Los reportes dependían de la memoria del equipo al final de la semana, lo que generaba datos inexactos y ninguna capacidad de análisis real.",
      "El problema no era falta de trabajo, sino falta de evidencia. Sin un sistema centralizado, la gerencia operaba con puntos ciegos: desconocía el tiempo real dedicado a reparaciones, no podía detectar patrones de falla, y tomaba decisiones basadas en estimaciones.",
      "Con OxyPulse, AMCS pasó de intuición a datos en menos de dos meses. Las órdenes de trabajo aumentaron un 152%, el cumplimiento del plan preventivo subió un 31.4%, y por primera vez el equipo tuvo trazabilidad total de sus correctivos.",
    ],
    heroQuote: {
      text: "Dejamos de trabajar por intuición para trabajar con respaldo. Es una plataforma confiable que sirve para ir ordenando las actividades diarias.",
      author: "Alfredo Olmos",
      role: "Supervisor de Mantenimiento, AMCS",
    },
    impactMetrics: [
      { value: "+152%", label: "Órdenes de trabajo registradas", sub: "incremento récord en registro de MOs" },
      { value: "+31.4%", label: "Plan preventivo cumplido", sub: "mejora en mantenimientos programados" },
      { value: "100%", label: "Visibilidad de correctivos", sub: "trazabilidad total de tareas" },
    ],
    whatChanged: [
      {
        heading: "Antes: mantenimiento invisible en Excel",
        body: "La planta operaba, pero la gestión sufría de lo que llamamos 'Mantenimiento Invisible'. La información dependía de la memoria de los técnicos al final de la semana. Sin historial confiable, era imposible detectar qué activos fallaban más, cuánto tiempo tomaban las reparaciones, o si el plan preventivo se estaba cumpliendo.",
        quote: {
          text: "Cualquiera podía borrar una celda en Excel por accidente.",
          author: "Martín Orfo",
          role: "Ingeniero Mecánico, AMCS",
        },
      },
      {
        heading: "El problema real: decisiones sin respaldo",
        body: "La gerencia operaba con puntos ciegos completos: desconocía el tiempo real dedicado a reparaciones, no podía detectar patrones de fallas recurrentes, y los reportes se basaban en estimaciones. Esto hacía imposible cualquier mejora continua real, y exponía la operación a fallas prevenibles que nadie podía anticipar.",
      },
      {
        heading: "Con OxyPulse: cada tarea tiene trazabilidad",
        body: "Con OxyPulse, cada técnico cierra su orden digitalmente en planta, alimentando automáticamente la hoja de vida del activo. Esto permitió calcular indicadores clave como el MTTR y asegurar que el plan preventivo se cumpla sin ser devorado por las urgencias del día a día.",
        quote: {
          text: "El sistema nos permitió ver con datos en mano dónde se concentraban las solicitudes, permitiéndonos reorganizar y optimizar nuestros recursos técnicos para cubrir esa demanda real.",
          author: "Alfredo Olmos",
          role: "Supervisor de Mantenimiento, AMCS",
        },
      },
    ],
    howWeDidIt: [
      { step: "01", title: "Adaptación a la estructura existente", body: "OxyPulse se configuró sobre las líneas de producción existentes de AMCS sin reemplazar infraestructura. La carga de datos inicial y la configuración se realizaron en poco tiempo, permitiendo que el equipo empezara a registrar órdenes desde el primer día." },
      { step: "02", title: "Digitalización de órdenes de trabajo", body: "Se eliminó el reporte de memoria. Cada técnico cerró sus órdenes digitalmente desde planta, generando un historial continuo y confiable. En pocas semanas, el volumen de MOs registradas aumentó un 152%, no porque hubiera más trabajo, sino porque ahora todo quedaba documentado." },
      { step: "03", title: "Visibilidad de recursos y cuellos de botella", body: "Con datos reales en la pantalla, el equipo identificó que el área eléctrica concentraba una alta demanda de intervenciones que pasaba desapercibida en papel. Eso permitió reorganizar y optimizar los recursos técnicos para cubrir esa demanda real." },
      { step: "04", title: "Plan preventivo con cumplimiento medible", body: "Con la hoja de vida de cada activo alimentada en tiempo real, el plan de mantenimiento preventivo pasó a tener seguimiento concreto. El cumplimiento subió un 31.4%, y por primera vez la gerencia pudo ver, con datos, si el plan se estaba ejecutando o no." },
    ],
    faq: [
      {
        question: "¿Cuál es la diferencia entre mantenimiento preventivo y correctivo en la gestión de datos?",
        answer: "El mantenimiento preventivo es planificado para evitar fallas, mientras que el correctivo repara averías inesperadas. El error más común es no registrar los correctivos pequeños. OxyPulse captura ambos para calcular la disponibilidad real del equipo y detectar patrones de falla antes de que se conviertan en paros no planificados.",
      },
      {
        question: "¿Por qué reemplazar Excel con un software de mantenimiento (CMMS)?",
        answer: "Excel es vulnerable a errores humanos, duplicidad y pérdida de datos. Un software especializado ofrece integridad de la información, historial inalterable de cada activo, alertas automáticas y métricas en tiempo real como MTTR y cumplimiento del plan preventivo, algo imposible de sostener con planillas.",
      },
      {
        question: "¿Cómo ayuda la digitalización a mejorar los procesos de planta?",
        answer: "Transforma opiniones en hechos medibles. Permite identificar qué activos fallan más y por qué, facilitando decisiones estratégicas sobre renovación de equipos, stock de repuestos y ajustes en los planes de mantenimiento para maximizar la productividad.",
      },
      {
        question: "¿Cuánto tiempo toma implementar OxyPulse en una planta?",
        answer: "En AMCS, los primeros resultados se vieron en menos de dos meses. OxyPulse se adapta a la estructura de producción existente sin reemplazar infraestructura, lo que permite una transición rápida y sin fricción para el equipo de mantenimiento.",
      },
    ],
    relatedSlugs: ["metalmecanica-cumplimiento-preventivo", "mineria-tiempo-paro"],
  },
  "metalmecanica-cumplimiento-preventivo": {
    slug: "metalmecanica-cumplimiento-preventivo",
    tag: "CASO DE ÉXITO",
    title: "Cómo una planta metalmecánica pasó del 42% al 93% de cumplimiento preventivo en 4 meses",
    industry: "Metalmecánica",
    companySize: "800 – 1,200 empleados",
    country: "Chile",
    products: ["OxyPulse", "OxyPlanner"],
    about: "Planta de manufactura de piezas industriales para el sector automotriz y minero en Chile, con 3 líneas de producción continua.",
    accentColor: "#4361ee",
    heroGradient: "from-[#0A2434] via-[#122D4A] to-[#0A2434]",
    contents: [
      { id: "resumen", label: "Resumen" },
      { id: "impacto", label: "Impacto" },
      { id: "que-cambio", label: "Qué cambió" },
      { id: "como-lo-logramos", label: "Cómo lo logramos" },
      { id: "faq", label: "Preguntas frecuentes" },
    ],
    summary: [
      "El área de mantenimiento de esta planta llevaba años operando en modo reactivo. Con 3 líneas de producción continua y más de 600 activos críticos, el equipo de 18 técnicos pasaba el 70% de su tiempo apagando incendios: fallas imprevistas, órdenes de trabajo abiertas sin cerrar, repuestos agotados en el momento menos indicado.",
      "En enero de 2025, implementaron OxyPulse y OxyPlanner de Oxygen. Cuatro meses después, el cumplimiento del plan de mantenimiento preventivo pasó del 42% al 93%. Las fallas imprevistas cayeron un 61%. El tiempo promedio de respuesta ante alertas bajó de 4.2 horas a 38 minutos.",
      "Este caso documenta qué hicieron, en qué orden, y por qué funcionó.",
    ],
    impactMetrics: [
      { value: "+93%", label: "Cumplimiento preventivo", sub: "desde 42% en 4 meses" },
      { value: "-61%", label: "Fallas imprevistas", sub: "vs. mismo período año anterior" },
      { value: "38 min", label: "Tiempo de respuesta", sub: "desde 4.2 horas promedio" },
      { value: "3.2x", label: "ROI en primer año", sub: "sobre costo total de implementación" },
    ],
    whatChanged: [
      {
        heading: "Antes: visibilidad cero, decisiones en el aire",
        body: "El equipo de mantenimiento tomaba decisiones de planificación basándose en experiencia y hojas de Excel desactualizadas. No había forma de saber, en tiempo real, cuántas órdenes estaban abiertas, cuáles estaban retrasadas, o qué activos estaban acumulando horas sin intervención preventiva. Las reuniones del lunes servían más para discutir lo que salió mal la semana pasada que para planificar lo que venía.",
      },
      {
        heading: "El cambio: datos operacionales en tiempo real",
        body: "OxyPulse conectó los sensores existentes de la planta y los datos del ERP en un solo tablero. Por primera vez, el equipo podía ver en una sola pantalla el estado de cada activo crítico, el avance del plan mensual de preventivos, y las alertas priorizadas por impacto potencial. El ruido desapareció. Solo quedó lo que importaba.",
      },
      {
        heading: "OxyPlanner: planificación que se cumple",
        body: "El problema más profundo no era la falta de información, sino la imposibilidad de planificar con confianza. OxyPlanner cruzó la disponibilidad de los técnicos, los repuestos en stock y la criticidad de cada equipo para generar un plan semanal ejecutable. No un plan teórico: uno que se podía cumplir con los recursos reales disponibles.",
      },
    ],
    howWeDidIt: [
      { step: "01", title: "Diagnóstico de activos (semana 1)", body: "Levantamos el inventario completo de activos críticos, frecuencias de mantenimiento recomendadas por fabricante, y el historial de fallas de los últimos 18 meses. Identificamos los 47 activos que explicaban el 80% del tiempo de paro no planificado." },
      { step: "02", title: "Conexión de datos (semanas 2-3)", body: "Integramos OxyPulse con el ERP existente (SAP PM) y con los sensores de vibración y temperatura ya instalados en las máquinas críticas. No hubo que reemplazar infraestructura: aprovechamos lo que ya existía." },
      { step: "03", title: "Primer plan semanal (semana 4)", body: "Con OxyPlanner, Jorge generó el primer plan de mantenimiento preventivo basado en datos. El equipo lo ejecutó con un 71% de cumplimiento — bajo comparado con el 93% final, pero ya el doble del 42% histórico." },
      { step: "04", title: "Ajuste y mejora continua (meses 2-4)", body: "Cada semana, los datos del plan real vs. ejecutado retroalimentaban el algoritmo. En 16 semanas, el sistema aprendió los patrones de la planta y el cumplimiento trepó al 93%. Los técnicos dejaron de ser bomberos y volvieron a ser mantenedores." },
    ],
    faq: [
      {
        question: "¿Qué es el cumplimiento del plan de mantenimiento preventivo y por qué importa?",
        answer: "Es el porcentaje de mantenimientos programados que realmente se ejecutan en el período planeado. Un cumplimiento bajo (como el 42% inicial de esta planta) significa que la mayor parte del mantenimiento se hace de forma reactiva, aumentando el riesgo de fallas imprevistas y paros no planificados.",
      },
      {
        question: "¿Cómo reduce OxyPulse las fallas imprevistas en una planta industrial?",
        answer: "OxyPulse centraliza en tiempo real el estado de cada activo crítico, el avance del plan preventivo y las alertas priorizadas por impacto. Al tener visibilidad completa, el equipo interviene antes de que ocurra la falla en lugar de reaccionar después. Esta planta redujo sus fallas imprevistas un 61% en 4 meses.",
      },
      {
        question: "¿Puede OxyPlanner adaptarse a plantas con múltiples líneas de producción?",
        answer: "Sí. OxyPlanner cruza la disponibilidad de técnicos, el stock de repuestos y la criticidad de cada equipo para generar un plan semanal ejecutable con los recursos reales disponibles. Se adaptó a esta planta con 3 líneas de producción continua y más de 600 activos críticos.",
      },
      {
        question: "¿Cuánto tiempo tarda en verse el retorno de inversión?",
        answer: "Esta planta obtuvo un ROI de 3.2x en el primer año. Los primeros resultados visibles (reducción de fallas, mejora en cumplimiento) se vieron en las primeras 4 semanas, con mejora continua sostenida durante los 4 meses siguientes.",
      },
    ],
    relatedSlugs: ["mineria-tiempo-paro", "alimentos-trazabilidad"],
  },
}

// Placeholder for related case studies (shown at bottom)
const allCaseStudies = [
  {
    slug: "amcs-digitalizacion-mantenimiento",
    title: "De la intuición a los datos: cómo AMCS transformó su mantenimiento industrial",
    industry: "Metalmecánica",
    tag: "CASO DE ÉXITO",
  },
  {
    slug: "metalmecanica-cumplimiento-preventivo",
    title: "Cómo una planta metalmecánica pasó del 42% al 93% de cumplimiento preventivo",
    industry: "Metalmecánica",
    tag: "CASO DE ÉXITO",
  },
  {
    slug: "mineria-tiempo-paro",
    title: "Reducción del 54% en tiempo de paro no planificado en operación minera",
    industry: "Minería",
    tag: "PRÓXIMAMENTE",
  },
  {
    slug: "alimentos-trazabilidad",
    title: "Trazabilidad completa de mantenimiento en planta de alimentos certificada",
    industry: "Alimentos",
    tag: "PRÓXIMAMENTE",
  },
]

// ─── Types ───────────────────────────────────────────────────────────────────

interface CaseStudy {
  slug: string
  tag: string
  title: string
  industry: string
  companySize: string
  country: string
  products: string[]
  about: string
  accentColor: string
  heroGradient: string
  contents: { id: string; label: string }[]
  summary: string[]
  heroQuote?: { text: string; author: string; role: string }
  impactMetrics: { value: string; label: string; sub: string }[]
  whatChanged: { heading: string; body: string; quote?: { text: string; author: string; role: string } }[]
  howWeDidIt: { step: string; title: string; body: string }[]
  faq?: { question: string; answer: string }[]
  relatedSlugs: string[]
}

// ─── Sticky TOC ──────────────────────────────────────────────────────────────

function TableOfContents({ contents }: { contents: CaseStudy["contents"] }) {
  const [active, setActive] = useState(contents[0]?.id ?? "")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    contents.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [contents])

  return (
    <nav className="sticky top-28 self-start">
      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Contenidos</p>
      <ul className="space-y-1">
        {contents.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }}
              className="flex items-center gap-2 text-sm py-1.5 transition-colors"
              style={{ color: active === id ? "#4361ee" : "#6b7280" }}
            >
              <span
                className="block w-4 h-px flex-shrink-0 transition-all"
                style={{ background: active === id ? "#4361ee" : "#d1d5db", width: active === id ? 20 : 12 }}
              />
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3">¿Te identificás con este caso?</p>
        <Link
          href="/nosotros#contacto"
          className="block text-center text-sm font-semibold text-white rounded-xl px-4 py-3 transition-opacity hover:opacity-90"
          style={{ background: "#4361ee" }}
        >
          Hablar con el equipo
        </Link>
      </div>
    </nav>
  )
}

// ─── Reveal animation hook ───────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const study = caseStudies[slug]

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Caso de estudio no encontrado.</p>
          <Link href="/casos" className="text-[#4361ee] font-semibold hover:underline">
            Ver todos los casos →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ── FAQ Schema (AEO/GEO) ── */}
      {study.faq && study.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": study.faq.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 overflow-hidden relative" style={{ background: "#0A2434" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            src="/hero-bg2.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.75) 0%, rgba(15,30,61,0.65) 55%, rgba(10,36,52,0.75) 100%)" }} />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 65%)", transform: "translate(25%, -25%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.07) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Link
            href="/casos"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Todos los casos
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left */}
            <div>
              <span
                className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(67,97,238,0.25)", color: "#a5b4fc" }}
              >
                {study.tag}
              </span>
              <h1 className="text-white font-bold leading-tight mb-10" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
                {study.title}
              </h1>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {/* Col 1: Industria + País */}
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Industria</p>
                    <p className="text-white/90 text-sm font-medium">{study.industry}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">País</p>
                    <p className="text-white/90 text-sm font-medium">{study.country}</p>
                  </div>
                </div>
                {/* Col 2: Tamaño + Producto */}
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Tamaño</p>
                    <p className="text-white/90 text-sm font-medium">{study.companySize}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Producto</p>
                    <div className="flex flex-wrap gap-1.5">
                      {study.products.map((p) => (
                        <span key={p} className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(67,97,238,0.3)", color: "white" }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Col 3: Sobre la empresa */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Sobre la empresa</p>
                  <p className="text-white/90 text-xs leading-relaxed">{study.about}</p>
                </div>
              </div>
            </div>

            {/* Right — visual accent */}
            <div className="hidden lg:flex justify-end">
              <div
                className="rounded-3xl p-8 flex flex-col gap-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", width: 340 }}
              >
                {study.impactMetrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{m.label}</span>
                    <span className="font-bold text-white" style={{ fontSize: "1.35rem", color: i === 0 ? "#a5b4fc" : "white" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
                <div className="mt-2 pt-4 border-t border-white/10 text-center">
                  <span className="text-white/30 text-xs">4 meses de implementación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[220px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            {/* Author — no sticky, desaparece al hacer scroll */}
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #c7d2fe, #4361ee)" }}
              >
                AO
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Armando Ortiz</p>
                <p className="text-xs leading-snug" style={{ color: "#4361ee" }}>Agente de marketing, Oxygen</p>
              </div>
            </div>
            {/* TOC — sticky */}
            <TableOfContents contents={study.contents} />
          </aside>

          {/* Main content */}
          <div className="min-w-0">

            {/* ── Resumen ── */}
            <ContentSection id="resumen" label="Resumen">
              <div className="space-y-5">
                {study.summary.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-[1.05rem]">{p}</p>
                ))}
                {study.heroQuote && (
                  <blockquote className="mt-8 rounded-2xl p-7" style={{ background: "#f8f9ff", borderLeft: "4px solid #4361ee" }}>
                    <p className="text-gray-700 italic leading-relaxed text-[1.05rem] mb-4">"{study.heroQuote.text}"</p>
                    <footer>
                      <span className="text-sm font-semibold text-gray-900">{study.heroQuote.author}</span>
                      <span className="text-sm text-gray-400 ml-2">{study.heroQuote.role}</span>
                    </footer>
                  </blockquote>
                )}
              </div>
            </ContentSection>

            {/* ── Impacto ── */}
            <ContentSection id="impacto" label="Impacto">
              <div className="grid sm:grid-cols-2 gap-5">
                {study.impactMetrics.map((m, i) => (
                  <MetricCard key={i} {...m} />
                ))}
              </div>
            </ContentSection>

            {/* ── Qué cambió ── */}
            <ContentSection id="que-cambio" label="Qué cambió">
              <div className="space-y-10">
                {study.whatChanged.map((s, i) => (
                  <div key={i}>
                    <h3 className="text-gray-900 font-semibold text-lg mb-3">{s.heading}</h3>
                    <p className="text-gray-600 leading-relaxed">{s.body}</p>
                    {s.quote && (
                      <blockquote className="mt-5 rounded-2xl p-6" style={{ background: "#f8f9ff", borderLeft: "4px solid #4361ee" }}>
                        <p className="text-gray-700 italic leading-relaxed mb-3">"{s.quote.text}"</p>
                        <footer>
                          <span className="text-sm font-semibold text-gray-900">{s.quote.author}</span>
                          <span className="text-sm text-gray-400 ml-2">{s.quote.role}</span>
                        </footer>
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* ── Cómo lo logramos ── */}
            <ContentSection id="como-lo-logramos" label="Cómo lo logramos">
              <div className="space-y-8">
                {study.howWeDidIt.map((step, i) => (
                  <StepCard key={i} {...step} />
                ))}
              </div>
            </ContentSection>

            {/* ── FAQ ── */}
            {study.faq && study.faq.length > 0 && (
              <ContentSection id="faq" label="Preguntas frecuentes">
                <FaqAccordion items={study.faq} />
              </ContentSection>
            )}

            {/* ── CTA inline ── */}
            <div
              className="rounded-3xl p-6 md:p-10 mt-16 text-center"
              style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}
            >
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">¿Tu planta tiene los mismos desafíos?</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Hablemos sobre tu operación
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                En 30 minutos te mostramos si Oxygen encaja con tu planta, sin compromiso y sin presentaciones genéricas.
              </p>
              <Link
                href="/nosotros#contacto"
                className="inline-block bg-white font-semibold rounded-xl px-8 py-3 transition-opacity hover:opacity-90 text-sm"
                style={{ color: "#122D87" }}
              >
                Contactar con ventas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Case Studies ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Otros casos de estudio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allCaseStudies
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <RelatedCard key={c.slug} {...c} />
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContentSection({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { ref, visible } = useReveal()
  return (
    <section
      id={id}
      ref={ref}
      className="mb-20 scroll-mt-28 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">{label}</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      {children}
    </section>
  )
}

function MetricCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 transition-all duration-700"
      style={{
        background: "#f8f9ff",
        border: "1px solid #e8ebff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <p className="font-bold mb-1" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#4361ee", lineHeight: 1 }}>
        {value}
      </p>
      <p className="text-gray-900 font-semibold text-sm mb-1">{label}</p>
      <p className="text-gray-400 text-xs">{sub}</p>
    </div>
  )
}

function StepCard({ step, title, body }: { step: string; title: string; body: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="flex gap-6 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-[#4361ee] border-2 border-[#e8ebff] mt-1">
        {step}
      </div>
      <div>
        <h4 className="text-gray-900 font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border overflow-hidden transition-all"
          style={{ borderColor: open === i ? "#c7d2fe" : "#e5e7eb" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            style={{ background: open === i ? "#f8f9ff" : "white" }}
          >
            <span className="font-semibold text-gray-900 text-sm leading-snug">{item.question}</span>
            <ChevronDown
              className="flex-shrink-0 w-4 h-4 transition-transform duration-300"
              style={{ color: "#4361ee", transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ background: "#f8f9ff" }}>
              <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function RelatedCard({ slug, title, industry, tag }: { slug: string; title: string; industry: string; tag: string }) {
  const isComingSoon = tag === "PRÓXIMAMENTE"
  return (
    <div
      className="rounded-2xl p-6 border transition-all duration-200 hover:shadow-md group"
      style={{ borderColor: "#e5e7eb", background: "white" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold tracking-widest" style={{ color: isComingSoon ? "#9ca3af" : "#4361ee" }}>
          {tag}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{industry}</span>
      </div>
      <p className="text-gray-900 font-semibold text-sm leading-snug mb-4">{title}</p>
      {isComingSoon ? (
        <span className="text-xs text-gray-400">Próximamente disponible</span>
      ) : (
        <Link
          href={`/casos/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4361ee] hover:gap-2 transition-all"
        >
          Leer caso <ArrowRight size={12} />
        </Link>
      )}
    </div>
  )
}
