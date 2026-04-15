import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos — OxyPulse y OxyPlanner para Industria",
  description: "OxyPulse: CMMS industrial con IA. OxyPlanner: APS para planificación de producción. Dos productos, una plataforma integrada para la industria en LATAM.",
  openGraph: {
    title: "Productos — OxyPulse y OxyPlanner para Industria | Oxygen",
    description: "OxyPulse: CMMS industrial con IA. OxyPlanner: APS para planificación de producción.",
    url: "https://www.oxygen.tech/productos",
    type: "website",
  },
}

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
