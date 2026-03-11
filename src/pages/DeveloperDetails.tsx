import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const DeveloperDetails = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <span>←</span> {t('common.back')}
          </Link>
          <h1 className="text-4xl font-bold font-display text-foreground mb-2">Developer Details</h1>
          <p className="text-muted-foreground text-lg">Information about the developer of এই প্রকল্প</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Developer Card */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  SM
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Sakib Mahmud</h2>
                  <p className="text-primary font-semibold mb-2">Full Stack Developer</p>
                  <p className="text-muted-foreground">Passionate developer creating digital solutions for communities</p>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Sakib Mahmud is a full-stack web developer dedicated to building digital platforms that serve communities. With expertise in modern web technologies, he created the Amader Swarupkathi platform to help residents of Swarupkathi access essential services and information.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The project aims to bridge the digital divide and empower communities through technology, making it easier for people to connect with hospitals, doctors, schools, businesses, and emergency services in their locality.
                </p>
              </div>

              <div className="border-t border-border mt-8 pt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'i18n', 'React Router', 'Vitest'].map((tech) => (
                    <span key={tech} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Social Links */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact & Social</h3>
              <div className="space-y-3">
                <a
                  href="mailto:amaderswarupkathi@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">Email</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  <span className="text-sm">GitHub</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm">LinkedIn</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">Project Links</h3>
              <div className="space-y-2">
                <a href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </a>
                <a href="/about" className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  About امادر سواروپ کاتھی
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDetails;
