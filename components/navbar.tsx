"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, BarChart3, Calendar, Users, Menu, X, BookOpen, FileText, Settings2, Sandwich, HardHat, Truck, TreePine, Wheat, Building2, Zap, Fish, Factory, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const products = [
  { name: "OxyPulse", description: "CMMS y gestión de mantenimiento", href: "/oxypulse", icon: BarChart3 },
  { name: "OxyPlanner", description: "Planificación de operaciones con IA", href: "/oxyplanner", icon: Calendar },
  { name: "Advisory", description: "Diagnóstico e implementación industrial", href: "/advisory", icon: Users },
]

const industries = [
  { name: "Metalmecánica",         href: "/soluciones/metalmecanico", icon: Settings2    },
  { name: "Alimentos y Bebidas",   href: "/soluciones/alimentos",     icon: Sandwich     },
  { name: "Minería",               href: "/soluciones/mineria",       icon: HardHat      },
  { name: "Logística",             href: "/soluciones/logistica",     icon: Truck        },
  { name: "Forestal",              href: "/soluciones/forestal",      icon: TreePine     },
  { name: "Agrícola",              href: "/soluciones/agricola",      icon: Wheat        },
  { name: "Construcción",          href: "/soluciones/construccion",  icon: Building2    },
  { name: "Energía",               href: "/soluciones/energia",       icon: Zap          },
  { name: "Pesquero y Acuicultura",href: "/soluciones/pesquero",      icon: Fish         },
  { name: "Manufacturera",         href: "/soluciones/manufactura",   icon: Factory      },
  { name: "Retail y Facilities",   href: "/soluciones/retail",        icon: ShoppingCart },
]

export function Navbar() {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openSection, setOpenSection] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setOpenSection(null)
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <>
      {/* ── Announcement Bar ── se oculta al hacer scroll */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-white text-[#122D87] text-sm py-2.5 px-6 flex items-center justify-center gap-4 relative transition-transform duration-300 ease-in-out border-b border-[#122D87]/10"
        style={{ transform: scrolled ? "translateY(-100%)" : "translateY(0)" }}
      >
        <span className="font-medium tracking-wide uppercase text-xs">
          OxyPlanner ya disponible<span className="hidden sm:inline"> — Planificación industrial con IA</span>
        </span>
        <Link
          href="/oxyplanner"
          className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#122D87]/80 hover:text-[#122D87] flex items-center gap-1 transition-colors"
        >
          Conocer más →
        </Link>
      </div>

      {/* ── Floating Navbar ── */}
      <div
        className="fixed left-0 right-0 z-50 flex justify-center px-4 pt-3 pb-2 pointer-events-none transition-all duration-300 ease-in-out"
        style={{ top: scrolled ? '0px' : '36px' }}
      >
        <header className="pointer-events-auto w-full max-w-5xl">
          {/* Pill container */}
          <nav className="bg-[#16162a]/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 h-14 flex items-center justify-between shadow-2xl relative">

            {/* Logo desktop — flujo normal, alineado a la izquierda */}
            <Link href="/" className="hidden lg:flex items-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/logo-v2-2.svg" alt="Oxygen" width={200} height={86} />
            </Link>

            {/* Logo mobile — centrado absolutamente + spacer para balancear hamburger */}
            <div className="lg:hidden w-10 flex-shrink-0" />
            <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center" aria-label="Oxygen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/logo-v2-2.svg" alt="" width={160} height={69} aria-hidden="true" />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Productos */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("productos")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
                  Productos
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === "productos" && "rotate-180")} />
                </button>
                {openDropdown === "productos" && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1.5">
                      {products.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center">
                            <p.icon className="w-4 h-4 text-[#818cf8]" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-[#a5b4fc] transition-colors">{p.name}</div>
                            <div className="text-xs text-white/50 mt-0.5">{p.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Industrias */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("industrias")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
                  Industrias
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === "industrias" && "rotate-180")} />
                </button>
                {openDropdown === "industrias" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[420px]">
                    <div className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2">
                      <div className="grid grid-cols-2 gap-0.5">
                        {industries.map((i) => (
                          <Link
                            key={i.name}
                            href={i.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center">
                              <i.icon className="w-3.5 h-3.5 text-[#818cf8]" />
                            </div>
                            <span className="text-sm text-white/70 group-hover:text-white transition-colors">{i.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recursos */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("recursos")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
                  Recursos
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === "recursos" && "rotate-180")} />
                </button>
                {openDropdown === "recursos" && (
                  <div className="absolute top-full left-0 pt-2 w-60">
                    <div className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1.5">
                      <Link
                        href="/recursos?filter=casos"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#818cf8]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#a5b4fc] transition-colors">Casos de éxito</div>
                          <div className="text-xs text-white/50 mt-0.5">Resultados reales en plantas reales</div>
                        </div>
                      </Link>
                      <Link
                        href="/recursos?filter=articulos"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-[#818cf8]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#a5b4fc] transition-colors">Artículos</div>
                          <div className="text-xs text-white/50 mt-0.5">Tendencias e inteligencia industrial</div>
                        </div>
                      </Link>
                      <Link
                        href="/recursos?filter=guias"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-[#818cf8]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#a5b4fc] transition-colors">Guías</div>
                          <div className="text-xs text-white/50 mt-0.5">Manuales prácticos de mantenimiento</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/nosotros" className="px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                Nosotros
              </Link>
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://suite.oxygen.tech/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                Iniciar sesión
              </a>
              <Link
                href="/nosotros#contacto"
                className="px-4 py-2 text-sm font-semibold bg-[#4361ee] text-white rounded-lg hover:bg-[#3451d1] transition-colors"
              >
                Contactar con ventas
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => { setMobileOpen(!mobileOpen); setOpenSection(null) }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile menu — accordion style */}
          {mobileOpen && (
            <div className="mt-2 bg-[#0d1226] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

              {/* ── PRODUCTOS ── */}
              <div>
                <button
                  onClick={() => toggleSection('productos')}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white">Productos</span>
                  <ChevronDown className={cn("w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200", openSection === 'productos' && "rotate-180")} />
                </button>
                {openSection === 'productos' && (
                  <div className="px-4 pb-4 pt-1 space-y-1 border-t border-white/5">
                    {products.map((p) => (
                      <Link key={p.name} href={p.href}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors"
                        onClick={closeMobileMenu}>
                        <div className="w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center flex-shrink-0">
                          <p.icon className="w-4 h-4 text-[#818cf8]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{p.name}</div>
                          <div className="text-xs text-white/40 mt-0.5">{p.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5" />

              {/* ── INDUSTRIAS ── */}
              <div>
                <button
                  onClick={() => toggleSection('industrias')}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white">Industrias</span>
                  <ChevronDown className={cn("w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200", openSection === 'industrias' && "rotate-180")} />
                </button>
                {openSection === 'industrias' && (
                  <div className="px-4 pb-4 pt-3 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-1">
                      {industries.map((i) => (
                        <Link key={i.name} href={i.href}
                          className="flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-colors"
                          onClick={closeMobileMenu}>
                          <div className="w-7 h-7 rounded-md bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center flex-shrink-0">
                            <i.icon className="w-3.5 h-3.5 text-[#818cf8]" />
                          </div>
                          <span className="text-sm text-white/70 leading-tight">{i.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5" />

              {/* ── RECURSOS ── */}
              <div>
                <button
                  onClick={() => toggleSection('recursos')}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white">Recursos</span>
                  <ChevronDown className={cn("w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200", openSection === 'recursos' && "rotate-180")} />
                </button>
                {openSection === 'recursos' && (
                  <div className="px-4 pb-4 pt-1 space-y-1 border-t border-white/5">
                    {[
                      { name: "Casos de éxito",  href: "/recursos?filter=casos",     icon: FileText, desc: "Resultados reales en plantas reales" },
                      { name: "Artículos",        href: "/recursos?filter=articulos", icon: BookOpen, desc: "Tendencias e inteligencia industrial" },
                      { name: "Guías",            href: "/recursos?filter=guias",     icon: BookOpen, desc: "Manuales prácticos de mantenimiento" },
                    ].map((r) => (
                      <Link key={r.name} href={r.href}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors"
                        onClick={closeMobileMenu}>
                        <div className="w-9 h-9 rounded-lg bg-[#4361ee]/20 border border-[#4361ee]/30 flex items-center justify-center flex-shrink-0">
                          <r.icon className="w-4 h-4 text-[#818cf8]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{r.name}</div>
                          <div className="text-xs text-white/40 mt-0.5">{r.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5" />

              {/* ── NOSOTROS — direct link ── */}
              <Link href="/nosotros"
                className="block px-6 py-5 text-lg font-bold text-white hover:bg-white/5 transition-colors"
                onClick={closeMobileMenu}>
                Nosotros
              </Link>

              {/* ── CTAs ── */}
              <div className="p-4 border-t border-white/10 space-y-2.5">
                <Link href="/nosotros#contacto"
                  className="block w-full py-4 text-center text-base font-bold bg-[#4361ee] text-white rounded-xl hover:bg-[#3451d1] transition-colors"
                  onClick={closeMobileMenu}>
                  Contactar con ventas
                </Link>
                <a href="https://suite.oxygen.tech/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
                  onClick={closeMobileMenu}>
                  Iniciar sesión →
                </a>
              </div>
            </div>
          )}
        </header>
      </div>
    </>
  )
}
