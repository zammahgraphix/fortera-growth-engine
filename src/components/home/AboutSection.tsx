import { Target, Wallet, Settings, Shield, Globe, Lightbulb, Users } from "lucide-react";
import SectionBadge from "@/components/common/SectionBadge";

const AboutSection = () => {
  const capabilities = [
    {
      icon: Target,
      title: "Vision & Strategy",
      description: "Long-term direction and strategic planning across all subsidiaries",
    },
    {
      icon: Wallet,
      title: "Capital & Investments",
      description: "Funding and financial resources for growth and expansion",
    },
    {
      icon: Settings,
      title: "Centralized Services",
      description: "Shared resources, technology, and operational excellence",
    },
    {
      icon: Shield,
      title: "Brand Governance",
      description: "Protecting and elevating the Fortera brand globally",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Strategic market entry and international growth",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Technology",
      description: "Driving innovation across all business units",
    },
    {
      icon: Users,
      title: "Leadership Control",
      description: "Executive oversight and governance frameworks",
    },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <SectionBadge>About Fortera</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
              The Vision Behind{" "}
              <span className="gradient-text">Every Company</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Fortera Global Group is the brain and backbone of all Fortera companies. We set direction, provide capital, protect the brand, and ensure every subsidiary operates at the highest standard.
            </p>

            <p className="text-base text-muted-foreground/80 leading-relaxed">
              As the parent company, we do not sell services directly. Instead, we provide strategy, funding, systems, and leadership to our operating subsidiaries, enabling them to focus on what they do best — delivering exceptional value to their clients.
            </p>
          </div>

          {/* Right - Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((item, index) => (
              <div
                key={item.title}
                className="card-premium p-5 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
