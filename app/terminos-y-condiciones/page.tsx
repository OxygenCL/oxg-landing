import { Metadata } from "next"
import { LegalLayout, DocSection, DocSubtitle, DocList, DocHighlight } from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Oxygen",
  description: "Condiciones de uso del sitio web y los servicios de Oxygen SPA.",
}

const sections = [
  { id: "aceptacion",             title: "Aceptación de los Términos" },
  { id: "titular",                title: "Identificación del Titular" },
  { id: "propiedad-intelectual",  title: "Propiedad Intelectual y Marcas" },
  { id: "uso-sitio",              title: "Uso del Sitio Web" },
  { id: "productos",              title: "Productos y Servicios" },
  { id: "responsabilidad",        title: "Exención de Responsabilidad" },
  { id: "modificaciones",         title: "Modificaciones del Sitio" },
  { id: "ley",                    title: "Ley Aplicable y Jurisdicción" },
  { id: "contacto",               title: "Contacto" },
]

export default function TermsPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      subtitle="Condiciones que regulan el uso del sitio web y los servicios de Oxygen."
      date="abril 2026"
      sections={sections}
      otherLinks={[{ name: "Política de Privacidad", href: "/politica-de-privacidad" }]}
    >

      <DocSection id="aceptacion" title="1. Aceptación de los Términos">
        <p>
          El acceso y uso del sitio web <strong>www.oxygen.tech</strong> y sus subdominios (en adelante,
          el <strong>"Sitio"</strong>) implica la aceptación plena y sin reservas de los presentes
          Términos y Condiciones de Uso (en adelante, los <strong>"Términos"</strong>).
        </p>
        <p>
          Si el usuario no está de acuerdo con alguna de las condiciones aquí establecidas, deberá
          abstenerse de acceder y utilizar el Sitio. El uso continuado del Sitio constituye la
          aceptación expresa y actualizada de los Términos vigentes en cada momento.
        </p>
        <DocHighlight>
          El acceso al Sitio es gratuito, salvo en lo relativo al coste de la conexión a Internet
          que corre por cuenta del usuario.
        </DocHighlight>
      </DocSection>

      <DocSection id="titular" title="2. Identificación del Titular">
        <p>
          El presente Sitio es titularidad de Oxygen SPA, empresa constituida bajo las leyes de la
          República de Chile, cuyos datos identificativos son:
        </p>
        <DocList items={[
          "Razón social: Oxygen SPA",
          "Domicilio: Av. Presidente Kennedy 5488, Torre Sur, Piso 15, Vitacura, Región Metropolitana, Chile",
          "Correo electrónico: contacto@oxygen.tech",
          "Sitio web: www.oxygen.tech",
        ]} />
        <p>
          Oxygen SPA opera bajo la marca comercial <strong>Oxygen</strong> y sus derivados. Para más
          información sobre la titularidad de las marcas, véase la sección de Propiedad Intelectual.
        </p>
      </DocSection>

      <DocSection id="propiedad-intelectual" title="3. Propiedad Intelectual y Marcas">
        <p>
          Todos los contenidos del Sitio —incluyendo, sin limitación, textos, gráficos, logotipos,
          íconos, imágenes, archivos de audio, descargas digitales, datos compilados y software— son
          propiedad de Oxygen SPA o de sus proveedores de contenido, y están protegidos por las leyes
          de propiedad intelectual e industrial vigentes en la República de Chile y demás países.
        </p>

        <DocSubtitle>Marcas registradas y nombres comerciales</DocSubtitle>
        <p>
          Oxygen es una marca registrada de <strong>Oxygen SPA</strong>. Asimismo, los siguientes
          nombres comerciales, marcas y denominaciones utilizadas en el Sitio, en los productos y/o
          en las comunicaciones de la empresa, son propiedad exclusiva de Oxygen SPA:
        </p>
        <DocList items={[
          "Oxygen",
          "OxyPulse",
          "OxyPlanner",
          "Oxygen Intelligence",
          "Oxygen Tech",
          "Oxy",
        ]} />
        <DocHighlight>
          Queda expresamente prohibida la reproducción, distribución, modificación, comunicación
          pública o cualquier otro uso —total o parcial— de las marcas, logotipos, nombres
          comerciales o cualquier otro signo distintivo de Oxygen sin autorización previa y
          escrita de Oxygen SPA. El uso no autorizado de cualquier denominación que incluya total
          o parcialmente una o varias de las marcas de Oxygen dará lugar a las acciones legales
          correspondientes en materia civil y penal.
        </DocHighlight>

        <DocSubtitle>Contenidos del Sitio</DocSubtitle>
        <p>
          Queda prohibida la reproducción total o parcial del Sitio, así como la transmisión
          electrónica o por cualquier otro medio de ninguno de los contenidos en él publicados sin
          la autorización expresa de Oxygen SPA. Se prohíbe también cualquier tipo de enlace,
          hiperenlace o conexión al Sitio sin consentimiento previo y por escrito.
        </p>
      </DocSection>

      <DocSection id="uso-sitio" title="4. Uso del Sitio Web">
        <p>
          El usuario se compromete a hacer un uso adecuado y lícito del Sitio, de conformidad con
          la legislación aplicable y los presentes Términos.
        </p>

        <DocSubtitle>Usos permitidos</DocSubtitle>
        <DocList items={[
          "Navegar e informarse sobre los productos y servicios de Oxygen.",
          "Completar formularios de contacto con información verídica y actualizada.",
          "Descargar materiales expresamente habilitados para ello.",
          "Compartir contenido del Sitio respetando la autoría y sin fines comerciales.",
        ]} />

        <DocSubtitle>Usos prohibidos</DocSubtitle>
        <p>
          Queda expresamente prohibido:
        </p>
        <DocList items={[
          "Utilizar el Sitio con fines ilegales, fraudulentos o contrarios a la buena fe.",
          "Reproducir, copiar, distribuir o explotar comercialmente cualquier contenido del Sitio sin autorización.",
          "Introducir o difundir virus informáticos, malware o cualquier elemento dañino.",
          "Intentar acceder a áreas restringidas del Sitio o sus sistemas informáticos.",
          "Realizar scraping masivo o automatizado de contenidos.",
          "Suplantar la identidad de Oxygen o de sus representantes.",
          "Utilizar los datos de contacto de Oxygen para fines distintos a los previstos.",
        ]} />
        <p>
          Oxygen se reserva el derecho de denegar o retirar el acceso al Sitio a cualquier usuario
          que incumpla los presentes Términos, sin necesidad de aviso previo.
        </p>
      </DocSection>

      <DocSection id="productos" title="5. Productos y Servicios">
        <p>
          A través del Sitio, Oxygen presenta información sobre sus productos y servicios, entre los que se incluyen:
        </p>
        <DocList items={[
          "OxyPulse: software CMMS para la gestión de mantenimiento industrial.",
          "OxyPlanner: plataforma de planificación de operaciones y producción con inteligencia artificial.",
          "Advisory: servicio de diagnóstico e implementación industrial acompañada.",
          "Oxygen Intelligence: capa de inteligencia artificial integrada a la suite Oxygen.",
        ]} />
        <p>
          La información publicada en el Sitio sobre precios, características y condiciones de los productos
          tiene carácter meramente informativo y puede ser modificada por Oxygen en cualquier momento sin
          aviso previo. La contratación efectiva de cualquier producto o servicio queda sujeta a los contratos
          o acuerdos comerciales específicos que se suscriban entre las partes.
        </p>
      </DocSection>

      <DocSection id="responsabilidad" title="6. Exención de Responsabilidad">
        <p>
          Oxygen pone el máximo cuidado en mantener el Sitio actualizado y disponible, pero no garantiza
          la disponibilidad ininterrumpida ni la ausencia de errores en los contenidos.
        </p>

        <DocSubtitle>Exactitud de la información</DocSubtitle>
        <p>
          Oxygen no será responsable de los daños o perjuicios derivados del uso de información
          incorrecta, incompleta u obsoleta publicada en el Sitio. El usuario es responsable de
          verificar la exactitud de la información antes de tomar cualquier decisión basada en ella.
        </p>

        <DocSubtitle>Disponibilidad del Sitio</DocSubtitle>
        <p>
          Oxygen no garantiza la disponibilidad continua del Sitio ni se responsabiliza de
          interrupciones por causas técnicas, de mantenimiento, de seguridad o de fuerza mayor.
        </p>

        <DocSubtitle>Sitios de terceros</DocSubtitle>
        <p>
          El Sitio puede contener enlaces a sitios web de terceros. Oxygen no asume ninguna
          responsabilidad sobre el contenido, la veracidad o la disponibilidad de dichos sitios, ni
          sobre los daños que puedan derivarse de su acceso o uso.
        </p>
      </DocSection>

      <DocSection id="modificaciones" title="7. Modificaciones del Sitio y los Términos">
        <DocHighlight>
          Oxygen se reserva el derecho de realizar cambios, actualizaciones o modificaciones en el
          Sitio web, sus contenidos, funcionalidades y los presentes Términos en cualquier momento y
          sin obligación de notificación previa a ningún visitante, usuario o cliente.
        </DocHighlight>
        <p>
          La versión actualizada de los Términos será publicada en esta misma página con la fecha
          de actualización correspondiente. El uso continuado del Sitio tras la publicación de
          cualquier cambio implica la aceptación plena de los nuevos Términos.
        </p>
        <p>
          Oxygen también podrá suspender o discontinuar el Sitio o cualquiera de sus secciones en
          cualquier momento, sin responsabilidad frente a los usuarios.
        </p>
      </DocSection>

      <DocSection id="ley" title="8. Ley Aplicable y Jurisdicción">
        <p>
          Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes
          de la República de Chile, con especial sujeción a:
        </p>
        <DocList items={[
          "Ley N° 19.628 sobre Protección de la Vida Privada",
          "Ley N° 19.496 sobre Protección de los Derechos de los Consumidores",
          "Ley N° 19.039 sobre Propiedad Industrial",
          "Ley N° 17.336 sobre Propiedad Intelectual",
        ]} />
        <p>
          Para la resolución de cualquier controversia derivada del acceso, uso o interpretación del
          Sitio o de los presentes Términos, las partes se someten a la jurisdicción de los Tribunales
          de Justicia competentes de la ciudad de Santiago de Chile, renunciando expresamente a
          cualquier otro fuero que pudiera corresponderles.
        </p>
      </DocSection>

      <DocSection id="contacto" title="9. Contacto">
        <p>
          Para cualquier consulta, notificación o reclamación relacionada con los presentes Términos
          y Condiciones o con el uso del Sitio, puede contactar a Oxygen a través de:
        </p>
        <DocList items={[
          "Correo electrónico: contacto@oxygen.tech",
          "Dirección postal: Av. Presidente Kennedy 5488, Torre Sur, Piso 15, Vitacura, Región Metropolitana, Chile",
        ]} />
        <p>
          Oxygen se compromete a dar respuesta a todas las consultas en el menor plazo posible.
        </p>
      </DocSection>

    </LegalLayout>
  )
}
