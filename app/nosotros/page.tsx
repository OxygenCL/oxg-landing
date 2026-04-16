"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HubSpotForm } from "@/components/hubspot-form"

const rotatingEnding = ["de LATAM.", "4.0"]
const rotatingTeam = ["inteligente.", "eficiente.", "productiva.", "competitiva.", "conectada.", "ágil."]

function WordReveal({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(false)
  const [rotIndex, setRotIndex] = useState(0)
  const [rotVisible, setRotVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotVisible(false)
      setTimeout(() => {
        setRotIndex((i) => (i + 1) % rotatingEnding.length)
        setRotVisible(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  const allWords = text.split(" ")
  const staticWords = allWords.slice(0, -2)

  return (
    <h1 ref={ref} className={className} style={style} aria-label={text}>
      {staticWords.map((word, i) => (
        <span key={i} aria-hidden="true" style={{
          display: "inline-block", marginRight: "0.28em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`,
        }}>{word}</span>
      ))}
      <span aria-hidden="true" style={{
        display: "inline-block",
        opacity: visible ? (rotVisible ? 1 : 0) : 0,
        transform: visible ? (rotVisible ? "translateY(0px)" : "translateY(12px)") : "translateY(28px)",
        transition: visible ? "opacity 0.4s ease, transform 0.4s ease"
          : `opacity 0.55s ease ${staticWords.length * 0.07}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${staticWords.length * 0.07}s`,
        background: "linear-gradient(90deg, #4361ee, #60a5fa, #93c5fd)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>{rotatingEnding[rotIndex]}</span>
    </h1>
  )
}

function RotatingHeading({ static: staticText, words, className, style }: { static: string; words: string[]; className?: string; style?: React.CSSProperties }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <h2 className={className} style={style}>
      {staticText.replace(/<br\/>/, "\n").replace(/ más$/, "").split("\n").map((line, i, arr) => (
        <span key={i}>{line}{i < arr.length - 1 && <br />}{" "}</span>
      ))}
      <span style={{ whiteSpace: "nowrap" }}>
        más{" "}
        <span style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(10px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          background: "linear-gradient(90deg, #4361ee, #60a5fa, #93c5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {words[index]}
        </span>
      </span>
    </h2>
  )
}

// Initials avatar color by index
const avatarColors = [
  "#122D87", "#4361ee", "#0d1b2e", "#1e40af", "#1e40af", "#0f4c81",
  "#1a3a5c", "#2563eb", "#1e3a8a", "#1d4ed8", "#0e3460", "#0a2540",
  "#234b8a", "#153e75",
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
}

const values = [
  { title: "Impacto", description: "Medimos nuestro éxito por el impacto real que generamos en las operaciones de nuestros clientes." },
  { title: "Simplicidad", description: "Creemos que la verdadera genialidad está en simplificar: convertir problemas complejos en soluciones claras." },
  { title: "Colaboración abierta", description: "Las ideas importan más que los títulos. Cada voz contribuye al éxito compartido del equipo." },
  { title: "Ambición", description: "Somos curiosos, queremos mejorar individual y colectivamente, e inspiramos a otros con nuestro crecimiento." },
  { title: "Responsabilidad", description: "Actuamos como dueños, tomando responsabilidad individual para lograr nuestros objetivos." },
  { title: "Confianza y respeto", description: "Una mente abierta y aprecio por distintas perspectivas crean un espacio donde todos pueden ser auténticos." },
]

const team = [
  { name: "Tomás Fischer",          role: "CEO"                            },
  { name: "Diego Torres",           role: "Product Manager"                },
  { name: "Danilo Muñoz",           role: "Tech Lead"                      },
  { name: "José Miguel Escobar",    role: "Developer"                      },
  { name: "Camilo Duque",           role: "Developer"                      },
  { name: "Tanya Díaz",             role: "UX/UI Designer"                 },
  { name: "Marcelo Vidal",          role: "Gerente de Consultoría"         },
  { name: "Carolina Pinto",         role: "Team Lead"                      },
  { name: "Alonso Orozco",          role: "Líder de Operaciones"           },
  { name: "Hiliana Bustamante",     role: "Customer Success Specialist"    },
  { name: "Matias Fischer",         role: "Account Executive"              },
  { name: "Scarlette Tachima",      role: "SDR"                            },
  { name: "Armando Ortiz",          role: "Agente de Marketing"            },
]

const industries = [
  "Metalmecánica", "Alimentos y Bebidas", "Minería", "Logística",
  "Forestal", "Agrícola", "Construcción", "Energía",
  "Pesquero y Acuicultura", "Manufacturera", "Automotriz", "Retail y Facilities",
]

export default function NosotrosPage() {

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-[#0A2434] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video src="/hero-bg2.mp4" autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.75 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,36,52,0.45) 0%, rgba(10,36,52,0.35) 50%, rgba(10,36,52,0.6) 100%)" }} />
          <div className="absolute -top-10 -left-10 w-[650px] h-[650px] rounded-full bg-[#122D87] opacity-25 blur-[120px] animate-blob" />
          <div className="absolute -top-20 left-1/3 w-[550px] h-[550px] rounded-full bg-[#4361ee] opacity-20 blur-[110px] animate-blob" style={{ animationDelay: "-4s" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#192B6A] opacity-25 blur-[120px] animate-blob" style={{ animationDelay: "-8s" }} />
          <div className="absolute bottom-10 -left-10 w-[450px] h-[450px] rounded-full bg-[#1e40af] opacity-15 blur-[130px] animate-blob" style={{ animationDelay: "-10s" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <WordReveal
            text="Construyamos juntos la nueva industria de LATAM."
            className="text-white font-bold max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          />
        </div>
      </section>

      {/* ── MISIÓN ── */}
      <section className="bg-[#060e1f] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-4">
                Nuestra misión
              </span>
              <h2 className="text-white font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Llevar la industria de LATAM a su máximo potencial.
              </h2>
            </div>
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                La industria de LATAM lleva décadas operando con herramientas que no fueron diseñadas para ella.
                Equipos que conocen cada máquina de memoria, pero sin cómo registrarlo. Plantas que generan datos,
                pero sin manera de convertirlos en decisiones.
              </p>
              <p>
                Oxygen nació para cambiar eso. Somos tecnología industrial construida desde adentro, para la
                realidad de acá, no adaptada desde otro mercado. Porque las plantas de LATAM no necesitan
                menos ambición. Necesitan mejores herramientas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENSAJE CEO ── */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-10">
            Mensaje de nuestro CEO
          </span>
          <blockquote className="relative pl-6 border-l-2 border-[#4361ee]/30">
            <p className="text-gray-700 text-xl sm:text-2xl leading-relaxed font-light mb-8">
              Durante mis años liderando plantas industriales en Latinoamérica, vi el mismo patrón en cada operación:
              equipos brillantes atrapados en apagar incendios, decisiones críticas tomadas con planillas y correos,
              y una brecha enorme entre la tecnología disponible y lo que nuestra industria realmente necesitaba.
              <br /><br />
              Las soluciones que existían eran de otro mercado, costosas, genéricas, y que nunca entendieron cómo
              operamos acá. Oxygen nació de esa frustración, y de una convicción simple: los mejores operadores de
              LATAM merecen herramientas pensadas desde adentro, no adaptadas a regañadientes desde afuera.
            </p>
            <footer className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/TFB.png"
                alt="Tomás Fischer Ballerini"
                className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-[#4361ee]/30"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">Tomás Fischer Ballerini</p>
                  <a
                    href="https://www.linkedin.com/in/tomas-fischer-ballerini-2351b51a8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A66C2] hover:opacity-75 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-gray-400">CEO y Co-fundador, Oxygen</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="bg-[#f8f9fb] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-4">
              Nuestros valores
            </span>
            <h2 className="text-gray-900 font-bold max-w-lg" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
              Los principios que guían todo lo que hacemos.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: avatarColors[i % avatarColors.length] }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURA ── */}
      <section className="bg-[#f8f9fb] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-4">
              Cultura
            </span>
            <h2 className="text-gray-900 font-bold max-w-lg" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
              ¿Cómo es la cultura Oxy?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Comunicación clara", description: "Hablamos directo, simple y sin vueltas. La transparencia es parte de cómo operamos." },
              { title: "Equipo horizontal", description: "Sin jerarquías que bloqueen ideas. Cada voz importa, sin importar el cargo." },
              { title: "Aprendizaje continuo", description: "Probamos, iteramos y mejoramos. El error es parte del proceso, no el final." },
            ].map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: avatarColors[i] }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Beneficios */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">Algunos beneficios</h3>
            <p className="text-gray-500 text-sm mb-8">Queremos que trabajar en Oxygen sea desafiante, pero también sostenible y compatible con tu vida.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Flexibilidad horaria", description: "Organiza tu tiempo como mejor funcione para ti, siempre que se cumplan los objetivos." },
                { title: "Trabajo remoto / híbrido", description: "¿Cerca de la oficina? Ven cuando quieras. ¿Más lejos? Trabaja desde donde estés. Nos juntamos algunas veces al año y eso lo hace especial." },
                { title: "Día de cumpleaños libre", description: "Nadie debería trabajar el día de su cumpleaños. Tómate el día para celebrar, viajar, descansar. ¡Es tu día!, no trabajarás." },
                { title: "Crecimiento acelerado", description: "Somos un equipo en pleno crecimiento. Eso significa más responsabilidad, más impacto y desarrollo real hacia mejores cargos, más rápido de lo que imaginas." },
                { title: "Equipo horizontal", description: "Estructura sin jerarquías rígidas. Tu opinión y propuestas cuentan desde el día uno." },
                { title: "Impacto real en LATAM", description: "Trabajarás en proyectos que transforman industrias en todo Latinoamérica." },
              ].map((b) => (
                <div key={b.title} className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{b.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ÚNETE CTA ── */}
      <section id="careers" className="relative bg-[#020c1b] overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full bg-[#1e40af]/40 blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3b82f6]/25 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-6">
              Trabaja con nosotros
            </span>
            <h2 className="text-white font-bold max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Únete a nuestro equipo
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-lg">
              Si te gusta construir, ejecutar y ver impacto real en la industria latinoamericana, este es tu lugar.
            </p>
            <a
              href="https://oxygen-jobs.notion.site/?pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ver oportunidades
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Impacto internacional", description: "Proyectos que transforman industrias en todo Latinoamérica." },
              { title: "Innovación de vanguardia", description: "Trabajas con IA Industrial e IoT resolviendo desafíos reales." },
              { title: "Éxito compartido", description: "No somos un proveedor externo, somos socios estratégicos." },
              { title: "Agilidad y resultados", description: "Implementamos en semanas, no meses. Y lo mismo aplicamos internamente." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h4 className="text-white text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-20 bg-[#f8f9fb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold text-[#4361ee] uppercase tracking-widest block mb-4">
              Contacto
            </span>
            <h2 className="text-gray-900 font-bold mb-2" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.1 }}>
              Hablemos
            </h2>
            <p className="text-gray-500">Cuéntanos sobre tu operación y cómo podemos ayudarte.</p>
          </div>
          <HubSpotForm />
        </div>
      </section>

    </div>
  )
}
