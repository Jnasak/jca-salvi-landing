import { useCallback, useState } from "react";
import type { ServiceId } from "@/content/landing";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { BuyerCarousel } from "@/components/landing/BuyerCarousel";
import { WhoWeHelp } from "@/components/landing/WhoWeHelp";
import { Services } from "@/components/landing/Services";
import { Projects } from "@/components/landing/Projects";
import { Faq } from "@/components/landing/Faq";
import { WhyUs } from "@/components/landing/WhyUs";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { OurApproach } from "@/components/landing/OurApproach";
import { DiscussProject } from "@/components/landing/DiscussProject";
import { SiteFooter } from "@/components/landing/SiteFooter";

export default function App() {
  const [slide, setSlide] = useState(0);
  const [enquiryContext, setEnquiryContext] = useState<{ situation?: string; service?: ServiceId | undefined }>(
    {},
  );

  const openSituation = useCallback((i: number) => {
    setSlide(i);
    document.getElementById("solutions")?.scrollIntoView({ block: "start" });
    window.setTimeout(
      () => document.getElementById(`buyer-tab-${i}`)?.focus({ preventScroll: true }),
      50,
    );
  }, []);

  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-evergreen px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BuyerCarousel
          index={slide}
          onIndexChange={setSlide}
          onDiscuss={(situation, service) => setEnquiryContext({ situation, service })}
        />
        <WhoWeHelp onSelect={openSituation} />
        <Services onDiscussService={(service) => setEnquiryContext({ service })} />
        <WhyUs />
        <Projects />
        <HowWeWork />
        <OurApproach />
        <Faq />
        <DiscussProject context={enquiryContext} />
      </main>
      <SiteFooter />
    </div>
  );
}
