import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ServiceCategories from "@/components/home/ServiceCategories";
import FeaturedSection from "@/components/home/FeaturedSection";
import EmergencyContacts from "@/components/home/EmergencyContacts";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServiceCategories />
      <FeaturedSection />
      <EmergencyContacts />
      <Footer />
    </div>
  );
};

export default Index;
