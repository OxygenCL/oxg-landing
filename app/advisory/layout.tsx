import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Oxygen Advisory — Consultoría Industrial para Manufactura en LATAM | Oxygen",
  description: "Diagnóstico, implementación y mejora continua para operaciones industriales. Expertos en mantenimiento y planificación de producción en Iberoamérica.",
}

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
