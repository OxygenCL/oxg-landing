import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oxygen.tech"

  // Páginas estáticas principales
  const staticPages = [
    "",
    "/nosotros",
    "/productos",
    "/plataforma",
    "/oxypulse",
    "/oxyplanner",
    "/advisory",
    "/recursos",
    "/casos",
  ]

  // Industrias para soluciones
  const industries = [
    "metalmecanica",
    "alimentos-bebidas",
    "mineria",
    "logistica",
    "forestal",
    "agricola",
    "construccion",
    "energia",
    "pesquero-acuicultura",
    "manufacturera",
    "automotriz",
    "retail-facilities",
  ]

  // Blog posts
  const blogPosts = [
    "preparando-operaciones-manufactura-ia",
    "plan-mantenimiento-8-pasos",
    "kpis-mantenimiento-industrial",
    "mantenimiento-predictivo-vs-preventivo",
  ]

  // Casos de éxito
  const cases = [
    "metalmecanica-cumplimiento-preventivo",
    "alimentos-reduccion-fallas",
    "mineria-optimizacion-flota",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }))

  const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/soluciones/${industry}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const caseEntries: MetadataRoute.Sitemap = cases.map((slug) => ({
    url: `${baseUrl}/casos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticEntries, ...industryEntries, ...blogEntries, ...caseEntries]
}
