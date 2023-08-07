import React from 'react';
import styles from './LoginForm.module.css';
import { Box, TextField, Grid, Checkbox, FormControlLabel, Button, Link } from "@mui/material"
import { Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import CopyRight from '../CopyRight/CopyRight';
import services from '../../util/services';
import {StatusCode} from '../../util/common/enums'


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values, onSubmitProps) => {
    console.log(values);
    const result = await services.postLogin(values);
    if(result.status === StatusCode.success){
      console.log(result);
      dispatch(authActions.login(result.data))
      navigate('/');
    };
  };


  return(
    <div className={styles.LoginForm} data-testid="LoginForm">

      <Formik
      onSubmit={handleLogin}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
      >
        {({
        values,
        errors,
        touched,
        // handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        // resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <CopyRight sx={{ mt: 5 }} />
          </Box>
        </form>
      )}
      </Formik>
    </div>
  )
};

export default LoginForm;
