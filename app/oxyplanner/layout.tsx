import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OxyPlanner — Planificación de Producción con IA | Oxygen",
  description: "Secuencia tus órdenes, simula escenarios y reprograma dinámicamente. OxyPlanner es el APS potenciado por IA para maestranzas y plantas metalmecánicas en LATAM.",
}

export default function OxyPlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
