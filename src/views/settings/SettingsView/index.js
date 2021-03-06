import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import useAxios from 'axios-hooks';
import Password from './Password';
import { useCurrentUser } from '../../../states';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentUser] = useCurrentUser();
  const [{ data, loading, error }, executeChangePassword] = useAxios(
    { url: `/password`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    {
      data: postLogoutData,
      loading: postLogoutLoading,
      error: postLogoutError
    },
    executeLogout
  ] = useAxios(
    { url: `/logout`, method: 'POST' },
    {
      manual: true
    }
  );

  const onSubmit = async values => {
    const { data } = await executeChangePassword({
      data: {
        username: currentUser.userName,
        password: values.oldPassword,
        newPassword: values.newPassword
      }
    });

    if (data.user_id > 0) {
      await executeLogout();
      navigate('/login');
    }
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Password onSubmit={onSubmit} loading={loading} error={error} />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
