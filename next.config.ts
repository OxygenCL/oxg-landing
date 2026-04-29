import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Blog → Artículos
      { source: "/blog/excel-a-oxyplanner-planta-metalmecanica", destination: "/articulos/del-excel-a-oxyplanner", permanent: true },
      { source: "/blog/planta-apta-para-ia", destination: "/articulos/planta-apta-para-ia", permanent: true },
      // Blog → Guías
      { source: "/blog/mantenimiento-preventivo-vs-correctivo", destination: "/guias/mantenimiento-preventivo-vs-correctivo", permanent: true },
      { source: "/blog/que-es-un-cmms", destination: "/guias/que-es-un-cmms", permanent: true },
      { source: "/blog/que-es-mantenimiento-preventivo", destination: "/guias/que-es-mantenimiento-preventivo", permanent: true },
      // Casos → Casos de éxito
      { source: "/casos/amcs-digitalizacion-mantenimiento", destination: "/casos-de-exito/amcs", permanent: true },
      { source: "/casos/metalmecanica-cumplimiento-preventivo", destination: "/casos-de-exito/metalmecanica-cumplimiento-preventivo", permanent: true },
    ]
  },
};

export default nextConfig;
