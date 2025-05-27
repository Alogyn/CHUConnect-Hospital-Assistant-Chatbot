import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="mb-6">{t('page_not_found') || "Page non trouvée"}</p>
      <Link to="/home" className="text-blue-600 underline">{t('return_home') || "Retour à l'accueil"}</Link>
    </div>
  );
}
