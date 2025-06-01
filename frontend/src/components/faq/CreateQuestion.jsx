import React, { useState } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import MyMessage from '../forms/Message';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

const EXAMPLE_CATEGORIES = [
  "Orientation",
  "Tarifs",
  "Procédures administratives"
];

const QuestionCreate = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    user_input: yup.string().required("La question est requise"),
    categorie: yup.string().required("La catégorie est requise"),
    answer_text: yup.string(), // Non requis (réponse optionnelle)
  });

  const formik = useFormik({
    initialValues: {
      user_input: '',
      categorie: '',
      answer_text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // 1. Création de la question
      const res = await AxiosInstance.post('api/questions/', {
        user_input: values.user_input,
        categorie: values.categorie,
      });

      const questionId = res.data.id;

      // 2. Si réponse saisie, création de la réponse liée
      if (values.answer_text && values.answer_text.trim() !== "") {
        await AxiosInstance.post('api/reponses/', {
          answer_text: values.answer_text,
          question: questionId
        });
      }

      setMessage(
        <MyMessage
          messageText={"Question ajoutée avec succès !" + (values.answer_text ? " (et réponse enregistrée)" : "")}
          messagecolor={"green"}
        />
      );
      setTimeout(() => navigate('/questions'), 1500);
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
            Nouvelle question
          </Typography>
        </Box>
        {message}
        <Box className={'FormBox'}>
          <Box className={'FormArea'}>
            <TextForm
              label={"Question"}
              name='user_input'
              value={formik.values.user_input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user_input && Boolean(formik.errors.user_input)}
              helperText={formik.touched.user_input && formik.errors.user_input}
            />

            <FormControl fullWidth sx={{ marginTop: '30px' }}>
              <InputLabel id="categorie-label">Catégorie</InputLabel>
              <Select
                labelId="categorie-label"
                id="categorie"
                name="categorie"
                value={formik.values.categorie}
                label="Catégorie"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.categorie && Boolean(formik.errors.categorie)}
              >
                {EXAMPLE_CATEGORIES.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
              {formik.touched.categorie && formik.errors.categorie && (
                <Typography color="error" fontSize={12} mt={0.5}>
                  {formik.errors.categorie}
                </Typography>
              )}
            </FormControl>

            <TextForm
              label={"Réponse (optionnelle)"}
              name='answer_text'
              value={formik.values.answer_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.answer_text && Boolean(formik.errors.answer_text)}
              helperText={formik.touched.answer_text && formik.errors.answer_text}
              sx={{ marginTop: '30px' }}
            />

            <Box sx={{ marginTop: '30px' }}>
              <Button type="submit" variant="contained" fullWidth>Créer</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default QuestionCreate;
