import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SectionBadge from "@/components/common/SectionBadge";
import { ExternalLink, Quote } from "lucide-react";

const PortfolioSection = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="portfolio" className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <SectionBadge>Our Work</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Projects That <span className="gradient-text">Deliver Results</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-lg mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <SectionBadge>Our Work</SectionBadge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Projects That <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real outcomes for real businesses. See how we've helped companies across fintech, real estate, and SMEs achieve measurable growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card-premium overflow-hidden group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              {project.image_url ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.client_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {project.industry}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-48 gradient-cta flex items-center justify-center">
                  <span className="text-white text-4xl font-bold opacity-20">
                    {project.client_name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.client_name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                {(project.before_metrics || project.after_metrics) && (
                  <div className="flex gap-4 mb-4 text-sm">
                    {project.before_metrics && (
                      <div className="flex-1 p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Before</p>
                        <p className="font-medium">{project.before_metrics}</p>
                      </div>
                    )}
                    {project.after_metrics && (
                      <div className="flex-1 p-3 bg-primary/10 rounded-lg">
                        <p className="text-xs text-primary mb-1">After</p>
                        <p className="font-medium text-primary">{project.after_metrics}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <div className="border-t border-border pt-4 mt-4">
                    <Quote className="w-4 h-4 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground italic line-clamp-3">
                      "{project.testimonial}"
                    </p>
                    {project.testimonial_author && (
                      <p className="text-xs text-muted-foreground mt-2">
                        — {project.testimonial_author}
                        {project.testimonial_company && `, ${project.testimonial_company}`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
