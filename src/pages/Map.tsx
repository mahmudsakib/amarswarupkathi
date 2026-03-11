import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Map = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <span>←</span> {t('common.back')}
          </Link>
          <h1 className="text-4xl font-bold font-display text-foreground mb-2">{t('footer.map')}</h1>
          <p className="text-muted-foreground text-lg">Location of Swarupkathi Upazila and important landmarks</p>
        </div>

        {/* Map Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              {/* Placeholder for map - in real implementation, you would use Google Maps, Leaflet, or similar */}
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Map implementation will go here</p>
                  <p className="text-sm text-muted-foreground mt-2">Using Google Maps, Leaflet, or OpenStreetMap</p>
                </div>
              </div>

              <div className="p-6 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Swarupkathi Upazila</h2>
                <p className="text-muted-foreground mb-4">
                  Swarupkathi upazila is located in Pirojpur District of Barisal Division, Bangladesh.
                  This is the headquarters of our digital portal, serving the community with information
                  about local services, hospitals, doctors, schools, businesses, and emergency services.
                </p>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-3">Geographic Information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Division:</strong> Barisal</p>
                    <p><strong>District:</strong> Pirojpur</p>
                    <p><strong>Upazila:</strong> Swarupkathi</p>
                    <p><strong>Country:</strong> Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info Card */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </h3>
              <address className="not-italic text-muted-foreground leading-relaxed">
                <span className="font-semibold block text-foreground mb-1">Swarupkathi Upazila</span>
                Pirojpur District<br />
                Barisal Division<br />
                Bangladesh
              </address>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact
              </h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +880 1737374654
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:amaderswarupkathi@gmail.com" className="hover:text-primary">
                    amaderswarupkathi@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Nearby Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Find hospitals and medical facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Locate doctors and specialists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Discover schools and educational centers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Access emergency services</span>
                </li>
              </ul>

              <Link
                to="/services"
                className="mt-4 block w-full text-center bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">About This Platform</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            আমাদের স্বরূপকাঠি (Amader Swarupkathi) is a digital platform dedicated to serving the residents
            of Swarupkathi upazila. Our mission is to make it easy for people to access information about
            essential services in their area, including hospitals, doctors, schools, businesses, and emergency services.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're looking for medical care, educational institutions, business services, or emergency assistance,
            our platform provides a centralized hub to find and connect with these vital resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
