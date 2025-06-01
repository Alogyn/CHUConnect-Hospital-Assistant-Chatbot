import { React, useState } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import MyMessage from '../forms/Message';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

const CreateTarif = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    acte: yup.string("Entrer l'acte").required("L'acte est obligatoire"),
    price: yup.number("Entrer le prix").required("Le prix est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      acte: "",
      price: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      AxiosInstance.post(`api/tarifs/`, values)
        .then(() => {
          setMessage(<MyMessage messageText="Tarif créé avec succès !" messagecolor="green" />);
          setTimeout(() => { navigate('/tarifs'); }, 1500);
        })
        .catch((error) => {
          setMessage(<MyMessage messageText={"Erreur : " + error.message} messagecolor="red" />);
        });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>Créer un nouveau tarif</Typography>
        </Box>
        {message}
        <TextForm label="Acte" name="acte" value={formik.values.acte} onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.acte && Boolean(formik.errors.acte)}
          helperText={formik.touched.acte && formik.errors.acte} />
        <TextForm label="Prix" name="price" type="number" value={formik.values.price} onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price} />
        <Button type="submit" variant="contained" fullWidth>Créer</Button>
      </form>
    </div>
  );
};

export default CreateTarif;
