import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { contactDetails } from "@/config/contact";
import forteraLogo from "@/assets/fortera-logo.png";

const HeroSection = () => {
  const { data: content } = useSiteContent();
  
  const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(
    "Hello, I'm interested in learning more about Fortera's services."
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-hero-mesh" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img
              src={forteraLogo}
              alt="Fortera Global Group"
              className="h-16 md:h-20 w-auto"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="text-foreground">
              {content?.hero_headline || "Fortera Global Group"}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in-up stagger-1">
            {content?.hero_subheadline || "A multi-industry holding company building, funding, and scaling structured businesses for long-term impact."}
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-fade-in-up stagger-2">
            {content?.hero_supporting || "We provide vision, capital, governance, and systems that power companies across real estate, technology, finance, energy, and beyond."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <a href="#subsidiaries">
              <Button variant="hero" size="xl">
                Explore Our Companies
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero-outline" size="xl">
                Work With Us
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
