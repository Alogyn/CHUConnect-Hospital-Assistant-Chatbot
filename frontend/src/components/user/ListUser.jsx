import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Typography, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AxiosInstance from '../AxiosInstance';

const ListUser = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get('users/')
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
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorKey: 'email', header: 'Email' },
    ],
    []
  );

  return (
    <div>
      <Box className={"TopBar"} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CalendarViewMonthIcon />
        <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
          User Management
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/users/create/"
          sx={{ marginLeft: 'auto' }}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton color="primary" component={Link} to={`/users/edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`/users/delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default ListUser;
