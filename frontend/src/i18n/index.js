import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      choose_language: "Choisissez votre langue",
      welcome: "Bienvenue au kiosque hospitalier",
      chatbot: "Assistant virtuel",
      services: "Services",
      tarifs: "Tarifs",
      procedures: "Procédures administratives",
      feedback: "Donnez votre avis",
      login: "Connexion admin",
      dashboard: "Tableau de bord admin",
      page_not_found: "Page non trouvée",
      return_home: "Retour à l'accueil",
      send: "Envoyer",
      description: "Description",
      act: "Acte",
      price: "Prix",
      loading: "Chargement...",
      admin_users: "Utilisateurs",
      admin_questions: "Questions posées",
      error_server: "Erreur de connexion avec le serveur.",
      email: "Email",
      password: "Mot de passe",
      logout: "Déconnexion",
      form_feedback_placeholder: "Exprimez votre avis ou suggestion ici...",
      not_found_procedures: "Aucune procédure pour le moment."
      // Ajoute ici toutes les autres clés nécessaires
    }
  },
  ar: {
    translation: {
      choose_language: "اختر لغتك",
      welcome: "مرحبًا بكم في كشك المستشفى",
      chatbot: "مساعد افتراضي",
      services: "الخدمات",
      tarifs: "التعريفات",
      procedures: "الإجراءات الإدارية",
      feedback: "اترك رأيك",
      login: "دخول المدير",
      dashboard: "لوحة تحكم المدير",
      page_not_found: "الصفحة غير موجودة",
      return_home: "العودة إلى الرئيسية",
      send: "إرسال",
      description: "الوصف",
      act: "الإجراء",
      price: "السعر",
      loading: "جار التحميل...",
      admin_users: "المستخدمون",
      admin_questions: "الأسئلة المطروحة",
      error_server: "خطأ في الاتصال بالخادم.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      logout: "تسجيل الخروج",
      form_feedback_placeholder: "اكتب رأيك أو اقتراحك هنا...",
      not_found_procedures: "لا توجد إجراءات حاليا."
      // Ajoute ici toutes les autres clés nécessaires
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // ou 'ar' selon la langue par défaut souhaitée
    fallbackLng: "fr",
    interpolation: { escapeValue: false }
  });

export default i18n;
