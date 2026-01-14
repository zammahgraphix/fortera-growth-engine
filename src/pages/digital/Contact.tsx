import Layout from "@/components/layout/Layout";
import ContactSection from "@/components/digital/ContactSection";
import NewsletterSection from "@/components/digital/NewsletterSection";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-20">
        <ContactSection />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Contact;
