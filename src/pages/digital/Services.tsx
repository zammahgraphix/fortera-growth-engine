import Layout from "@/components/layout/Layout";
import ServicesSection from "@/components/digital/ServicesSection";
import NewsletterSection from "@/components/digital/NewsletterSection";

const Services = () => {
  return (
    <Layout>
      <div className="pt-20">
        <ServicesSection />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Services;
