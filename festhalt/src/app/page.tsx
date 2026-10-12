import { BenefitsSection } from "@/components/BenefitsSection";
import { ChapterTabs } from "@/components/ChapterTabs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDocumentViewer } from "@/components/InteractiveDocumentViewer";
import { ProblemSolution } from "@/components/ProblemSolution";
import { ProductDetails } from "@/components/ProductDetails";
import { StickyCTA } from "@/components/StickyCTA";
import { TrustSection } from "@/components/TrustSection";
import { ViewerProvider } from "@/components/ViewerContext";

export default function Home() {
  return (
    <ViewerProvider>
      <Header />
      <main id="main">
        {/* 1. Produkt verstehen */}
        <HeroSection />
        <ProblemSolution />
        {/* 2. Produkt erleben */}
        <InteractiveDocumentViewer />
        <ChapterTabs />
        {/* 3. Vorteile erkennen */}
        <BenefitsSection />
        <ProductDetails />
        <HowItWorks />
        {/* 4. Vertrauen aufbauen */}
        <TrustSection />
        <FAQAccordion />
        {/* 5. Etsy-Angebot öffnen */}
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </ViewerProvider>
  );
}
