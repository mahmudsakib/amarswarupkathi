import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AlertCircle, Clock, User } from "lucide-react";

interface AnnouncementItem {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  type: 'important' | 'update' | 'info';
}

const Announcement = () => {
  const { t } = useTranslation();

  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      title: "Website Launch",
      description: "Welcome to Amader Swarupkathi - Your digital gateway to all essential services and information in Swarupkathi upazila.",
      date: "2026-03-01",
      author: "Admin",
      type: 'update'
    },
    {
      id: 2,
      title: "New Blood Bank Service",
      description: "We've launched a comprehensive blood bank service. You can now request blood or register as a donor directly through our platform.",
      date: "2026-02-15",
      author: "Admin",
      type: 'important'
    },
    {
      id: 3,
      title: "Community Feedback Welcome",
      description: "We'd love to hear your feedback on the platform. Please use our contact information to share suggestions and report any issues.",
      date: "2026-02-01",
      author: "Admin",
      type: 'info'
    }
  ];

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'important':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'update':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'important':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <span>←</span> {t('common.back')}
          </Link>
          <h1 className="text-4xl font-bold font-display text-foreground mb-2">{t('footer.announcement')}</h1>
          <p className="text-muted-foreground text-lg">Latest announcements and updates from আমাদের স্বরূপকাঠি</p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-card border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${getAnnouncementColor(announcement.type)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getAnnouncementIcon(announcement.type)}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{announcement.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {announcement.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{announcement.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{announcement.author}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No announcements at the moment</p>
            </div>
          )}
        </div>

        {/* Stay Updated Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Check back here regularly for the latest announcements and updates from আমাদের স্বরূপকাঠি.
            You can also contact us directly if you have any questions or suggestions.
          </p>
          <a
            href="mailto:amaderswarupkathi@gmail.com"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
