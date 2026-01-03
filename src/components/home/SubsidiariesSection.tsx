import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Building2, Cpu, Zap, Wallet, Heart, ShoppingBag, GraduationCap, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/common/SectionBadge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Building2,
  Cpu,
  Zap,
  Wallet,
  Heart,
  ShoppingBag,
  GraduationCap,
  Landmark,
};

const subsidiaries = [
  {
    name: "Fortera Digital",
    description: "Data-driven growth and digital strategy partner for fintech, real estate, and structured SMEs.",
    status: "active",
    icon: "Monitor",
    href: "/digital",
  },
  {
    name: "Fortera Real Estate",
    description: "Strategic property development, investment, and management across emerging markets.",
    status: "upcoming",
    icon: "Building2",
  },
  {
    name: "Fortera Technology",
    description: "Building and investing in scalable technology solutions for enterprise and government.",
    status: "upcoming",
    icon: "Cpu",
  },
  {
    name: "Fortera Energy",
    description: "Clean energy infrastructure and sustainable power solutions for industrial scale.",
    status: "planned",
    icon: "Zap",
  },
  {
    name: "Fortera Finance",
    description: "Structured financial services, lending, and investment vehicles for growth markets.",
    status: "planned",
    icon: "Wallet",
  },
  {
    name: "Fortera Health",
    description: "Healthcare technology and services designed for accessibility and impact.",
    status: "planned",
    icon: "Heart",
  },
  {
    name: "Fortera Retail",
    description: "Modern commerce and distribution networks connecting products to consumers.",
    status: "planned",
    icon: "ShoppingBag",
  },
  {
    name: "Fortera Education",
    description: "Skills development and educational technology for workforce transformation.",
    status: "planned",
    icon: "GraduationCap",
  },
  {
    name: "Fortera Infrastructure",
    description: "Critical infrastructure development supporting national and regional growth.",
    status: "planned",
    icon: "Landmark",
  },
];

const SubsidiariesSection = () => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "upcoming":
        return "Upcoming";
      default:
        return "Planned";
    }
  };

  return (
    <section id="subsidiaries" className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionBadge>Our Companies</SectionBadge>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
            Building the{" "}
            <span className="gradient-text">Future Across Industries</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Each Fortera subsidiary is structured for excellence, backed by the full resources and governance of the Group.
          </p>
        </div>

        {/* Subsidiaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsidiaries.map((subsidiary, index) => {
            const IconComponent = iconMap[subsidiary.icon] || Monitor;
            const isActive = subsidiary.status === "active";

            return (
              <div
                key={subsidiary.name}
                className={`card-premium p-6 animate-fade-in-up ${
                  isActive ? "ring-2 ring-primary/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isActive ? "gradient-cta" : "bg-accent"
                  }`}>
                    <IconComponent className={`w-6 h-6 ${isActive ? "text-white" : "text-primary"}`} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyles(subsidiary.status)}`}>
                    {getStatusLabel(subsidiary.status)}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {subsidiary.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {subsidiary.description}
                </p>

                {isActive && subsidiary.href && (
                  <Link to={subsidiary.href}>
                    <Button variant="hero-outline" size="sm" className="w-full">
                      Enter Fortera Digital
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubsidiariesSection;
