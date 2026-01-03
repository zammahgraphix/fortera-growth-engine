import { Palette, Globe, TrendingUp, Target, Users, BarChart3, Zap } from "lucide-react";
import SectionBadge from "@/components/common/SectionBadge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Globe,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Zap,
};

const services = [
  {
    icon: "Palette",
    title: "Branding & Visual Identity",
    description: "Complete brand development including logo, color systems, typography, and brand guidelines that position your business as premium and trustworthy.",
  },
  {
    icon: "Globe",
    title: "Website & Digital Systems",
    description: "Custom-designed, conversion-optimized websites with seamless user experience, performance optimization, and scalable architecture.",
  },
  {
    icon: "TrendingUp",
    title: "SEO & Performance",
    description: "Data-driven search engine optimization and technical performance improvements that increase visibility and organic growth.",
  },
  {
    icon: "Target",
    title: "Paid Ads & Growth Marketing",
    description: "Strategic advertising campaigns across Google, Meta, and LinkedIn that deliver measurable ROI and qualified leads.",
  },
  {
    icon: "Users",
    title: "Social Media Management",
    description: "Professional content creation, community management, and engagement strategies that build brand authority and audience trust.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Reporting",
    description: "Comprehensive tracking, custom dashboards, and monthly insights that inform decisions and demonstrate clear business impact.",
  },
  {
    icon: "Zap",
    title: "Automation & Scaling",
    description: "Workflow automation, CRM integration, and operational systems that reduce manual work and enable sustainable growth.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionBadge>Our Services</SectionBadge>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Grow Digitally</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            We handle the entire digital journey so you can focus on what matters most — your product and customers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Palette;

            return (
              <div
                key={service.title}
                className="card-premium p-8 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
