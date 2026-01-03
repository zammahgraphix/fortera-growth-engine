-- Create enum for contact types
CREATE TYPE public.contact_type AS ENUM ('startup', 'established', 'idea');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('active', 'upcoming', 'completed');

-- Create enum for subsidiary status
CREATE TYPE public.subsidiary_status AS ENUM ('active', 'upcoming', 'planned');

-- Create enum for pricing tier
CREATE TYPE public.pricing_tier AS ENUM ('foundation', 'growth', 'partnership');

-- Create enum for user role
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Portfolio projects table
CREATE TABLE public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    description TEXT NOT NULL,
    before_metrics TEXT,
    after_metrics TEXT,
    image_url TEXT,
    testimonial TEXT,
    testimonial_author TEXT,
    testimonial_company TEXT,
    status project_status DEFAULT 'completed',
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pricing tiers table
CREATE TABLE public.pricing_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tier pricing_tier NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    target_audience TEXT,
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    company TEXT NOT NULL,
    country TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact submissions table
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    business_type contact_type NOT NULL,
    goals TEXT,
    budget_range TEXT,
    timeline TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Email subscribers table
CREATE TABLE public.email_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

-- Analytics events table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    page TEXT,
    section TEXT,
    visitor_id TEXT,
    visitor_location TEXT,
    time_spent INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Subsidiaries table
CREATE TABLE public.subsidiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status subsidiary_status DEFAULT 'planned',
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subsidiaries ENABLE ROW LEVEL SECURITY;

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Public read policies for visible content
CREATE POLICY "Public can view visible portfolio projects"
ON public.portfolio_projects FOR SELECT
USING (is_visible = true);

CREATE POLICY "Public can view visible services"
ON public.services FOR SELECT
USING (is_visible = true);

CREATE POLICY "Public can view visible pricing tiers"
ON public.pricing_tiers FOR SELECT
USING (is_visible = true);

CREATE POLICY "Public can view approved testimonials"
ON public.testimonials FOR SELECT
USING (is_approved = true);

CREATE POLICY "Public can view visible subsidiaries"
ON public.subsidiaries FOR SELECT
USING (is_visible = true);

-- Public can insert contact submissions and subscriptions
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.email_subscribers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can log analytics"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

-- Admin full access policies
CREATE POLICY "Admins can do everything on portfolio"
ON public.portfolio_projects FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can do everything on services"
ON public.services FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can do everything on pricing"
ON public.pricing_tiers FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can do everything on testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can do everything on contacts"
ON public.contact_submissions FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can do everything on subscribers"
ON public.email_subscribers FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view analytics"
ON public.analytics_events FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage subsidiaries"
ON public.subsidiaries FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default services
INSERT INTO public.services (title, description, icon, display_order) VALUES
('Branding & Visual Identity', 'Complete brand development including logo, color systems, typography, and brand guidelines that position your business as premium and trustworthy.', 'Palette', 1),
('Website & Digital Systems', 'Custom-designed, conversion-optimized websites with seamless user experience, performance optimization, and scalable architecture.', 'Globe', 2),
('SEO & Performance', 'Data-driven search engine optimization and technical performance improvements that increase visibility and organic growth.', 'TrendingUp', 3),
('Paid Ads & Growth Marketing', 'Strategic advertising campaigns across Google, Meta, and LinkedIn that deliver measurable ROI and qualified leads.', 'Target', 4),
('Social Media Management', 'Professional content creation, community management, and engagement strategies that build brand authority and audience trust.', 'Users', 5),
('Analytics & Reporting', 'Comprehensive tracking, custom dashboards, and monthly insights that inform decisions and demonstrate clear business impact.', 'BarChart3', 6),
('Automation & Scaling', 'Workflow automation, CRM integration, and operational systems that reduce manual work and enable sustainable growth.', 'Zap', 7);

-- Insert default pricing tiers
INSERT INTO public.pricing_tiers (tier, name, description, price, features, target_audience, display_order) VALUES
('foundation', 'Foundation', 'Essential digital presence and brand positioning for businesses ready to establish their online foundation.', 'Starting from $2,500/mo', '["Brand identity & guidelines", "Custom website design", "Basic SEO optimization", "Monthly performance report", "Email support"]', 'Startups and early-stage businesses', 1),
('growth', 'Growth', 'Comprehensive digital strategy and execution for businesses ready to scale their market presence and revenue.', 'Starting from $5,000/mo', '["Everything in Foundation", "Paid advertising management", "Social media management", "Advanced analytics", "Bi-weekly strategy calls", "Priority support"]', 'Established businesses scaling operations', 2),
('partnership', 'Partnership', 'Full-service digital partnership with dedicated team resources, strategic advisory, and hands-on growth execution.', 'Custom pricing', '["Everything in Growth", "Dedicated account team", "Custom integrations", "Weekly strategy sessions", "24/7 priority support", "Performance guarantees"]', 'Enterprise and high-growth companies', 3);

-- Insert default subsidiaries
INSERT INTO public.subsidiaries (name, description, status, icon, display_order) VALUES
('Fortera Digital', 'Data-driven growth and digital strategy partner for fintech, real estate, and structured SMEs.', 'active', 'Monitor', 1),
('Fortera Real Estate', 'Strategic property development, investment, and management across emerging markets.', 'upcoming', 'Building2', 2),
('Fortera Technology', 'Building and investing in scalable technology solutions for enterprise and government.', 'upcoming', 'Cpu', 3),
('Fortera Energy', 'Clean energy infrastructure and sustainable power solutions for industrial scale.', 'planned', 'Zap', 4),
('Fortera Finance', 'Structured financial services, lending, and investment vehicles for growth markets.', 'planned', 'Wallet', 5),
('Fortera Health', 'Healthcare technology and services designed for accessibility and impact.', 'planned', 'Heart', 6),
('Fortera Retail', 'Modern commerce and distribution networks connecting products to consumers.', 'planned', 'ShoppingBag', 7),
('Fortera Education', 'Skills development and educational technology for workforce transformation.', 'planned', 'GraduationCap', 8),
('Fortera Infrastructure', 'Critical infrastructure development supporting national and regional growth.', 'planned', 'Landmark', 9);