import type { Metadata } from "next"

const articlesMeta: Record<string, { title: string; description: string }> = {
  "excel-a-oxyplanner-planta-metalmecanica": {
    title: "De la rigidez del Excel a OxyPlanner: El futuro de la Planta Metalmecánica",
    description: "Cómo transformar la planificación de producción en una ventaja competitiva. OxyPlanner reemplaza el Excel con drag & drop, simulación de escenarios y métricas en tiempo real.",
  },
  "planta-apta-para-ia": {
    title: "¿Tu Planta es Apta para la IA? Por qué Planificar en el Caos es un Error",
    description: "La IA no hace magia si la realidad de tu planta no está registrada. Guía práctica para preparar tu operación antes de implementar un APS.",
  },
  "mantenimiento-preventivo-vs-correctivo": {
    title: "Mantenimiento Preventivo vs. Correctivo: Guía Definitiva para Industrias",
    description: "Diferencias clave entre mantenimiento preventivo y correctivo. Cuándo aplicar cada uno y cómo un CMMS como OxyPulse transforma la gestión de activos.",
  },
  "que-es-un-cmms": {
    title: "¿Qué es un CMMS y Para Qué Sirve? Guía Completa",
    description: "Todo lo que necesitas saber sobre los sistemas CMMS: qué son, para qué sirven, ventajas reales y cómo implementarlos en plantas industriales de LATAM.",
  },
  "preparando-operaciones-manufactura-ia": {
    title: "Operaciones de Manufactura e IA: Guía para Líderes Industriales",
    description: "Cómo preparar tu planta de manufactura para el futuro con inteligencia artificial. Guía práctica para gerentes de mantenimiento y producción en LATAM.",
  },
  "senales-estrategia-mantenimiento": {
    title: "5 Señales de que tu Estrategia de Mantenimiento Necesita Cambiar",
    description: "Indicadores clave que muestran cuándo es momento de modernizar tu enfoque de mantenimiento industrial. Deja de operar en modo reactivo.",
  },
  "que-es-software-mantenimiento": {
    title: "¿Qué es un Software de Mantenimiento (CMMS)? Guía Completa",
    description: "Todo lo que necesitas saber sobre los sistemas CMMS y cómo pueden transformar la gestión de mantenimiento en tu planta industrial. Ventajas y cómo elegir el mejor.",
  },
  "plan-mantenimiento-8-pasos": {
    title: "Cómo Crear tu Plan de Mantenimiento en 8 Pasos",
    description: "Guía práctica para estructurar un plan de mantenimiento preventivo que tu equipo realmente cumpla. Paso a paso con ejemplos reales de plantas en LATAM.",
  },
  "ventajas-cmms": {
    title: "Ventajas de Usar un CMMS en tu Planta Industrial",
    description: "Por qué las plantas industriales líderes abandonaron las planillas y adoptaron un CMMS. Beneficios reales: trazabilidad, MTTR, cumplimiento preventivo.",
  },
  "olvidate-excel-mantenimiento": {
    title: "Por Qué Debes Dejar el Excel en Mantenimiento Industrial",
    description: "Cómo dejar de depender de hojas de cálculo y pasar a una gestión de mantenimiento con trazabilidad real. Riesgos del Excel y cómo migrar sin fricción.",
  },
  "mantenimiento-predictivo": {
    title: "Mantenimiento Predictivo: Qué es y Cómo Implementarlo",
    description: "Diferencias entre mantenimiento correctivo, preventivo y predictivo. Cómo dar el salto con datos e inteligencia artificial en tu planta industrial.",
  },
  "glosario-mantenimiento-industrial": {
    title: "Glosario de Mantenimiento Industrial: OEE, MTBF, MTTR y Más",
    description: "Los términos esenciales que todo gestor de mantenimiento debe conocer: OEE, MTBF, MTTR, backlog, disponibilidad y más. Definiciones claras con ejemplos.",
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
      url: `https://www.oxygen.tech/blog/${slug}`,
      type: "article",
    },
  }
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
