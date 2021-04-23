import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Alert from '@material-ui/lab/Alert';
import LoginBanner from '../../components/LoginBanner';
import Logo from 'src/components/Logo';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    //height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(6)
  },
  loginBanner: {
    width: '100%',

    position: 'relative',
    top: '-5em',
    borderRadius: '5px'
  },

  logo: {
    width: '128px',
    height: 'auto',
    position: 'relative',
    top: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '1'
  }
}));
const gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];
const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const [showPasswordNotMatchAlert, setShowPasswordNotMatchAlert] = useState(
    false
  );
  const { handleSubmit, control, errors, setError } = methods;
  // http request
  const [
    { data: postUserData, loading: postUserLoading, error: postUserError },
    executePostUser
  ] = useAxios(
    { url: `/records/users`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    {
      //data: postUserDetailData,
      loading: postUserDetailLoading,
      error: postUserDetailError
    },
    executePostUserDetail
  ] = useAxios(
    { url: `/records/user_details`, method: 'POST' },
    {
      manual: true
    }
  );

  // callbacks

  const onSubmitForm = async val => {
    if (val.password !== val.confirmPassword) {
      setError('password', { shouldFocus: true });
      setError('confirmPassword', { shouldFocus: true });
      setShowPasswordNotMatchAlert(true);
    } else {
      setShowPasswordNotMatchAlert(false);
      const { data: user_id } = await executePostUser({
        data: {
          username: val.username,
          password: val.password
        }
      });
      const { data: user_detail_id } = await executePostUserDetail({
        data: {
          user_id: user_id,
          first_name: val.firstName,
          middle_name: val.middleName,
          last_name: val.lastName,
          address: val.address,
          contact_number: val.contactNumber,
          gender: val.gender,
          birth_date: val.birthDate
        }
      });
      //success saving records
      user_detail_id > 0 && navigate('/login');
    }
  };

  // jsx
  return (
    <Page className={classes.root} title="Register">
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Box width="100%">
              <Logo className={classes.logo} />
              <LoginBanner className={classes.loginBanner} />
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Box>
                <Typography color="textPrimary" variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Please specify correct information here
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="username"
                    label="User Name"
                    control={control}
                    defaultValue=""
                    variant="filled"
                    rules={{ required: true }}
                    error={errors.username && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                    defaultValue=""
                    variant="filled"
                    rules={{ required: true }}
                    error={errors.password && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    control={control}
                    defaultValue=""
                    variant="filled"
                    rules={{ required: true }}
                    error={errors.password && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="firstName"
                    label="First name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    error={errors.firstName && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="middleName"
                    label="Middle name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    error={errors.middleName && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="lastName"
                    label="Last name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    error={errors.lastName && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    fullWidth
                    margin="normal"
                    as={TextField}
                    type="date"
                    name="birthDate"
                    label="Birth Date"
                    control={control}
                    defaultValue={moment().format('YYYY-MM-DD')}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    fullWidth
                    margin="normal"
                    as={TextField}
                    select
                    name="gender"
                    label="Gender"
                    control={control}
                    defaultValue="male"
                    variant="outlined"
                    SelectProps={{
                      native: true
                    }}
                  >
                    {gender.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Controller>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="address"
                    label="Complete Address"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    error={errors.address && true}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Controller
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="contactNumber"
                    label="Contact Number"
                    type="tel"
                    control={control}
                    defaultValue="+639"
                    rules={{ required: true }}
                    error={errors.contactNumber && true}
                  />
                </Grid>
              </Grid>

              {postUserDetailError ||
                (postUserError && (
                  <Alert severity="error" color="error">
                    Error while saving your details
                  </Alert>
                ))}
              {postUserLoading ||
                (postUserDetailLoading && (
                  <Alert severity="info" color="info">
                    Please wait while saving your records
                  </Alert>
                ))}
              {showPasswordNotMatchAlert && (
                <Alert
                  severity="error"
                  color="error"
                  onClose={() => {
                    setShowPasswordNotMatchAlert(false);
                  }}
                >
                  Your password and confirmation password not match!
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
                  Sign up now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Have an account?{' '}
                <Link component={RouterLink} to="/login" variant="h6">
                  Sign in
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RegisterView;
