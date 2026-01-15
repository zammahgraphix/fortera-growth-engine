import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { contactDetails } from "@/config/contact";
import SectionBadge from "@/components/common/SectionBadge";

const DigitalHero = () => {
  const { data: content } = useSiteContent();

  const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(
    "Hello, I'm interested in Fortera Digital's services."
  )}`;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-hero-mesh" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-1/6 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/6 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <SectionBadge className="mb-8">Fortera Digital</SectionBadge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            {content?.digital_hero_headline?.split("scale digitally")[0] || "We help businesses "}
            <span className="gradient-text">scale digitally</span>{" "}
            {content?.digital_hero_headline?.split("scale digitally")[1] || "while you focus on your product."}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 animate-fade-in-up stagger-1">
            {content?.digital_hero_subheadline || "Fortera Digital is a data-driven growth partner helping fintech companies, real estate firms, and structured SMEs increase revenue, visibility, and operational efficiency."}
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 max-w-xl mb-10 animate-fade-in-up stagger-2">
            {content?.digital_hero_supporting || "From branding to marketing, web, SEO, and automation — we handle everything digital, with clear ROI and measurable results."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
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
              <p className="text-3xl md:text-4xl font-bold gradient-text">
                {content?.stat_revenue_growth || "240%"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {content?.stat_revenue_label || "Avg. Revenue Growth"}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold gradient-text">
                {content?.stat_satisfaction || "97%"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {content?.stat_satisfaction_label || "Client Satisfaction"}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold gradient-text">
                {content?.stat_projects || "50+"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {content?.stat_projects_label || "Projects Delivered"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalHero;
