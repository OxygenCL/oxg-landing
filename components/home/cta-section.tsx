import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0A2434]">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-bg2.mp4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,36,52,0.45) 0%, rgba(10,36,52,0.35) 50%, rgba(10,36,52,0.6) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
          Reimagina cómo opera tu planta.
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Únete a los equipos industriales que ya toman decisiones con datos.
        </p>
        <Link
          href="/nosotros#contacto"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-[#122D87] rounded-lg hover:bg-gray-100 transition-colors"
        >
          Contactar con ventas
        </Link>
        <p className="mt-4 text-sm text-white/60">
          Sin compromisos · Respuesta en menos de 24 horas
        </p>
      </div>
    </section>
  )
}
