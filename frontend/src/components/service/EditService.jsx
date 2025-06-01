import { React, useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import MyMessage from '../forms/Message';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';

const EditService = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState({ name: "", location: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`api/services/${id}/`).then(res => setMyData(res.data));
  }, [id]);

  const validationSchema = yup.object({
    name: yup.string("Entrer le nom du service").required("Le nom est obligatoire"),
    location: yup.string("Entrer l'emplacement").required("L'emplacement est obligatoire"),
    description: yup.string("Entrer la description").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: myData.name,
      location: myData.location,
      description: myData.description,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      AxiosInstance.put(`api/services/${id}/`, values)
        .then(() => {
          setMessage(<MyMessage messageText="Service modifié !" messagecolor="green" />);
          setTimeout(() => { navigate('/services'); }, 1500);
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
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>Modifier le service</Typography>
        </Box>
        {message}
        <TextForm label="Nom" name="name" value={formik.values.name} onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name} />
        <TextForm label="Emplacement" name="location" value={formik.values.location} onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location} />
        <TextForm label="Description" name="description" value={formik.values.description} onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description} multiline rows={4} />
        <Button type="submit" variant="contained" fullWidth>Mettre à jour</Button>
      </form>
    </div>
  );
};

export default EditService;
