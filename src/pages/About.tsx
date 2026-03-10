import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 prose prose-lg">
        <h1>{t('aboutPage.title')}</h1>
        <p>{t('aboutPage.paragraph1')}</p>
        <p>{t('aboutPage.paragraph2')}</p>
        <p>{t('aboutPage.paragraph3')}</p>
      </div>
    </div>
  );
};

export default About;
