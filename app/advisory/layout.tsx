import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Advisory — Consultoría Industrial para Operaciones",
  description: "Diagnóstico, implementación y mejora continua para plantas industriales en LATAM. Expertos en mantenimiento preventivo y planificación de producción.",
  openGraph: {
    title: "Advisory — Consultoría Industrial para Operaciones | Oxygen",
    description: "Diagnóstico, implementación y mejora continua para plantas industriales en LATAM. Expertos en mantenimiento preventivo y planificación de producción.",
    url: "https://www.oxygen.tech/advisory",
    type: "website",
  },
}

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
