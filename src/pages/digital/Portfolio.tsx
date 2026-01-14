import Layout from "@/components/layout/Layout";
import PortfolioSection from "@/components/digital/PortfolioSection";
import NewsletterSection from "@/components/digital/NewsletterSection";

const Portfolio = () => {
  return (
    <Layout>
      <div className="pt-20">
        <PortfolioSection />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Portfolio;
