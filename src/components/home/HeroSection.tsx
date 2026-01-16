import { ArrowRight } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-primary-light/5 rounded-full blur-[100px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img
              src={forteraLogo}
              alt="Fortera Global Group"
              className="h-14 md:h-16 w-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 backdrop-blur-sm rounded-full border border-border/50 mb-8 animate-fade-in">
            <span className="text-sm text-muted-foreground">
              Multi-Industry Holding Company
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up text-foreground">
            {content?.hero_headline || "Building Companies for"}
            <br />
            <span className="gradient-text">Long-Term Impact</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1">
            {content?.hero_subheadline || "We provide vision, capital, governance, and systems that power companies across real estate, technology, finance, energy, and beyond."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <a href="#subsidiaries">
              <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base font-medium rounded-full">
                Explore Our Companies
              </Button>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="px-8 py-6 text-base font-medium rounded-full border-border hover:bg-accent">
                Work With Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {/* Trusted by section */}
          <div className="mt-20 animate-fade-in-up stagger-3">
            <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-xl font-semibold text-muted-foreground/80">Real Estate</div>
              <div className="text-xl font-semibold text-muted-foreground/80">Technology</div>
              <div className="text-xl font-semibold text-muted-foreground/80">Finance</div>
              <div className="text-xl font-semibold text-muted-foreground/80">Energy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
