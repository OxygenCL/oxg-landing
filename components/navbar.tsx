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
  { name: "Metalmecánica",         href: "/soluciones/metalmecanica", icon: Settings2    },
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
  const [scrolled, setScrolled] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

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
          OxyPlanner ya disponible — Planificación industrial con IA
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
          <nav className="bg-[#16162a]/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 h-14 flex items-center justify-between shadow-2xl">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/logo-v2-2.svg" alt="Oxygen" width={200} height={86} />
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
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile menu — debajo del pill */}
          {mobileOpen && (
            <div className="mt-2 bg-[#16162a]/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 space-y-1">
                <div className="text-xs font-semibold text-white/40 uppercase tracking-widest px-3 pb-2">Productos</div>
                {products.map((p) => (
                  <Link key={p.name} href={p.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <p.icon className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-sm font-medium">{p.name}</span>
                  </Link>
                ))}

                <div className="text-xs font-semibold text-white/40 uppercase tracking-widest px-3 pb-2 pt-3">Industrias</div>
                {industries.map((i) => (
                  <Link key={i.name} href={i.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <i.icon className="w-4 h-4 text-[#818cf8] flex-shrink-0" />
                    {i.name}
                  </Link>
                ))}

                <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-widest px-3 pb-1">Recursos</div>
                  <Link href="/recursos?filter=casos"
                    className="flex items-center gap-3 px-3 py-2.5 text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <FileText className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-sm font-medium">Casos de éxito</span>
                  </Link>
                  <Link href="/recursos?filter=articulos"
                    className="flex items-center gap-3 px-3 py-2.5 text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <BookOpen className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-sm font-medium">Artículos</span>
                  </Link>
                  <Link href="/recursos?filter=guias"
                    className="flex items-center gap-3 px-3 py-2.5 text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <BookOpen className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-sm font-medium">Guías</span>
                  </Link>
                  <Link href="/nosotros"
                    className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}>Nosotros</Link>
                </div>

                <div className="border-t border-white/10 pt-3 mt-2 space-y-2">
                  <a href="https://suite.oxygen.tech/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 text-center text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setMobileOpen(false)}>Iniciar sesión</a>
                  <Link href="/nosotros#contacto"
                    className="block w-full px-4 py-3 text-center text-sm font-semibold bg-[#4361ee] text-white rounded-lg hover:bg-[#3451d1] transition-colors"
                    onClick={() => setMobileOpen(false)}>Contactar con ventas</Link>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>
    </>
  )
}
