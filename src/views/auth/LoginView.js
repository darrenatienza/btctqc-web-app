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
import LogoGreen from 'src/components/LogoGreen';
import { Autocomplete } from '@material-ui/lab';
import RequestPasswordResetDialog from './RequestPasswordResetDialog';
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
  },
  forgotPassword: {
    marginLeft: 'auto',
    textAlign: 'right'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const [userID, setUserID] = useState(0);
  const [userNotFound, setUserNotFound] = useState(false);
  const [
    openRequestResetPasswordDialog,
    setOpenRequestResetPasswordDialog
  ] = useState(false);
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
    {
      data: getUserDetailData,
      loading: getUserDetailLoading,
      error: getUserDetailError
    },
    getUserDetail
  ] = useAxios(
    { url: `/records/user_details`, method: 'GET' },
    {
      manual: true
    }
  );
  const [
    { data: getUserData, loading: getUserLoading, error: getUserError },
    fetchUser
  ] = useAxios(
    { url: `/records/users`, method: 'GET' },
    {
      manual: true
    }
  );
  const [
    { data: putUserData, loading: putUserLoading, error: putUserError },
    putUser
  ] = useAxios(
    { url: `/records/users`, method: 'PUT' },
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
    if (user.user_id > 0) {
      const { data: userDetail } = await getUserDetail({
        params: {
          filter: `user_id,eq,${user.user_id}`
        }
      });
      console.log(user);
      setCurrentUserID(user.user_id);
      //set current user detail id to state
      setCurrentUserDetailID(userDetail.records[0].user_detail_id);
      setUserName(data.username);
      setAccountType(user.admin ? 'admin' : 'passenger');
      user.admin ? navigate('/app/dashboard') : navigate('/app/surveys');
    }
  };
  const showRequestPasswordResetDialog = () => {
    setUserNotFound(false);
    setOpenRequestResetPasswordDialog(true);
  };
  const onCloseRequestPasswordResetDialog = async (userName, confirm) => {
    if (confirm) {
      // get user by user name
      const { data } = await fetchUser({
        params: { filter: `username,eq,${userName}` }
      });
      if (data.records.length > 0) {
        setUserNotFound(false);
        const userID = data.records[0].user_id;
        console.log(userID);
        // update the request password reset of user if found
        await putUser({
          url: `/records/users/${userID}`,
          data: {
            request_password_reset: 1
          }
        });
        setOpenRequestResetPasswordDialog(false);
      } else {
        setUserNotFound(true);
      }
    } else {
      // close only if cancel
      setOpenRequestResetPasswordDialog(false);
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
                  <LogoGreen className={classes.logo} />
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
                <Box display="flex">
                  <Typography color="textSecondary" variant="body1">
                    Don&apos;t have an account?{' '}
                    <Link component={RouterLink} to="/register" variant="h6">
                      Sign up here
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.forgotPassword}
                  >
                    <Link
                      onClick={() => showRequestPasswordResetDialog()}
                      variant="h6"
                      color="error"
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
          <RequestPasswordResetDialog
            notFoundError={userNotFound}
            open={openRequestResetPasswordDialog}
            onClose={onCloseRequestPasswordResetDialog}
          />
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
