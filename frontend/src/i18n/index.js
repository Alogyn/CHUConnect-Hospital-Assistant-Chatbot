import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      welcome: "Bienvenue au kiosque hospitalier",
      choose_language: "Choisissez votre langue",
      chatbot: "Assistant virtuel",
      services: "Services",
      tarifs: "Tarifs",
      procedures: "Procédures administratives",
      feedback: "Donnez votre avis",
      login: "Connexion admin",
      dashboard: "Tableau de bord admin",
      // Ajoute ici les autres traductions FR
    }
  },
  ar: {
    translation: {
      welcome: "مرحبًا بكم في كشك المستشفى",
      choose_language: "اختر لغتك",
      chatbot: "مساعد افتراضي",
      services: "الخدمات",
      tarifs: "التعريفات",
      procedures: "الإجراءات الإدارية",
      feedback: "اترك رأيك",
      login: "دخول المدير",
      dashboard: "لوحة تحكم المدير",
      // Ajoute ici les autres traductions AR
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false }
  });

export default i18n;
