import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "La Plataforma — OxyPulse, OxyPlanner y Advisory",
  description: "Conoce la suite industrial de Oxygen: OxyPulse para mantenimiento, OxyPlanner para planificación de producción con IA, y Advisory para implementación experta.",
  openGraph: {
    title: "La Plataforma — OxyPulse, OxyPlanner y Advisory | Oxygen",
    description: "Suite industrial que conecta mantenimiento, producción e inteligencia en plantas de LATAM.",
    url: "https://www.oxygen.tech/plataforma",
    type: "website",
  },
}

export default function PlataformaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
