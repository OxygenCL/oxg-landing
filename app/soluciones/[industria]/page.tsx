"use client"

import { use, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight, Check, BarChart2, Calendar, Zap, Shield, Users, Headphones, TrendingUp, AlertTriangle, Settings2, Layers } from "lucide-react"

/* ─────────────────────────────────────────────
   INDUSTRY DATA
───────────────────────────────────────────── */
const industries = {
  metalmecanica: {
    name: "Metalmecánica",
    chip: "Soluciones para la industria Metalmecánica",
    subTypes: ["Talleres CNC", "Maestranzas", "Estructuras metálicas", "Herrería industrial", "Conformado de metales"],
    accent: "metalmecánica.",
    headline: ["Menos fallas, más piezas. IA industrial para"],
    description:
      "Controla el mantenimiento de tus máquinas y planifica la producción con datos reales. Sin papel, sin Excel, sin sorpresas en planta.",
    painPoints: [
      { icon: AlertTriangle, title: "Sin historial, cada falla es una sorpresa", description: "Tornos, fresadoras y centros de mecanizado sin historial documentado. Cuando algo falla, nadie sabe cuándo fue el último mantenimiento." },
      { icon: Calendar, title: "OTs en papel que nadie puede recuperar", description: "Órdenes de trabajo en cuadernos compartidos. El registro del trabajo realizado desaparece cuando cambia el técnico." },
      { icon: BarChart2, title: "Costos invisibles por activo", description: "Sabes cuánto gastaste en repuestos pero no en qué máquina, ni por qué falló, ni cuánto le costó realmente a la empresa." },
      { icon: Layers, title: "Planificación de producción en Excel", description: "Órdenes de fabricación programadas manualmente y rehechadas cada vez que hay un imprevisto en planta." },
      { icon: Settings2, title: "Cuellos de botella sin datos", description: "Fechas de entrega comprometidas sin considerar capacidad real. El cuello de botella solo se descubre cuando ya es tarde." },
      { icon: Users, title: "El conocimiento se va con el técnico", description: "El estado de los equipos está en la cabeza de una o dos personas. Cuando se van, la operación queda expuesta." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo en días", description: "No meses. Configuramos OxyPulse con tus activos y contexto operacional desde el día 1." },
      { icon: Headphones, title: "Advisory incluido", description: "Diagnóstico en planta, implementación acompañada y revisión de KPIs cada 30 días." },
      { icon: Layers, title: "OxyPlanner integrado", description: "El único vertical donde OxyPulse y OxyPlanner trabajan juntos: mantenimiento y producción conectados." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "+93% cumplimiento preventivo en el primer trimestre. Sin excepción." },
    ],
    oxypulseFeatures: [
      "Ficha digital por máquina: historial completo de intervenciones, fechas y costos.",
      "Planes preventivos por horas de uso, ciclos o calendario.",
      "Dashboard MTBF, MTTR, disponibilidad y cumplimiento preventivo por activo.",
      "OTs digitales con firma del técnico desde tablet o PC en planta.",
    ],
    oxyplannerFeatures: [
      "Secuenciación automática de órdenes de fabricación por máquina y turno.",
      "Reprogramación dinámica con drag & drop en el Gantt.",
      "Simulación de escenarios antes de comprometerte con fechas de entrega.",
      "Integración nativa con Strumis para talleres de acero estructural.",
    ],
    kpis: [
      { value: "+93%", label: "Cumplimiento preventivo" },
      { value: "38 min", label: "Tiempo de resp. OT" },
      { value: "−61%", label: "Fallas no planificadas" },
    ],
    quote: "Tenía 60 equipos sin historial y el mantenimiento dependía de una sola persona. Con OxyPulse organizamos todo en semanas: planes preventivos, historial por máquina y costo real de cada activo.",
    author: "Jorge Huenul",
    role: "Dueño de Maestranza",
    otherLinks: [
      { slug: "mineria", name: "Minería" },
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "logistica", name: "Logística" },
      { slug: "forestal", name: "Forestal" },
    ],
  },
  alimentos: {
    name: "Alimentos y Bebidas",
    chip: "Soluciones para la industria de Alimentos y Bebidas",
    subTypes: ["Embotelladoras y envasadoras", "Lácteos", "Carnes y embutidos", "Cervecería", "Panadería industrial", "Azucareras y molineras"],
    accent: "no se recupera.",
    headline: ["Una línea parada en temporada alta"],
    description: "OxyPulse mantiene tus líneas de producción operativas y convierte el historial de mantenimiento en datos reales para tomar mejores decisiones.",
    painPoints: [
      { icon: AlertTriangle, title: "Temporada alta sin margen de error", description: "Las ventanas de entrega al retail están comprometidas con meses de anticipación. Una línea parada puede significar perder contratos y penalizaciones." },
      { icon: Shield, title: "Sin trazabilidad, los errores se repiten", description: "Sin registros digitales, cada falla es un misterio. No hay forma de saber qué se hizo, cuándo ni quién lo hizo, y el mismo problema vuelve a ocurrir." },
      { icon: Calendar, title: "CIP y mantenimiento descoordinados", description: "La sanitización y el mantenimiento se coordinan por teléfono. Una desincronización puede contaminar el producto o forzar el rechazo de un lote entero." },
      { icon: BarChart2, title: "Sin visibilidad de disponibilidad por línea", description: "No sabes en tiempo real qué línea está operativa, cuál tiene mantenimiento pendiente y cuál tiene riesgo de falla." },
      { icon: Layers, title: "Sistemas de frío sin seguimiento", description: "Compresores y cámaras frigoríficas sin planes preventivos ni historial. Una falla compromete el producto y la cadena de frío completa." },
      { icon: Users, title: "El conocimiento técnico se pierde entre turnos", description: "Cada turno opera con su propio criterio. Sin registro digital no hay continuidad en la gestión de equipos críticos." },
    ],
    benefits: [
      { icon: Shield, title: "Trazabilidad completa por línea", description: "Cada OT con responsable, fecha, evidencia fotográfica y firma digital. Disponible en segundos." },
      { icon: Zap, title: "Operativo en días", description: "Configuramos OxyPulse para tus líneas desde el primer día." },
      { icon: Calendar, title: "CIP integrado al calendario", description: "Visibilidad conjunta de mantenimiento y sanitización para evitar conflictos y rechazos de lote." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "+90% cumplimiento preventivo y menos fallas en temporada alta." },
    ],
    oxypulseFeatures: [
      "Planes preventivos por línea ajustados al ciclo productivo y criticidad de cada componente.",
      "Trazabilidad completa: responsable, fecha, evidencia fotográfica y firma digital en cada OT.",
      "Criticidad por inocuidad: prioriza activos por su impacto en seguridad alimentaria.",
      "Dashboard de disponibilidad por línea en tiempo real para el jefe de planta.",
    ],
    oxyplannerFeatures: [
      "Backlog de trabajos priorizado por criticidad operacional e inocuidad.",
      "Gestión de repuestos críticos con stock mínimo y alertas automáticas.",
      "Coordinación de mantenimiento preventivo sin interferir con el plan de producción.",
      "Reportes de cumplimiento preventivo y costo de mantenimiento por línea.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "<45 min", label: "Resp. ante falla" },
      { value: "−50%", label: "Fallas en temporada" },
    ],
    quote: "En alimentos no puedes improvisar. Con OxyPulse tenemos el historial completo de cada equipo y el calendario de preventivos al día. Ya no hay sorpresas.",
    author: "Walter Aguirre",
    role: "Gerente de Mantenimiento",
    otherLinks: [{ slug: "metalmecanica", name: "Metalmecánico" }, { slug: "mineria", name: "Minería" }, { slug: "logistica", name: "Logística" }, { slug: "forestal", name: "Forestal" }],
  },
  mineria: {
    name: "Minería",
    chip: "Soluciones para la industria Minera",
    subTypes: ["Minería metálica", "Minería no metálica", "Gran minería", "Minería mediana", "Plantas de proceso"],
    accent: "cuesta más de lo que crees.",
    headline: ["Cada hora parada en minería"],
    description: "OxyPulse gestiona el mantenimiento de tus equipos móviles, líneas productivas y sistemas auxiliares para que la detención no planificada deje de ser la norma.",
    painPoints: [
      { icon: AlertTriangle, title: "Una hora parada puede costar USD $50.000+", description: "Una correa transportadora o una chancadora fuera de servicio detiene toda la línea. Detectar la falla antes de que ocurra no es opcional. Es rentable." },
      { icon: Layers, title: "Repuestos críticos a días de distancia", description: "Las faenas remotas tienen stock limitado. Sin gestión de repuestos, la decisión de qué tener en inventario es un juego de azar." },
      { icon: Users, title: "Turnos 24/7 sin trazabilidad entre cambios", description: "Operaciones en turnos 7x7 o 4x3 con handovers continuos. Sin registro digital, el técnico del siguiente turno opera a ciegas." },
      { icon: Settings2, title: "Equipos móviles y líneas sin historial unificado", description: "Camiones, chancadoras, molinos y correas gestionados en planillas separadas o de memoria." },
      { icon: BarChart2, title: "KPIs de mantenimiento desconocidos", description: "No sabes tu MTBF real, tu disponibilidad por activo ni tu cumplimiento preventivo. Las decisiones se toman sin datos." },
      { icon: Calendar, title: "PM imposible de coordinar en faena remota", description: "Programar mantenimiento sin datos de condición, en operaciones 24/7, coordinado por WhatsApp." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo en semanas", description: "Configurado para tus equipos y contexto de faena, sin meses de implementación." },
      { icon: Shield, title: "Historial siempre disponible", description: "Registros completos de cada intervención, accesibles en segundos desde cualquier dispositivo." },
      { icon: Layers, title: "Multi-faena desde un solo panel", description: "Visibilidad centralizada de todas las operaciones en tiempo real." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "+90% cumplimiento preventivo y reducción significativa de fallas no planificadas." },
    ],
    oxypulseFeatures: [
      "Planes preventivos por criticidad: un molino SAG no se gestiona igual que una bomba auxiliar.",
      "OTs digitales desde el celular en faena, con evidencia fotográfica y firma digital.",
      "Gestión de repuestos críticos con stock mínimo configurable y alertas de reposición.",
      "Dashboard multi-faena: disponibilidad, MTBF, MTTR y cumplimiento por activo y área.",
    ],
    oxyplannerFeatures: [
      "Backlog de trabajos priorizado por criticidad operacional y disponibilidad de recursos.",
      "Planificación de mantenimiento mayor con coordinación de equipos y contratistas.",
      "Registro completo por turno: qué se hizo, quién lo hizo y cuál fue el resultado.",
      "Reportes de disponibilidad y confiabilidad de flota y líneas productivas.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "−65%", label: "Fallas no planificadas" },
      { value: "<45 min", label: "Tiempo de resp. OT" },
    ],
    quote: "En minería, cada hora de un camión parado son miles de dólares. Con OxyPulse por primera vez tenemos el historial de cada activo y los preventivos al día sin depender de planillas.",
    author: "Equipo de Mantenimiento",
    role: "Planta Minera",
    otherLinks: [{ slug: "metalmecanica", name: "Metalmecánico" }, { slug: "alimentos", name: "Alimentos y Bebidas" }, { slug: "logistica", name: "Logística" }, { slug: "forestal", name: "Forestal" }],
  },
  logistica: {
    name: "Logística",
    chip: "Soluciones para la industria Logística",
    subTypes: ["Transporte terrestre", "Carga refrigerada", "Centros de distribución", "Transporte de pasajeros", "Puertos y terminales", "Gestión de residuos"],
    accent: "es un cliente incumplido.",
    headline: ["En logística, un activo parado"],
    description: "OxyPulse gestiona el mantenimiento de tu flota, tus centros de distribución y tus equipos de frío para que la cadena de despacho nunca se detenga por una falla no planificada.",
    painPoints: [
      { icon: AlertTriangle, title: "Un montacargas parado bloquea toda la operación", description: "En ventana nocturna de un CD, un equipo fuera de servicio no es un problema de mantenimiento: es un problema de despacho con penalidades directas." },
      { icon: Layers, title: "Flota dispersa, visibilidad cero", description: "Camiones en múltiples rutas y bases gestionados en planillas. Sin centralización, el mantenimiento es reactivo y el costo de emergencia es 3-5 veces mayor." },
      { icon: Shield, title: "La cadena de frío no admite fallas", description: "Una unidad de frío que falla en ruta puede significar la pérdida de toda la carga, multas contractuales y daño reputacional." },
      { icon: Calendar, title: "Revisiones técnicas y permisos vencidos", description: "Sin alertas automáticas, los vehículos circulan con revisión técnica vencida. Un problema operacional que se puede evitar fácilmente." },
      { icon: BarChart2, title: "Costo de emergencia 3-5x mayor", description: "Sin preventivos, el correctivo de emergencia multiplica el costo. Y nadie tiene los datos para demostrarlo a la dirección." },
      { icon: Users, title: "El conductor como única fuente de información", description: "Si el conductor no reporta el problema, no existe. Sin sistema, la condición del equipo es completamente invisible." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo en días", description: "Configuramos OxyPulse para tu flota y todos tus sitios en tiempo récord." },
      { icon: Layers, title: "Gestión multi-sitio", description: "Todos tus CDs, bases de flota y depósitos en una sola plataforma." },
      { icon: Shield, title: "Cadena de frío controlada", description: "Planes preventivos específicos para unidades embarcadas y cámaras de CD." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: ">95% disponibilidad de flota y menos fallas en ruta desde el primer trimestre." },
    ],
    oxypulseFeatures: [
      "Gestión multi-sitio: todos tus CDs, bases de flota y depósitos en una sola plataforma.",
      "Planes preventivos diferenciados por tipo de activo: montacargas, camiones, equipos de frío.",
      "Control de flota vehicular: km, horas de motor, revisiones técnicas y permisos con alertas de vencimiento.",
      "Indicadores de disponibilidad en tiempo real por sitio y tipo de activo.",
    ],
    oxyplannerFeatures: [
      "Backlog de mantenimiento priorizado por impacto operacional en el SLA de despacho.",
      "Planificación de servicios por kilometraje, tiempo y condición observada.",
      "Registro de intervenciones accesible desde el celular para conductores y técnicos.",
      "Reportes de disponibilidad, costo por km y cumplimiento preventivo por base.",
    ],
    kpis: [
      { value: ">95%", label: "Disponibilidad de flota" },
      { value: "−60%", label: "Fallas en ruta" },
      { value: ">88%", label: "Cumplimiento preventivo" },
    ],
    quote: "Antes gestionábamos 80 camiones con una planilla por base. Con OxyPulse tenemos todo centralizado: preventivos al día, alertas de vencimiento y el historial de cada unidad en un clic.",
    author: "Rodrigo Sepúlveda",
    role: "Jefe de Mantenimiento de Flota",
    otherLinks: [{ slug: "metalmecanica", name: "Metalmecánico" }, { slug: "mineria", name: "Minería" }, { slug: "alimentos", name: "Alimentos y Bebidas" }, { slug: "forestal", name: "Forestal" }],
  },
  forestal: {
    name: "Forestal",
    chip: "Soluciones para la industria Forestal",
    subTypes: ["Plantas de celulosa", "Plantas de papel", "Aserraderos", "Tableros y MDF", "Campo forestal"],
    accent: "para la industria forestal.",
    headline: ["Proceso continuo, activos exigentes. OxyPulse"],
    description:
      "OxyPulse gestiona el mantenimiento de plantas de celulosa, papel, aserraderos y tableros. En proceso continuo, una parada no planificada puede costar cientos de miles de dólares por hora.",
    painPoints: [
      { icon: AlertTriangle, title: "Una parada puede costar USD $300.000 por hora", description: "En proceso continuo, una falla en el refinador, la máquina de papel o la sierra principal no es un incidente: es una catástrofe financiera que se mide en horas." },
      { icon: Settings2, title: "Historial de activos disperso o inexistente", description: "Décadas de intervenciones en papel, múltiples sistemas o en la memoria del personal. Cuando falla, no hay historial para analizar la causa raíz." },
      { icon: Calendar, title: "El shutdown llega sin el backlog listo", description: "La gran parada anual se gestiona con planillas y correos. Los trabajos no están priorizados ni asignados cuando empieza." },
      { icon: Layers, title: "Contratistas que no dejan registro", description: "Durante el shutdown entran decenas de contratistas. Sin sistema, nadie sabe qué se hizo, a qué costo y con qué resultado real." },
      { icon: BarChart2, title: "Criticidad sin documentar: todos los activos reciben igual atención", description: "Sin jerarquía de criticidad, una bomba auxiliar recibe la misma atención que la caldera de recuperación o la sierra de cabeza." },
      { icon: Users, title: "Conocimiento concentrado en personas clave", description: "Los técnicos con 20 años conocen cada equipo de memoria. Cuando se jubilan, el sistema experto se va con ellos. La próxima falla nadie la anticipó." },
    ],
    benefits: [
      { icon: Zap, title: "Implementación por fases", description: "Empezamos con tus activos más críticos y expandimos sin interrumpir el proceso continuo." },
      { icon: Shield, title: "Trazabilidad total de contratistas", description: "Cada OT del shutdown con firma, materiales y tiempo real de ejecución, sin excepción." },
      { icon: Calendar, title: "Shutdown más eficiente", description: "El backlog del año llega ordenado, priorizado y asignado cuando empieza la parada." },
      { icon: TrendingUp, title: "Menos paradas no planificadas", description: "Historial por activo y PM al día reducen los eventos catastróficos entre paradas programadas." },
    ],
    oxypulseFeatures: [
      "Planes preventivos digitales por activo con cumplimiento trazado y notificación automática.",
      "Backlog visible y priorizado por criticidad de activo y urgencia operacional.",
      "Registro de parámetros operacionales (temperatura, presión, vibración) en cada OT ejecutada.",
      "Dashboard de disponibilidad, MTBF y MTTR por activo crítico y área de planta.",
    ],
    oxyplannerFeatures: [
      "Planificación de shutdown: todos los trabajos asignados por equipo y contratista con avance en tiempo real.",
      "Gestión de contratistas: OT con firma obligatoria y registro fotográfico para cada intervención.",
      "Matriz de criticidad configurable por activo: la cola de OT se prioriza automáticamente.",
      "Historial completo por activo: intervenciones, costos, parámetros y responsables en un solo lugar.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "−50%", label: "Paradas no planificadas" },
      { value: "+30%", label: "Eficiencia de shutdown" },
    ],
    quote: "Antes del shutdown teníamos cientos de trabajos dispersos en correos y planillas. Con OxyPulse el backlog llega ordenado, priorizado y asignado. El shutdown de este año fue el más eficiente en años.",
    author: "Felipe Contreras",
    role: "Superintendente de Mantenimiento",
    otherLinks: [
      { slug: "metalmecanica", name: "Metalmecánico" },
      { slug: "mineria", name: "Minería" },
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "logistica", name: "Logística" },
    ],
  },
  agricola: {
    name: "Agrícola",
    chip: "Soluciones para la industria Agrícola",
    subTypes: ["Fruticultura", "Viticultura", "Horticultura", "Ganadería", "Cereales y oleaginosas", "Packing agroindustrial"],
    accent: "Mantenimiento para la agroindustria latinoamericana.",
    headline: ["Temporada sin fallas."],
    description: "Cuando tu cosechadora falla en plena temporada, el costo no es solo la reparación: es la cosecha. Llega a la temporada alta preparado, con el historial de cada activo listo.",
    painPoints: [
      { icon: AlertTriangle, title: "Falla en temporada = cosecha perdida", description: "Tu cosechadora más crítica falla en plena temporada. El costo no es solo la reparación: es la ventana de cosecha que se cierra sin poder recuperarse." },
      { icon: Calendar, title: "Los PM se posponen en temporada alta", description: "La presión productiva deja los preventivos para después. En temporada, el costo de reparación es 3-5 veces mayor que el de mantención." },
      { icon: Users, title: "El mecánico temporal no deja registro", description: "El conocimiento se pierde entre temporada y temporada. Cada año empiezas desde cero sin historial documentado de los equipos." },
      { icon: Layers, title: "Sistemas de riego sin ningún seguimiento", description: "Bombas, filtros y goteros sin historial de mantención ni alertas. Una falla en riego puede comprometer toda una temporada de producción." },
      { icon: Settings2, title: "Packing con equipos de alta rotación sin PM", description: "Calibradoras y selladoras con mantenimiento solo correctivo. Una falla durante la temporada paraliza el despacho de exportación." },
      { icon: BarChart2, title: "Costos ocultos por activo", description: "No sabes cuánto gastas en mantener cada tractor, cada bomba, cada línea de packing, hasta que llega la factura de la reparación mayor." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo en días", description: "Configuramos OxyPulse para tus activos de campo, riego y packing desde el primer día." },
      { icon: Calendar, title: "Inter-temporada bien aprovechada", description: "El backlog del año llega ordenado para ejecutar el mantenimiento mayor cuando la planta está quieta." },
      { icon: Users, title: "El registro queda en el sistema", description: "OT con firma y evidencia fotográfica. El historial existe aunque cambie el personal de temporada." },
      { icon: TrendingUp, title: "Resultados desde la primera temporada", description: "Menos fallas en temporada alta y costo real de mantenimiento visible por activo." },
    ],
    oxypulseFeatures: [
      "Ficha digital por activo: tractor, cosechadora, bomba de riego, calibradora de packing.",
      "Plan preventivo con alerta automática por fecha o parámetro operacional (horas motor, km).",
      "Planificación del mantenimiento mayor en la inter-temporada con backlog ordenado por prioridad.",
      "OT con firma y evidencia fotográfica: el registro existe aunque cambie el personal.",
    ],
    oxyplannerFeatures: [
      "Gestión de repuestos críticos con stock mínimo y alertas antes de quedarse sin piezas clave.",
      "Programación de mantenimiento de cadena de frío con alertas de vencimiento.",
      "Coordinación de mantención de flota de campo y packing desde un solo panel.",
      "Reportes de costo por activo: repuestos, HH internas y servicios externos.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "−60%", label: "Fallas en temporada" },
      { value: "100%", label: "Historial por activo" },
    ],
    quote: "Llegábamos a cada temporada sin saber el estado real de los equipos. Con OxyPulse el mantenimiento mayor se hace en la inter-temporada y cuando empieza la cosecha, sabemos qué tiene cada activo.",
    author: "Cristián Morales",
    role: "Jefe de Maquinaria Agrícola",
    otherLinks: [
      { slug: "metalmecanica", name: "Metalmecánico" },
      { slug: "mineria", name: "Minería" },
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "logistica", name: "Logística" },
    ],
  },
  construccion: {
    name: "Construcción",
    chip: "Soluciones para la industria de la Construcción",
    subTypes: ["Constructoras civiles", "Concesionarias viales", "Obras de infraestructura", "Constructoras inmobiliarias", "Plantas de Hormigón"],
    accent: "cuesta plazos.",
    headline: ["La maquinaria parada en obra"],
    description:
      "OxyPulse centraliza el mantenimiento de tu flota de maquinaria pesada, equipos de obra y sistemas de infraestructura. Menos correctivo, plazos cumplidos y revisiones técnicas al día en todas tus faenas.",
    painPoints: [
      { icon: AlertTriangle, title: "La grúa falla el día del hormigonado", description: "En construcción, el tiempo es el recurso más crítico. Una falla de maquinaria pesada en el momento equivocado puede retrasar el cronograma semanas y activar penalidades contractuales." },
      { icon: Shield, title: "Revisión técnica vencida = paralización de faena", description: "Un equipo sin revisión técnica vigente puede ser retenido en inspección. Sin alertas automáticas, el control depende de que alguien recuerde fechas entre planillas." },
      { icon: Layers, title: "Maquinaria en múltiples obras sin visibilidad central", description: "Excavadoras, grúas, minicargadores y compactadoras en distintas faenas gestionadas con planillas separadas. Sin centralización, el mantenimiento es reactivo y costoso." },
      { icon: Users, title: "El operador como única fuente de información", description: "Si el operador no reporta el ruido extraño, el problema no existe. Sin sistema de reporte digital, la condición del equipo es completamente invisible." },
      { icon: Settings2, title: "Repuestos en bodega sin inventario real", description: "Stock de repuestos gestionado por memoria o planillas desactualizadas. El correctivo de emergencia siempre espera por piezas que debían estar disponibles." },
      { icon: BarChart2, title: "Costo de mantenimiento imposible de auditar", description: "Sin trazabilidad por activo, es imposible saber cuánto costó mantener cada equipo ni justificar la reposición ante la dirección de obra." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo por faena", description: "Configura OxyPulse para cada proyecto activo con su propia flota y equipo técnico." },
      { icon: Shield, title: "Revisiones técnicas controladas", description: "Alertas automáticas antes del vencimiento de revisiones, permisos y certificaciones." },
      { icon: Layers, title: "Visibilidad multi-faena", description: "Toda la flota de maquinaria en todas las obras en un solo panel en tiempo real." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "+88% cumplimiento preventivo y reducción de paradas no planificadas desde el primer trimestre." },
    ],
    oxypulseFeatures: [
      "Ficha digital por activo: grúa, excavadora, compactadora, compresores y equipos de apoyo.",
      "Control de revisiones técnicas y certificaciones con alertas automáticas de vencimiento.",
      "OTs digitales desde el celular en faena: el operador reporta y el técnico confirma.",
      "Gestión multi-faena: toda la flota centralizada con visibilidad por proyecto y tipo de activo.",
    ],
    oxyplannerFeatures: [
      "Backlog de mantenimiento priorizado por impacto en el cronograma de obra.",
      "Planificación de PM ajustada a horómetros y calendario sin interferir con la programación de obra.",
      "Gestión de repuestos críticos con stock mínimo y alertas de reposición.",
      "Reportes de disponibilidad y costo de mantenimiento por equipo y por proyecto.",
    ],
    kpis: [
      { value: ">88%", label: "Cumplimiento preventivo" },
      { value: "−55%", label: "Fallas no planificadas" },
      { value: "100%", label: "Revisiones al día" },
    ],
    quote: "",
    author: "",
    role: "",
    otherLinks: [
      { slug: "metalmecanica", name: "Metalmecánico" },
      { slug: "mineria", name: "Minería" },
      { slug: "energia", name: "Energía" },
      { slug: "manufactura", name: "Manufacturera" },
    ],
  },
  energia: {
    name: "Energía",
    chip: "Soluciones para el sector Energético",
    subTypes: ["Generación solar y eólica", "Hidroeléctricas", "Petróleo y Gas", "Sanitarias y agua potable", "Transmisión eléctrica", "Cogeneración industrial"],
    accent: "en activos críticos de generación.",
    headline: ["Una falla no planificada cuesta millones"],
    description:
      "OxyPulse gestiona el mantenimiento de plantas generadoras, parques renovables, subestaciones y activos de petróleo y gas. Trazabilidad total y cero dependencia de planillas.",
    painPoints: [
      { icon: AlertTriangle, title: "Una parada no programada puede costar millones", description: "En generación eléctrica o transmisión, una salida de servicio no planificada implica penalidades contractuales y daño reputacional inmediato." },
      { icon: Shield, title: "Sin trazabilidad, el historial vive en carpetas", description: "Intervenciones, calibraciones y trabajos de contratistas registrados en papel o Excel. Cuando se necesita la información, no está disponible." },
      { icon: Layers, title: "Activos en sitios remotos sin trazabilidad", description: "Parques solares, subestaciones y plataformas O&G con técnicos que registran en papel. El historial se pierde o llega tarde al sistema central." },
      { icon: Calendar, title: "Mantenimiento predictivo solo en el papel", description: "Los planes PdM existen en Excel pero nadie los sigue con datos reales. Las inspecciones de condición no se documentan y el análisis de causa raíz se hace de memoria." },
      { icon: Users, title: "Operaciones 24/7 sin continuidad de registros entre turnos", description: "En plantas de generación continua, el handover entre turnos se hace verbalmente. Sin registro digital, la información crítica sobre el estado de activos no existe." },
      { icon: Settings2, title: "Contratistas especializados sin trazabilidad de trabajos", description: "Mantenimientos mayores ejecutados por OEMs y contratistas sin integración al sistema. El historial del activo queda en el archivo del proveedor, no en el tuyo." },
    ],
    benefits: [
      { icon: Zap, title: "Implementación sin interrumpir operaciones", description: "OxyPulse se configura para tus activos críticos y se integra al flujo operacional sin paradas de planta." },
      { icon: Shield, title: "Historial completo siempre disponible", description: "Intervenciones, calibraciones y trabajos de contratistas con firma digital, accesibles en segundos desde cualquier dispositivo." },
      { icon: Layers, title: "Multi-sitio desde un panel", description: "Todos tus activos: parques renovables, subestaciones y plantas con visibilidad centralizada." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: ">92% cumplimiento preventivo y reducción de eventos no planificados desde el primer trimestre." },
    ],
    oxypulseFeatures: [
      "Planes preventivos por criticidad: un transformador de potencia no se gestiona igual que un auxiliar.",
      "Registro de parámetros de condición (temperatura, vibración, aislamiento) en cada OT.",
      "Trazabilidad de contratistas OEM: trabajos con firma digital, materiales y tiempo de ejecución.",
      "Dashboard de disponibilidad, MTBF y cumplimiento preventivo por activo y sitio.",
    ],
    oxyplannerFeatures: [
      "Planificación de mantenimientos mayores con coordinación de contratistas especializados.",
      "Gestión de repuestos críticos con lead time configurable y stock mínimo por sitio.",
      "Registro multi-turno: cada handover documentado con estado de activos y trabajos en curso.",
      "Reportes de disponibilidad del sistema y cumplimiento preventivo por activo y área.",
    ],
    kpis: [
      { value: ">92%", label: "Cumplimiento preventivo" },
      { value: "−60%", label: "Eventos no planificados" },
      { value: "100%", label: "Trazabilidad digital" },
    ],
    quote: "Con activos en cuatro sitios distintos necesitábamos más que planillas. OxyPulse nos dio trazabilidad completa y hoy cada intervención queda registrada, sin depender de carpetas ni archivos locales.",
    author: "Patricio Vega",
    role: "Gerente de Operaciones y Mantenimiento",
    otherLinks: [
      { slug: "mineria", name: "Minería" },
      { slug: "construccion", name: "Construcción" },
      { slug: "manufactura", name: "Manufacturera" },
      { slug: "forestal", name: "Forestal" },
    ],
  },
  pesquero: {
    name: "Pesquero y Acuicultura",
    chip: "Soluciones para la industria Pesquera y Acuícola",
    subTypes: ["Flota pesquera industrial", "Salmonicultura", "Acuicultura de bivalvos", "Plantas de proceso", "Wellboats y servicios marítimos"],
    accent: "en cosecha acuícola.",
    headline: ["Una falla de equipo puede costarte toda la"],
    description:
      "OxyPulse gestiona el mantenimiento de embarcaciones, jaulas de cultivo, plantas de proceso y equipos de frío. Porque en acuicultura y pesca industrial, el margen para el error es casi cero.",
    painPoints: [
      { icon: AlertTriangle, title: "Una bomba de oxígeno que falla = mortalidad masiva", description: "En acuicultura, el equipo de soporte de vida es activo crítico nivel 1. Una falla del sistema de aireación sin mantenimiento preventivo puede significar pérdidas millonarias en horas." },
      { icon: Settings2, title: "La corrosión marina no espera el próximo trimestre", description: "Los activos en ambiente marino y salobre tienen ciclos de degradación mucho más agresivos. Sin PM adaptado a condición marina, el correctivo siempre llega demasiado tarde." },
      { icon: Calendar, title: "La ventana de cosecha no espera al técnico", description: "En acuicultura, las ventanas de cosecha son biológicas y no negociables. Una falla de equipo en ese momento no tiene recuperación posible." },
      { icon: Layers, title: "Embarcaciones y balsas-jaula sin historial digital", description: "Motores de embarcaciones, sistemas de redes y equipos de fondeo gestionados de memoria. Sin historial, la falla no se puede anticipar ni documentar para el seguro." },
      { icon: Shield, title: "Sin registros, el historial se pierde", description: "Sin trazabilidad digital, cada intervención queda en papel o en la memoria del técnico. Cuando se necesita la información, ya no está." },
      { icon: Users, title: "El técnico de temporada no deja registro", description: "En industria pesquera y acuícola, el personal técnico rota con las temporadas. Sin sistema digital, el historial se va con el técnico al finalizar el contrato." },
    ],
    benefits: [
      { icon: Zap, title: "PM adaptado a entorno marino", description: "Planes preventivos con frecuencias ajustadas a la agresividad del ambiente salobre y marino." },
      { icon: Shield, title: "Historial siempre disponible", description: "Historial completo de intervenciones accesible en segundos desde cualquier dispositivo." },
      { icon: Calendar, title: "Temporada sin sorpresas", description: "El mantenimiento mayor se ejecuta en la inter-temporada para que la cosecha empiece sin fallas pendientes." },
      { icon: TrendingUp, title: "Resultados desde la primera temporada", description: "Menos eventos de mortalidad por falla técnica y costo de mantenimiento visible por activo y sitio." },
    ],
    oxypulseFeatures: [
      "Ficha digital por activo: motor de embarcación, aireador, bomba, sistema de redes, cámara de frío.",
      "Planes preventivos adaptados a condición marina: frecuencias por horas de uso y estado observado.",
      "OTs con evidencia fotográfica desde tablet en barcaza o centro de cultivo.",
      "Dashboard de disponibilidad y alertas críticas por sitio: centro de cultivo, planta de proceso, flota.",
    ],
    oxyplannerFeatures: [
      "Backlog priorizado por criticidad: los equipos de soporte de vida al tope siempre.",
      "Planificación de mantenimiento mayor en inter-temporada con backlog ordenado.",
      "Gestión de repuestos críticos con stock mínimo y alertas antes del inicio de temporada.",
      "Reportes de cumplimiento preventivo, costo por activo y trazabilidad de intervenciones.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "−65%", label: "Fallas críticas en temporada" },
      { value: "100%", label: "Trazabilidad de activos" },
    ],
    quote: "En acuicultura no hay segunda oportunidad cuando falla un equipo en cosecha. Con OxyPulse organizamos los preventivos en la inter-temporada y llegamos con todos los activos críticos revisados.",
    author: "Álvaro Núñez",
    role: "Gerente de Operaciones Acuícolas",
    otherLinks: [
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "logistica", name: "Logística" },
      { slug: "energia", name: "Energía" },
      { slug: "agricola", name: "Agrícola" },
    ],
  },
  manufactura: {
    name: "Manufacturera",
    chip: "Soluciones para la industria Manufacturera",
    subTypes: ["Plásticos e inyección", "Embalaje y packaging", "Química de proceso", "Textil industrial", "Caucho y neumáticos"],
    accent: "en línea de producción.",
    headline: ["El costo de cada hora parada"],
    description:
      "OxyPulse digitaliza el mantenimiento preventivo de tus líneas de producción, moldeo, extrusión y ensamble. Menos correctivo, mejor OEE y trazabilidad total de cada intervención.",
    painPoints: [
      { icon: BarChart2, title: "OEE comprometido por mantenimiento reactivo", description: "Las pérdidas de disponibilidad, rendimiento y calidad vinculadas a fallas no planificadas son el principal destructor de OEE en plantas de manufactura. Sin datos, el problema no tiene diagnóstico." },
      { icon: Settings2, title: "Línea de inyección o extrusión sin historial documentado", description: "Las máquinas de moldeo, extrusoras y prensas tienen ciclos de desgaste predecibles, pero solo si se registran. Sin historial, cada falla es una sorpresa costosa." },
      { icon: Users, title: "Cambio de turno sin transferencia de información técnica", description: "El técnico del turno noche no sabe que la máquina del turno mañana tiene vibración anormal. Sin registro digital, la información crítica no viaja entre turnos." },
      { icon: Layers, title: "Repuestos críticos con stockout frecuente", description: "Sin gestión de repuestos ligada al plan de mantenimiento, el paro correctivo siempre espera piezas. El costo de urgencia es 3-5 veces el costo del stock preventivo." },
      { icon: AlertTriangle, title: "Sin métricas reales de disponibilidad por línea", description: "No conoces tu disponibilidad real por línea, tu MTBF por activo ni tu costo de mantenimiento por unidad producida. Sin datos, no hay mejora posible." },
      { icon: Calendar, title: "PM documentado en papel que nadie consulta", description: "Los planes preventivos existen en carpetas físicas o Excel desactualizados. El técnico trabaja con lo que recuerda, no con lo que debe hacer." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo en días", description: "Configuramos OxyPulse para tus líneas y activos prioritarios desde el primer día." },
      { icon: BarChart2, title: "OEE visible y mejorable", description: "Disponibilidad, cumplimiento preventivo y MTBF por línea desde el primer mes." },
      { icon: Layers, title: "Gestión de repuestos integrada", description: "Stock mínimo por activo crítico con alertas de reposición antes del stockout." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "+90% cumplimiento preventivo y reducción significativa de paradas correctivas." },
    ],
    oxypulseFeatures: [
      "Ficha digital por máquina: extrusora, prensa, inyectora, línea de ensamble con historial completo.",
      "Planes preventivos por ciclos de producción, horas de uso y calendario.",
      "OTs digitales con firma del técnico: el registro existe aunque cambie el operador.",
      "Dashboard de disponibilidad, MTBF y cumplimiento preventivo por línea y turno.",
    ],
    oxyplannerFeatures: [
      "Backlog de mantenimiento priorizado por impacto en OEE y disponibilidad de línea.",
      "Gestión de repuestos con stock mínimo configurable y alertas automáticas de reposición.",
      "Coordinación de mantenimiento preventivo sin interferir con el plan de producción.",
      "Reportes de costo de mantenimiento por línea, por activo y por unidad producida.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento preventivo" },
      { value: "−58%", label: "Fallas no planificadas" },
      { value: "+12%", label: "OEE de línea" },
    ],
    quote: "Producíamos con mantenimiento 100% correctivo. Con OxyPulse implementamos preventivos en 3 semanas, el OEE de la línea principal subió 11 puntos en 90 días y por primera vez tenemos datos reales.",
    author: "Daniela Rojas",
    role: "Jefa de Mantenimiento Industrial",
    otherLinks: [
      { slug: "metalmecanica", name: "Metalmecánico" },
      { slug: "automotriz", name: "Automotriz" },
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "construccion", name: "Construcción" },
    ],
  },
  automotriz: {
    name: "Automotriz",
    chip: "Soluciones para la industria Automotriz",
    subTypes: ["Flotas corporativas", "Rent a car y leasing", "Concesionarios y talleres", "Flotas gubernamentales", "Vehículos de emergencia"],
    accent: "queda documentada.",
    headline: ["Cada vehículo tiene su historia. Con OxyPulse,"],
    description:
      "OxyPulse gestiona el mantenimiento de flotas corporativas, talleres y concesionarios. Historial por VIN, alertas de PM por km o fecha, y visibilidad de toda la flota en tiempo real.",
    painPoints: [
      { icon: AlertTriangle, title: "Servicios vencidos sin que nadie lo supiera", description: "El aceite se cambió hace 14.000 km pero nadie recibió alerta. Sin sistema, el PM vence en silencio y la primera notificación llega cuando el motor ya dio señales." },
      { icon: Users, title: "El historial se fue con el mecánico", description: "El técnico más antiguo del taller conoce de memoria el historial de cada vehículo. Cuando se va, todo ese conocimiento desaparece, sin dejar ningún registro." },
      { icon: Layers, title: "Flota dispersa sin visibilidad central", description: "80 camionetas en distintas ciudades gestionadas con planillas por base. Sin centralización, el gerente de flota no sabe qué tiene PM vencido sin llamar a cada encargado." },
      { icon: Shield, title: "Garantías perdidas por falta de registros", description: "El fabricante exige historial documentado de mantenimiento preventivo para validar la garantía. Sin sistema, la garantía se pierde en el momento más costoso." },
      { icon: BarChart2, title: "Costos de flota imposibles de optimizar", description: "Se conoce el gasto total en mantenimiento pero no qué vehículo es el más costoso ni cuándo conviene renovarlo. Las decisiones se toman sin datos reales." },
      { icon: Calendar, title: "Revisión técnica y permiso vencidos sin alerta", description: "Sin alertas automáticas, los vehículos circulan con documentación vencida. Un problema evitable que genera interrupciones operacionales innecesarias." },
    ],
    benefits: [
      { icon: Zap, title: "Operativo desde el día 1", description: "Carga tu flota y activa PM por km o fecha en minutos. Sin implementaciones largas." },
      { icon: Shield, title: "Garantías siempre respaldadas", description: "Cada PM registrado con firma digital. Cuando el fabricante pida el historial, está listo." },
      { icon: Layers, title: "Flota centralizada", description: "Todos los vehículos de todas las bases en un solo panel: PM al día, documentos vigentes y alertas activas." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: ">90% cumplimiento de PM y costos de mantenimiento visibles por unidad." },
    ],
    oxypulseFeatures: [
      "Ficha digital por VIN: historial completo de mantenimiento, repuestos y costo acumulado por unidad.",
      "PM por km, meses o fecha con alerta automática antes del vencimiento.",
      "Control de documentos: revisión técnica, permiso de circulación y seguro con alertas de vencimiento.",
      "Dashboard de flota: qué unidades están al día, cuáles tienen PM vencido y cuáles tienen alerta activa.",
    ],
    oxyplannerFeatures: [
      "Backlog de mantenimiento priorizado por urgencia y disponibilidad del vehículo.",
      "Gestión de repuestos de taller con stock mínimo y alertas de reposición.",
      "Coordinación de mantenimiento entre bases y talleres desde un solo panel.",
      "Reportes de costo por unidad, por base y por tipo de activo para optimizar decisiones de flota.",
    ],
    kpis: [
      { value: ">90%", label: "Cumplimiento de PM" },
      { value: "100%", label: "Documentos vigentes" },
      { value: "−55%", label: "Servicios de emergencia" },
    ],
    quote: "Tenía 80 camionetas en cuatro regiones y el historial de cada una en planillas distintas. Con OxyPulse centralizamos todo: el PM por km se activa solo, las revisiones técnicas no vencen más y los costos por unidad son visibles.",
    author: "Rodrigo Castillo",
    role: "Gerente de Flota Corporativa",
    otherLinks: [
      { slug: "logistica", name: "Logística" },
      { slug: "construccion", name: "Construcción" },
      { slug: "manufactura", name: "Manufacturera" },
      { slug: "metalmecanica", name: "Metalmecánico" },
    ],
  },
  retail: {
    name: "Retail y Facilities",
    chip: "Soluciones para Retail y Facilities",
    subTypes: ["Supermercados", "Farmacias", "Centros comerciales", "Retail de especialidad", "Ferreterías y mejoramiento del hogar"],
    accent: "en tiendas y centros comerciales.",
    headline: ["El mantenimiento que nadie ve pero todos sienten"],
    description:
      "OxyPulse centraliza el mantenimiento de equipos de frío, HVAC, ascensores y activos de facilities en múltiples locales. Menos emergencias y sin depender de spreadsheets.",
    painPoints: [
      { icon: AlertTriangle, title: "Un equipo de frío que falla = pérdida de producto", description: "Un mueble frigorífico o cámara de frío sin mantenimiento preventivo puede fallar en pleno fin de semana. Pérdida de producto y daño reputacional en un solo evento." },
      { icon: Layers, title: "50 locales, 50 planillas diferentes", description: "Cada local gestiona su mantenimiento con su propio criterio. Sin centralización, es imposible saber el estado real de los equipos ni comparar el desempeño entre locales." },
      { icon: Shield, title: "Ascensores y extintores vencidos sin alerta", description: "Las certificaciones de ascensores, extintores y sistemas de emergencia tienen vencimientos. Sin alertas automáticas, el olvido es solo cuestión de tiempo." },
      { icon: Users, title: "Contratistas de facilities sin trazabilidad", description: "El mantenimiento de HVAC, ascensores y sistemas eléctricos lo hacen contratistas externos. Sin sistema, nadie sabe qué se hizo, cuándo ni a qué costo real." },
      { icon: BarChart2, title: "Sin KPIs de mantenimiento por local ni por región", description: "El gerente de facilities no tiene visibilidad del desempeño de mantenimiento por local o región. Las decisiones se toman con información de semanas atrás." },
      { icon: Calendar, title: "El HVAC solo se revisa cuando falla", description: "Los equipos de climatización y ventilación solo se intervienen cuando el encargado del local llama para reportar la falla. El preventivo existe en el papel del contrato, no en la realidad." },
    ],
    benefits: [
      { icon: Zap, title: "Multi-local desde el día 1", description: "OxyPulse centraliza todos tus locales con sus activos y contratistas en una sola plataforma." },
      { icon: Shield, title: "Certificaciones bajo control", description: "Alertas automáticas de vencimiento de ascensores, extintores, gas y sistemas eléctricos." },
      { icon: Calendar, title: "PM real, no solo en el contrato", description: "Verifica que el contratista realmente ejecutó el preventivo con OT firmada y evidencia fotográfica." },
      { icon: TrendingUp, title: "Resultados en 90 días", description: "−50% emergencias de frío y >88% cumplimiento preventivo desde el primer trimestre." },
    ],
    oxypulseFeatures: [
      "Ficha digital por local: todos los activos de HVAC, frío, ascensores y sistemas eléctricos.",
      "Control de certificaciones y vencimientos con alertas automáticas por tipo de activo y local.",
      "OTs para contratistas con firma y evidencia fotográfica: el trabajo queda registrado siempre.",
      "Dashboard multi-local: estado de cumplimiento preventivo y alertas críticas por zona o región.",
    ],
    oxyplannerFeatures: [
      "Backlog de mantenimiento priorizado por impacto en operación del local y criticidad del activo.",
      "Coordinación de contratistas: asignación, seguimiento y cierre de OTs desde un solo panel.",
      "Gestión de repuestos de frío y HVAC con alertas de reposición antes del agotamiento.",
      "Reportes de costo de mantenimiento por local, región y tipo de activo para el gerente de facilities.",
    ],
    kpis: [
      { value: ">88%", label: "Cumplimiento preventivo" },
      { value: "−50%", label: "Emergencias de frío" },
      { value: "100%", label: "Certificaciones vigentes" },
    ],
    quote: "Teníamos 40 locales con mantenimiento 100% reactivo. Con OxyPulse centralizamos todo: cada contratista registra su trabajo, el equipo de frío tiene preventivos reales y el tablero muestra el estado de cada tienda.",
    author: "Andrea Méndez",
    role: "Gerente de Facilities y Mantenimiento",
    otherLinks: [
      { slug: "logistica", name: "Logística" },
      { slug: "alimentos", name: "Alimentos y Bebidas" },
      { slug: "manufactura", name: "Manufacturera" },
      { slug: "construccion", name: "Construcción" },
    ],
  },
}

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─────────────────────────────────────────────
   PRODUCT MOCKUPS
───────────────────────────────────────────── */
function OxyPulseMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white text-left select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#0A2434]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <span className="text-white/60 text-xs font-mono">OxyPulse — Monitoreo</span>
        <div className="w-14" />
      </div>
      <div className="flex" style={{ height: 280 }}>
        {/* Sidebar */}
        <div className="w-36 border-r border-gray-100 bg-[#f8f9fc] flex flex-col gap-0.5 py-3 px-2 flex-shrink-0">
          {["Dashboard", "Activos", "Alertas", "Tendencias", "Reportes"].map((item, i) => (
            <div key={item} className={`text-xs px-2 py-1.5 rounded-md ${i === 0 ? "bg-[#4361ee]/10 text-[#4361ee] font-semibold" : "text-gray-500"}`}>
              {item}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Disponibilidad", value: "94.2%", color: "#22c55e", up: true },
              { label: "Alertas activas", value: "3", color: "#f59e0b", up: false },
              { label: "OT abiertas", value: "12", color: "#4361ee", up: true },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-100 bg-white p-2">
                <div className="text-[10px] text-gray-400 mb-0.5">{k.label}</div>
                <div className="text-base font-bold" style={{ color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="rounded-lg border border-gray-100 bg-white p-3 mb-3">
            <div className="text-[10px] text-gray-400 mb-2">Vibración — Torno CNC-04 (últimas 24h)</div>
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4361ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4361ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,35 Q20,30 40,32 Q60,34 80,28 Q100,22 120,25 Q140,28 160,18 Q180,10 200,15" stroke="#4361ee" strokeWidth="1.5" fill="none" />
              <path d="M0,35 Q20,30 40,32 Q60,34 80,28 Q100,22 120,25 Q140,28 160,18 Q180,10 200,15 L200,50 L0,50Z" fill="url(#chartGrad)" />
              <line x1="0" y1="20" x2="200" y2="20" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4,3" />
            </svg>
          </div>
          {/* Alert */}
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            <span className="text-[10px] text-amber-800">Alerta: Torno CNC-04 — vibración 15% sobre umbral</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OxyPlannerMockup() {
  const tasks = [
    { name: "PM Prensa Hidráulica #1", state: "done", days: 5 },
    { name: "Cambio rodamientos Torno #3", state: "active", days: 3 },
    { name: "Revisión sistema neumático", state: "planned", days: 4 },
    { name: "Calibración sensores línea A", state: "planned", days: 2 },
  ]
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white text-left select-none">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#0A2434]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <span className="text-white/60 text-xs font-mono">OxyPlanner — Planificación</span>
        <div className="w-14" />
      </div>
      <div className="p-4" style={{ height: 280 }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-700">Plan Semanal — Semana 14</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">91% cumplimiento</span>
        </div>
        {/* Gantt */}
        <div className="space-y-2">
          {["L","M","X","J","V","S","D"].map((d, i) => (
            <div key={d} className="hidden" />
          ))}
          <div className="flex gap-1 mb-1 pl-36">
            {["L","M","X","J","V","S"].map(d => (
              <div key={d} className="flex-1 text-center text-[9px] text-gray-400">{d}</div>
            ))}
          </div>
          {tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-32 text-[10px] text-gray-600 truncate">{t.name}</div>
              <div className="flex-1 relative h-4 bg-gray-100 rounded-sm overflow-hidden">
                <div
                  className="absolute top-0 h-full rounded-sm"
                  style={{
                    left: `${i * 8}%`,
                    width: `${(t.days / 6) * 100}%`,
                    background: t.state === "done" ? "#22c55e" : t.state === "active" ? "#4361ee" : "#e5e7eb",
                    opacity: t.state === "planned" ? 0.6 : 1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* OT summary */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Completadas", value: "8", color: "#22c55e" },
            { label: "En progreso", value: "3", color: "#4361ee" },
            { label: "Pendientes", value: "5", color: "#9ca3af" },
          ].map(k => (
            <div key={k.label} className="rounded-lg border border-gray-100 p-2 text-center">
              <div className="text-base font-bold" style={{ color: k.color }}>{k.value}</div>
              <div className="text-[9px] text-gray-400">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION NAV
───────────────────────────────────────────── */
const NAV_SECTIONS = [
  { id: "suite", label: "Oxygen Suite" },
  { id: "oxypulse", label: "OxyPulse" },
  { id: "oxyplanner", label: "OxyPlanner" },
  { id: "integraciones", label: "Integraciones" },
  { id: "resultados", label: "Resultados" },
]

function SectionNav({ showPlanner }: { showPlanner: boolean }) {
  const [active, setActive] = useState("suite")
  const [stuck, setStuck] = useState(false)
  const sections = NAV_SECTIONS.filter(s => showPlanner || s.id !== "oxyplanner")

  useEffect(() => {
    const handleScroll = () => {
      setStuck(window.scrollY > 520)
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(`section-${s.id}`)
        if (el && el.getBoundingClientRect().top <= 90) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!stuck) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="relative px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors"
              style={{ color: active === s.id ? "#0a2434" : "#6b7280" }}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#4361ee] rounded-full" />
              )}
            </button>
          ))}
        </div>
        <Link
          href="/nosotros#contacto"
          className="ml-4 flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold text-white"
          style={{ background: "#4361ee" }}
        >
          Contactar con ventas
        </Link>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function IndustryPage({ params }: { params: Promise<{ industria: string }> }) {
  const { industria } = use(params)
  const industry = industries[industria as keyof typeof industries]

  if (!industry) notFound()

  const { ref: heroRevealRef, visible: heroRevealVisible } = useReveal()
  const { ref: cardsRevealRef, visible: cardsRevealVisible } = useReveal()
  const { ref: suiteRevealRef, visible: suiteRevealVisible } = useReveal()
  const { ref: pulseRevealRef, visible: pulseRevealVisible } = useReveal()
  const { ref: plannerRevealRef, visible: plannerRevealVisible } = useReveal()
  const { ref: statsRevealRef, visible: statsRevealVisible } = useReveal()
  const { ref: helpRevealRef, visible: helpRevealVisible } = useReveal()

  return (
    <div className="min-h-screen bg-white">
      <SectionNav showPlanner={industria === "metalmecanica"} />

      {/* ── HERO ─────��─────�������─────────────────── */}
      <section
        ref={heroRevealRef as React.RefObject<HTMLElement>}
        className="relative overflow-hidden pt-24 pb-16"
        style={{ background: "linear-gradient(135deg, #f6f9fc 0%, #eef2ff 60%, #f6f9fc 100%)" }}
      >
        {/* Gradient blob */}
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] opacity-60 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 30%, #4361ee33 0%, #7c3aed22 40%, transparent 70%)" }} />
        <div className="absolute top-20 right-40 w-[400px] h-[400px] opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #06b6d433 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div
              style={{
                opacity: heroRevealVisible ? 1 : 0,
                transform: heroRevealVisible ? "none" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{ color: "#4361ee", borderColor: "#4361ee33", background: "#4361ee0d" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4361ee]" />
                {industry.chip}
              </div>
              <h1 className="font-extrabold text-balance mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0a2434" }}>
                {industry.headline[0]}{" "}
                <span style={{ color: "#4361ee" }}>{industry.accent}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-5 text-balance leading-relaxed" style={{ maxWidth: 480 }}>
                {industry.description}
              </p>
              {industry.subTypes && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {industry.subTypes.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-500 bg-gray-50">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/nosotros#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-opacity"
                  style={{ background: "#4361ee" }}
                >
                  Contactar con ventas <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#plataforma"
                  className="inline-flex items-center gap-1 px-5 py-3 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-colors"
                >
                  Ver soluciones <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Social proof strip */}
              <p className="mt-8 text-xs text-gray-400">
                Más de <strong className="text-gray-600">40 plantas</strong> en LATAM confían en Oxygen
              </p>
            </div>

            {/* Right: product mockup */}
            <div
              style={{
                opacity: heroRevealVisible ? 1 : 0,
                transform: heroRevealVisible ? "none" : "translateX(24px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              <OxyPulseMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES CARDS ─────────────────── */}
      <section
        id="section-suite"
        ref={cardsRevealRef as React.RefObject<HTMLElement>}
        className="py-24"
        style={{ background: "#f6f9fc" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-14"
            style={{ opacity: cardsRevealVisible ? 1 : 0, transform: cardsRevealVisible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-3">Desafíos que resolvemos</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2434] text-balance">
              Problemas reales de la industria {industry.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Oxygen está diseñado para los desafíos específicos de tu sector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industry.painPoints.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#4361ee]/30 hover:shadow-md transition-all duration-300"
                  style={{
                    opacity: cardsRevealVisible ? 1 : 0,
                    transform: cardsRevealVisible ? "none" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#4361ee12" }}>
                    <Icon className="w-5 h-5" style={{ color: "#4361ee" }} />
                  </div>
                  <h3 className="font-semibold text-[#0a2434] mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── SUITE SECTION (WHITE, STRIPE-STYLE) ─ */}
      <section
        ref={suiteRevealRef as React.RefObject<HTMLElement>}
        className="py-24 bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header — like Stripe's program section */}
          <div
            className="max-w-4xl mb-16"
            style={{ opacity: suiteRevealVisible ? 1 : 0, transform: suiteRevealVisible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-4">Oxygen Suite</p>
            <h2 className="font-extrabold text-balance leading-tight mb-5" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: "#0a2434" }}>
              La plataforma de Oxygen ayuda a las operaciones industriales a{" "}
              <span style={{ color: "#4361ee" }}>anticipar fallas, planificar con datos</span>{" "}
              y crecer sin reinventarse.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              Oxygen está diseñado para equipos de mantenimiento que quieren pasar del Excel y el WhatsApp a una operación basada en datos, sin meses de implementación.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/nosotros#contacto"
                className="px-5 py-2.5 rounded-full text-white font-semibold text-sm"
                style={{ background: "#4361ee" }}
              >
                Contactar con ventas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OXYPULSE FEATURE ─────────────────── */}
      <section
        id="section-oxypulse"
        ref={pulseRevealRef as React.RefObject<HTMLElement>}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div style={{ opacity: pulseRevealVisible ? 1 : 0, transform: pulseRevealVisible ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-3">OxyPulse</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2434] text-balance mb-6">
                Monitorea y anticipa fallas antes de que ocurran
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Conecta tus equipos, visualiza su condición en tiempo real y recibe alertas tempranas cuando algo está fuera de lo normal. Deja de reaccionar. Empieza a anticipar.
              </p>
              <ul className="space-y-3 mb-8">
                {industry.oxypulseFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#4361ee1a" }}>
                      <Check className="w-3 h-3 text-[#4361ee]" />
                    </div>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/oxypulse" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4361ee] hover:gap-2 transition-all">
                Conocer OxyPulse <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: mockup + story card */}
            <div
              className="space-y-4"
              style={{ opacity: pulseRevealVisible ? 1 : 0, transform: pulseRevealVisible ? "none" : "translateX(24px)", transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" }}
            >
              <OxyPulseMockup />
              {/* Customer story chip - only for metalmecanica */}
              {industria === "metalmecanica" && (
                <a href="/casos/metalmecanica-cumplimiento-preventivo" className="bg-[#f6f9fc] rounded-2xl border border-gray-200 p-4 flex items-center justify-between hover:border-[#4361ee]/30 hover:shadow-md transition-all group">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Historia del cliente</p>
                    <p className="text-sm font-semibold text-[#0a2434]">
                      Cómo AMCS logró +90% cumplimiento preventivo
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-[#4361ee] group-hover:gap-1.5 transition-all">
                      Ver caso de éxito <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <img src="/logos-web/14.png" alt="AMCS" className="w-14 h-14 rounded-xl flex-shrink-0 object-contain ml-4 bg-white p-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── OXYPLANNER FEATURE ───────────────── */}
      {industria === "metalmecanica" && <section
        id="section-oxyplanner"
        ref={plannerRevealRef as React.RefObject<HTMLElement>}
        className="py-24"
        style={{ background: "#f6f9fc" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: mockup */}
            <div
              className="space-y-4"
              style={{ opacity: plannerRevealVisible ? 1 : 0, transform: plannerRevealVisible ? "none" : "translateX(-24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
            >
              <OxyPlannerMockup />
              {/* Stat chip */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
                <div className="text-4xl font-extrabold text-[#4361ee]">−40%</div>
                <p className="text-sm text-gray-600">reducción en detenciones no planificadas en plantas industriales de la región</p>
              </div>
            </div>

            {/* Right */}
            <div style={{ opacity: plannerRevealVisible ? 1 : 0, transform: plannerRevealVisible ? "none" : "translateX(24px)", transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-3">OxyPlanner</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2434] text-balance mb-6">
                Planifica sin hojas de cálculo. Ejecuta con precisión
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Genera planes de mantenimiento automáticamente, prioriza órdenes de trabajo por criticidad real y da a tu equipo las instrucciones correctas en el momento correcto.
              </p>
              <ul className="space-y-3 mb-8">
                {industry.oxyplannerFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#4361ee1a" }}>
                      <Check className="w-3 h-3 text-[#4361ee]" />
                    </div>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/oxyplanner" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4361ee] hover:gap-2 transition-all">
                Conocer OxyPlanner <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>}

      {/* ── INTEGRACIONES ────────────────────── */}
      <section id="section-integraciones" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-3">Integraciones</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2434] mb-4">
            Conecta con lo que ya usas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Oxygen se integra con tu ERP, sistemas OT y hojas de cálculo.<br />Sin migraciones traumáticas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Tekla", color: "#4361ee" },
              { name: "Strumis", color: "#122D87" },
              { name: "SAP", color: "#0070f3" },
              { name: "IBM", color: "#1F70C1" },
              { name: "Microsoft Dynamics", color: "#7c3aed" },
              { name: "Hojas de cálculo", color: "#217346" },
            ].map((s) => (
              <div
                key={s.name}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center gap-2.5 hover:border-[#4361ee]/30 hover:shadow-sm transition-all"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm font-semibold text-gray-700">{s.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400">
            ¿No ves tu sistema? <a href="/nosotros#contacto" className="text-[#4361ee] font-medium hover:underline cursor-pointer">Hablemos →</a>
          </p>
        </div>
      </section>

      {/* ── STATS ───────────────────────────��── */}
      <section
        id="section-resultados"
        ref={statsRevealRef as React.RefObject<HTMLElement>}
        className="py-24"
        style={{ background: "#f6f9fc" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"
            style={{ opacity: statsRevealVisible ? 1 : 0, transform: statsRevealVisible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4361ee] mb-3">Resultados</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2434] text-balance">
              Resultados típicos en {industry.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {industry.kpis.map((k, i) => (
              <div
                key={i}
                className="bg-white p-8 text-center"
                style={{ opacity: statsRevealVisible ? 1 : 0, transition: `opacity 0.5s ease ${i * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: "#4361ee" }}>
                  {k.value}
                </div>
                <div className="text-sm text-gray-500">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HELP SECTION ─────────────────────── */}
      <section
        ref={helpRevealRef as React.RefObject<HTMLElement>}
        className="py-24 bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12"
            style={{ opacity: helpRevealVisible ? 1 : 0, transform: helpRevealVisible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2434] mb-2">¿Necesitas ayuda?</h2>
            <p className="text-gray-500">Nuestro equipo puede ayudarte a encontrar la solución correcta para tu operación.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: TrendingUp, title: "Ventas", description: "Obtén una propuesta personalizada adaptada a tu tipo de operación y desafíos específicos.", cta: "Contactar con ventas" },
              { icon: Headphones, title: "Soporte", description: "Habla con un equipo especializado que conoce tu integración y puede resolver problemas rápidamente.", cta: "Contactar con soporte" },
            ].map((h, i) => {
              const Icon = h.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-gray-200 hover:border-[#4361ee]/30 hover:shadow-sm transition-all"
                  style={{ opacity: helpRevealVisible ? 1 : 0, transform: helpRevealVisible ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#4361ee0f" }}>
                    <Icon className="w-5 h-5" style={{ color: "#4361ee" }} />
                  </div>
                  <h3 className="font-semibold text-[#0a2434] mb-2">{h.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{h.description}</p>
                  <Link href="/nosotros#contacto" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4361ee] hover:gap-2 transition-all">
                    {h.cta} <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── OTHER INDUSTRIES ─────────────────── */}
      <section className="py-12 bg-[#f6f9fc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 text-center">Otras industrias</p>
          <div className="flex flex-wrap justify-center gap-2">
            {industry.otherLinks.map(({ slug, name }) => (
              <Link
                key={slug}
                href={`/soluciones/${slug}`}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-600 font-medium hover:border-[#4361ee]/40 hover:text-[#4361ee] transition-all"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2434 0%, #122D87 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 70%, #4361ee33 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            ¿Listo para transformar el mantenimiento en {industry.name}?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Crea una cuenta rápidamente o contacta al equipo para diseñar una solución a medida para tu operación.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/nosotros#contacto"
              className="px-6 py-3 rounded-full font-semibold text-[#0a2434] bg-white hover:bg-gray-100 transition-colors shadow-md"
            >
              Contactar con ventas
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
