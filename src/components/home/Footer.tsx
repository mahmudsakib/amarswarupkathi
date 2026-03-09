import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero text-primary-foreground/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl font-display text-primary-foreground mb-4">
              Amar Upazila
            </h3>
            <p className="text-sm leading-relaxed">
              Your digital gateway to all essential services and information in the upazila.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Hospitals</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Doctors</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blood Donors</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Schools</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Govt Offices</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Businesses</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Emergency</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Jobs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Upazila Parishad, Sadar</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+880 1XXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@amarupazila.gov.bd</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs">
          <p>© 2026 Amar Upazila. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
