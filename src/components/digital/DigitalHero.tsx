import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/common/SectionBadge";
import heroDigitalImage from "@/assets/hero-digital.jpg";

const DigitalHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroDigitalImage}
          alt="Digital Growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <SectionBadge className="mb-8">Fortera Digital</SectionBadge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            We help businesses{" "}
            <span className="gradient-text">scale digitally</span>{" "}
            while you focus on your product.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 animate-fade-in-up stagger-1">
            Fortera Digital is a data-driven growth partner helping fintech companies, real estate firms, and structured SMEs increase revenue, visibility, and operational efficiency.
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 max-w-xl mb-10 animate-fade-in-up stagger-2">
            From branding to marketing, web, SEO, and automation — we handle everything digital, with clear ROI and measurable results.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
            <a href="#contact">
              <Button variant="hero" size="xl">
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#portfolio">
              <Button variant="hero-outline" size="xl">
                View Our Work
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up stagger-4">
            <div>
              <p className="text-3xl md:text-4xl font-bold gradient-text">240%</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. Revenue Growth</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold gradient-text">97%</p>
              <p className="text-sm text-muted-foreground mt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold gradient-text">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalHero;
