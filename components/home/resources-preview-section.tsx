import Link from "next/link"
import { ArrowRight } from "lucide-react"

const resources = [
  {
    tag: "Caso de éxito",
    industry: "Metalmecánica",
    tagColor: "#16a34a",
    title: "Cómo una planta metalmecánica pasó del 42% al 93% de cumplimiento preventivo en 4 meses",
    description: "Con OxyPulse y OxyPlanner, el equipo de mantenimiento eliminó el modo reactivo y estableció un sistema de planificación que se cumple.",
    metrics: ["+93% cumplimiento", "-61% fallas", "3.2x ROI"],
    href: "/casos/metalmecanica-cumplimiento-preventivo",
    cta: "Leer caso completo",
  },
  {
    tag: "Artículo",
    industry: "IA Industrial",
    tagColor: "#4361ee",
    title: "Preparando las operaciones de manufactura para el futuro con IA",
    description: "Cómo la inteligencia artificial está transformando la forma en que las plantas industriales operan y toman decisiones.",
    metrics: ["IA", "Manufactura", "Futuro"],
    href: "/blog/preparando-operaciones-manufactura-ia",
    cta: "Leer artículo",
  },
  {
    tag: "Guía",
    industry: "Mantenimiento",
    tagColor: "#ea580c",
    title: "Tu plan de mantenimiento en 8 pasos",
    description: "Una guía práctica para estructurar un plan de mantenimiento preventivo que tu equipo realmente cumpla.",
    metrics: ["8 pasos", "Preventivo", "Práctico"],
    href: "/blog/plan-mantenimiento-8-pasos",
    cta: "Leer guía",
  },
]

export function ResourcesPreviewSection() {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Recursos para equipos industriales
          </h2>
        </div>

        {/* Resource cards — 3-column grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {resources.map((resource, index) => (
            <Link
              key={index}
              href={resource.href}
              className="group flex flex-col rounded-2xl bg-white border border-gray-200 hover:shadow-md transition-all p-6"
            >
              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
                  style={{ background: `${resource.tagColor}15`, color: resource.tagColor }}
                >
                  {resource.tag}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-medium text-gray-500 bg-gray-100 rounded-full uppercase tracking-wide">
                  {resource.industry}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-gray-900 font-semibold text-base leading-snug group-hover:text-[#122D87] transition-colors mb-2 line-clamp-2">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-2 mb-5 flex-1">
                {resource.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {resource.metrics.map((m, i) => (
                  <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: resource.tagColor }}
              >
                {resource.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 text-[#122D87] font-medium hover:gap-3 transition-all"
          >
            Ver todos los recursos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
