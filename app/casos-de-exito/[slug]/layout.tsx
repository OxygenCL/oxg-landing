import type { Metadata } from "next"

const casesMeta: Record<string, { title: string; description: string }> = {
  "amcs": {
    title: "Caso AMCS: De Excel a Trazabilidad Total con OxyPulse",
    description: "Cómo AMCS dejó de trabajar con intuición y pasó a trazabilidad total. +152% en órdenes de trabajo, +31.4% cumplimiento preventivo con OxyPulse.",
  },
  "metalmecanica-cumplimiento-preventivo": {
    title: "Caso Metalmecánica: Del 42% al 93% de Cumplimiento Preventivo",
    description: "Cómo una planta metalmecánica pasó del 42% al 93% de cumplimiento preventivo en 4 meses con OxyPulse y OxyPlanner. ROI de 3.2x en el primer año.",
  },
  "mineria-tiempo-paro": {
    title: "Caso Minería: Reducción del 54% en Tiempo de Paro",
    description: "Cómo una operación minera de cobre redujo el tiempo de paro no planificado un 54% y mejoró el OEE en un 80% con OxyPulse.",
  },
  "alimentos-trazabilidad": {
    title: "Caso Alimentos: Trazabilidad Completa de Mantenimiento",
    description: "Trazabilidad completa de mantenimiento en planta de alimentos. 0 no conformidades y reducción del 38% en costos de mantenimiento con OxyPulse.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = casesMeta[slug] ?? {
    title: "Caso de Éxito Industrial",
    description: "Descubre cómo plantas industriales en LATAM mejoran su mantenimiento con OxyPulse y OxyPlanner de Oxygen.",
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Oxygen`,
      description: meta.description,
      url: `https://www.oxygen.tech/casos-de-exito/${slug}`,
      type: "article",
    },
  }
}

export default function CasoDeExitoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
