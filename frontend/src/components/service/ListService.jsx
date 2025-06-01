import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AxiosInstance from '../AxiosInstance'; // adapte le chemin si besoin

const ListService = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get('api/services/')
      .then((res) => {
        setMyData(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Nom du service' },
      { accessorKey: 'location', header: 'Emplacement' },
      { accessorKey: 'description', header: 'Description' },
    ],
    []
  );

  return (
    <div>
      <Box className={"TopBar"} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CalendarViewMonthIcon />
        <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
          Liste des Services
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/services/create/"
          sx={{ marginLeft: 'auto' }}
        >
          Ajouter un service
        </Button>
      </Box>

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton color="primary" component={Link} to={`/services/edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`/services/delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default ListService;
