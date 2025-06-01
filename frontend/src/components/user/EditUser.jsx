import { React, useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MyMessage from '../forms/Message';
import { useNavigate, useParams } from 'react-router';

const EditUser = () => {
  const { id: MyId } = useParams();

  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // password: "", // En général on ne modifie pas le password ici, sauf cas particulier
  });

  const navigate = useNavigate();

  // Charger les données de l'utilisateur existant
  const GetData = () => {
    AxiosInstance.get(`users/${MyId}/`).then((res) => {
      setMyData(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const validationSchema = yup.object({
    first_name: yup.string("Entrer le prénom").required("Le prénom est obligatoire"),
    last_name: yup.string("Entrer le nom").required("Le nom est obligatoire"),
    email: yup.string("Entrer l'email").email("Email invalide").required("L'email est obligatoire"),
    // password: yup.string("Entrer le mot de passe").min(6, "Minimum 6 caractères"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: myData.first_name,
      last_name: myData.last_name,
      email: myData.email,
      // password: "", // Généralement non éditable ici
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      AxiosInstance.put(`users/${MyId}/`, values)
        .then(() => {
          setMessage(
            <MyMessage
              messageText={"Utilisateur mis à jour avec succès !"}
              messagecolor={"green"}
            />
          );
          setTimeout(() => {
            navigate('/users');
          }, 1500);
        })
        .catch((error) => {
          setMessage(
            <MyMessage
              messageText={"Erreur lors de la mise à jour : " + (error.response?.data?.email || error.message)}
              messagecolor={"red"}
            />
          );
        });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>Modifier l'utilisateur</Typography>
        </Box>
        {message}

        <Box className={'FormBox'}>
          <Box className={'FormArea'}>
            <TextForm
              label={"Prénom"}
              name='first_name'
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
            />

            <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"Nom"}
                name='last_name'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Box>

            <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"Email"}
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            {/* Si tu veux permettre le changement de mot de passe, décommente ici
            <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"Mot de passe"}
                name='password'
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            */}

            <Box sx={{ marginTop: '30px' }}>
              <Button type="submit" variant="contained" fullWidth>Mettre à jour</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default EditUser;
