import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchMappings: Record<string, string> = {
    'hospital': '/services/hospitals',
    'doctor': '/services/doctors',
    'school': '/services/schools',
    'blood': '/services/blood-donors',
    'donor': '/services/blood-donors',
    'government': '/services/govt-offices',
    'office': '/services/govt-offices',
    'business': '/services/businesses',
    'job': '/services/jobs',
    'emergency': '/services/emergency',
    'hospitals': '/services/hospitals',
    'doctors': '/services/doctors',
    'schools': '/services/schools',
    'blood donors': '/services/blood-donors',
    'govt offices': '/services/govt-offices',
    'businesses': '/services/businesses',
    'jobs': '/services/jobs',
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    for (const [key, path] of Object.entries(searchMappings)) {
      if (query.includes(key)) {
        navigate(path);
        return;
      }
    }
    // If no match, navigate to hospitals as default
    navigate('/services/hospitals');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Background Image */}
      {/* stylelint-disable-next-line */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/unnamed.jpg')" }} />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary-foreground/90 mb-6"
          >
            {t('hero.subtitle')}
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4 font-display">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/75 mb-8 max-w-2xl mx-auto font-body">
            {t('hero.description')}
          </p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search doctors, hospitals, blood donors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-card text-card-foreground shadow-elevated text-base focus:outline-none focus:ring-2 focus:ring-primary/50 font-body"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
          </motion.div>

          {/* Quick tags */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
