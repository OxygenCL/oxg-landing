import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OxyPlanner — Planificación de Producción con IA",
  description: "Secuencia órdenes, simula escenarios y reprograma en tiempo real. APS con IA para maestranzas y plantas metalmecánicas. Integrado con OxyPulse y Strumis.",
  openGraph: {
    title: "OxyPlanner — Planificación de Producción con IA | Oxygen",
    description: "Secuencia órdenes, simula escenarios y reprograma en tiempo real. APS con IA para maestranzas y plantas metalmecánicas.",
    url: "https://www.oxygen.tech/oxyplanner",
    type: "website",
  },
}

export default function OxyPlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
