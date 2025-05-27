import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function TarifsList() {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('/api/tarifs/') // Mets ici ton endpoint backend réel
      .then(res => setRows(res.data));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'acte', headerName: t('services'), width: 200 },
    { field: 'prix', headerName: t('tarifs'), width: 120 }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">{t('tarifs')}</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
}
