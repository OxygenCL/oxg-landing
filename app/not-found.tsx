import Link from "next/link"

export const metadata = {
  title: "Página no encontrada | Oxygen",
  description: "La página que buscas no existe.",
}

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 sm:px-6"
      style={{ background: "linear-gradient(135deg, #080f1a 0%, #0a1a3a 50%, #0d1f4a 100%)" }}
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4361ee 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">

        {/* 404 number */}
        <div
          className="font-bold leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            background: "linear-gradient(135deg, #4361ee, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>

        {/* Label chip */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#818cf8] mb-5">
          Página no encontrada
        </span>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-balance">
          Esta página no existe
        </h1>
        <p className="text-white/50 text-base leading-relaxed mb-10">
          La dirección que ingresaste no está disponible. Puede que haya sido movida, eliminada, o que el enlace esté incorrecto.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold bg-[#4361ee] text-white rounded-xl hover:bg-[#3451d1] transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/nosotros#contacto"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white/70 border border-white/15 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
          >
            Contactar soporte
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Quizás buscabas</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "OxyPulse",   href: "/oxypulse"   },
              { name: "OxyPlanner", href: "/oxyplanner" },
              { name: "Advisory",   href: "/advisory"   },
              { name: "Casos de éxito", href: "/recursos?filter=casos" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
