# Oxygen.tech — Documentación de Componentes

Guía para desarrolladores que necesiten mantener o modificar el sitio.
Stack: **Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript**

---

## Estructura general

```
oxygen-local/
├── app/                        ← Páginas (cada carpeta = una URL)
│   ├── page.tsx                ← Home /
│   ├── nosotros/page.tsx       ← /nosotros
│   ├── oxypulse/page.tsx       ← /oxypulse
│   ├── oxyplanner/page.tsx     ← /oxyplanner
│   ├── soluciones/
│   │   └── [industria]/page.tsx ← /soluciones/metalmecanico, /mineria, etc.
│   └── layout.tsx              ← Layout global (navbar + footer)
│
├── components/
│   ├── navbar.tsx              ← Barra de navegación global
│   ├── footer.tsx              ← Pie de página global
│   └── home/                   ← Secciones del Home
│       ├── hero-section.tsx
│       ├── platform-intro-section.tsx
│       ├── products-overview-section.tsx
│       ├── results-section.tsx
│       ├── testimonial-section.tsx
│       └── ... (otras secciones)
│
└── app/globals.css             ← Colores de marca y animaciones CSS
```

---

## Colores de marca

Definidos en `app/globals.css`. Para cambiar un color, búscalo aquí primero.

| Variable | Valor | Uso |
|---|---|---|
| `--navy-dark` | `#0A2434` | Fondos oscuros, cards |
| `--navy-mid` | `#122D4A` | Gradientes intermedios |
| `--royal-blue` | `#122D87` | Gradientes, botones dark |
| `--blue-accent` | `#4361ee` | Color principal de acento (botones, links, highlights) |

Para cambiar el color de acento principal de todo el sitio, reemplaza `#4361ee` en `globals.css`.

---

## Componentes con animaciones custom (los más complejos)

Estos componentes tienen animaciones basadas en scroll escritas a mano. No usan librerías externas — todo es JavaScript nativo con `window.addEventListener("scroll")`.

### Patrón común de todas las animaciones

Todos los componentes animados siguen el mismo patrón:

```tsx
// 1. Referencia al elemento DOM
const sectionRef = useRef()

// 2. Estado de progreso: 0 = animación no iniciada, 1 = animación completa
const [progress, setProgress] = useState(0)

// 3. Listener de scroll que actualiza el progreso
useEffect(() => {
  const handleScroll = () => {
    const rect = sectionRef.current.getBoundingClientRect()
    const vh = window.innerHeight
    const raw = (vh * 0.85 - rect.top) / (vh * 0.75)  // fórmula de progreso
    setProgress(Math.max(0, Math.min(1, raw)))           // clamp entre 0 y 1
  }
  window.addEventListener("scroll", handleScroll, { passive: true })
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

// 4. Función de easing (hace la animación suave, no lineal)
const p = easeOutCubic(progress)  // p también va de 0 a 1, pero con curva

// 5. Usar p para calcular estilos inline
<div style={{ opacity: p, transform: `translateX(${(1-p) * 100}px)` }} />
```

**Regla clave**: nunca uses `transition: "..."` en los estilos inline de estos elementos — el scroll ya actualiza el estado 60 veces por segundo, una `transition` encima crea lag visual.

---

## Componentes del Home

---

### `hero-section.tsx`
**Ruta**: `components/home/hero-section.tsx`
**URL**: `/` (primera sección visible)

**Qué hace**:
- Fondo negro con 6 blobs de colores que flotan y se mueven (`animate-blob` definido en `globals.css`)
- Texto "IA industrial para" que se ilumina conforme el usuario hace scroll hacia abajo
- Texto rotatorio ("menores costos" / "mayor rentabilidad" / "mayor eficiencia") con gradiente
- Haz de luz que barre de izquierda a derecha al hacer scroll

**Cómo modificar el texto rotatorio**:
```tsx
// Línea 6 — simplemente edita este array
const rotatingWords = ["menores costos", "mayor rentabilidad", "mayor eficiencia"]
```

**Cómo modificar la velocidad de rotación**:
```tsx
// Línea 17 — el número es milisegundos entre cambios
setInterval(() => { ... }, 2600)  // cambia 2600 por lo que quieras
```

**Cómo modificar los colores del haz de luz**:
```tsx
// Línea 63 — el gradiente radial que crea el haz
background: `radial-gradient(ellipse 18% 80% at ${beamX}% 50%,
  rgba(255,255,255,0.13) 0%,    // color centro del haz
  rgba(180,140,255,0.07) 40%,   // color borde del haz
  transparent 70%)`
```

**Cómo cambiar los colores de los blobs**:
```tsx
// Líneas 51-56 — cada div es un blob, cambia el bg-[#color]
<div className="... bg-[#60a5fa] ..." />  // azul
<div className="... bg-[#a855f7] ..." />  // púrpura
// etc.
```

---

### `platform-intro-section.tsx`
**Ruta**: `components/home/platform-intro-section.tsx`

**Qué hace**:
- Texto largo que se "ilumina" palabra por palabra conforme el usuario hace scroll
- Cada palabra va de gris claro a casi negro según su posición y el progreso del scroll

**Cómo cambiar el texto**:
```tsx
// Línea 5 — reemplaza el string completo
const text = "La plataforma de Oxygen orquesta productos..."
```

**Cómo cambiar la velocidad de iluminación**:
```tsx
// Línea 50 — el 0.7 controla qué tan "escalonado" es el efecto entre palabras
// El 0.35 controla qué tan rápido se ilumina cada palabra individualmente
const wordP = Math.max(0, Math.min(1, (p - (i / words.length) * 0.7) / 0.35))
// Sube el 0.7 → las palabras se iluminan más en secuencia
// Baja el 0.35 → cada palabra se ilumina más rápido
```

**Cómo cambiar los colores de las palabras**:
```tsx
// Línea 51 — lightness va de 82 (gris claro) a 10 (casi negro)
const lightness = Math.round(82 - wordP * 72)
// color: hsl(225, 15%, ${lightness}%)
// Para hacer el color inicial más oscuro: cambia 82 a 60
// Para hacer el color final más claro: cambia el 72 a 50
```

---

### `products-overview-section.tsx`
**Ruta**: `components/home/products-overview-section.tsx`

**Qué hace**:
- Card central de OXYGEN aparece primero
- Líneas SVG se dibujan como un árbol (tallo → barra horizontal → ramas verticales)
- 3 cards de productos se separan desde el centro hacia los lados

**Cómo agregar o quitar productos**:
```tsx
// Líneas 7-26 — edita este array
const products = [
  { icon: BarChart3, name: "OxyPulse", description: "...", href: "/oxypulse" },
  { icon: Calendar, name: "OxyPlanner", description: "...", href: "/oxyplanner" },
  { icon: Users, name: "Consultoría", description: "...", href: "/consultoria" },
]
// ⚠️ Las posiciones de las líneas SVG están hardcodeadas para 3 productos.
// Si agregas un 4to producto, necesitas rediseñar el SVG en líneas 103-152.
```

**Cómo ajustar la velocidad de cada fase**:
```tsx
// Líneas 62-65 — cada fase es un rango de 0 a 1 del progreso total
const stemP  = Math.max(0, Math.min(1, (p - 0.0) / 0.3))  // tallo: 0% → 30%
const barP   = Math.max(0, Math.min(1, (p - 0.3) / 0.3))  // barra: 30% → 60%
const dropP  = Math.max(0, Math.min(1, (p - 0.6) / 0.2))  // ramas: 60% → 80%
const cardsP = Math.max(0, Math.min(1, (p - 0.65) / 0.35)) // cards: 65% → 100%
// Para hacer una fase más lenta: aumenta el divisor (ej: /0.3 → /0.5)
// Para empezar una fase antes: baja el primer número (ej: 0.3 → 0.2)
```

---

### `results-section.tsx`
**Ruta**: `components/home/results-section.tsx`

**Qué hace**:
- 3 cards aparecen juntas como un bloque
- Al hacer scroll se separan (la izquierda va a la izquierda, la derecha a la derecha)
- Los números cuentan desde 0 hasta el valor final mientras se separan

**Cómo cambiar los números y textos**:
```tsx
// Líneas 5-27 — edita este array
const results = [
  { category: "Disponibilidad", prefix: "+", value: 90, suffix: "%", description: "..." },
  { category: "Eficiencia",     prefix: "-", value: 40, suffix: "%", description: "..." },
  { category: "Decisiones",     prefix: "",  value: 3,  suffix: "x", description: "..." },
]
// value: el número al que cuenta (siempre positivo)
// prefix: lo que va antes del número (+, -, o vacío)
// suffix: lo que va después (%, x, etc.)
```

**Cómo cambiar la distancia de separación**:
```tsx
// Línea 83 — el 200 es la distancia máxima en píxeles que se mueven las cards
const xShift = offsets[i] * (1 - splitP) * 200
// Cámbialo a 300 para que se separen más, o 100 para menos
```

---

### `testimonial-section.tsx`
**Ruta**: `components/home/testimonial-section.tsx`

**Qué hace**:
- Carrusel de testimonios estilo Stripe
- Avanza automáticamente cada 6 segundos con barra de progreso
- Clic en el nombre de la empresa salta a ese testimonio

**Cómo cambiar los testimonios**:
```tsx
// Líneas 6-56 — edita el array
const testimonials = [
  {
    quote: "El texto de la cita...",
    name: "Nombre Apellido",
    title: "Cargo",
    company: "Nombre Empresa",
    slug: "nombre-empresa",    // URL para "Lee la historia"
    initials: "NA",            // 2 letras para el avatar
  },
  // ...más testimonios
]
```

**Cómo cambiar la velocidad de auto-avance**:
```tsx
// Línea 59
const DURATION = 6000  // milisegundos — cambia a 4000 para más rápido
```

---

### `navbar.tsx`
**Ruta**: `components/navbar.tsx`

**Qué hace**:
- Barra de anuncio azul arriba que se oculta al hacer scroll
- Navbar flotante tipo "pill" oscuro semitransparente
- Dropdowns al hover en "Productos" e "Industrias"
- Menú hamburguesa en mobile

**Cómo cambiar el texto del anuncio**:
```tsx
// Línea 52
<span>OxyPlanner ya disponible — Planificación industrial con IA</span>
// Línea 55 — el link del anuncio
href="/oxyplanner"
```

**Cómo agregar un link al menú**:
```tsx
// Después de línea 144 (entre Recursos y Nosotros)
<Link href="/nueva-pagina" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
  Nueva Sección
</Link>
// También agrégalo al menú mobile en líneas 196-205
```

**Cómo agregar una industria al dropdown**:
```tsx
// Líneas 14-21 — edita el array industries
const industries = [
  { name: "Metalmecánico", href: "/soluciones/metalmecanico" },
  // agrega aquí:
  { name: "Nueva Industria", href: "/soluciones/nueva-industria" },
]
```

---

## Página de Industrias — `/soluciones/[industria]`

**Ruta**: `app/soluciones/[industria]/page.tsx`
**URLs**: `/soluciones/metalmecanico`, `/soluciones/mineria`, `/soluciones/alimentos`, etc.

Una sola página que sirve contenido distinto para cada industria. El layout es idéntico para todas — solo cambia el contenido del objeto `industries`.

**Cómo editar el contenido de una industria**:
```tsx
// Al inicio del archivo, busca el objeto con el nombre de la industria
metalmecanico: {
  name: "Metalmecánico",          // nombre que aparece en el sitio
  accent: "metalmecánica",         // palabra resaltada en azul en el título
  headline: ["Inteligencia industrial para la industria"],  // título del hero
  description: "Texto descriptivo...",
  painPoints: [                    // 6 tarjetas de desafíos
    { icon: AlertTriangle, title: "Título", description: "Descripción" },
    // ...
  ],
  benefits: [                      // 4 columnas de beneficios (sección blanca)
    { icon: Zap, title: "Título", description: "Descripción" },
    // ...
  ],
  oxypulseFeatures: [              // 4 bullets de OxyPulse
    "Feature 1",
    // ...
  ],
  oxyplannerFeatures: [            // 4 bullets de OxyPlanner
    "Feature 1",
    // ...
  ],
  kpis: [                          // 4 números en la sección de resultados
    { value: "+90%", label: "Cumplimiento preventivo" },
    // ...
  ],
  quote: "Texto del testimonio...",
  author: "Nombre del autor",
  role: "Cargo, Empresa",
}
```

**Cómo agregar una nueva industria**:
1. Agrega un nuevo objeto al diccionario `industries` con la misma estructura
2. Agrega el link en `components/navbar.tsx` en el array `industries`
3. La URL será automáticamente `/soluciones/[clave-del-objeto]`

---

## Página `/nosotros`

**Ruta**: `app/nosotros/page.tsx`

Contiene:
- Sección de equipo con 16 miembros hardcodeados
- Formulario de contacto
- Secciones de cultura, valores y beneficios

**Cómo actualizar un miembro del equipo**:
Busca el array `teamMembers` en el archivo y edita nombre, cargo o área directamente.

---

## Cómo hacer un cambio de diseño

1. Identifica el componente en la tabla de estructura de arriba
2. Abre el archivo en un editor de código (VS Code recomendado)
3. Los colores están como clases Tailwind (`bg-[#4361ee]`) o inline styles (`color: "#4361ee"`)
4. Para cambiar tamaños de fuente busca `clamp(` o `text-xl`, `text-3xl`, etc.
5. Para cambiar espaciado busca `py-24`, `px-8`, `gap-6`, etc.
6. Guarda el archivo — el browser en `localhost:3000` se actualiza automáticamente

---

## Herramientas recomendadas para mantener el sitio

| Herramienta | Para qué | Costo |
|---|---|---|
| **VS Code** | Editor de código (recomendado) | Gratis |
| **Claude Code** | Cambios con IA en lenguaje natural | $20/mes |
| **Cursor** | Editor con IA integrada (alternativa a Claude Code) | $20/mes |
| **GitHub Copilot** | Autocompletado IA dentro de VS Code | $10/mes |

---

## Comandos útiles

```bash
# Iniciar servidor local
cd oxygen-local
npm run dev
# → abre http://localhost:3000

# Instalar dependencias (primera vez o tras clonar)
npm install

# Build de producción (para deploy en AWS)
npm run build
npm start
```

---

## Preguntas frecuentes de desarrollo

**¿Por qué algunos componentes tienen `"use client"` al inicio?**
Next.js por defecto renderiza en el servidor. Los componentes con animaciones de scroll necesitan acceso al browser (`window.scrollY`), por eso llevan `"use client"`.

**¿Por qué las animaciones no usan librerías como Framer Motion?**
Para evitar dependencias externas y tener control total sobre el timing. Todas las animaciones son scroll-driven (vinculadas al scroll en tiempo real), lo que no encaja bien con las abstracciones de Framer Motion.

**¿Puedo usar Tailwind para todos los estilos?**
Sí para la mayoría. Las animaciones de scroll usan `style={{ }}` inline porque los valores son dinámicos (calculados en JS). Para estilos estáticos, siempre preferir clases Tailwind.

**¿Cómo agrego una página nueva?**
Crea una carpeta en `app/` con un archivo `page.tsx`. Por ejemplo, `app/blog/page.tsx` queda disponible en `/blog` automáticamente.
