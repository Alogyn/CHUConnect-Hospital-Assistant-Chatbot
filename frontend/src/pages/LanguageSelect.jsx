import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 bg-blue-50">
      <h1 className="text-3xl font-bold">{t('choose_language')}</h1>
      <div className="flex gap-8">
        <button onClick={() => setLang('fr')} className="bg-blue-600 text-white px-8 py-3 rounded-xl text-xl hover:bg-blue-800 transition">Français</button>
        <button onClick={() => setLang('ar')} className="bg-green-600 text-white px-8 py-3 rounded-xl text-xl hover:bg-green-800 transition">العربية</button>
      </div>
    </div>
  );
}
