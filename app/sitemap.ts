import { MetadataRoute } from "next"

const BASE_URL = "https://www.oxygen.tech"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Páginas principales
  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                           lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/oxypulse`,             lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/oxyplanner`,           lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/advisory`,             lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/nosotros`,             lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/recursos`,             lastModified, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/plataforma`,           lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/politica-de-privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terminos-y-condiciones`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]

  // Páginas de industrias
  const industries = [
    "metalmecanico",
    "agricola",
    "alimentos",
    "construccion",
    "energia",
    "forestal",
    "logistica",
    "manufactura",
    "mineria",
    "pesquero",
    "retail",
  ]
  const industryPages: MetadataRoute.Sitemap = industries.map((slug) => ({
    url: `${BASE_URL}/soluciones/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Casos de éxito
  const casos = [
    "amcs-digitalizacion-mantenimiento",
    "metalmecanica-cumplimiento-preventivo",
  ]
  const casePages: MetadataRoute.Sitemap = casos.map((slug) => ({
    url: `${BASE_URL}/casos/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Blog / artículos
  const blogSlugs = [
    "excel-a-oxyplanner-planta-metalmecanica",
    "planta-apta-para-ia",
    "mantenimiento-preventivo-vs-correctivo",
    "que-es-un-cmms",
  ]
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...mainPages, ...industryPages, ...casePages, ...blogPages]
}
