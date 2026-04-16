import { Shield, Plug } from "lucide-react"

const integrations = [
  "Tekla",
  "Strumis",
  "SAP",
  "IBM",
  "Microsoft Dynamics AX",
]

export function IntegrationSection() {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#122D87] uppercase tracking-widest mb-4">
            INTEGRACIÓN Y SEGURIDAD
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Conecta con <span style={{ color: "#4361ee" }}>seguridad</span> y escala con <span style={{ color: "#4361ee" }}>confianza</span>
          </h2>
        </div>

        {/* Integration logos marquee */}
        <div className="relative overflow-hidden mb-16">
          <div className="flex animate-marquee-slow">
            {[...integrations, ...integrations].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 flex items-center justify-center"
              >
                <div className="h-12 px-8 flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm">
                  <span className="text-gray-600 font-medium whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[#122D87]/10 flex items-center justify-center mb-4">
              <Plug className="w-6 h-6 text-[#122D87]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Integración de sistemas
            </h3>
            <p className="text-gray-600">
              Se conecta a tus sistemas IT y OT existentes de forma rápida y confiable. Con configuración mínima y sin interrumpir la producción activa.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[#122D87]/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#122D87]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Seguridad empresarial
            </h3>
            <p className="text-gray-600">
              Asegura que tus datos y nuestros sistemas permanezcan seguros a través de seguridad de nivel empresarial y diseño preparado para compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
