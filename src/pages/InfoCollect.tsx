import { useState } from "react";
import { services } from "@/lib/services";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const InfoCollect = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder: you can send the data to your backend or store locally
    console.log("submitted", { category, details });
    alert(t('infoCollect.submit'));
  };

  const selectedService = services.find((s) => {
    const key = s.path.replace("/services/", "");
    return key === category;
  });
  const selectedLabel = selectedService ? t(selectedService.labelKey!) : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">{t('infoCollect.title')}</h1>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label htmlFor="info-category" className="block mb-1 font-medium">
                {t('infoCollect.selectCategory')}
              </label>
              <select
                id="info-category"
                className="w-full border border-border rounded-lg px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--</option>
                {services.map((s) => {
                  const key = s.path.replace("/services/", "");
                  return (
                    <option key={key} value={key}>
                      {t(s.labelKey!)}
                    </option>
                  );
                })}
              </select>
            </div>

            {category && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {t('infoCollect.forCategory', { category: selectedLabel })}
                </h2>

                {/* example of different inputs per category */}
                {category === 'hospitals' && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="info-hospitals" className="block mb-1">{t('serviceCategories.hospitals')} {t('infoCollect.details')}</label>
                      <input
                        id="info-hospitals"
                        type="text"
                        className="w-full border border-border rounded-lg px-3 py-2"
                        placeholder={t('serviceCategories.hospitals')}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {category === 'doctors' && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="info-doctors" className="block mb-1">{t('serviceCategories.doctors')} {t('infoCollect.details')}</label>
                      <input
                        id="info-doctors"
                        type="text"
                        className="w-full border border-border rounded-lg px-3 py-2"
                        placeholder={t('serviceCategories.doctors')}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {/* fallback generic field for other categories */}
                {category !== 'hospitals' && category !== 'doctors' && (
                  <div>
                    <label htmlFor="info-details" className="block mb-1">{t('infoCollect.details')}</label>
                    <textarea
                      id="info-details"
                      className="w-full border border-border rounded-lg px-3 py-2"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('infoCollect.submit')}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoCollect;
