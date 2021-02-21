import React from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PassengerDetailView from './PassengerDetailView';
import PassengerListView from './PassengerListView';
import { usePassenger } from '../../states';
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
  const [passenger] = usePassenger();
  return (
    <div>
      <Page className={classes.root} title="Passengers">
        <Collapse in={passenger.showListView}>
          <PassengerListView />
        </Collapse>
        <Collapse in={passenger.showDetailView}>
          <PassengerDetailView />
        </Collapse>
      </Page>
    </div>
  );
};

export default PassengerView;
