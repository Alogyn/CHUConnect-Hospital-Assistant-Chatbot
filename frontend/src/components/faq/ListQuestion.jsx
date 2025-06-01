import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Typography, Button, Chip, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AxiosInstance from '../AxiosInstance';
import { MaterialReactTable } from 'material-react-table';

// Fonction utilitaire pour tronquer
const truncate = (text, length = 20) =>
  text && text.length > length ? text.slice(0, length) + '…' : text;

const ListQuestion = () => {
  const [myData, setMyData] = useState([]);
  const navigate = useNavigate();

  const GetData = () => {
    AxiosInstance.get('api/questions/').then((res) => setMyData(res.data));
  };

  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      // Actions
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <IconButton color="primary" component={Link} to={`/questions/edit/${row.original.id}`}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" component={Link} to={`/questions/delete/${row.original.id}`}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
      },
      // ID
      { accessorKey: 'id', header: 'ID', size: 50 },

      // Question (tronquée + tooltip)
      {
        accessorKey: 'user_input',
        header: 'Question',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value && value.length > 40 ? (
            <Tooltip title={value}>
              <span>{truncate(value, 20)}</span>
            </Tooltip>
          ) : (
            value
          );
        }
      },

      // Réponse (tronquée + tooltip)
      {
        accessorKey: 'reponse',
        header: 'Réponse',
        Cell: ({ cell }) => {
          const reponse = cell.getValue();
          if (reponse && reponse.answer_text) {
            return reponse.answer_text.length > 40 ? (
              <Tooltip title={reponse.answer_text}>
                <Chip label={truncate(reponse.answer_text, 20)} color="success" />
              </Tooltip>
            ) : (
              <Chip label={reponse.answer_text} color="success" />
            );
          }
          return <Chip label="Non répondue" color="warning" />;
        }
      },

      // Catégorie
      { accessorKey: 'categorie', header: 'Catégorie' },

      // Auteur (email)
      {
        accessorKey: 'auteur_email',
        header: 'Auteur',
        Cell: ({ cell }) => cell.getValue() || '—'
      },

      // Date de création
      { accessorKey: 'created_at', header: 'Date de création' },
    ],
    []
  );

  return (
    <div>
      <Box className="TopBar" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <QuizIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
            Liste des questions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          onClick={() => navigate('/questions/create')}
          sx={{ ml: 2 }}
        >
          Ajouter une question
        </Button>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={myData}
        enableRowActions={false}
      />
    </div>
  );
};

export default ListQuestion;
