import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BusListView from './BusListView';
import BusDetailView from './BusDetailView';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const BusView = () => {
  const classes = useStyles();
  return (
    <div>
      <Page className={classes.root} title="Buses">
        <BusListView />
        <BusDetailView />
      </Page>
    </div>
  );
};

export default BusView;
