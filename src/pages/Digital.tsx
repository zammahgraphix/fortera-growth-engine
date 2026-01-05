import Layout from "@/components/layout/Layout";
import DigitalHero from "@/components/digital/DigitalHero";
import ServicesSection from "@/components/digital/ServicesSection";
import WorkflowSection from "@/components/digital/WorkflowSection";
import PortfolioSection from "@/components/digital/PortfolioSection";
import PricingSection from "@/components/digital/PricingSection";
import ContactSection from "@/components/digital/ContactSection";
import NewsletterSection from "@/components/digital/NewsletterSection";

const Digital = () => {
  return (
    <Layout>
      <DigitalHero />
      <ServicesSection />
      <WorkflowSection />
      <PortfolioSection />
      <PricingSection />
      <ContactSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Digital;
