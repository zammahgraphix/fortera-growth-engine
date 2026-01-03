import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { digitalInfo } from "@/config/contact";
import SectionBadge from "@/components/common/SectionBadge";

const DigitalHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-primary-light/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in-up stagger-1">
            Fortera Digital is a data-driven growth partner helping fintech companies, real estate firms, and structured SMEs increase revenue, visibility, and operational efficiency.
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            From branding to marketing, web, SEO, and automation — we handle everything digital, with clear ROI and measurable results.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
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
        </div>
      </div>

      {/* Floating cards decoration */}
      <div className="absolute bottom-20 left-10 hidden lg:block animate-float">
        <div className="card-premium p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-cta flex items-center justify-center">
              <span className="text-white text-sm font-bold">+</span>
            </div>
            <div>
              <p className="text-sm font-medium">Revenue Growth</p>
              <p className="text-xs text-muted-foreground">+240% average increase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-10 hidden lg:block animate-float" style={{ animationDelay: "1s" }}>
        <div className="card-premium p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium">Client Success</p>
              <p className="text-xs text-muted-foreground">97% satisfaction rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalHero;
