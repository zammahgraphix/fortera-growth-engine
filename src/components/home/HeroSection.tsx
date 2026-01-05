import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import forteraLogo from "@/assets/fortera-logo.png";
import heroMainImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroMainImage}
          alt="Global Business Network"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

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
            <span className="text-foreground">Fortera</span>{" "}
            <span className="gradient-text">Global Group</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in-up stagger-1">
            A multi-industry holding company building, funding, and scaling structured businesses for long-term impact.
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-fade-in-up stagger-2">
            We provide vision, capital, governance, and systems that power companies across real estate, technology, finance, energy, and beyond.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <a href="#subsidiaries">
              <Button variant="hero" size="xl">
                Explore Our Companies
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link to="/digital">
              <Button variant="hero-outline" size="xl">
                Fortera Digital
              </Button>
            </Link>
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
