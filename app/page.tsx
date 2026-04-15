import { HeroSection } from "@/components/home/hero-section"
import { TrustedBySection } from "@/components/home/trusted-by-section"
import { StatsSection } from "@/components/home/stats-section"
import { PlatformIntroSection } from "@/components/home/platform-intro-section"
import { ProductsOverviewSection } from "@/components/home/products-overview-section"
import { StickyScrollSection } from "@/components/home/sticky-scroll-section"
import { ResultsSection } from "@/components/home/results-section"
import { TestimonialSection } from "@/components/home/testimonial-section"
import { IntegrationSection } from "@/components/home/integration-section"
import { IndustriesSection } from "@/components/home/industries-section"
import { ResourcesPreviewSection } from "@/components/home/resources-preview-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <PlatformIntroSection />
      <ProductsOverviewSection />
      <StickyScrollSection />
      <ResultsSection />
      <TestimonialSection />
      <IntegrationSection />
      <IndustriesSection />
      <ResourcesPreviewSection />
      <CtaSection />
    </>
  )
}
