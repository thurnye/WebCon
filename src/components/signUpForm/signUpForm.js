import React from 'react';
import styles from './signUpForm.module.css';
import { Typography, Box, TextField, Grid, Checkbox, FormControlLabel, Button, Link, useTheme } from "@mui/material"
import { Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import  Dropzone  from "react-dropzone";
import services from '../../util/services'
import { convertToBase64 } from '../../util/common/general';
import FlexBetween from "../FlexBetweenBox/flexBetweenBox";
import {MdModeEditOutline} from 'react-icons/md'
import {StatusCode} from '../../util/common/enums'


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string()
  .required("required")
  .min(8, 'Password is too short - should be 8 chars minimum.'),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.object().shape({
    avatar: yup.string().required("required"),
    name: yup.string().required("required"),
  }).required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: {
    avatar: "",
    name: ""
  },
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const handleRegister = async (values) => {
    const result = await services.register(values);
    if(result.status === StatusCode.success){
      navigate('/login');
    };
  };


  return(
    <div className={styles.SignUpForm} data-testid="SignUpForm">
      <Formik
      onSubmit={handleRegister}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      >
        {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      autoComplete="family-name"
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="city"
                      name="location"
                      required
                      fullWidth
                      id="location"
                      label="Location"
                      onChange={handleChange}
                      value={values.location}
                      error={Boolean(touched.location) && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="occupation"
                      label="Occupation"
                      name="occupation"
                      autoComplete="occupation"
                      onChange={handleChange}
                      value={values.occupation}
                      error={
                        Boolean(touched.occupation) && Boolean(errors.occupation)
                      }
                      helperText={touched.occupation && errors.occupation}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password) && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Dropzone
                      multiple={false}
                      onDrop={async (acceptedFiles) =>
                        setFieldValue("picture", {
                          avatar: await convertToBase64(acceptedFiles[0]),
                          name: acceptedFiles[0].name,
                        })
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture.name ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              
                              <Typography>{values.picture.name}</Typography>
                              <MdModeEditOutline sx={{ fontSize: "25px" }}/>
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
        </form>
      )}
      </Formik>
    </div>
  )
};


export default SignUpForm;
