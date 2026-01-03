import { ClipboardCheck, Compass, Rocket, LineChart, TrendingUp } from "lucide-react";
import SectionBadge from "@/components/common/SectionBadge";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Qualification",
    description: "We assess your business, goals, and readiness to ensure we're the right fit for each other.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Strategy & Planning",
    description: "Clear roadmap with defined KPIs, timelines, and a detailed execution plan tailored to your objectives.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Execution",
    description: "We build and deploy digital systems, marketing campaigns, and growth operations with precision.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "Tracking & Reporting",
    description: "Monthly performance reports with data-driven insights and transparent results documentation.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Optimization & Scale",
    description: "Continuous improvement based on data, expanding what works and refining for maximum impact.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionBadge>How We Work</SectionBadge>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
            A Structured Approach to{" "}
            <span className="gradient-text">Digital Growth</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Our proven methodology ensures clarity, accountability, and measurable results at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border z-0" />
              )}

              <div className="card-premium p-6 relative z-10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-cta flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-primary/20">{step.number}</span>
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
