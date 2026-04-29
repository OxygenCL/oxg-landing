import type { Metadata } from "next"

const guiasMeta: Record<string, { title: string; description: string }> = {
  "mantenimiento-preventivo-vs-correctivo": {
    title: "Mantenimiento Preventivo vs. Correctivo: Guía Definitiva para Industrias",
    description: "Diferencias clave entre mantenimiento preventivo y correctivo. Cuándo aplicar cada uno y cómo un CMMS como OxyPulse transforma la gestión de activos.",
  },
  "que-es-un-cmms": {
    title: "¿Qué es un CMMS y Para Qué Sirve? Guía Completa",
    description: "Todo lo que necesitas saber sobre los sistemas CMMS: qué son, para qué sirven, ventajas reales y cómo implementarlos en plantas industriales de LATAM.",
  },
  "que-es-mantenimiento-preventivo": {
    title: "¿Qué es el Mantenimiento Preventivo y Cómo Implementarlo?",
    description: "Aprende qué es el mantenimiento preventivo, cuáles son sus tipos, cómo implementarlo paso a paso y cómo digitalizarlo con un CMMS para reducir costos y paradas.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = guiasMeta[slug] ?? {
    title: "Guía de Mantenimiento Industrial",
    description: "Guías prácticas sobre mantenimiento industrial, CMMS y gestión de activos para plantas en LATAM.",
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Oxygen`,
      description: meta.description,
      url: `https://www.oxygen.tech/guias/${slug}`,
      type: "article",
    },
  }
}

export default function GuiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
