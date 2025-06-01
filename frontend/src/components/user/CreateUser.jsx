import { React, useState } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MyMessage from '../forms/Message';
import { useNavigate } from 'react-router';

const CreateUser = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    first_name: yup.string("Entrer le prénom").required("Le prénom est obligatoire"),
    last_name: yup.string("Entrer le nom").required("Le nom est obligatoire"),
    email: yup.string("Entrer l'email").email("Email invalide").required("L'email est obligatoire"),
    password: yup.string("Entrer le mot de passe").min(6, "Minimum 6 caractères").required("Mot de passe obligatoire"),
    // username: yup.string("Entrer le nom d'utilisateur"), // si tu veux l'utiliser
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      // username: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log("SUBMIT", values);
      AxiosInstance.post(`users/`, values)
        .then(() => {
          setMessage(
            <MyMessage
              messageText={"Utilisateur créé avec succès !"}
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
              messageText={"Erreur lors de la création : " + (error.response?.data?.email || error.message)}
              messagecolor={"red"}
            />
          );
        });
    }
  });
  console.log("Formik errors:", formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>Créer un nouvel utilisateur</Typography>
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
          </Box>

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

            {/* Décommente si tu veux utiliser le champ username */}
            {/* <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"Nom d'utilisateur"}
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Box> */}

            <Box sx={{ marginTop: '30px' }}>
              <Button type="submit" variant="contained" fullWidth onClick={() => console.log("CLICK")}>Créer</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default CreateUser;
