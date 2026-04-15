import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OxyPulse — CMMS Industrial con IA para Mantenimiento",
  description: "Gestiona órdenes de trabajo, activos y plan preventivo en tiempo real. OxyPulse sincroniza mantenimiento, inventario y turnos sin reemplazar tu ERP.",
  openGraph: {
    title: "OxyPulse — CMMS Industrial con IA para Mantenimiento",
    description: "Gestiona órdenes de trabajo, activos y plan preventivo en tiempo real. OxyPulse sincroniza mantenimiento, inventario y turnos sin reemplazar tu ERP.",
    url: "https://www.oxygen.tech/oxypulse",
    type: "website",
  },
}

export default function OxyPulseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
