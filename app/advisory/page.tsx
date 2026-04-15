"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Search, Cog, TrendingUp, Users, MessageSquare, FileSearch, ClipboardList, Wrench, RefreshCw } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico Industrial",
    description:
      "Evaluamos el estado actual de tu mantenimiento y producción: procesos, datos, herramientas y equipo. Identificamos los puntos de mayor pérdida y las oportunidades con mayor retorno.",
    includes: [
      "Levantamiento de procesos actuales de mantenimiento y producción",
      "Análisis de KPIs: OEE, disponibilidad, MTTR, MTBF",
      "Identificación de activos críticos y cuellos de botella",
      "Informe ejecutivo con prioridades y roadmap de implementación",
    ],
  },
  {
    icon: Cog,
    step: "02",
    title: "Implementación Acompañada",
    description:
      "Acompañamos la implementación de OxyPulse y/o OxyPlanner desde la configuración inicial hasta que tu equipo opera de forma autónoma. No termina cuando el software está instalado.",
    includes: [
      "Configuración de la plataforma según tu operación real",
      "Carga inicial de activos, planes preventivos y usuarios",
      "Capacitación al equipo técnico y de gestión",
      "Soporte durante los primeros 90 días de operación",
    ],
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Mejora Continua",
    description:
      "Una vez que el sistema está operativo, el trabajo no termina. Nos convertimos en tu equipo de inteligencia operacional: revisamos datos, identificamos nuevas oportunidades y ajustamos.",
    includes: [
      "Revisión mensual de KPIs con el equipo de gestión",
      "Identificación de nuevas oportunidades de ahorro",
      "Actualización de planes preventivos y estrategias",
      "Acceso prioritario al equipo de expertos Oxygen",
    ],
  },
]

const processSteps = [
  {
    icon: MessageSquare,
    week: "Semana 1",
    title: "Conversación inicial",
    desc: "Entendemos tu operación, tus desafíos y tus objetivos. Sin presentaciones genéricas. Preguntas reales sobre tu planta.",
  },
  {
    icon: FileSearch,
    week: "Semanas 1–2",
    title: "Diagnóstico en planta",
    desc: "Nuestro equipo visita tu operación, analiza datos y entrevista a los responsables clave. Resultado: una imagen clara de dónde está la mayor pérdida.",
  },
  {
    icon: ClipboardList,
    week: "Semanas 2–3",
    title: "Propuesta y roadmap",
    desc: "Entregamos un plan con prioridades claras, métricas objetivo y cronograma. Sin sorpresas en el camino.",
  },
  {
    icon: Wrench,
    week: "Meses 1–3",
    title: "Ejecución acompañada",
    desc: "Implementamos junto a tu equipo. Configuramos, capacitamos y ajustamos hasta que los resultados son visibles.",
  },
  {
    icon: RefreshCw,
    week: "Mes 3+",
    title: "Seguimiento y optimización",
    desc: "Revisamos los KPIs, ajustamos la estrategia y buscamos la próxima oportunidad de mejora. Esto no termina.",
  },
]

const forWho = [
  { situation: "Sabes que hay pérdidas en tu operación pero no sabes exactamente dónde", fits: true },
  { situation: "Quieres implementar un CMMS o APS pero no tienes equipo para hacerlo solo", fits: true },
  { situation: "Tu equipo no tiene tiempo para liderar la transformación digital", fits: true },
  { situation: "Ya tienes OxyPulse o OxyPlanner y quieres sacarles más provecho", fits: true },
  { situation: "Buscas expertos con conocimiento real de manufactura en LATAM", fits: true },
  { situation: "Necesitas una consultora que entregue un informe y desaparezca", fits: false },
]

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
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

// ─── Process Step ─────────────────────────────────────────────────────────────

function ServiceStep({
  icon: Icon, step, title, description, includes, reversed, alt,
}: {
  icon: React.ElementType; step: string; title: string; description: string
  includes: string[]; reversed?: boolean; alt?: boolean
}) {
  const { ref, visible } = useReveal(0.08)
  return (
    <section className="py-24 scroll-mt-20" style={{ background: alt ? "#f8f9ff" : "white" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)" }}
      >
        <div className={reversed ? "lg:order-2" : ""}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">FASE {step}</span>
          </div>
          <h2 className="font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}>
            {title}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 text-[1.03rem]">{description}</p>
          <ul className="space-y-3">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#4361ee" }} />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual card */}
        <div className={reversed ? "lg:order-1" : ""}>
          <div
            className="rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-center text-center min-h-[280px] border"
            style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold text-xl mb-2">{title}</p>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              Oxygen Advisory · Fase {step}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConsultoriaPage() {
  const { ref: heroRef, visible: heroVisible } = useReveal(0.05)
  const { ref: forWhoRef, visible: forWhoVisible } = useReveal(0.1)

  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="pt-36 pb-24 overflow-hidden relative" style={{ background: "#0A2434" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            src="/hero-bg2.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.75) 0%, rgba(15,30,61,0.65) 55%, rgba(10,36,52,0.75) 100%)" }} />
          <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.12) 0%, transparent 65%)", transform: "translate(-25%, -25%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(67,97,238,0.07) 0%, transparent 65%)", transform: "translate(30%, 30%)" }} />
        </div>

        <div
          ref={heroRef}
          className="max-w-6xl mx-auto px-6 lg:px-8 relative transition-all duration-700"
          style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(24px)" }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                <Users className="w-3.5 h-3.5" style={{ color: "#818cf8" }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>CONSULTORÍA INDUSTRIAL</span>
              </div>

              <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.2vw, 2.9rem)" }}>
                Inteligencia industrial para tu operación.
              </h1>

              <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.08rem" }}>
                Llevamos tu planta desde el diagnóstico hasta maximizar su potencial productivo. Unimos la experiencia de nuestros consultores con el poder de los datos.
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
                  href="#proceso"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                >
                  Ver cómo trabajamos
                </Link>
              </div>
            </div>

            {/* Quote card */}
            <div className="hidden lg:block">
              <div className="rounded-2xl p-8 border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                <div className="text-4xl mb-4" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "Georgia, serif" }}>&quot;</div>
                <p className="text-white font-medium leading-relaxed mb-6" style={{ fontSize: "1.05rem" }}>
                  La disciplina y el trabajo metódico son el motor de estos resultados. Ver al equipo alcanzar su mejor tonelaje desde 2023 es la prueba de que, con las herramientas correctas y pasión, no hay límites.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos-png/kubiec.png" alt="KUBIEC" className="w-7 h-auto object-contain" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Juan Carlos Yandún</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Superintendente de Producción, Kubiec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUÉ ES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>QUÉ ES OXYGEN ADVISORY</span>
              <h2 className="mt-3 font-bold text-gray-900 leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
                Más que un software. Un socio que conoce tu industria.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5 text-[1.03rem]">
                Oxygen Advisory es el servicio de consultoría industrial de Oxygen. <strong className="text-gray-800">No entregamos recomendaciones genéricas.</strong> Trabajamos <strong className="text-gray-800">dentro de tu operación</strong> para diagnosticar, diseñar e implementar <strong className="text-gray-800">mejoras reales</strong> en mantenimiento, planificación de producción y gestión de activos.
              </p>
              <p className="text-gray-500 leading-relaxed text-[1.03rem]">
                Combinamos la experiencia de consultores con formación industrial con el análisis de datos que entregan nuestros productos. El resultado: <strong className="text-gray-800">decisiones más rápidas, más precisas y con impacto medible.</strong>
              </p>
            </div>
            <div className="rounded-2xl p-8 border border-gray-100" style={{ background: "#f8f9ff" }}>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border border-blue-100" style={{ background: "#eff6ff" }}>
                <span className="text-xs font-bold tracking-wide" style={{ color: "#4361ee" }}>DIFERENCIADOR CLAVE</span>
              </div>
              <p className="font-semibold text-gray-900 leading-relaxed mb-6" style={{ fontSize: "1.12rem" }}>
                &quot;No somos una consultora que llega, entrega un informe y se va. Somos el equipo que acompaña la ejecución hasta ver los resultados.&quot;
              </p>
              <div className="space-y-3">
                {["Diagnóstico basado en datos reales de tu planta", "Implementación hasta que el equipo opera autónomo", "Mejora continua medida en KPIs concretos"].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#4361ee" }}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PARA QUIÉN ── */}
      <section className="py-20 bg-white">
        <div
          ref={forWhoRef}
          className="max-w-4xl mx-auto px-6 lg:px-8 transition-all duration-700"
          style={{ opacity: forWhoVisible ? 1 : 0, transform: forWhoVisible ? "none" : "translateY(24px)" }}
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>PARA QUIÉN ES</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Diseñado para empresas listas para el siguiente nivel
            </h2>
          </div>
          <div className="space-y-3">
            {forWho.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl px-5 py-4 border"
                style={{
                  borderColor: item.fits ? "#c7d2fe" : "#f3f4f6",
                  background: item.fits ? "#f0f3ff" : "#f9fafb",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    background: item.fits ? "#4361ee" : "#e5e7eb",
                    color: item.fits ? "white" : "#9ca3af",
                  }}
                >
                  {item.fits ? "✓" : "✕"}
                </div>
                <span className="text-sm" style={{ color: item.fits ? "#1e1b4b" : "#6b7280" }}>
                  {item.situation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SERVICIOS ── */}
      <div id="proceso">
        {services.map((s, i) => (
          <ServiceStep
            key={s.step}
            icon={s.icon}
            step={s.step}
            title={s.title}
            description={s.description}
            includes={s.includes}
            reversed={i % 2 === 1}
            alt={i % 2 === 0}
          />
        ))}
      </div>

      {/* ── 5. PROCESO TIMELINE ── */}
      <section className="py-24" style={{ background: "#f8f9ff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>CÓMO TRABAJAMOS</span>
            <h2 className="mt-3 font-bold text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Del diagnóstico al resultado en 90 días
            </h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-100 hidden md:block" />
            <div className="space-y-8">
              {processSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 relative" style={{ background: "white", borderColor: "#c7d2fe" }}>
                      <Icon className="w-5 h-5" style={{ color: "#4361ee" }} />
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4361ee" }}>{step.week}</span>
                      <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. QUOTE ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Lo que dicen nuestros clientes
          </p>
          <blockquote className="font-semibold text-white leading-relaxed mb-8" style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}>
            &quot;Por primera vez podemos medir de forma objetiva la confiabilidad de nuestros equipos. El equipo de Oxygen trabajó con nosotros en cada etapa, desde la integración técnica con nuestro ERP hasta la validación con los líderes de área. El resultado es un sistema que el equipo adoptó de verdad y KPIs que antes simplemente no existían.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos-png/kubiec.png" alt="KUBIEC" className="w-9 h-auto object-contain" />
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Juan Carlos Yandún</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Superintendente de Producción, Kubiec</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="py-24 border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4361ee" }}>OXYGEN ADVISORY</span>
          <h2 className="mt-3 font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
            Habla con un experto en tu industria
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Cuéntanos sobre tu operación y agendamos una primera conversación sin compromiso. Sin presentaciones genéricas. Solo preguntas relevantes sobre tu planta.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/nosotros#contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: "#4361ee" }}
            >
              Solicitar conversación inicial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/oxypulse"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Conocer OxyPulse
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
