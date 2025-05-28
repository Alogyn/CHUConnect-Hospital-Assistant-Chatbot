import { DataGrid } from "@mui/x-data-grid";

/**
 * TableView - composant générique pour afficher un DataGrid MUI.
 * @param {array} rows - Données (tableaux d’objets).
 * @param {array} columns - Colonnes MUI.
 * @param {number} pageSize - Nombre de lignes par page (défaut: 10).
 */
export default function TableView({ rows, columns, pageSize = 10 }) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        disableSelectionOnClick
        getRowId={row => row.id}
      />
    </div>
  );
}
