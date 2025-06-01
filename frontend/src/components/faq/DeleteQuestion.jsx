import React, { useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate, useParams } from 'react-router';
import MyMessage from '../forms/Message';

const QuestionDelete = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState({ user_input: "", categorie: "" });
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`api/questions/${id}/`).then((res) => setMyData(res.data));
  }, [id]);

  const DeleteRecord = (event) => {
    event.preventDefault();
    AxiosInstance.delete(`api/questions/${id}/`).then(() => {
      setMessage(
        <MyMessage
          messageText={"Question supprimée avec succès !"}
          messagecolor={"green"}
        />
      );
      setTimeout(() => navigate('/questions'), 1500);
    });
  };

  return (
    <div>
      <form onSubmit={DeleteRecord}>
        {message}
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
            Êtes-vous sûr de vouloir supprimer cette question ?
          </Typography>
        </Box>
        <Box className={'TextBox'}>
          <Typography>
            Vous allez supprimer la question : <strong>{myData.user_input}</strong><br />
            Catégorie : <em>{myData.categorie}</em>
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <Button type="submit" variant="contained" color="error" fullWidth>Supprimer</Button>
        </Box>
      </form>
    </div>
  );
};

export default QuestionDelete;
