import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function ServicesList() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/services/')
      .then(res => setRows(res.data));
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Service', width: 200 },
    { field: 'description', headerName: 'Description', width: 500 },
    //{ field: 'user_name', headerName: 'Ajouté par', width: 150 }
  ];
  return (
    <div style={{ height: 500, width: "80%", margin: "30px auto" }}>
      <h2 style={{ marginBottom: "16px" }}>Liste des Services</h2>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}
