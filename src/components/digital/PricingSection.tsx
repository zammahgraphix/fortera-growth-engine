import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/common/SectionBadge";

const pricingTiers = [
  {
    tier: "foundation",
    name: "Foundation",
    description: "Essential digital presence and brand positioning for businesses ready to establish their online foundation.",
    price: "Starting from $2,500/mo",
    features: [
      "Brand identity & guidelines",
      "Custom website design",
      "Basic SEO optimization",
      "Monthly performance report",
      "Email support",
    ],
    targetAudience: "Startups and early-stage businesses",
    highlighted: false,
  },
  {
    tier: "growth",
    name: "Growth",
    description: "Comprehensive digital strategy and execution for businesses ready to scale their market presence and revenue.",
    price: "Starting from $5,000/mo",
    features: [
      "Everything in Foundation",
      "Paid advertising management",
      "Social media management",
      "Advanced analytics",
      "Bi-weekly strategy calls",
      "Priority support",
    ],
    targetAudience: "Established businesses scaling operations",
    highlighted: true,
  },
  {
    tier: "partnership",
    name: "Partnership",
    description: "Full-service digital partnership with dedicated team resources, strategic advisory, and hands-on growth execution.",
    price: "Custom pricing",
    features: [
      "Everything in Growth",
      "Dedicated account team",
      "Custom integrations",
      "Weekly strategy sessions",
      "24/7 priority support",
      "Performance guarantees",
    ],
    targetAudience: "Enterprise and high-growth companies",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionBadge>Pricing & Packages</SectionBadge>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
            Invest in{" "}
            <span className="gradient-text">Measurable Growth</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Transparent, outcome-focused packages designed for businesses serious about digital success.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.tier}
              className={`card-premium p-8 animate-fade-in-up ${
                tier.highlighted
                  ? "ring-2 ring-primary relative"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-cta text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-xl font-semibold gradient-text">
                  {tier.price}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Best for: {tier.targetAudience}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact">
                <Button
                  variant={tier.highlighted ? "hero" : "hero-outline"}
                  size="lg"
                  className="w-full"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
