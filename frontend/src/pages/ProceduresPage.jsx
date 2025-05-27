import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function ProceduresPage() {
  const { t } = useTranslation();
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    axios.get('/api/procedures/') // Mets ici ton endpoint réel
      .then(res => setProcedures(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('procedures')}</h2>
      <ul className="list-disc ml-6">
        {procedures.length === 0 && <li>Aucune procédure pour le moment.</li>}
        {procedures.map(proc => (
          <li key={proc.id} className="mb-2">{proc.description}</li>
        ))}
      </ul>
    </div>
  );
}
