import ContactSection from "../components/ContactSection";
import CTASection from "../components/CTASection";
import FAQSection from "../components/FAQSection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import MobileAppSection from "../components/MobileAppSection";
import PricingSection from "../components/PricingSection";
import SecuritySection from "../components/SecuritySection";
import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <MobileAppSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
