import type { Metadata } from "next"

const articlesMeta: Record<string, { title: string; description: string }> = {
  "del-excel-a-oxyplanner": {
    title: "De la rigidez del Excel a OxyPlanner: El futuro de la Planta Metalmecánica",
    description: "Cómo transformar la planificación de producción en una ventaja competitiva. OxyPlanner reemplaza el Excel con drag & drop, simulación de escenarios y métricas en tiempo real.",
  },
  "planta-apta-para-ia": {
    title: "¿Tu Planta es Apta para la IA? Por qué Planificar en el Caos es un Error",
    description: "La IA no hace magia si la realidad de tu planta no está registrada. Guía práctica para preparar tu operación antes de implementar un APS.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = articlesMeta[slug] ?? {
    title: "Artículo de Mantenimiento Industrial",
    description: "Guías y artículos sobre mantenimiento industrial, CMMS y gestión de activos para plantas en LATAM.",
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Oxygen`,
      description: meta.description,
      url: `https://www.oxygen.tech/articulos/${slug}`,
      type: "article",
    },
  }
}

export default function ArticulosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
