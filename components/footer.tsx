import Link from "next/link"

const industrias = [
  { name: "Metalmecánica",          href: "/soluciones/metalmecanico" },
  { name: "Alimentos y Bebidas",    href: "/soluciones/alimentos"     },
  { name: "Minería",                href: "/soluciones/mineria"       },
  { name: "Logística",              href: "/soluciones/logistica"     },
  { name: "Forestal",               href: "/soluciones/forestal"      },
  { name: "Agrícola",               href: "/soluciones/agricola"      },
  { name: "Construcción",           href: "/soluciones/construccion"  },
  { name: "Energía",                href: "/soluciones/energia"       },
  { name: "Pesquero y Acuicultura", href: "/soluciones/pesquero"      },
  { name: "Manufacturera",          href: "/soluciones/manufactura"   },

  { name: "Retail y Facilities",    href: "/soluciones/retail"        },
]

// Split into 2 columns of 6
const col1 = industrias.slice(0, 6)
const col2 = industrias.slice(6)

export function Footer() {
  return (
    <footer style={{ background: "#080f1a" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top: brand + nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr_1fr_1fr] gap-8 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="block overflow-hidden mb-3" style={{ height: 36 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/logo-v2-2.svg" alt="Oxygen" width={200} style={{ marginTop: -24 }} />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[260px]">
              La plataforma que usan las mejores plantas de LATAM para mantener, planificar y decidir con inteligencia.
            </p>
            {/* CTA pill */}
            <Link
              href="/nosotros#contacto"
              className="inline-flex mt-4 px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              Contactar con ventas →
            </Link>
          </div>

          {/* Productos */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-4">Productos</p>
            <ul className="space-y-2.5">
              {[
                { name: "OxyPulse",   href: "/oxypulse"   },
                { name: "OxyPlanner", href: "/oxyplanner" },
                { name: "Advisory",   href: "/advisory"   },

              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industrias — 2 columns */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-4">Industrias</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {col1.map((l) => (
                <Link key={l.name} href={l.href} className="text-white/55 hover:text-white text-sm transition-colors truncate">
                  {l.name}
                </Link>
              ))}
              {col2.map((l) => (
                <Link key={l.name} href={l.href} className="text-white/55 hover:text-white text-sm transition-colors truncate">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Recursos */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-4">Recursos</p>
            <ul className="space-y-2.5">
              {[
                { name: "Artículos",      href: "/recursos?filter=articulos" },
                { name: "Casos de éxito", href: "/recursos?filter=casos"     },
                { name: "Guías",          href: "/recursos?filter=guias"     },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-4">Empresa</p>
            <ul className="space-y-2.5">
              {[
                { name: "Nosotros",            href: "/nosotros"          },
                { name: "Contacto",            href: "/nosotros#contacto" },
                { name: "Trabaja con nosotros",href: "/nosotros#careers"  },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-white/55 hover:text-white text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Respaldado por */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">Respaldado por</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Startup Chile.png"
                alt="Startup Chile"
                style={{ height: 40, width: "auto", opacity: 0.5, filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2026, OXYGEN SPA | Todos los Derechos Reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/politica-de-privacidad" className="text-white/30 hover:text-white/70 text-xs transition-colors">Privacidad</Link>
            <Link href="/terminos-y-condiciones" className="text-white/30 hover:text-white/70 text-xs transition-colors">Términos</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
