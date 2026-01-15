-- Create the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create site_content table for editable text across the website
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can view all content
CREATE POLICY "Public can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Admins can manage content
CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  icon TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on social_links
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public can view visible social links
CREATE POLICY "Public can view visible social links"
ON public.social_links
FOR SELECT
USING (is_visible = true);

-- Admins can manage social links
CREATE POLICY "Admins can manage social links"
ON public.social_links
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON public.social_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site content
INSERT INTO public.site_content (key, content, label, category) VALUES
  ('hero_headline', 'Fortera Global Group', 'Hero Headline', 'home'),
  ('hero_subheadline', 'A multi-industry holding company building, funding, and scaling structured businesses for long-term impact.', 'Hero Subheadline', 'home'),
  ('hero_supporting', 'We provide vision, capital, governance, and systems that power companies across real estate, technology, finance, energy, and beyond.', 'Hero Supporting Text', 'home'),
  ('mission_title', 'Our Mission', 'Mission Title', 'about'),
  ('mission_content', 'To build, fund, and scale structured businesses that create lasting value across industries and communities.', 'Mission Content', 'about'),
  ('vision_title', 'Our Vision', 'Vision Title', 'about'),
  ('vision_content', 'To become the leading multi-industry holding company in Africa, powering sustainable growth and innovation.', 'Vision Content', 'about'),
  ('about_title', 'About Fortera', 'About Title', 'about'),
  ('about_content', 'Fortera Global Group is a multi-industry holding company that provides strategic vision, capital investment, governance frameworks, and operational systems to its portfolio of companies.', 'About Content', 'about'),
  ('digital_hero_headline', 'We help businesses scale digitally while you focus on your product.', 'Digital Hero Headline', 'digital'),
  ('digital_hero_subheadline', 'Fortera Digital is a data-driven growth partner helping fintech companies, real estate firms, and structured SMEs increase revenue, visibility, and operational efficiency.', 'Digital Hero Subheadline', 'digital'),
  ('digital_hero_supporting', 'From branding to marketing, web, SEO, and automation — we handle everything digital, with clear ROI and measurable results.', 'Digital Hero Supporting', 'digital'),
  ('stat_revenue_growth', '240%', 'Revenue Growth Stat', 'stats'),
  ('stat_revenue_label', 'Avg. Revenue Growth', 'Revenue Growth Label', 'stats'),
  ('stat_satisfaction', '97%', 'Client Satisfaction Stat', 'stats'),
  ('stat_satisfaction_label', 'Client Satisfaction', 'Satisfaction Label', 'stats'),
  ('stat_projects', '50+', 'Projects Delivered Stat', 'stats'),
  ('stat_projects_label', 'Projects Delivered', 'Projects Label', 'stats');

-- Insert default social links
INSERT INTO public.social_links (platform, url, icon, display_order) VALUES
  ('linkedin', 'https://linkedin.com/company/forteraglobal', 'Linkedin', 1),
  ('twitter', 'https://twitter.com/forteradigital', 'Twitter', 2),
  ('instagram', 'https://instagram.com/forteradigital', 'Instagram', 3),
  ('facebook', 'https://facebook.com/forteraglobal', 'Facebook', 4);