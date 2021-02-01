import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Profile from './Profile';
import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const PassengerDetailView = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={6} xs={12}>
          <Profile />
        </Grid>
        <Grid item lg={12} md={6} xs={12}>
          <PassengerHistoryListView />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PassengerDetailView;
