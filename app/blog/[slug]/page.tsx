"use client"

import { use, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

// ─── Article Data ─────────────────────────────────────────────────────────────

const articles: Record<string, Article> = {
  "preparando-operaciones-manufactura-ia": {
    slug: "preparando-operaciones-manufactura-ia",
    tag: "Artículos",
    title: "Preparando las operaciones de manufactura para el futuro con IA",
    date: "09 Mar 2026",
    readTime: "8 min de lectura",
    description: "Cómo la inteligencia artificial está transformando la forma en que las plantas industriales operan y toman decisiones.",
    author: {
      initials: "CA",
      name: "Carlos Andrade",
      role: "Head of Industrial AI, Oxygen",
    },
    sections: [
      {
        id: "introduccion",
        label: "Introducción",
        heading: "El fin del mantenimiento a ciegas",
        body: [
          "Durante décadas, las plantas industriales han operado con una lógica reactiva: algo se rompe, lo arreglamos. Esta forma de trabajo no es una falla de las personas, sino del sistema. Sin datos en tiempo real, sin visibilidad sobre el estado de los activos, cualquier plan de mantenimiento preventivo acaba convirtiéndose en un conjunto de buenas intenciones que la urgencia del día a día se encarga de desbaratar.",
          "La inteligencia artificial está cambiando esa ecuación. No porque sea una tecnología mágica, sino porque permite hacer algo que antes era imposible: procesar en segundos el volumen de datos que un equipo humano tardaría semanas en analizar, y convertirlo en decisiones concretas de operación.",
        ],
      },
      {
        id: "el-problema",
        label: "El problema real",
        heading: "El verdadero costo del modo reactivo",
        body: [
          "Cuando una línea de producción se detiene por una falla imprevista, el costo visible es el tiempo de paro. Pero el costo real es mucho mayor: el técnico que debía hacer preventivos hoy ahora está apagando incendios, el repuesto que no había en stock genera un pedido urgente con sobrecosto, y el cliente que esperaba su pedido empieza a mirar alternativas.",
          "En plantas con más de 300 activos críticos, el problema se multiplica. Es humanamente imposible llevar el seguimiento manual de frecuencias de mantenimiento, estados de equipos, historial de fallas y disponibilidad de técnicos al mismo tiempo. Algo siempre queda fuera del radar.",
          "Los datos de la industria son claros: las plantas que operan en modo reactivo destinan entre el 60% y el 70% del presupuesto de mantenimiento a correctivos. Las que lograron pasar a un modelo preventivo-predictivo invierten menos del 30% en correctivos y el resto en intervenciones planificadas que no interrumpen la producción.",
        ],
      },
      {
        id: "como-ayuda-ia",
        label: "Cómo ayuda la IA",
        heading: "Lo que la IA puede hacer (y lo que no)",
        body: [
          "La inteligencia artificial aplicada al mantenimiento industrial no reemplaza al técnico. Lo que hace es darle información que antes no tenía: qué equipo tiene más probabilidad de fallar en los próximos 14 días, cuál es el mejor momento para intervenir sin impactar la producción, y qué repuestos necesita tener disponibles.",
          "Un sistema como OxyPulse, por ejemplo, analiza continuamente datos de sensores, historial de mantenimiento y patrones de falla para generar alertas priorizadas por impacto potencial. El técnico no recibe 200 notificaciones que no sabe cómo ordenar: recibe las 5 cosas que realmente importan hoy.",
          "Lo que la IA no puede hacer es tomar decisiones de contexto: saber que esta semana hay una auditoría de calidad y que conviene posponer el mantenimiento del equipo X, o que el proveedor del repuesto Y tiene problemas de abastecimiento. Ese juicio sigue siendo humano. La IA amplifica la capacidad del equipo; no lo sustituye.",
        ],
      },
      {
        id: "implementacion",
        label: "Implementación práctica",
        heading: "Por dónde empezar sin paralizarse",
        body: [
          "El error más común en la adopción de tecnología industrial es intentar resolver todo al mismo tiempo. Conectar todos los sensores, digitalizar todos los procesos, capacitar a todo el equipo en paralelo. El resultado es un proyecto que nunca termina de arrancar y una organización que se cansa antes de ver resultados.",
          "La recomendación práctica es distinta: empezar por los 20 activos críticos que explican el 80% del tiempo de paro. Conectarlos, generar visibilidad sobre su estado, y empezar a cumplir un plan de preventivos básico. En 60 días, los resultados de esa intervención parcial crean el argumento para avanzar.",
          "En los proyectos que hemos acompañado desde Oxygen, el patrón se repite: las plantas que empezaron pequeño y midieron resultados desde el día uno llegaron a una adopción plena en 4 a 6 meses. Las que esperaron tener todo listo para empezar todavía están esperando.",
        ],
      },
      {
        id: "conclusion",
        label: "Conclusión",
        heading: "La ventana de oportunidad es ahora",
        body: [
          "La brecha entre las plantas que ya operan con datos y las que siguen dependiendo de la experiencia individual de sus técnicos se está ampliando. No porque la tecnología sea costosa o compleja —hoy no lo es— sino porque la adopción requiere decisión.",
          "Las plantas que den este paso en los próximos 12 a 18 meses tendrán una ventaja competitiva estructural: menos tiempo de paro, menor costo de mantenimiento y mayor capacidad de cumplir con los compromisos de producción. Las que no lo hagan seguirán compitiendo con las manos atadas.",
          "El futuro del mantenimiento industrial no es una promesa lejana. Ya está pasando en plantas de Chile, México, Colombia y Argentina. La pregunta no es si tu planta necesita este cambio. La pregunta es cuándo vas a empezar.",
        ],
      },
    ],
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  slug: string
  tag: string
  title: string
  date: string
  readTime: string
  description: string
  author: { initials: string; name: string; role: string }
  sections: { id: string; label: string; heading: string; body: string[] }[]
}

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── TOC ──────────────────────────────────────────────────────────────────────

function TableOfContents({ sections }: { sections: Article["sections"] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <nav className="sticky top-28 self-start">
      {/* Author — not sticky, scrolls away */}
      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #c7d2fe, #4361ee)" }}>
          CA
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Carlos Andrade</p>
          <p className="text-xs leading-snug" style={{ color: "#4361ee" }}>Head of Industrial AI, Oxygen</p>
        </div>
      </div>

      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Contenidos</p>
      <ul className="space-y-1">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }}
              className="flex items-center gap-2 text-sm py-1.5 transition-colors"
              style={{ color: active === id ? "#4361ee" : "#6b7280" }}>
              <span className="block h-px flex-shrink-0 transition-all"
                style={{ background: active === id ? "#4361ee" : "#d1d5db", width: active === id ? 20 : 12 }} />
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3">¿Quieres ver esto en tu planta?</p>
        <Link href="/nosotros#contacto"
          className="block text-center text-sm font-semibold text-white rounded-xl px-4 py-3 transition-opacity hover:opacity-90"
          style={{ background: "#4361ee" }}>
          Hablar con el equipo
        </Link>
      </div>
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = articles[slug]

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Artículo no encontrado.</p>
          <Link href="/recursos" className="text-[#4361ee] font-semibold hover:underline">Ver todos los recursos →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 overflow-hidden relative" style={{ background: "#0A2434" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video src="/hero-bg2.mp4" autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.80) 0%, rgba(15,30,61,0.70) 55%, rgba(10,36,52,0.80) 100%)" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 65%)", transform: "translate(25%, -25%)" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/recursos"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors mb-10">
            <ArrowLeft size={14} />
            Todos los recursos
          </Link>

          <span className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ background: "rgba(67,97,238,0.25)", color: "#a5b4fc" }}>
            {article.tag}
          </span>

          <h1 className="text-white font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            {article.title}
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">{article.description}</p>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #c7d2fe, #4361ee)" }}>
              {article.author.initials}
            </div>
            <div>
              <p className="text-white/90 text-sm font-semibold">{article.author.name}</p>
              <p className="text-white/40 text-xs">{article.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-3 text-white/30 text-xs">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[220px_1fr] gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents sections={article.sections} />
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {article.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}

            {/* CTA */}
            <div className="rounded-3xl p-10 mt-16 text-center"
              style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">¿Lista para dar el salto?</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Hablemos sobre tu operación
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                En 30 minutos te mostramos si Oxygen encaja con tu planta, sin compromiso y sin presentaciones genéricas.
              </p>
              <Link href="/nosotros#contacto"
                className="inline-block bg-white font-semibold rounded-xl px-8 py-3 transition-opacity hover:opacity-90 text-sm"
                style={{ color: "#122D87" }}>
                Contactar con ventas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Más artículos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <RelatedCard
              href="/blog/senales-estrategia-mantenimiento"
              tag="Artículos"
              title="5 señales de que tu estrategia de mantenimiento necesita una actualización"
              date="20 Feb 2026"
            />
            <RelatedCard
              href="/recursos"
              tag="Guías"
              title="Tu plan de mantenimiento en 8 pasos"
              date="10 Ene 2026"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleSection({ section }: { section: Article["sections"][number] }) {
  const { ref, visible } = useReveal()
  return (
    <section id={section.id} ref={ref}
      className="mb-16 scroll-mt-28 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">{section.label}</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <h2 className="text-gray-900 font-bold text-2xl mb-6 leading-snug">{section.heading}</h2>
      <div className="space-y-5">
        {section.body.map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-[1.05rem]">{p}</p>
        ))}
      </div>
    </section>
  )
}

function RelatedCard({ href, tag, title, date }: { href: string; tag: string; title: string; date: string }) {
  return (
    <Link href={href}
      className="block rounded-2xl p-6 border border-gray-200 hover:border-[#4361ee]/30 hover:shadow-md transition-all group bg-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: "#f0f3ff", color: "#4361ee" }}>{tag}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <p className="text-gray-900 font-semibold leading-snug group-hover:text-[#4361ee] transition-colors">{title}</p>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4361ee] mt-4">
        Leer más <ArrowRight size={12} />
      </span>
    </Link>
  )
}
