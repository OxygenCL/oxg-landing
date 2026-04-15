"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const useCases = [
  {
    id: "prevencion",
    tab: "OxyPulse — Prevención",
    title: "Automatiza rutinas de mantenimiento preventivo",
    description: "Tu equipo de mantenimiento crea planes preventivos dinámicos que responden a la criticidad real de los activos.",
    kpis: [
      { value: "+90%", label: "cumplimiento preventivo" },
      { value: "-40%", label: "detenciones por falla" },
      { value: "-7%", label: "Costo energético" },
    ],
    videoPlaceholder: "[Video OxyPulse — agregar mp4]",
  },
  {
    id: "decisiones",
    tab: "OxyPulse — Decisiones",
    title: "Toma decisiones de mantenimiento con datos, no con intuición",
    description: "Prioriza órdenes de trabajo con criterio defendible. Cada decisión tiene respaldo en datos de criticidad y disponibilidad.",
    kpis: [
      { value: "-80%", label: "Tiempo de análisis" },
      { value: "+10%", label: "Estabilidad operacional" },
      { value: "-70%", label: "Alarmas irrelevantes" },
    ],
    videoPlaceholder: "[Video dashboard — agregar mp4]",
  },
  {
    id: "produccion",
    tab: "OxyPlanner — Producción",
    title: "Planificación avanzada de producción con restricciones reales",
    description: "Secuencia órdenes de producción considerando capacidad, materiales y disponibilidad de equipos en tiempo real.",
    kpis: [
      { value: "+12%", label: "Utilización" },
      { value: "+5%", label: "Throughput" },
      { value: "-95%", label: "Tiempo de planificación" },
    ],
    videoPlaceholder: "[Video OxyPlanner — agregar mp4]",
  },
  {
    id: "advisory",
    tab: "Advisory — Implementación",
    title: "Implementación acompañada hasta ver los resultados",
    description: "Diagnóstico en planta, implementación con tu equipo y seguimiento de KPIs hasta que los resultados sean medibles y sostenibles.",
    kpis: [
      { value: "+93%", label: "Cumplimiento preventivo" },
      { value: "-61%", label: "Fallas no planificadas" },
      { value: "90 días", label: "Al primer resultado" },
    ],
    videoPlaceholder: "[Video Advisory — agregar mp4]",
  },
]

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-[#122D87] uppercase tracking-widest mb-4">
            CASOS DE USO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Convierte tu operación en tu ventaja competitiva
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((useCase, index) => (
            <button
              key={useCase.id}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-full transition-all",
                activeTab === index
                  ? "bg-[#122D87] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {useCase.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Placeholder */}
          <div className="aspect-video rounded-2xl bg-[#0A2434] border border-[#122D4A] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm">{useCases[activeTab].videoPlaceholder}</p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {useCases[activeTab].title}
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              {useCases[activeTab].description}
            </p>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-6">
              {useCases[activeTab].kpis.map((kpi, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#122D87]">
                    {kpi.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
