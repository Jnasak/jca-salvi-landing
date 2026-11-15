import { useSectionReveals } from "@/components/landing/useSectionReveals";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Projects } from "@/components/landing/Projects";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { BuyerCarousel } from "@/components/landing/BuyerCarousel";
import { ConversationOptions, FinalConversion } from "@/components/landing/AdditionalSections";
import type { ServiceId } from "@/content/landing";
import { Services } from "@/components/landing/Services";
import { WhyUs } from "@/components/landing/WhyUs";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { OurApproach } from "@/components/landing/OurApproach";
import { DiscussProject } from "@/components/landing/DiscussProject";
import { SiteFooter } from "@/components/landing/SiteFooter";

import type { EnquiryContext } from "@/content/enquiry";

export default function App({
  headerAppearance = "light",
}: {
  headerAppearance?: "light" | "dark";
}) {
  const root = useRef<HTMLDivElement>(null);
  useSectionReveals(root);
  const [enquiryContext, setEnquiryContext] = useState<EnquiryContext>({});
  const beginEnquiry = (context: EnquiryContext) => {
    setEnquiryContext(context);
    const heading = document.getElementById("discuss-title");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  };
  const [slide, setSlide] = useState(0);

  const [requestedService, setRequestedService] = useState<{
    id: ServiceId;
    revision: number;
  } | null>(null);
  const explore = (id: ServiceId) =>
    setRequestedService((previous) => ({ id, revision: (previous?.revision ?? 0) + 1 }));

  return (
    <div id="top" ref={root}>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-evergreen px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader appearance={headerAppearance} />
      <main id="main">
        <Hero />
        <BuyerCarousel
          index={slide}
          onIndexChange={setSlide}
          onDiscuss={beginEnquiry}
          onExplore={explore}
        />
        <Services onDiscuss={beginEnquiry} requested={requestedService} />
        <Projects />
        <WhyUs />
        <OurApproach />
        <HowWeWork />
        <ConversationOptions />
        <Faq />
        <FinalConversion />
        <DiscussProject context={enquiryContext} />
      </main>
      <SiteFooter />
    </div>
  );
}
