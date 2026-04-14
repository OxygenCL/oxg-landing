"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, Users, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "oxypulse",
    name: "OxyPulse",
    icon: BarChart3,
    tagline: "Decisiones de mantenimiento en tiempo real",
    vision: "Habilitar al Jefe de Mantenimiento para convertirse en un decisor creíble y visible, capaz de tomar y defender decisiones basadas en datos que impactan la continuidad operacional.",
    href: "/oxypulse",
    kpis: [
      { value: "+15%", label: "Disponibilidad" },
      { value: "+95%", label: "OTIF preventivo" },
      { value: "-40%", label: "Tiempo reactivo" },
    ],
    features: [
      {
        step: "01",
        title: "Prioriza activos críticos en tiempo real",
        description: "Conecta con datos operativos y genera planes basados en criticidad real",
      },
      {
        step: "02",
        title: "Replantea automáticamente ante cambios",
        description: "Paradas, urgencias, fallas — el sistema se adapta",
      },
      {
        step: "03",
        title: "Simula escenarios antes de decidir",
        description: "Ve el impacto económico de cada decisión antes de ejecutar",
      },
      {
        step: "04",
        title: "Optimiza planes preventivos por criticidad",
        description: "Selecciona dinámicamente qué mantener y cuándo",
      },
      {
        step: "05",
        title: "Planifica basado en costo real de operación",
        description: "Aprende de históricos y costos reales de mantenimiento",
      },
    ],
  },
  {
    id: "oxyplanner",
    name: "OxyPlanner",
    icon: Calendar,
    tagline: "Planificación de operaciones con datos",
    vision: "Transformar la planificación operacional de un proceso manual y reactivo a uno automatizado y predictivo que maximiza throughput y eficiencia.",
    href: "/oxyplanner",
    kpis: [
      { value: "-80%", label: "Esfuerzo manual" },
      { value: "+10%", label: "Estabilidad" },
      { value: "-70%", label: "Alarmas" },
    ],
    features: [
      {
        step: "01",
        title: "Automatiza rutinas de planificación recurrentes",
        description: "Elimina tareas repetitivas y reduce el error humano",
      },
      {
        step: "02",
        title: "Monitoreo diario de rendimiento de proceso",
        description: "Visibilidad en tiempo real del estado de la operación",
      },
      {
        step: "03",
        title: "Análisis de causa raíz automatizado",
        description: "Identifica problemas antes de que escalen",
      },
      {
        step: "04",
        title: "Reportes accionables listos para decisión",
        description: "Información clara y orientada a la acción",
      },
    ],
  },
  {
    id: "consultoria",
    name: "Consultoría",
    icon: Users,
    tagline: "Tu motor de revenue B2B implementado",
    vision: "Diseñar e implementar el sistema comercial que tu empresa necesita para escalar revenue de forma predecible y sostenible en LATAM.",
    href: "/advisory",
    kpis: [
      { value: "30", label: "Días diagnóstico" },
      { value: "+50%", label: "Pipeline" },
      { value: "100%", label: "Playbooks" },
    ],
    features: [
      {
        step: "01",
        title: "Diagnóstico RevOps en 30 días",
        description: "Evaluación completa de tu motor comercial actual",
      },
      {
        step: "02",
        title: "Implementación HubSpot + workflows comerciales",
        description: "Configuración y automatización de tu CRM",
      },
      {
        step: "03",
        title: "Formación SDR con playbooks probados en LATAM",
        description: "Capacitación basada en resultados reales del mercado",
      },
    ],
  },
]

export default function ProductosPage() {
  const [activeProduct, setActiveProduct] = useState(products[0])

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Un nuevo paradigma para el mantenimiento industrial
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Productos que transforman datos operacionales en decisiones que impactan la continuidad y rentabilidad de tu planta.
            </p>
          </div>

          {/* Product tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl transition-all",
                  activeProduct.id === product.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                )}
              >
                <product.icon className="w-5 h-5" />
                <span className="font-medium">{product.name}</span>
              </button>
            ))}
          </div>

          {/* Active product preview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video/visual placeholder */}
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <activeProduct.icon className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    Vista previa de {activeProduct.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {activeProduct.tagline}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {activeProduct.vision}
              </p>
              
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeProduct.kpis.map((kpi) => (
                  <div key={kpi.label} className="text-center p-4 rounded-xl bg-card border border-border">
                    <div className="text-2xl font-bold text-primary">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground">{kpi.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={activeProduct.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Explorar {activeProduct.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product deep-dives */}
      {products.map((product) => (
        <section key={product.id} className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Product header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <product.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {product.name}
                </h2>
                <p className="text-muted-foreground">{product.tagline}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {product.features.map((feature, index) => (
                <div
                  key={feature.step}
                  className="grid lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Screenshot placeholder - alternate sides */}
                  <div className={cn(
                    "aspect-video rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-center justify-center",
                    index % 2 === 1 && "lg:order-2"
                  )}>
                    <div className="text-center p-6">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                        <span className="text-primary font-bold">{feature.step}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Captura de pantalla</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn(index % 2 === 1 && "lg:order-1")}>
                    <div className="text-sm font-medium text-primary mb-2">
                      Paso {feature.step}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
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
      ))}
    </div>
  )
}
