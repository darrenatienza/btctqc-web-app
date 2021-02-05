import React from 'react';
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
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    //height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  // http request
  const [
    {
      //data: postUserData,
      loading: postUserLoading,
      error: postUserError
    },
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
  const { handleSubmit, control, errors } = methods;
  const onSubmit = async data => {
    console.log(data);
    const { data: user_id } = await executePostUser({
      data: {
        username: data.username,
        password: data.password
      }
    });
    const { data: user_detail_id } = await executePostUserDetail({
      data: {
        user_id: user_id,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        address: data.address,
        contact_number: data.contactNumber
      }
    });
    // success saving records
    user_detail_id > 0 && navigate('/login');
  };

  // jsx
  return (
    <Page className={classes.root} title="Register">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            Logo here
          </Grid>
          <Grid item md={6} sm={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Typography color="textPrimary" variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Please specify correct information here
                </Typography>
              </Box>
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
              <Controller
                as={TextField}
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                control={control}
                defaultValue=""
                variant="filled"
                rules={{ required: true }}
                error={errors.password && true}
              />

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
