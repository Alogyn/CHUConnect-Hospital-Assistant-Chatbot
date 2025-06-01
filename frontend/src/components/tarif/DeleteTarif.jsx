import { React, useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MyMessage from '../forms/Message';
import { useNavigate, useParams } from 'react-router';

const DeleteTarif = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState({ acte: "", price: "" });

  useEffect(() => {
    AxiosInstance.get(`api/tarifs/${id}/`).then(res => setMyData(res.data));
  }, [id]);

  const DeleteRecord = (event) => {
    event.preventDefault();
    AxiosInstance.delete(`api/tarifs/${id}/`).then(() => {
      setMessage(<MyMessage messageText="Tarif supprimé !" messagecolor="green" />);
      setTimeout(() => { navigate('/tarifs'); }, 1500);
    });
  };

  return (
    <div>
      <form onSubmit={DeleteRecord}>
        {message}
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
            Es-tu sûr de vouloir supprimer ce tarif ?
          </Typography>
        </Box>
        <Box className={'TextBox'}>
          <Typography>
            Tu vas supprimer le tarif <strong>{myData.acte}</strong> ({myData.price} MAD).
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <Button type="submit" variant="contained" color="error" fullWidth>
            Supprimer
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default DeleteTarif;
