import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-10 mt-20">
      <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <Link to="/chatbot" className="bg-purple-500 text-white px-8 py-4 rounded-xl text-lg shadow hover:bg-purple-700 transition">{t('chatbot')}</Link>
        <Link to="/services" className="bg-cyan-600 text-white px-8 py-4 rounded-xl text-lg shadow hover:bg-cyan-800 transition">{t('services')}</Link>
        <Link to="/tarifs" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg shadow hover:bg-indigo-800 transition">{t('tarifs')}</Link>
        <Link to="/procedures" className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg shadow hover:bg-orange-800 transition">{t('procedures')}</Link>
        <Link to="/admin/login" className="col-span-2 bg-gray-600 text-white px-8 py-4 rounded-xl text-lg shadow hover:bg-gray-800 transition">{t('login')}</Link>
      </div>
    </div>
  );
}
