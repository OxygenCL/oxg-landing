import { Metadata } from "next"
import { LegalLayout, DocSection, DocSubtitle, DocList, DocHighlight } from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Política de Privacidad | Oxygen",
  description: "Conoce cómo Oxygen SPA recopila, trata y protege tus datos personales.",
}

const sections = [
  { id: "definiciones",       title: "Definiciones" },
  { id: "responsable",        title: "Identificación del Responsable" },
  { id: "datos",              title: "Información que Recopilamos" },
  { id: "finalidad",          title: "Finalidades y Usos" },
  { id: "email-marketing",    title: "Email Marketing" },
  { id: "gestion-comercial",  title: "Gestión Comercial" },
  { id: "base-juridica",      title: "Base Jurídica" },
  { id: "conservacion",       title: "Conservación de Datos" },
  { id: "derechos",           title: "Derechos del Titular" },
  { id: "seguridad",          title: "Seguridad de la Información" },
  { id: "cookies",            title: "Cookies" },
  { id: "cambios",            title: "Cambios en esta Política" },
  { id: "contacto",           title: "Contacto" },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      subtitle="Comprometidos con la protección de tus datos personales."
      date="abril 2026"
      sections={sections}
      otherLinks={[{ name: "Términos y Condiciones", href: "/terminos-y-condiciones" }]}
    >

      <DocSection id="definiciones" title="1. Definiciones">
        <p>
          A efectos de la presente Política de Privacidad, se entenderá por:
        </p>

        <div className="mt-4 space-y-4">
          {[
            {
              term: "Usuario o Titular",
              def: "Persona natural que accede, navega o interactúa con el sitio web de Oxygen, o que solicita información sobre sus productos y servicios."
            },
            {
              term: "Datos Personales",
              def: "Toda información sobre una persona natural identificada o identificable. Se considera identificable toda persona cuya identidad pueda determinarse, directa o indirectamente, en particular mediante un nombre, número de identificación, datos de localización u otros elementos propios de su identidad."
            },
            {
              term: "Tratamiento de Datos",
              def: "Cualquier operación o conjunto de operaciones realizadas sobre datos personales, ya sea por procedimientos automatizados o no, tales como la recolección, registro, almacenamiento, conservación, adaptación, modificación, extracción, consulta, utilización, comunicación o supresión."
            },
            {
              term: "Responsable del Tratamiento",
              def: "Persona natural o jurídica que, sola o conjuntamente con otros, determina los fines y los medios del tratamiento de datos personales. En el caso de la presente Política, el Responsable del Tratamiento es Oxygen SPA."
            },
            {
              term: "Encargado del Tratamiento",
              def: "Persona natural o jurídica, autoridad pública u otro organismo que trate datos personales por cuenta y bajo las instrucciones del Responsable del Tratamiento."
            },
            {
              term: "Consentimiento",
              def: "Manifestación de voluntad libre, específica, informada e inequívoca del Titular, mediante la que acepta el tratamiento de sus datos personales para una o varias finalidades determinadas."
            },
            {
              term: "Base de Datos",
              def: "Conjunto organizado de datos personales que sea objeto de tratamiento, automatizado o no, independientemente de la modalidad de su creación, almacenamiento, organización o acceso."
            },
            {
              term: "Política",
              def: "El presente documento de Política de Privacidad, en su versión vigente, publicado en el sitio web www.oxygen.tech."
            },
          ].map(({ term, def }) => (
            <div key={term} className="border-l-2 border-gray-100 pl-4">
              <span className="font-bold text-gray-800 text-sm">{term}: </span>
              <span className="text-gray-600 text-sm leading-relaxed">{def}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="responsable" title="2. Identificación del Responsable">
        <p>
          En cumplimiento de la legislación vigente en materia de protección de datos, Oxygen SPA
          (en adelante, <strong>"Oxygen"</strong>) pone a disposición del Usuario la presente Política de Privacidad,
          que regula la recopilación y tratamiento de los datos personales facilitados a través del sitio web
          <strong> www.oxygen.tech</strong> y sus subdominios.
        </p>
        <DocList items={[
          "Razón social: Oxygen SPA",
          "Domicilio: Av. Presidente Kennedy 5488, Torre Sur, Piso 15, Vitacura, Región Metropolitana, Chile",
          "Correo de contacto: contacto@oxygen.tech",
          "Sitio web: www.oxygen.tech",
        ]} />
        <p>
          Oxygen actúa como Responsable del Tratamiento de los datos personales recabados a través de los
          formularios y demás vías de contacto habilitadas en su sitio web.
        </p>
      </DocSection>

      <DocSection id="datos" title="3. Información que Recopilamos">
        <p>
          Oxygen puede recopilar las siguientes categorías de datos personales cuando el Usuario interactúa
          con el sitio web:
        </p>

        <DocSubtitle>Datos proporcionados voluntariamente</DocSubtitle>
        <p>
          A través de los formularios habilitados en el Sitio, el Usuario puede facilitar datos identificativos
          y de contacto, entre los que se incluyen:
        </p>
        <DocList items={[
          "Nombre y apellido",
          "Dirección de correo electrónico",
          "Número de teléfono o celular",
          "Nombre de la empresa u organización",
          "Cargo o rol dentro de la empresa",
          "Industria o sector productivo",
          "Mensaje o consulta ingresada voluntariamente",
        ]} />

        <DocSubtitle>Datos recopilados automáticamente</DocSubtitle>
        <p>
          Con fines estadísticos y de mejora continua del Sitio, se pueden recopilar automáticamente
          ciertos datos técnicos y de comportamiento de navegación:
        </p>
        <DocList items={[
          "Dirección IP y datos de geolocalización aproximada",
          "Tipo y versión de navegador y sistema operativo",
          "Tipo de dispositivo utilizado para el acceso",
          "Páginas visitadas, tiempo de permanencia y acciones realizadas",
          "Origen del tráfico (búsqueda orgánica, referidos, acceso directo, etc.)",
        ]} />
        <p>
          Esta información es procesada de forma agregada y no identifica personalmente al Usuario,
          salvo que se combine con otros datos facilitados directamente por el mismo.
        </p>
      </DocSection>

      <DocSection id="finalidad" title="4. Finalidades y Usos de los Datos">
        <p>
          Oxygen realizará operaciones que incluyen recolección de datos personales, su almacenamiento,
          uso, circulación y/o supresión. Dicho tratamiento se realizará exclusivamente para las
          finalidades autorizadas y previstas en la presente Política. Los datos serán tratados de
          acuerdo con el grupo de interés al que pertenece el Titular y en proporción a las finalidades
          aplicables, como se describe a continuación:
        </p>

        {/* ── Visitantes ── */}
        <div className="mt-6 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#f8faff" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ background: "#4361ee15" }}>🌐</span>
            <span className="font-bold text-gray-800 text-sm">Visitantes del Sitio Web</span>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              "Análisis estadístico y medición del tráfico para mejorar la experiencia de navegación.",
              "Personalización de contenidos y secciones según el comportamiento de navegación.",
              "Evaluación del rendimiento del Sitio y detección de errores técnicos.",
              "Gestión de preferencias de cookies y configuraciones de sesión.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: "#4361ee12" }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#4361ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clientes potenciales ── */}
        <div className="mt-4 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#f8faff" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ background: "#4361ee15" }}>🎯</span>
            <span className="font-bold text-gray-800 text-sm">Clientes Potenciales (Prospectos)</span>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              "Fines comerciales, informativos y de mercadeo relacionados con los productos y servicios de Oxygen.",
              "Envío de comunicaciones electrónicas con contenido de valor: artículos, guías, casos de éxito e invitaciones a eventos.",
              "Incorporación a la base de datos de Oxygen para campañas de email marketing, con posibilidad de cancelar la suscripción en cualquier momento.",
              "Gestión y seguimiento de la consulta o solicitud de información recibida.",
              "Segmentación por industria, tamaño de empresa y perfil para personalizar la propuesta comercial.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: "#4361ee12" }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#4361ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clientes ── */}
        <div className="mt-4 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#f8faff" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ background: "#4361ee15" }}>🏭</span>
            <span className="font-bold text-gray-800 text-sm">Clientes</span>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              "Gestión del contrato y administración de la relación comercial vigente.",
              "Prestación de los servicios contratados: implementación, soporte técnico y acompañamiento continuo.",
              "Envío de comunicaciones relacionadas con el producto: actualizaciones, mejoras, mantenimientos programados y avisos de servicio.",
              "Gestión de procesos contables, tributarios y de facturación asociados a la relación contractual.",
              "Acceso a recursos de capacitación, documentación técnica, webinars y guías operativas.",
              "Participación voluntaria en programas de casos de éxito, testimonios o reseñas, previo consentimiento expreso del Titular.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: "#4361ee12" }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#4361ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Proveedores ── */}
        <div className="mt-4 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#f8faff" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ background: "#4361ee15" }}>🤝</span>
            <span className="font-bold text-gray-800 text-sm">Proveedores y Colaboradores</span>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              "Gestión de los procesos de selección, contratación y relaciones contractuales.",
              "Cumplimiento de obligaciones contables, tributarias y legales aplicables.",
              "Gestión de pagos, emisión de certificados y documentación financiera asociada.",
              "Mantenimiento de un archivo digital con la información correspondiente a cada relación contractual.",
              "Emisión de certificaciones solicitadas por los colaboradores o requeridas por entes reguladores.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: "#4361ee12" }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#4361ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs text-gray-400">
          Los datos no serán utilizados para ninguna finalidad distinta a las descritas en cada grupo,
          ni cedidos a terceros fuera de las condiciones estipuladas en la presente Política.
        </p>
      </DocSection>

      <DocSection id="email-marketing" title="5. Email Marketing">
        <p>
          Al completar un formulario en el Sitio, el Usuario presta su consentimiento para el envío de
          comunicaciones electrónicas de carácter comercial, informativo o educativo, que pueden incluir:
        </p>
        <DocList items={[
          "Novedades sobre los productos OxyPulse, OxyPlanner y Advisory",
          "Casos de éxito, guías y contenido técnico del sector industrial",
          "Actualizaciones relevantes sobre la plataforma Oxygen",
          "Invitaciones a eventos, webinars y demostraciones de producto",
          "Contenido de valor orientado a la industria y la gestión de mantenimiento",
        ]} />

        <DocSubtitle>Derecho a cancelar la suscripción</DocSubtitle>
        <p>
          El Usuario podrá revocar su consentimiento y cancelar la suscripción a las comunicaciones
          comerciales en cualquier momento, de forma sencilla y gratuita, mediante el enlace de cancelación
          habilitado al pie de cada correo enviado por Oxygen. Una vez ejercido este derecho, Oxygen
          cesará el envío de comunicaciones en el plazo máximo de 10 días hábiles.
        </p>
        <p>
          Para la gestión y distribución de comunicaciones electrónicas, Oxygen podrá apoyarse en
          plataformas tecnológicas de terceros que actúan en calidad de Encargados del Tratamiento,
          bajo las instrucciones expresas de Oxygen y sujetos a obligaciones de confidencialidad.
        </p>
      </DocSection>

      <DocSection id="gestion-comercial" title="6. Gestión Comercial">
        <p>
          Cuando el Usuario manifiesta interés en los productos o servicios de Oxygen mediante el
          envío de un formulario de contacto, sus datos podrán ser objeto de tratamiento con fines
          de atención comercial. Dicho tratamiento comprende:
        </p>
        <DocList items={[
          "La gestión de la consulta o solicitud de información recibida.",
          "El registro y organización de los datos del Usuario en los sistemas internos de gestión comercial de Oxygen, con el fin de centralizar y garantizar una atención adecuada.",
          "El seguimiento de la relación comercial a lo largo del tiempo, incluyendo información relativa a la empresa, industria y necesidades manifestadas por el Usuario.",
          "La asignación de la gestión a un representante del equipo de Oxygen, según corresponda.",
        ]} />
        <DocHighlight>
          Oxygen garantiza que los datos tratados con fines de gestión comercial no serán divulgados
          públicamente ni cedidos a terceros ajenos a la organización sin el consentimiento expreso del
          Titular. El acceso a esta información queda restringido al personal interno habilitado para ello.
        </DocHighlight>
      </DocSection>

      <DocSection id="base-juridica" title="7. Base Jurídica del Tratamiento">
        <p>
          El tratamiento de datos personales realizado por Oxygen se fundamenta en la
          <strong> Ley N° 19.628 sobre Protección de la Vida Privada</strong> de la República de Chile,
          y en los principios de lealtad, finalidad, proporcionalidad y seguridad que rigen el tratamiento
          de datos personales en el ordenamiento jurídico chileno.
        </p>
        <p>La legitimación para el tratamiento de datos descansa en las siguientes bases:</p>
        <DocList items={[
          "El consentimiento libre, informado y expreso del Titular, otorgado al completar y enviar los formularios habilitados en el Sitio.",
          "El interés legítimo de Oxygen en la gestión de relaciones comerciales con sus prospectos y clientes, siempre que dicho interés no prevalezca sobre los derechos del Titular.",
          "El cumplimiento de obligaciones legales, cuando así lo exija la normativa aplicable.",
        ]} />
      </DocSection>

      <DocSection id="conservacion" title="8. Conservación de los Datos">
        <p>
          Los datos personales serán conservados durante el tiempo estrictamente necesario para cumplir
          con las finalidades para las que fueron recabados y, en todo caso, durante los plazos que
          exija la legislación aplicable.
        </p>
        <DocList items={[
          "Datos con fines de comunicaciones comerciales: se conservarán mientras el Usuario no revoque su consentimiento o solicite su supresión.",
          "Datos con fines de gestión comercial: se conservarán mientras exista una relación comercial activa o potencial con el Titular, o hasta que este ejerza su derecho de cancelación.",
          "Datos técnicos y de navegación: se conservan de forma agregada por un plazo máximo de 24 meses.",
        ]} />
        <p>
          Transcurridos dichos plazos, los datos serán eliminados de forma segura o anonimizados
          de manera irreversible, imposibilitando su asociación al Titular.
        </p>
      </DocSection>

      <DocSection id="derechos" title="9. Derechos del Titular">
        <p>
          En virtud de la Ley N° 19.628 y la normativa vigente, el Titular de los datos personales
          tiene derecho a:
        </p>
        <DocList items={[
          "Acceso: conocer qué datos personales trata Oxygen sobre su persona, el origen de los mismos y las finalidades del tratamiento.",
          "Rectificación: solicitar la corrección de datos inexactos, incompletos o desactualizados.",
          "Cancelación: solicitar la eliminación de sus datos cuando estos ya no sean necesarios para los fines para los que fueron recabados, o cuando retire su consentimiento.",
          "Oposición: oponerse al tratamiento de sus datos en los casos legalmente previstos, incluyendo el envío de comunicaciones comerciales.",
          "Portabilidad: solicitar una copia de sus datos en formato estructurado, de uso común y lectura mecánica.",
        ]} />
        <p>
          Para ejercer cualquiera de estos derechos, el Titular deberá dirigir una solicitud escrita
          al correo <strong>contacto@oxygen.tech</strong>, indicando su nombre completo, datos de contacto
          y el derecho que desea ejercer. Oxygen dará respuesta en el plazo máximo de 30 días hábiles.
        </p>
      </DocSection>

      <DocSection id="seguridad" title="10. Seguridad de la Información">
        <p>
          Oxygen adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad
          e integridad de los datos personales tratados, previniendo su alteración, pérdida, tratamiento
          o acceso no autorizado.
        </p>
        <DocList items={[
          "Transmisión de datos cifrada mediante protocolo HTTPS/TLS.",
          "Control de acceso basado en roles y perfiles de usuario autorizados.",
          "Uso de infraestructura tecnológica con estándares de seguridad certificados.",
          "Evaluación y revisión periódica de los procedimientos y medidas de seguridad.",
          "Formación y sensibilización continua del equipo en materia de protección de datos.",
        ]} />
        <p>
          Sin perjuicio de lo anterior, Oxygen no puede garantizar la seguridad absoluta de las
          comunicaciones realizadas a través de Internet. La transmisión de datos por parte del
          Usuario se realiza bajo su propia responsabilidad.
        </p>
      </DocSection>

      <DocSection id="cookies" title="11. Cookies y Tecnologías Similares">
        <p>
          El Sitio puede utilizar cookies y tecnologías similares con el fin de mejorar la experiencia
          de navegación, analizar el uso del Sitio y personalizar contenidos. Una cookie es un archivo
          de pequeño tamaño que se almacena en el dispositivo del Usuario al acceder a determinadas
          páginas web.
        </p>

        <DocSubtitle>Tipos de cookies utilizadas</DocSubtitle>
        <DocList items={[
          "Cookies técnicas o esenciales: imprescindibles para el funcionamiento básico del Sitio.",
          "Cookies analíticas: permiten medir y analizar el comportamiento agregado de los usuarios con fines estadísticos y de mejora del Sitio.",
          "Cookies de preferencias: almacenan configuraciones seleccionadas por el Usuario para personalizar su experiencia.",
        ]} />

        <DocSubtitle>Gestión y desactivación de cookies</DocSubtitle>
        <p>
          El Usuario puede configurar su navegador para aceptar, rechazar o eliminar cookies en
          cualquier momento. La desactivación de determinadas cookies técnicas puede afectar al
          correcto funcionamiento del Sitio.
        </p>
      </DocSection>

      <DocSection id="cambios" title="12. Cambios en esta Política">
        <p>
          Oxygen se reserva el derecho de actualizar o modificar la presente Política de Privacidad
          en cualquier momento, sin necesidad de notificación previa al Usuario. Todo cambio será
          publicado en esta misma página con la fecha de actualización correspondiente.
        </p>
        <p>
          El uso continuado del Sitio tras la publicación de modificaciones implica la aceptación de
          la versión actualizada de la Política. Se recomienda al Usuario revisar periódicamente
          este documento para mantenerse informado.
        </p>
      </DocSection>

      <DocSection id="contacto" title="13. Contacto">
        <p>
          Para cualquier consulta, solicitud o reclamación relacionada con el tratamiento de sus
          datos personales, el Usuario puede contactar a Oxygen a través de los siguientes medios:
        </p>
        <DocList items={[
          "Correo electrónico: contacto@oxygen.tech",
          "Dirección postal: Av. Presidente Kennedy 5488, Torre Sur, Piso 15, Vitacura, Región Metropolitana, Chile",
        ]} />
        <p>
          Oxygen se compromete a atender todas las consultas en el menor plazo posible y, en todo
          caso, dentro de los plazos establecidos por la legislación vigente.
        </p>
      </DocSection>

    </LegalLayout>
  )
}
