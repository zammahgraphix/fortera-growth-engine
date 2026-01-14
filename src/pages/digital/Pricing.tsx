import Layout from "@/components/layout/Layout";
import PricingSection from "@/components/digital/PricingSection";
import NewsletterSection from "@/components/digital/NewsletterSection";

const Pricing = () => {
  return (
    <Layout>
      <div className="pt-20">
        <PricingSection />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Pricing;
