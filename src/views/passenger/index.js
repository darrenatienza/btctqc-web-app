import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PassengerDetailView from './PassengerDetailView';
import PassengerListView from './PassengerListView';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const PassengerView = () => {
  const classes = useStyles();
  return (
    <div>
      <Page className={classes.root} title="Passengers">
        <PassengerListView />
        <PassengerDetailView />
      </Page>
    </div>
  );
};

export default PassengerView;
