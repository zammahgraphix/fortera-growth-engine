import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  country: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
}

const TestimonialsManager = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      // Fetch all testimonials for admin (including unapproved)
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast({
        title: "Error fetching testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_approved: !currentStatus } : t))
      );

      toast({
        title: currentStatus ? "Testimonial hidden" : "Testimonial approved",
      });
    } catch (error) {
      toast({ title: "Error updating", variant: "destructive" });
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast({ title: "Testimonial deleted" });
    } catch (error) {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No testimonials yet</h3>
        <p className="text-muted-foreground">Testimonials will appear here for approval.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="card-premium p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-foreground">{testimonial.client_name}</h3>
                <Badge variant={testimonial.is_approved ? "default" : "secondary"}>
                  {testimonial.is_approved ? "Approved" : "Pending"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {testimonial.company}
                {testimonial.country && ` • ${testimonial.country}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleApproval(testimonial.id, testimonial.is_approved)}
              >
                {testimonial.is_approved ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTestimonial(testimonial.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-foreground leading-relaxed">"{testimonial.content}"</p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsManager;
