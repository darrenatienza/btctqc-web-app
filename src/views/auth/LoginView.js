import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import Alert from '@material-ui/lab/Alert';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    textAlign: 'center'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, control } = methods;
  // http request
  const [
    {
      //data,
      loading,
      error
    },
    login
  ] = useAxios(
    { url: `/login`, method: 'POST' },
    {
      manual: true
    }
  );
  const onSubmit = async data => {
    const { data: user } = await login({
      data: {
        username: data.username,
        password: data.password
      }
    });

    user.user_id > 0 && navigate('/app/dashboard');
  };
  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3} className={classes.title}>
              <Typography color="textPrimary" variant="h2">
                Sign in
              </Typography>
            </Box>

            <Box mt={3} mb={1}>
              <Typography align="center" color="textSecondary" variant="body1">
                Bus Transport Contact Tracing Web Portal
              </Typography>
            </Box>
            <Controller
              as={TextField}
              fullWidth
              label="Email Address"
              margin="normal"
              name="username"
              control={control}
              defaultValue=""
            />
            <Controller
              as={TextField}
              fullWidth
              name="password"
              control={control}
              defaultValue=""
              type="password"
              margin="normal"
              label="Password"
            />
            {error && (
              <Alert severity="error" color="error">
                Invalid userName or password!
              </Alert>
            )}
            {loading && (
              <Alert severity="info" color="info">
                Logging in...
              </Alert>
            )}
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account?
              <Link component={RouterLink} to="/register" variant="h6">
                Sign up
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
