import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SubsidiariesSection from "@/components/home/SubsidiariesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SubsidiariesSection />
    </Layout>
  );
};

export default Index;
