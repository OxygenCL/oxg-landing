"use client"

import { use, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  slug: string
  tag: string
  title: string
  date: string
  readTime: string
  description: string
  author: { initials: string; name: string; role: string }
  sections: {
    id: string
    label: string
    heading: string
    body: string[]
    items?: {
      title: string
      body: string
      link?: { text: string; href: string }
      bodyAfter?: string
      classBullets?: { badge: string; badgeColor: string; label: string; desc: string }[]
    }[]
    bullets?: string[]
  }[]
  faq?: { question: string; answer: string }[]
}

// ─── Guide Data ───────────────────────────────────────────────────────────────

const articles: Record<string, Article> = {
  "mantenimiento-preventivo-vs-correctivo": {
    slug: "mantenimiento-preventivo-vs-correctivo",
    tag: "Guías",
    title: "Mantenimiento Preventivo vs. Correctivo: La guía definitiva",
    date: "17 Feb 2026",
    readTime: "7 min de lectura",
    description: "Entiende a fondo las diferencias entre mantenimiento preventivo y correctivo, cuándo aplicar cada uno y cómo un CMMS transforma tu gestión.",
    author: { initials: "AO", name: "Armando Ortiz", role: "Agente de marketing, Oxygen" },
    sections: [
      {
        id: "correctivo",
        label: "Mantenimiento correctivo",
        heading: "¿Qué es el mantenimiento correctivo?",
        body: [
          "El mantenimiento correctivo consiste en reparar un equipo o activo una vez que este ya ha fallado o presenta mal funcionamiento. Es la clásica situación del 'si no está roto, no lo arregles', hasta que inevitablemente se rompe.",
          "Existen dos vertientes: el no planificado (emergencia), cuando un activo falla inesperadamente generando caos y altos costos, y el planificado (run-to-failure), donde se decide conscientemente dejar operar un equipo hasta que falle, generalmente porque no es crítico.",
        ],
        bullets: [
          "Ventajas: Bajo costo inicial en planificación anticipada. Simplicidad, ideal para equipos auxiliares o no críticos.",
          "Desventajas: Tiempos de inactividad impredecibles que detienen la producción. Mayores costos a largo plazo por reparaciones de emergencia y horas extra. Riesgos de seguridad ante fallas catastróficas.",
        ],
      },
      {
        id: "preventivo",
        label: "Mantenimiento preventivo",
        heading: "¿Qué es el mantenimiento preventivo?",
        body: [
          "El mantenimiento preventivo busca evitar que las fallas ocurran mediante intervenciones programadas regularmente: inspecciones, lubricación, limpieza y ajustes para mantener los activos en condiciones óptimas y extender su vida útil.",
        ],
        bullets: [
          "Ventajas: Reducción drástica de paradas inesperadas al detectar el desgaste a tiempo. Mayor vida útil del activo, protegiendo la inversión de capital. Seguridad y eficiencia, un equipo mantenido consume menos energía.",
          "Desventajas: Requiere una gestión estricta de calendarios y recursos. Riesgo de sobre-mantenimiento sin los datos adecuados.",
        ],
      },
      {
        id: "diferencias",
        label: "Comparativa",
        heading: "Preventivo vs. Correctivo: ¿En qué se diferencian realmente?",
        body: [
          "La diferencia fundamental radica en el tiempo y el control. El correctivo actúa después del fallo, el preventivo actúa antes. El correctivo parece barato hoy pero es caro mañana. El preventivo es una inversión constante que ahorra grandes sumas.",
          "Los expertos sugieren que una planta sana debería aspirar a la regla 80/20: 80% de esfuerzo en mantenimiento preventivo y solo un 20% dedicado a correctivos inevitables.",
        ],
      },
      {
        id: "cmms",
        label: "El rol del CMMS",
        heading: "Cómo un CMMS transforma tu gestión",
        body: [
          "Intentar equilibrar estas estrategias usando hojas de cálculo es una receta para el desastre. Un CMMS centraliza toda la información para que dejes de trabajar por intuición:",
        ],
        items: [
          {
            title: "Automatización del preventivo",
            body: "El sistema programa automáticamente las Órdenes de Trabajo recurrentes y envía alertas antes de que algo falle, sin depender de la memoria del equipo.",
          },
          {
            title: "Control del correctivo",
            body: "Permite reportar averías al instante desde una app móvil y medir el MTTR (Tiempo Medio de Reparación) para detectar patrones de falla.",
          },
          {
            title: "Gestión de inventarios",
            body: "Evita el 'no tenemos la pieza' gestionando niveles de stock en tiempo real y generando alertas de reposición automáticas.",
          },
          {
            title: "Trazabilidad y datos",
            body: "Transforma opiniones en hechos, permitiendo ver qué activos cuestan más dinero y fallan más seguido para tomar decisiones estratégicas.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuál es la principal diferencia entre mantenimiento preventivo y correctivo?",
        answer: "La diferencia clave es el momento de la intervención: el preventivo se ejecuta antes de la falla para evitarla, mientras que el correctivo se realiza después del fallo para repararlo.",
      },
      {
        question: "¿Es siempre mejor el mantenimiento preventivo?",
        answer: "Para activos críticos, sí. Sin embargo, el correctivo puede ser válido para equipos de bajo costo o no críticos donde prevenir sea más caro que reemplazar.",
      },
      {
        question: "¿Cómo ayuda un CMMS a reducir costos de mantenimiento?",
        answer: "Minimiza el tiempo de inactividad, optimiza el inventario de repuestos y extiende la vida útil de los equipos mediante un plan preventivo basado en datos reales y no en suposiciones.",
      },
      {
        question: "¿Qué es la regla del 80/20 en mantenimiento industrial?",
        answer: "Es un estándar industrial que sugiere que el 80% de las tareas deben ser preventivas (planificadas) y solo el 20% correctivas (reactivas), para maximizar la disponibilidad de los activos.",
      },
      {
        question: "¿Qué tareas incluye el mantenimiento preventivo?",
        answer: "Incluye inspecciones visuales, lubricación, limpieza, calibración y reemplazo de piezas de desgaste antes de que lleguen al final de su vida útil.",
      },
    ],
  },

  "que-es-un-cmms": {
    slug: "que-es-un-cmms",
    tag: "Guías",
    title: "¿Qué es un CMMS y para qué sirve realmente?",
    date: "11 Feb 2026",
    readTime: "6 min de lectura",
    description: "Si la gestión del mantenimiento en tu empresa es una lucha constante, aquí desglosamos todo lo que necesitas saber sobre los sistemas CMMS y su valor real.",
    author: { initials: "AO", name: "Armando Ortiz", role: "Agente de marketing, Oxygen" },
    sections: [
      {
        id: "definicion",
        label: "¿Qué es un CMMS?",
        heading: "Definiendo el concepto",
        body: [
          "Las siglas CMMS provienen del inglés Computerized Maintenance Management System. En términos sencillos, es una solución de software diseñada para simplificar, automatizar y optimizar la gestión del mantenimiento de los activos, equipos e instalaciones de una empresa.",
          "Su estructura se divide en cuatro dimensiones: informatizado (sustituye el papel por una base de datos digital en la nube), mantenimiento (herramienta diaria para planificar tareas y registrar órdenes de trabajo), gestión (visión inmediata de la salud de los activos) y sistema (combinación de funciones que permiten ahorrar tiempo y reducir costos).",
        ],
      },
      {
        id: "para-que-sirve",
        label: "¿Para qué sirve?",
        heading: "¿Para qué sirve realmente un CMMS?",
        body: [
          "Su función principal es actuar como una base de datos centralizada de todas las operaciones de mantenimiento:",
        ],
        bullets: [
          "Gestión de activos: Registro detallado del historial, averías y vida útil de cada equipo.",
          "Automatización de órdenes de trabajo: Creación y monitoreo de tareas en tiempo real, eliminando el papeleo.",
          "Mantenimiento preventivo: Programación de rutinas para evitar fallas antes de que ocurran.",
          "Control de inventario: Rastrea el movimiento de repuestos y gestiona niveles de stock para evitar quiebres.",
          "Movilidad: Reporte de fallas y cierre de órdenes directamente desde la planta mediante apps móviles.",
        ],
      },
      {
        id: "valor-real",
        label: "El valor real",
        heading: "¿Por qué tu empresa necesita un CMMS?",
        body: [
          "La implementación de un CMMS transforma una organización reactiva en una proactiva. Los datos de la industria son claros:",
        ],
        items: [
          {
            title: "Reducción del tiempo de inactividad",
            body: "El uso de un CMMS facilita estrategias proactivas que reducen las paradas inesperadas de producción en un promedio del 20.1%.",
          },
          {
            title: "Ahorro de costos medible",
            body: "Estas plataformas pueden reducir los costos de inventario en un 17.8% y aumentar la productividad del mantenimiento en un 28.3%.",
          },
          {
            title: "Centralización del conocimiento",
            body: "El software actúa como repositorio de todo el conocimiento técnico de la organización, protegiendo el historial del activo frente a la rotación de personal.",
          },
        ],
      },
      {
        id: "implementacion",
        label: "Implementación",
        heading: "Los 4 pilares de la implementación exitosa",
        body: [
          "En Oxygen, acompañamos la transición enfocándonos en lo que realmente garantiza resultados operativos:",
        ],
        items: [
          {
            title: "Auditoría de activos",
            body: "Catalogar cada equipo por ubicación y criticidad para eliminar puntos ciegos en la operación.",
          },
          {
            title: "Cultura de adopción",
            body: "Software intuitivo diseñado para que los técnicos en planta lo adopten sin fricciones desde el primer día.",
          },
          {
            title: "Higiene de datos",
            body: "Centralización de historiales limpios para permitir analítica avanzada e inteligencia artificial.",
          },
          {
            title: "Enfoque preventivo",
            body: "Transición del 'reparar cuando se rompa' a calendarios programados basados en uso real de cada activo.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuál es la diferencia entre mantenimiento preventivo y correctivo en la gestión de datos?",
        answer: "El preventivo se planifica para evitar fallas; el correctivo repara averías inesperadas. Un CMMS captura ambos registros para calcular la disponibilidad real de tus equipos y detectar patrones.",
      },
      {
        question: "¿Por qué es riesgoso seguir usando Excel para mantenimiento?",
        answer: "Excel es vulnerable a errores humanos, pérdida de datos y falta de integridad de la información. Un software especializado ofrece alertas automáticas, historial inalterable y trazabilidad completa.",
      },
      {
        question: "¿En qué industrias se recomienda el uso de un CMMS?",
        answer: "Es fundamental para cualquier empresa con activos críticos: manufactura, alimentos y bebidas, minería, logística, construcción, energía y cualquier industria donde el tiempo de paro tiene un costo alto.",
      },
      {
        question: "¿Cómo impacta la digitalización en las decisiones de mantenimiento?",
        answer: "Transforma opiniones en hechos medibles. Permite identificar qué activos fallan más y por qué, facilitando ajustes en los planes de mantenimiento para maximizar la productividad y reducir costos.",
      },
    ],
  },

  "que-es-mantenimiento-preventivo": {
    slug: "que-es-mantenimiento-preventivo",
    tag: "Guías",
    title: "¿Qué es el mantenimiento preventivo y cómo implementarlo en tu empresa?",
    date: "28 Abr 2026",
    readTime: "8 min de lectura",
    description: "En manufactura, el problema no es que las máquinas fallen. El problema es que nadie lo vio venir. El mantenimiento preventivo existe para romper ese ciclo.",
    author: { initials: "AO", name: "Armando Ortiz", role: "Agente de marketing, Oxygen" },
    sections: [
      {
        id: "que-es",
        label: "Qué es",
        heading: "¿Qué es el mantenimiento preventivo?",
        body: [
          "El mantenimiento preventivo es el conjunto de acciones programadas y periódicas que se ejecutan sobre equipos e instalaciones antes de que ocurra una falla, con el objetivo de mantenerlos en condiciones óptimas de operación, extender su vida útil y eliminar el riesgo de paradas no planificadas.",
          "A diferencia del mantenimiento correctivo —que actúa después de que algo se rompe— el preventivo se planifica con anticipación, se ejecuta con regularidad y se documenta para aprender de cada intervención.",
          "En términos simples: el mantenimiento preventivo es el hábito que mantiene tus equipos funcionando cuando más los necesitas.",
        ],
      },
      {
        id: "por-que",
        label: "Por qué importa",
        heading: "Por qué el mantenimiento preventivo es el estándar en la industria moderna",
        body: [
          "Las plantas que operan con mantenimiento reactivo enfrentan tres problemas estructurales:",
        ],
        bullets: [
          "Costos impredecibles y más altos: Una reparación de emergencia cuesta entre 3 y 5 veces más que el mismo trabajo planificado.",
          "Riesgo de accidentes laborales: Las fallas súbitas en equipos críticos son una de las principales causas de accidentes en plantas industriales.",
          "Deterioro acelerado de activos: Un equipo mal mantenido envejece más rápido y requiere reemplazo antes de tiempo.",
          "Regla 80/20: Las plantas de clase mundial destinan el 80% del esfuerzo al mantenimiento preventivo y solo el 20% a correctivos inevitables.",
        ],
      },
      {
        id: "tipos",
        label: "Tipos",
        heading: "Tipos de mantenimiento preventivo",
        body: [],
        items: [
          {
            title: "1. Basado en tiempo (calendario)",
            body: "Las intervenciones se programan en función de intervalos fijos: cada semana, cada 30 días, cada trimestre. Es el tipo más común y el más fácil de planificar. Ejemplo: Revisión mensual de filtros de aire comprimido en una línea de producción de alimentos.",
          },
          {
            title: "2. Basado en uso o ciclos",
            body: "El mantenimiento se activa cuando un equipo alcanza cierta cantidad de horas de operación, ciclos de trabajo o unidades producidas. Ejemplo: Cambio de aceite en un compresor cada 2,000 horas de operación.",
          },
          {
            title: "3. Basado en condición (preventivo técnico)",
            body: "Se monitorean variables del equipo —temperatura, vibración, presión— y el mantenimiento se ejecuta cuando esos indicadores superan un umbral definido. Ejemplo: Revisión de rodamientos cuando la temperatura supera los 75°C en la medición mensual del técnico.",
          },
          {
            title: "4. Preventivo basado en historial",
            body: "Se analiza el historial de fallas para identificar patrones recurrentes y actuar antes de que se repitan. Ejemplo: Si un motor falla por desgaste de carbones cada 16-18 meses, se programa su revisión al mes 14.",
          },
        ],
      },
      {
        id: "beneficios",
        label: "Beneficios",
        heading: "Beneficios del mantenimiento preventivo",
        body: [],
        bullets: [
          "Reducción de costos de mantenimiento: Entre 12% y 18% respecto al modelo reactivo, al eliminar reparaciones de emergencia.",
          "Mayor disponibilidad de equipos: Puede superar el 90% vs. el 70-75% típico de una planta reactiva.",
          "Extensión de vida útil: Los activos correctamente mantenidos duran entre un 20% y un 40% más.",
          "Seguridad laboral mejorada: Elimina los fallos súbitos que causan accidentes con equipos.",
          "Cumplimiento normativo: El preventivo documentado es requisito en auditorías ISO, HACCP y regulaciones de seguridad.",
          "Datos para mejores decisiones: Cada tarea genera datos de costo, tiempo y condición que permiten optimizar el plan.",
        ],
      },
      {
        id: "como-implementar",
        label: "Cómo implementar",
        heading: "Cómo implementar un plan de mantenimiento preventivo: 7 pasos",
        body: [],
        items: [
          {
            title: "Paso 1: Inventariar todos tus activos",
            body: "Crea un registro completo de todos los equipos, instalaciones y sistemas que requieren mantenimiento: nombre, marca, modelo, número de serie, ubicación y fecha de adquisición.",
          },
          {
            title: "Paso 2: Clasificar activos por criticidad",
            body: "Asigna a cada activo una clase según su impacto en la operación:",
            classBullets: [
              { badge: "Clase A", badgeColor: "#dc2626", label: "Crítico", desc: "Su falla para la producción o pone en riesgo la seguridad → mantenimiento preventivo obligatorio." },
              { badge: "Clase B", badgeColor: "#d97706", label: "Importante", desc: "Afecta la eficiencia pero no detiene la producción → prioridad media." },
              { badge: "Clase C", badgeColor: "#16a34a", label: "No crítico", desc: "Impacto mínimo → puede operar bajo correctivo planificado." },
            ],
          },
          {
            title: "Paso 3: Revisar las recomendaciones del fabricante",
            body: "Para cada activo Clase A y B, revisa el manual del fabricante para las frecuencias de lubricación, calibración y reemplazo de componentes. Ajústalas a las condiciones reales de tu operación.",
          },
          {
            title: "Paso 4: Definir tareas y frecuencias por activo",
            body: "Documenta en una tabla de mantenimiento preventivo qué tareas se realizarán, con qué frecuencia, quién es el responsable y cuánto tiempo demoran.",
          },
          {
            title: "Paso 5: Asignar responsables y recursos",
            body: "Cada tarea debe tener un responsable claro y los materiales disponibles antes de la fecha programada. La falta de repuestos en el momento de la intervención es el primer síntoma de una planificación deficiente.",
          },
          {
            title: "Paso 6: Crear el cronograma",
            body: "Organiza todas las tareas en un calendario que distribuya la carga de trabajo de manera uniforme, coordine con producción las ventanas de mantenimiento y anticipe los recursos necesarios.",
          },
          {
            title: "Paso 7: Digitalizar en un CMMS",
            body: "Un CMMS como ",
            link: { text: "OxyPulse", href: "https://www.oxygen.tech/oxypulse" },
            bodyAfter: " te permite programar todas las tareas, generar órdenes de trabajo automáticas, notificar a los técnicos antes del vencimiento y registrar la ejecución desde el celular. El plan preventivo deja de depender de la memoria de las personas y pasa a ser un proceso que funciona solo.",
          },
        ],
      },
      {
        id: "kpis",
        label: "KPIs",
        heading: "Cómo medir si tu mantenimiento preventivo está funcionando",
        body: [],
        bullets: [
          "PM Compliance: % de OT preventivas cerradas en tiempo. Objetivo: >90%.",
          "MTBF: Tiempo Medio Entre Fallos. Si sube mes a mes, el preventivo funciona.",
          "Ratio Preventivo/Correctivo: % de OT preventivas del total. Objetivo: >70%.",
          "Disponibilidad: MTBF ÷ (MTBF + MTTR) × 100. Objetivo: >85%.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Qué diferencia hay entre mantenimiento preventivo y correctivo?",
        answer: "El mantenimiento preventivo se ejecuta de forma planificada antes de que ocurra una falla, con el objetivo de evitarla. El mantenimiento correctivo se ejecuta después de que el equipo ya falló. El preventivo reduce los costos a largo plazo y mejora la disponibilidad de los equipos; el correctivo interrumpe la producción y suele costar entre 3 y 5 veces más por intervención.",
      },
      {
        question: "¿Con qué frecuencia se debe hacer el mantenimiento preventivo?",
        answer: "Depende del tipo de equipo, su intensidad de uso y las recomendaciones del fabricante. La mayoría de las plantas aplican mantenimiento preventivo en múltiples frecuencias simultáneas: diaria (inspecciones operativas), semanal (lubricación y ajustes), mensual (revisiones técnicas) y anual (overhauls). Un CMMS como Oxygen gestiona todas estas frecuencias automáticamente.",
      },
      {
        question: "¿Cómo hacer un plan de mantenimiento preventivo paso a paso?",
        answer: "Los 7 pasos son: 1) Inventariar todos los activos; 2) Clasificarlos por criticidad (A, B, C); 3) Revisar las recomendaciones del fabricante; 4) Definir tareas y frecuencias por equipo; 5) Asignar responsables y recursos; 6) Crear el cronograma; 7) Digitalizar el plan en un CMMS para que las órdenes de trabajo se generen automáticamente y cada ejecución quede registrada con trazabilidad completa.",
      },
    ],
  },
}

// ─── Related fallback (artículos) ─────────────────────────────────────────────

const relatedFallback = [
  {
    slug: "del-excel-a-oxyplanner",
    tag: "Artículos",
    title: "De la rigidez del Excel a la agilidad de OxyPlanner",
    date: "20 Mar 2026",
    href: "/articulos/del-excel-a-oxyplanner",
  },
  {
    slug: "planta-apta-para-ia",
    tag: "Artículos",
    title: "¿Tu planta es apta para la IA?",
    date: "27 Feb 2026",
    href: "/articulos/planta-apta-para-ia",
  },
]

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── TOC ──────────────────────────────────────────────────────────────────────

function TableOfContents({
  sections,
  author,
  hasFaq,
}: {
  sections: Article["sections"]
  author: Article["author"]
  hasFaq?: boolean
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const ids = [...sections.map((s) => s.id), ...(hasFaq ? ["faq"] : [])]
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sections, hasFaq])

  return (
    <nav className="sticky top-28 self-start">
      {/* Author */}
      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #c7d2fe, #4361ee)" }}>
          {author.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{author.name}</p>
          <p className="text-xs leading-snug" style={{ color: "#4361ee" }}>{author.role}</p>
        </div>
      </div>

      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Contenidos</p>
      <ul className="space-y-1">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }}
              className="flex items-center gap-2 text-sm py-1.5 transition-colors"
              style={{ color: active === id ? "#4361ee" : "#6b7280" }}>
              <span className="block h-px flex-shrink-0 transition-all"
                style={{ background: active === id ? "#4361ee" : "#d1d5db", width: active === id ? 20 : 12 }} />
              {label}
            </a>
          </li>
        ))}
        {hasFaq && (
          <li>
            <a href="#faq"
              onClick={(e) => { e.preventDefault(); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }) }}
              className="flex items-center gap-2 text-sm py-1.5 transition-colors"
              style={{ color: active === "faq" ? "#4361ee" : "#6b7280" }}>
              <span className="block h-px flex-shrink-0 transition-all"
                style={{ background: active === "faq" ? "#4361ee" : "#d1d5db", width: active === "faq" ? 20 : 12 }} />
              Preguntas frecuentes
            </a>
          </li>
        )}
      </ul>

      <div className="mt-10 pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3">¿Quieres ver esto en tu planta?</p>
        <Link href="/nosotros#contacto"
          className="block text-center text-sm font-semibold text-white rounded-xl px-4 py-3 transition-opacity hover:opacity-90"
          style={{ background: "#4361ee" }}>
          Hablar con el equipo
        </Link>
      </div>
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = articles[slug]

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Guía no encontrada.</p>
          <Link href="/recursos" className="text-[#4361ee] font-semibold hover:underline">Ver todos los recursos →</Link>
        </div>
      </div>
    )
  }

  // Pick related guides (other than current), complete with fallback artículos if needed
  const fromGuias = Object.values(articles)
    .filter((a) => a.slug !== slug)
    .map((a) => ({ slug: a.slug, tag: a.tag, title: a.title, date: a.date, href: `/guias/${a.slug}` }))

  const related: { slug: string; tag: string; title: string; date: string; href: string }[] = [...fromGuias]
  if (related.length < 2) {
    const needed = 2 - related.length
    related.push(...relatedFallback.slice(0, needed))
  }
  const relatedArticles = related.slice(0, 2)

  const hasFaq = !!(article.faq && article.faq.length > 0)

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 overflow-hidden relative" style={{ background: "#0A2434" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video src="/hero-bg2.mp4" autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,52,0.80) 0%, rgba(15,30,61,0.70) 55%, rgba(10,36,52,0.80) 100%)" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 65%)", transform: "translate(25%, -25%)" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <Link href="/recursos"
              className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors">
              <ArrowLeft size={14} />
              Todos los recursos
            </Link>
            <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full"
              style={{ background: "rgba(67,97,238,0.25)", color: "#a5b4fc" }}>
              {article.tag}
            </span>
          </div>

          <h1 className="text-white font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            {article.title}
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">{article.description}</p>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6 text-white/30 text-xs">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[220px_1fr] gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents sections={article.sections} author={article.author} hasFaq={hasFaq} />
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {article.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}

            {hasFaq && (
              <>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": article.faq!.map((f) => ({
                        "@type": "Question",
                        "name": f.question,
                        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
                      })),
                    }),
                  }}
                />
                <ArticleSectionWrapper id="faq" label="Preguntas frecuentes">
                  <FaqAccordion items={article.faq!} />
                </ArticleSectionWrapper>
              </>
            )}

            {/* CTA */}
            <div className="rounded-3xl p-6 md:p-10 mt-16 text-center"
              style={{ background: "linear-gradient(135deg, #0A2434 0%, #122D87 100%)" }}>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">¿Lista para dar el salto?</p>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Hablemos sobre tu operación
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                En 30 minutos te mostramos si Oxygen encaja con tu planta, sin compromiso y sin presentaciones genéricas.
              </p>
              <Link href="/nosotros#contacto"
                className="inline-block bg-white font-semibold rounded-xl px-8 py-3 transition-opacity hover:opacity-90 text-sm"
                style={{ color: "#122D87" }}>
                Contactar con ventas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Más recursos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <RelatedCard
                key={related.slug}
                href={related.href}
                tag={related.tag}
                title={related.title}
                date={related.date}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleSection({ section }: { section: Article["sections"][number] }) {
  const { ref, visible } = useReveal()
  return (
    <section id={section.id} ref={ref}
      className="mb-16 scroll-mt-28 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">{section.label}</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <h2 className="text-gray-900 font-bold text-2xl mb-6 leading-snug">{section.heading}</h2>
      <div className="space-y-5">
        {section.body.map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-[1.05rem]">{p}</p>
        ))}
      </div>
      {section.items && section.items.length > 0 && (
        <div className="mt-6 space-y-5">
          {section.items.map((item, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: "#f8f9ff" }}>
              <p className="font-bold text-gray-900 mb-2">{item.title}</p>
              <p className="text-gray-600 leading-relaxed text-[1.05rem]">
                {item.body}
                {item.link && (
                  <a href={item.link.href} className="font-semibold underline" style={{ color: "#4361ee" }}>
                    {item.link.text}
                  </a>
                )}
                {item.bodyAfter}
              </p>
              {item.classBullets && item.classBullets.length > 0 && (
                <div className="mt-4 space-y-2">
                  {item.classBullets.map((cb, j) => (
                    <div key={j} className="flex items-start gap-3 rounded-xl px-4 py-3 bg-white border border-gray-100">
                      <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full text-white mt-0.5"
                        style={{ background: cb.badgeColor }}>{cb.badge}</span>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5 w-16 flex-shrink-0">{cb.label}</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{cb.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: "#4361ee" }} />
              <span className="text-gray-600 leading-relaxed text-[1.05rem]">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function ArticleSectionWrapper({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  const { ref, visible } = useReveal()
  return (
    <section id={id} ref={ref}
      className="mb-16 scroll-mt-28 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-bold tracking-widest text-[#4361ee] uppercase">{label}</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      {children}
    </section>
  )
}

function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}
            className="rounded-2xl border transition-all"
            style={{
              borderColor: isOpen ? "#4361ee" : "#e5e7eb",
              borderLeftWidth: isOpen ? 4 : 1,
              background: "#f8f9ff",
            }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold text-gray-900 pr-4 text-sm leading-snug">{item.question}</span>
              <ChevronDown
                size={18}
                className="flex-shrink-0 transition-transform duration-200"
                style={{ color: "#4361ee", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5">
                <p className="text-gray-600 leading-relaxed text-[1.05rem]">{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function RelatedCard({ href, tag, title, date }: { href: string; tag: string; title: string; date: string }) {
  return (
    <Link href={href}
      className="block rounded-2xl p-6 border border-gray-200 hover:border-[#4361ee]/30 hover:shadow-md transition-all group bg-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: "#f0f3ff", color: "#4361ee" }}>{tag}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <p className="text-gray-900 font-semibold leading-snug group-hover:text-[#4361ee] transition-colors">{title}</p>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4361ee] mt-4">
        Leer más <ArrowRight size={12} />
      </span>
    </Link>
  )
}
