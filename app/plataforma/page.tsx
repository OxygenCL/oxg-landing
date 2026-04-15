"use client"

import { useState } from "react"
import Link from "next/link"
import { Layers, Blocks, MessageSquare, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  {
    id: "orquestacion",
    name: "Capa de Orquestación",
    icon: Layers,
    headline: "Nos encargamos de la integración, seguridad y despliegue. Tú controlas.",
    description: "La capa de orquestación maneja toda la complejidad técnica: conexiones a sistemas existentes, seguridad de datos, y despliegue de módulos. Tu equipo se enfoca en usar los insights, no en mantener infraestructura.",
    features: [
      "Integración con SAP, Dynamics, y sistemas OT",
      "Seguridad de nivel empresarial",
      "Despliegue automatizado y escalable",
      "Monitoreo y alertas en tiempo real",
    ],
  },
  {
    id: "constructor",
    name: "Constructor de Módulos",
    icon: Blocks,
    headline: "Diseña, despliega y escala módulos operacionales en self-service.",
    description: "Crea módulos personalizados para tu operación sin depender de desarrollo externo. Define reglas de negocio, workflows de decisión, y automatizaciones que se adaptan a tu proceso específico.",
    features: [
      "Interfaz visual de diseño de módulos",
      "Biblioteca de templates pre-configurados",
      "Testing y validación integrados",
      "Versionamiento y rollback automático",
    ],
  },
  {
    id: "copilot",
    name: "Copilot Industrial",
    icon: MessageSquare,
    headline: "Pregunta en lenguaje natural. Obtén insights accionables del estado de tu operación.",
    description: "Un asistente de IA que entiende tu operación y responde preguntas complejas en español. Desde el estado actual de un activo hasta proyecciones de disponibilidad, todo con una simple pregunta.",
    features: [
      "Consultas en lenguaje natural en español",
      "Acceso a datos históricos y en tiempo real",
      "Recomendaciones basadas en el contexto",
      "Exportación de reportes automatizada",
    ],
  },
]

export default function PlataformaPage() {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6">
              Plataforma Oxygen
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              El núcleo de la operación inteligente
            </h1>
            <p className="text-xl text-muted-foreground mb-10 text-balance">
              Una plataforma que orquesta datos, decisiones y acciones para que tu planta opere en su máximo potencial.
            </p>
            <Link
              href="/nosotros#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Contactar con ventas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform visual */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                  <Layers className="w-12 h-12 text-white/70" />
                </div>
                <p className="text-white/70 text-lg font-medium">
                  Plataforma Oxygen
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            animation: gradient 8s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Tabs section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all",
                  activeTab.id === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <activeTab.icon className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground">{activeTab.name}</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {activeTab.headline}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {activeTab.description}
              </p>
              <ul className="space-y-3">
                {activeTab.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Descubre el poder de la Plataforma Oxygen
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Habla con nuestro equipo y ve cómo podemos transformar tu operación industrial.
          </p>
          <Link
            href="/nosotros#contacto"
            className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary rounded-xl hover:bg-white/90 transition-all"
          >
            Contactar con ventas
          </Link>
        </div>
      </section>
    </div>
  )
}
