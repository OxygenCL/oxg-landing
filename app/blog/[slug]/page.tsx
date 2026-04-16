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
    items?: { title: string; body: string }[]
    bullets?: string[]
  }[]
  faq?: { question: string; answer: string }[]
}

// ─── Article Data ─────────────────────────────────────────────────────────────

const articles: Record<string, Article> = {
  "excel-a-oxyplanner-planta-metalmecanica": {
    slug: "excel-a-oxyplanner-planta-metalmecanica",
    tag: "Artículos",
    title: "De la rigidez del Excel a la agilidad de OxyPlanner: El futuro de la planta metalmecánica",
    date: "20 Mar 2026",
    readTime: "6 min de lectura",
    description: "Cómo transformar la planificación de proyectos complejos en una ventaja competitiva con inteligencia industrial.",
    author: { initials: "AO", name: "Armando Ortiz", role: "Agente de marketing, Oxygen" },
    sections: [
      {
        id: "introduccion",
        label: "Introducción",
        heading: "Cómo transformar la planificación en una ventaja competitiva",
        body: [
          "En la industria metalmecánica, la planificación es el pilar que sostiene cada compromiso de entrega. Por décadas, el Excel ha sido la herramienta por defecto para organizar la producción, pero hoy su flexibilidad se ha convertido en una barrera. El costo real de seguir usando planillas no se mide solo en dinero, sino en pérdida de capacidad de respuesta ante un mercado que no espera.",
          "Gestionar una planta metalmecánica con métodos manuales implica que tus mejores profesionales, planificadores, ingenieros y líderes de operación, dediquen gran parte de su día a limpiar datos en lugar de optimizar procesos. La diferencia con OxyPlanner radica en pasar de un modelo estático a un ecosistema dinámico potenciado por inteligencia artificial.",
        ],
      },
      {
        id: "riesgo",
        label: "El riesgo",
        heading: "El riesgo de planificar en el pasado",
        body: [
          "El planificador en una planta metalmecánica enfrenta una presión única: debe coordinar múltiples órdenes de producción, cada una con rutas, procesos y dependencias técnicas específicas. El Excel obliga a este profesional a realizar un ejercicio de memoria y malabarismo constante. Cada vez que entra un pedido urgente o una máquina crítica se detiene, el plan de trabajo debe ser reconstruido manualmente.",
          "Este re-trabajo genera lo que conocemos como el Efecto Dominó: la incertidumbre de no saber cómo una decisión tomada hoy para priorizar un proyecto afectará los plazos de todos los demás clientes. Es, en esencia, intentar conducir a alta velocidad mirando solo por el retrovisor.",
        ],
      },
      {
        id: "agilidad",
        label: "Agilidad con OxyPlanner",
        heading: "Control en segundos con OxyPlanner",
        body: [
          "OxyPlanner redefine la forma en que interactúas con tu producción. Gracias a su motor de inteligencia diseñado para las restricciones físicas de la industria metalmecánica, la plataforma permite una gestión que el Excel simplemente no puede igualar:",
        ],
        items: [
          {
            title: "Re-planificación mediante Drag & Drop",
            body: "La visualización tipo Gantt en OxyPlanner no es solo una imagen, es una herramienta de mando. Si necesitas mover una Orden de Producción, simplemente la arrastras en la línea de tiempo. El sistema recalcula instantáneamente los impactos en el calendario. Lo que en una planilla requiere horas de ajustes, aquí se resuelve en segundos.",
          },
          {
            title: "Simulación de Escenarios (What-if)",
            body: "Ante la solicitud de un cliente por un cambio de prioridad, OxyPlanner te permite simular el escenario antes de ejecutarlo. El sistema analiza la carga actual de las máquinas y te notifica si la nueva prioridad generará cuellos de botella o retrasos en otros compromisos contractuales.",
          },
          {
            title: "Métricas de Capacidad en Tiempo Real",
            body: "A diferencia del Excel, OxyPlanner ofrece visibilidad inmediata de la capacidad de planta en horas y toneladas, alertas automáticas de equipos en sobrecarga, y seguimiento del avance real de cada proyecto por porcentaje de cumplimiento.",
          },
        ],
      },
      {
        id: "integracion",
        label: "Un solo lenguaje",
        heading: "Un solo lenguaje para toda la operación",
        body: [
          "OxyPlanner elimina la brecha de comunicación entre la oficina técnica y el taller. Al integrarse de forma nativa con herramientas como Strumis o permitir importaciones rápidas desde Excel, asegura que todos los roles estratégicos trabajen sobre la misma realidad digital.",
          "Esta integración reduce drásticamente la carga cognitiva de los equipos, permitiendo que el talento se enfoque en resolver problemas complejos de ingeniería y manufactura, en lugar de perder tiempo en la actualización manual de registros desactualizados.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cómo se adapta OxyPlanner a las restricciones de mi planta?",
        answer: "El sistema requiere la configuración inicial de tus recursos: máquinas, procesos y turnos. Una vez registrada tu realidad física, OxyPlanner utiliza esos datos para calcular tiempos de producción realistas y detectar holguras en la programación.",
      },
      {
        question: "¿Qué rango de tiempo puedo planificar con la herramienta?",
        answer: "OxyPlanner permite visualizar y gestionar el plan de trabajo en rangos flexibles de 2 semanas, 1 mes, 2 meses y hasta 3 meses, adaptándose tanto al control diario como a la proyección estratégica.",
      },
      {
        question: "¿Es difícil migrar mis datos de Excel a OxyPlanner?",
        answer: "No. La plataforma permite importar listas de proyectos y órdenes de producción directamente desde Excel en segundos, o mantener una conexión fluida vía sincronización con Strumis.",
      },
      {
        question: "¿Cómo ayuda OxyPlanner a evitar los cuellos de botella?",
        answer: "A través de gráficos de utilización de equipos que muestran el tiempo disponible versus el utilizado. Si una máquina entra en sobrecarga, el sistema lo destaca visualmente para que el planificador pueda redistribuir la carga a otras líneas de producción.",
      },
      {
        question: "¿Puedo medir la producción en toneladas?",
        answer: "Sí. OxyPlanner entiende el lenguaje de la industria metalmecánica y permite visualizar las métricas de capacidad y avance tanto en horas hombre/máquina como en toneladas procesadas.",
      },
    ],
  },

  "planta-apta-para-ia": {
    slug: "planta-apta-para-ia",
    tag: "Artículos",
    title: "¿Tu planta es apta para la IA? Por qué planificar en el caos es un error",
    date: "27 Feb 2026",
    readTime: "5 min de lectura",
    description: "La IA no hace magia si la realidad de tu planta no está registrada. Preparando la industria para la verdadera transformación digital.",
    author: { initials: "AO", name: "Armando Ortiz", role: "Agente de marketing, Oxygen" },
    sections: [
      {
        id: "introduccion",
        label: "Introducción",
        heading: "La cruda verdad sobre la IA en manufactura",
        body: [
          "En la era de la Industria 4.0, la Inteligencia Artificial promete ser la solución definitiva para la planificación de la producción. Sin embargo, hay una verdad que pocos proveedores te dirán: la IA no hace magia si la realidad de tu planta no está registrada en el sistema.",
          "Si tus datos están desactualizados, son erróneos o dependen de la memoria de un operario, incorporar un software avanzado solo servirá para automatizar el caos e incrementar la ineficiencia.",
        ],
      },
      {
        id: "problema",
        label: "El problema",
        heading: "El gran problema: decidir a ciegas",
        body: [
          "Uno de los mayores dolores de cabeza para los planificadores y líderes de operación es gestionar una planta donde los imprevistos no existen en los registros digitales. Planificar basándose solo en planos, sin claridad real sobre las restricciones físicas o tiempos de ejecución, es un riesgo constante.",
          "Cuando esto ocurre, los sistemas tradicionales y las planillas de Excel se vuelven obsoletos en minutos. Ante un pedido urgente o una máquina detenida, la falta de información obliga al equipo a re-planificar a ciegas, generando un efecto dominó de retrasos.",
        ],
      },
      {
        id: "paso-cero",
        label: "El paso cero",
        heading: "Preparar tu planta antes de implementar IA",
        body: [
          "Para que un Sistema de Planificación y Programación Avanzada (APS) como OxyPlanner calcule con precisión, es obligatorio configurar previamente estos cuatro pilares:",
        ],
        bullets: [
          "Rutas de Fabricación: Definir los pasos y dependencias reales entre procesos de cada pieza.",
          "Disponibilidad de Equipos: Registrar la capacidad real, calendarios y paradas de mantenimiento.",
          "Rendimientos Reales: La IA necesita saber cuánto tarda una máquina hoy, no lo que dice su manual.",
          "Gestión de Materiales: Asegurar que la planificación no se detenga por falta de stock.",
        ],
      },
      {
        id: "control",
        label: "Control estratégico",
        heading: "De la carga manual al control estratégico",
        body: [
          "Una vez que esta base de datos refleja la realidad física, OxyPlanner se convierte en el cerebro de tu operación:",
        ],
        bullets: [
          "Simular escenarios: Evaluar el impacto de una orden urgente antes de tomar la decisión.",
          "Predecir tiempos: Calcular automáticamente la duración exacta de cada orden de producción.",
          "Visualizar carga: Identificar visualmente si un equipo está sobrecargado en horas o toneladas.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Qué se necesita para implementar IA en planificación de producción?",
        answer: "Es requisito haber ingresado previamente los procesos de producción, las máquinas a utilizar y sus rendimientos reales para que la plataforma pueda calcular tiempos precisos.",
      },
      {
        question: "¿Por qué fracasan los sistemas APS en las maestranzas?",
        answer: "El principal motivo es que la realidad física no está registrada. Si el sistema toma decisiones con datos teóricos o erróneos, solo automatiza la ineficiencia.",
      },
      {
        question: "¿Cómo afecta el uso de Excel a la producción?",
        answer: "El Excel es lento y estático. No puede reaccionar a imprevistos en tiempo real, lo que genera retrasos y una alta carga cognitiva para el equipo de planificación.",
      },
      {
        question: "¿Qué diferencia a OxyPlanner de la planificación manual?",
        answer: "OxyPlanner permite simular escenarios (What-if). Puedes ver exactamente qué pedidos se retrasarán si insertas una orden urgente, sin generar cuellos de botella inesperados.",
      },
      {
        question: "¿Cómo ayuda la IA a la utilización de recursos?",
        answer: "Muestra métricas de capacidad real versus utilizada, alertando visualmente sobre la sobrecarga de equipos para maximizar la productividad y minimizar desperdicios.",
      },
    ],
  },

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
}

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

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = articles[slug]

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Artículo no encontrado.</p>
          <Link href="/recursos" className="text-[#4361ee] font-semibold hover:underline">Ver todos los recursos →</Link>
        </div>
      </div>
    )
  }

  // Pick 2 related articles (other than current), by insertion order
  const relatedArticles = Object.values(articles)
    .filter((a) => a.slug !== slug)
    .slice(0, 2)

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
          <Link href="/recursos"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors mb-10">
            <ArrowLeft size={14} />
            Todos los recursos
          </Link>

          <span className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ background: "rgba(67,97,238,0.25)", color: "#a5b4fc" }}>
            {article.tag}
          </span>

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
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Más artículos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <RelatedCard
                key={related.slug}
                href={`/blog/${related.slug}`}
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
              <p className="text-gray-600 leading-relaxed text-[1.05rem]">{item.body}</p>
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
