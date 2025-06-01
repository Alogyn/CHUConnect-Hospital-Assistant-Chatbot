import React, { useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MyMessage from '../forms/Message';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';

const EXAMPLE_CATEGORIES = [
  "Orientation",
  "Tarifs",
  "Procédures administratives"
];

const QuestionEdit = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState({
    user_input: "",
    categorie: "",
    reponse: null, // réponse liée si elle existe
  });
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`api/questions/${id}/`).then((res) => {
      setMyData(res.data);
    });
  }, [id]);

  const validationSchema = yup.object({
    user_input: yup.string().required("La question est requise"),
    categorie: yup.string().required("La catégorie est requise"),
    answer_text: yup.string(), // optionnelle
  });

  const formik = useFormik({
    initialValues: {
      user_input: myData.user_input,
      categorie: myData.categorie,
      answer_text: myData.reponse ? myData.reponse.answer_text : '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      // 1. Update de la question
      await AxiosInstance.put(`api/questions/${id}/`, {
        user_input: values.user_input,
        categorie: values.categorie,
      });

      // 2. Update ou création de la réponse liée
      if (values.answer_text && values.answer_text.trim() !== '') {
        if (myData.reponse) {
          // réponse existe, on modifie
          await AxiosInstance.put(`api/reponses/${myData.reponse.id}/`, {
            answer_text: values.answer_text,
            question: id,
          });
        } else {
          // réponse n'existe pas, on la crée
          await AxiosInstance.post('api/reponses/', {
            answer_text: values.answer_text,
            question: id,
          });
        }
      }

      setMessage(
        <MyMessage
          messageText={"Question (et réponse) modifiée avec succès !"}
          messagecolor={"green"}
        />
      );
      setTimeout(() => navigate('/questions'), 1500);
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className="TopBar">
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
            Modifier la question
          </Typography>
        </Box>
        {message}
        <Box className="FormBox">
          <Box
            className="FormArea"
            sx={{ maxWidth: 700, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 4, mt: 4 }}
          >
            {/* Question */}
            <TextField
              label="Question"
              name="user_input"
              value={formik.values.user_input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user_input && Boolean(formik.errors.user_input)}
              helperText={formik.touched.user_input && formik.errors.user_input}
              fullWidth
              multiline
              minRows={1}
            />

            {/* Réponse */}
            <TextField
              label="Réponse (optionnelle)"
              name="answer_text"
              value={formik.values.answer_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.answer_text && Boolean(formik.errors.answer_text)}
              helperText={formik.touched.answer_text && formik.errors.answer_text}
              fullWidth
              multiline
              minRows={1}
            />

            {/* Catégorie */}
            <FormControl fullWidth error={formik.touched.categorie && Boolean(formik.errors.categorie)}>
              <InputLabel id="categorie-label">Catégorie</InputLabel>
              <Select
                labelId="categorie-label"
                id="categorie"
                name="categorie"
                value={formik.values.categorie}
                label="Catégorie"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

            {/* Bouton */}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Modifier
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default QuestionEdit;
