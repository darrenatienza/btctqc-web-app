import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import Alert from '@material-ui/lab/Alert';
import { useCurrentUser } from '../../states';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardContent
} from '@material-ui/core';

import Page from 'src/components/Page';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    textAlign: 'center'
  },
  logo: {
    width: '128px',
    height: 'auto'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const [userID, setUserID] = useState(0);
  const [
    currentUser,
    {
      setUserName,
      setCurrentUserID,
      setAccountType,
      loadCurrentUser,
      setCurrentUserDetailID
    }
  ] = useCurrentUser();
  const { handleSubmit, control, errors } = methods;
  // http request
  const [
    {
      //data,
      loading,
      error,
      response
    },
    executeLogin
  ] = useAxios(
    { url: `/login`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: getDetailData, loading: getDetailLoading, error: getDetailError },
    refetchUserDetails
  ] = useAxios(
    {
      url: `/records/user_details?filter=user_id,eq,${currentUser.currentUserID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const onSubmit = async data => {
    const { data: user } = await executeLogin({
      data: {
        username: data.username,
        password: data.password
      }
    });
    setUserName(data.username);

    if (user.user_id > 0) {
      setCurrentUserID(user.user_id);
      setUserName(data.username);
      const { data: user_detail } = await refetchUserDetails();
      console.log(getDetailData && getDetailData);
      setAccountType(user.admin ? 'admin' : 'passenger');
      user.admin ? navigate('/app/dashboard') : navigate('/app/surveys');
    }
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
          <Card>
            <CardContent>
              <form>
                <Box mb={3} className={classes.title}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>

                <Box mt={3} mb={1}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Bus Transport Contact Tracing Web Portal
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Logo className={classes.logo} />
                </Box>

                <Controller
                  as={TextField}
                  fullWidth
                  label="User Name"
                  margin="normal"
                  name="username"
                  control={control}
                  defaultValue=""
                  error={errors.username && true}
                  rules={{ required: true }}
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
                  error={errors.password && true}
                  rules={{ required: true }}
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
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign in now
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up here
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
