import { useState } from "react";
import { ArrowRight, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SectionBadge from "@/components/common/SectionBadge";
import { contactDetails } from "@/config/contact";

type BusinessType = "startup" | "established" | "idea";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    businessType: "startup" as BusinessType,
    goals: "",
    budgetRange: "",
    timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        business_type: formData.businessType,
        goals: formData.goals,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
      });

      if (error) throw error;

      toast({
        title: "Message received!",
        description: "We'll review your submission and get back to you within 24-48 hours.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        businessType: "startup",
        goals: "",
        budgetRange: "",
        timeline: "",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(
    "Hello, I'm interested in Fortera Digital's services."
  )}`;

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="animate-fade-in-up">
            <SectionBadge>Get Started</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
              Let's Build Your{" "}
              <span className="gradient-text">Digital Future</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tell us about your business and goals. Our team will review your submission and reach out to schedule a discovery call.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  {contactDetails.phone}
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Email</h4>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-primary hover:underline"
                >
                  {contactDetails.email}
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Location</h4>
                <p className="text-muted-foreground">
                  {contactDetails.address.city}, {contactDetails.address.country}
                </p>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4"
              >
                <Button variant="hero" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-premium p-8 animate-fade-in-up stagger-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Type */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">What best describes your business?</Label>
                <RadioGroup
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value as BusinessType })}
                  className="flex flex-wrap gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="startup" id="startup" />
                    <Label htmlFor="startup" className="cursor-pointer">Startup</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="established" id="established" />
                    <Label htmlFor="established" className="cursor-pointer">Established Business</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="idea" id="idea" />
                    <Label htmlFor="idea" className="cursor-pointer">Idea Stage</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  required
                />
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <Label htmlFor="goals">What are your goals?</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="Tell us about your business goals and what you're looking to achieve..."
                  rows={4}
                />
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    placeholder="e.g., $5,000 - $10,000/mo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g., Q1 2025"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
