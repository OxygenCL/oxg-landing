import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casos de Éxito y Guías de Mantenimiento Industrial",
  description: "Casos reales, guías prácticas y artículos sobre mantenimiento industrial con datos en LATAM. Aprende cómo los mejores equipos industriales operan.",
  openGraph: {
    title: "Casos de Éxito y Guías de Mantenimiento Industrial | Oxygen",
    description: "Casos reales, guías prácticas y artículos sobre mantenimiento industrial con datos en LATAM.",
    url: "https://www.oxygen.tech/recursos",
    type: "website",
  },
}

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
