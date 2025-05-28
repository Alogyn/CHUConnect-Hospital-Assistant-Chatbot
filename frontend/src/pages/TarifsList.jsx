// src/pages/TarifsList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function TarifsList() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/tarifs/')
      .then(res => setRows(res.data));
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'acte', headerName: 'Acte', width: 200 },
    { field: 'price', headerName: 'Prix (DH)', width: 120 },
    //{ field: 'service_name', headerName: 'Service', width: 180 },
    //{ field: 'user_name', headerName: 'Utilisateur', width: 150 }
  ];
  return (
    <div style={{ height: 500, width: "80%", margin: "30px auto" }}>
      <h2 style={{ marginBottom: "16px" }}>Liste des Tarifs</h2>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}
