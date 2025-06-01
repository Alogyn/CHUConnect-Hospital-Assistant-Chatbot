import React, { useEffect, useState, useMemo } from 'react';
import AxiosInstance from '../AxiosInstance';
import { useLocation } from 'react-router';
import { MaterialReactTable } from 'material-react-table';

const KioskTarifs = () => {
  const [tarifs, setTarifs] = useState([]);
  const lang = new URLSearchParams(useLocation().search).get('lang') || 'fr';

  useEffect(() => {
    AxiosInstance.get('api/tarifs_public/')
      .then(res => setTarifs(res.data));
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'acte', header: lang === 'ar' ? 'الإجراء' : 'Acte' },
      { accessorKey: 'price', header: lang === 'ar' ? 'السعر (درهم)' : 'Prix (MAD)' },
    ],
    [lang]
  );

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>{lang === 'ar' ? 'قائمة التعريفات' : 'Liste des tarifs'}</h2>
      <MaterialReactTable
        columns={columns}
        data={tarifs}
        enableRowActions={false}
        enableColumnActions={false}
        enableFullScreenToggle={false}
        muiTableProps={{ sx: { minWidth: 350 } }}
      />
    </div>
  );
};

export default KioskTarifs;
