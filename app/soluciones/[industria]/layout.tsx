import type { Metadata } from "next"

const industryMeta: Record<string, { title: string; description: string }> = {
  metalmecanico: {
    title: "Software de Mantenimiento para Metalmecánica",
    description: "OxyPulse y OxyPlanner para maestranzas y talleres CNC. Reduce fallas, mejora el cumplimiento preventivo y planifica la producción con IA en tu planta metalmecánica.",
  },
  mineria: {
    title: "Software de Mantenimiento para Minería",
    description: "Reduce el tiempo de paro no planificado en operaciones mineras con OxyPulse. CMMS industrial con IA para activos críticos en minería de LATAM.",
  },
  alimentos: {
    title: "Software de Mantenimiento para Plantas de Alimentos",
    description: "Trazabilidad completa de mantenimiento en plantas de alimentos y bebidas. OxyPulse para cumplir planes preventivos y registrar correctivos en tiempo real.",
  },
  logistica: {
    title: "Software de Mantenimiento para Logística",
    description: "Gestiona el mantenimiento de flotas y activos logísticos con OxyPulse. CMMS industrial para operaciones de logística y distribución en LATAM.",
  },
  forestal: {
    title: "Software de Mantenimiento para Industria Forestal",
    description: "Digitaliza el mantenimiento de equipos forestales con OxyPulse. Control de activos, plan preventivo y correctivos en tiempo real para la industria forestal.",
  },
  agricola: {
    title: "Software de Mantenimiento para Agroindustria",
    description: "Gestiona el mantenimiento de maquinaria agrícola con OxyPulse. Trazabilidad, plan preventivo y gestión de activos para la agroindustria latinoamericana.",
  },
  construccion: {
    title: "Software de Mantenimiento para Construcción",
    description: "CMMS para la gestión de activos y equipos en la industria de la construcción. OxyPulse digitaliza el mantenimiento preventivo y correctivo en obra.",
  },
  energia: {
    title: "Software de Mantenimiento para Energía e Industria",
    description: "Gestión de activos críticos en plantas de energía con OxyPulse. CMMS industrial para generadoras, transmisoras y operaciones de petróleo y gas en LATAM.",
  },
  pesquero: {
    title: "Software de Mantenimiento para Industria Pesquera",
    description: "Digitaliza el mantenimiento de flota y activos en la industria pesquera y acuícola con OxyPulse. Trazabilidad y plan preventivo para operaciones marítimas.",
  },
  manufactura: {
    title: "Software de Mantenimiento para Manufactura",
    description: "OxyPulse para plantas de manufactura en LATAM. Centraliza el mantenimiento, reduce fallas y mejora la disponibilidad de tus activos productivos.",
  },
  automotriz: {
    title: "Software de Mantenimiento para Industria Automotriz",
    description: "CMMS industrial con IA para talleres y plantas automotrices. OxyPulse gestiona activos, órdenes de trabajo y plan preventivo en tiempo real.",
  },
  retail: {
    title: "Software de Mantenimiento para Retail",
    description: "Gestión de activos y mantenimiento en operaciones de retail con OxyPulse. Control de equipos, plan preventivo y trazabilidad en tiempo real.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industria: string }>
}): Promise<Metadata> {
  const { industria } = await params
  const meta = industryMeta[industria] ?? {
    title: "Soluciones Industriales",
    description: "Software de mantenimiento industrial con IA para LATAM. OxyPulse conecta activos, equipos y planes preventivos en tiempo real.",
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Oxygen`,
      description: meta.description,
      url: `https://www.oxygen.tech/soluciones/${industria}`,
      type: "website",
    },
  }
}

export default function IndustriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
