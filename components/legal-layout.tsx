"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export interface LegalSection {
  id: string
  title: string
}

interface LegalLayoutProps {
  title: string
  subtitle?: string
  date: string
  sections: LegalSection[]
  otherLinks?: { name: string; href: string }[]
  children: React.ReactNode
}

export function LegalLayout({ title, subtitle, date, sections, otherLinks = [], children }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb" }}>

      {/* ── Header ── */}
      <div
        className="pt-36 pb-14"
        style={{ background: "linear-gradient(135deg, #080f1a 0%, #0d1f4a 60%, #122D87 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-white/40 hover:text-white/70 text-xs transition-colors">Inicio</Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-white/50 text-xs">Legal</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#818cf8] mb-3 block">
            Documento Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
          {subtitle && <p className="text-white/60 text-base mt-2 max-w-xl">{subtitle}</p>}
          <p className="text-white/30 text-xs mt-4">Última actualización: {date}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* flex sin items-start → aside se estira al alto del artículo, sticky funciona en toda la página */}
        <div className="flex gap-8 lg:gap-12">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto flex flex-col gap-6 pb-4">

              {/* CONTENIDOS */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Contenidos
                </p>
                <nav className="space-y-0.5">
                  {sections.map(({ id, title: t }) => {
                    const active = activeSection === id
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="flex items-center gap-2.5 py-1.5 text-sm transition-colors group"
                      >
                        {/* dash indicator */}
                        <span
                          className="flex-shrink-0 w-4 h-px transition-all duration-200"
                          style={{ background: active ? "#4361ee" : "#d1d5db", height: 2, borderRadius: 2 }}
                        />
                        <span
                          className="leading-snug transition-colors duration-150"
                          style={{ color: active ? "#4361ee" : "#6b7280", fontWeight: active ? 600 : 400 }}
                        >
                          {t}
                        </span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Otros documentos */}
              {otherLinks.length > 0 && (
                <div className="pt-5 border-t border-gray-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Otros documentos
                  </p>
                  <nav className="space-y-0.5">
                    {otherLinks.map(({ name, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-2.5 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors group"
                      >
                        <span className="flex-shrink-0 w-4" style={{ height: 2, background: "#e5e7eb", borderRadius: 2 }} />
                        {name}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              {/* CTA */}
              <div className="pt-5 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">¿Tienes alguna duda?</p>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Nuestro equipo puede ayudarte con cualquier consulta legal.
                </p>
                <Link
                  href="/nosotros#contacto"
                  className="block w-full py-3 px-4 text-sm font-bold text-center text-white rounded-xl transition-colors"
                  style={{ background: "#4361ee" }}
                >
                  Hablar con el equipo
                </Link>
              </div>

            </div>
          </aside>

          {/* ── Article ── */}
          <article className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-10 lg:p-12">
            {children}
          </article>

        </div>
      </div>
    </div>
  )
}

/* ─── Content helpers ─────────────────────────────────────────────────────── */

export function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-32">
      <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">{title}</h2>
      <div className="space-y-4 text-gray-600 text-sm leading-7">{children}</div>
    </section>
  )
}

export function DocSubtitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mt-6 mb-2">{children}</h3>
}

export function DocList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center bg-[#4361ee]/10">
            <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.5l2 2 4-4" stroke="#4361ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DocHighlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 my-4 border-l-4 text-sm leading-relaxed" style={{ background: "#eff6ff", borderColor: "#4361ee", color: "#1e3a8a" }}>
      {children}
    </div>
  )
}
