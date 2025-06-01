import React, { useEffect, useState, useMemo } from 'react';
import AxiosInstance from '../AxiosInstance';
import { useLocation } from 'react-router';
import { MaterialReactTable } from 'material-react-table';

const KioskServices = () => {
  const [services, setServices] = useState([]);
  const lang = new URLSearchParams(useLocation().search).get('lang') || 'fr';

  useEffect(() => {
    AxiosInstance.get('api/services_public/')
      .then(res => setServices(res.data));
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: lang === 'ar' ? 'الخدمة' : 'Service' },
      { accessorKey: 'location', header: lang === 'ar' ? 'الموقع' : 'Emplacement' },
      { accessorKey: 'description', header: lang === 'ar' ? 'الوصف' : 'Description' },
    ],
    [lang]
  );

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>{lang === 'ar' ? 'قائمة الخدمات' : 'Liste des services'}</h2>
      <MaterialReactTable
        columns={columns}
        data={services}
        enableRowActions={false}
        enableColumnActions={false}
        enableFullScreenToggle={false}
        muiTableProps={{ sx: { minWidth: 350 } }}
      />
    </div>
  );
};

export default KioskServices;
