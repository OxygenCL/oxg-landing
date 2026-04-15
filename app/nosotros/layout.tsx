import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nosotros — El equipo detrás de Oxygen",
  description: "Conoce al equipo que construye el software de mantenimiento industrial más adoptado en LATAM. Respaldados por Startup Chile. Impacto real en plantas industriales.",
  openGraph: {
    title: "Nosotros — El equipo detrás de Oxygen",
    description: "Conoce al equipo que construye el software de mantenimiento industrial más adoptado en LATAM. Respaldados por Startup Chile.",
    url: "https://www.oxygen.tech/nosotros",
    type: "website",
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
