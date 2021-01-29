import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, control, setValue } = methods;
  const onSubmit = data => {
    navigate('/login');
    setValue('firstName', 'test');
    console.table(data);
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}></Grid>
            <Grid item md={6} sm={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <Controller
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="firstName"
                  label="First name"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="middleName"
                  label="Middle name"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="lastName"
                  label="Last name"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="address"
                  label="Complete Address"
                  control={control}
                  defaultValue=""
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
                />
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
      </Box>
    </Page>
  );
};

export default RegisterView;
