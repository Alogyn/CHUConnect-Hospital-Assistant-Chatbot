import { useEffect, useState } from "react";
import axios from "axios";
import TableView from "../components/DataGrid/TableView";
import { useTranslation } from "react-i18next";

export default function QuestionsList() {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('/api/questions/')
      .then(res => setRows(res.data));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'user_input', headerName: t('question') || 'Question', width: 300 },
    { field: 'language', headerName: 'Langue', width: 120 },
    { field: 'reponse', headerName: t('response') || 'Réponse', width: 400, valueGetter: params => params.row.reponse?.reponse_text || "" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">{t('questions_answers') || 'Questions & Réponses'}</h2>
      <TableView rows={rows} columns={columns} />
    </div>
  );
}
