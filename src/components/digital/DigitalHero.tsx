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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[hsl(230,100%,97%)] via-[hsl(250,80%,95%)] to-[hsl(200,90%,94%)]">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(250,80%,85%)] rounded-full blur-[150px] opacity-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[hsl(200,100%,85%)] rounded-full blur-[150px] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[hsl(280,70%,90%)] rounded-full blur-[120px] opacity-30" />
      
      {/* 3D-like decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl rotate-12 blur-sm" />
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-[hsl(280,70%,70%)]/40 to-transparent rounded-xl -rotate-12 blur-sm" />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
              <span className="text-sm font-medium text-primary">Fortera Digital</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="text-foreground">Manage your growth</span>
            <br />
            <span className="bg-gradient-to-r from-[hsl(250,80%,60%)] to-[hsl(200,100%,50%)] bg-clip-text text-transparent">easier and simple</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1">
            {content?.digital_hero_subheadline || "The easiest way to help you scale digitally and control your business growth with fast, measurable results."}
          </p>

          {/* Email input + CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto animate-fade-in-up stagger-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[hsl(250,80%,60%)] to-[hsl(250,70%,55%)] hover:from-[hsl(250,80%,55%)] hover:to-[hsl(250,70%,50%)] text-white px-8 py-6 text-base font-medium rounded-xl shadow-lg shadow-[hsl(250,80%,60%)]/25">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#portfolio">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground px-8 py-6 text-base font-medium">
                View Our Work
              </Button>
            </a>
          </div>

          {/* Dashboard mockup preview */}
          <div className="mt-16 animate-fade-in-up stagger-3">
            <div className="relative max-w-3xl mx-auto">
              {/* Main dashboard card */}
              <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <div className="w-5 h-5 rounded bg-primary/40" />
                    </div>
                    <span className="font-semibold text-foreground">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-accent/50 rounded-2xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold gradient-text">
                      {content?.stat_revenue_growth || "240%"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Revenue Growth</p>
                  </div>
                  <div className="bg-accent/50 rounded-2xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold gradient-text">
                      {content?.stat_satisfaction || "97%"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Satisfaction</p>
                  </div>
                  <div className="bg-accent/50 rounded-2xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold gradient-text">
                      {content?.stat_projects || "50+"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Projects</p>
                  </div>
                  <div className="bg-accent/50 rounded-2xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold text-green-500">
                      +127%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">This Month</p>
                  </div>
                </div>
              </div>

              {/* Floating side cards */}
              <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-green-500/60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">On Track</div>
                    <div className="text-xs text-muted-foreground">12 projects</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block absolute -right-12 top-1/3 bg-background/90 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 p-4 animate-float" style={{ animationDelay: '-3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-primary/60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Completed</div>
                    <div className="text-xs text-muted-foreground">1402 tasks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalHero;
