import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('/api/admin/dashboard/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">{t('dashboard')}</h1>
      {stats ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-lg font-bold">Utilisateurs</div>
            <div>{stats.users}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-lg font-bold">Questions posées</div>
            <div>{stats.questions}</div>
          </div>
          {/* Ajoute d'autres stats ici */}
        </div>
      ) : (
        <div>Chargement...</div>
      )}
    </div>
  );
}
