import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <ProfileDetails />
      </Container>
    </Page>
  );
};

export default Account;
