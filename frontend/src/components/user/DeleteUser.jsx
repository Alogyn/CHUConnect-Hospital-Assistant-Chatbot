import { React, useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate, useParams } from 'react-router';
import MyMessage from '../forms/Message';

const DeleteUser = () => {
    const { id: MyId } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState([]);
    const [myData, setMyData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    // Récupérer les infos de l'utilisateur pour affichage
    const GetData = () => {
        AxiosInstance.get(`users/${MyId}/`).then((res) => {
            setMyData(res.data);
        });
    };

    useEffect(() => {
        GetData();
    }, []);

    const DeleteRecord = (event) => {
        event.preventDefault();
        AxiosInstance.delete(`users/${MyId}/`)
            .then(() => {
                setMessage(
                    <MyMessage
                        messageText={"Utilisateur supprimé avec succès !"}
                        messagecolor={"green"}
                    />
                );
                setTimeout(() => {
                    navigate('/users');
                }, 1500);
            });
    };

    return (
        <div>
            <form onSubmit={DeleteRecord}>
                {message}
                <Box className={"TopBar"}>
                    <AddBoxIcon />
                    <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
                        Es-tu sûr de vouloir supprimer cet utilisateur ?
                    </Typography>
                </Box>

                <Box className={'TextBox'}>
                    <Typography>
                        Tu vas supprimer l’utilisateur <strong>{myData.first_name} {myData.last_name}</strong> ({myData.email}).
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

export default DeleteUser;
