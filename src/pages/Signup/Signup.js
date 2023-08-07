import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme } from "@mui/material"
import Container from '@mui/material/Container';
import CopyRight from 'components/CopyRight/CopyRight';
import SignUpForm from 'components/signUpForm/signUpForm';


const Signup = () =>  {

  const theme = useTheme();

  return (
    <Box backgroundColor={theme.palette.background.alt}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create An Account
              </Typography>
              <SignUpForm/>
            </Box>
            <CopyRight sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signup