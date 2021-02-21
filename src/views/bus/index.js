import React from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BusListView from './BusListView';
import BusDetailView from './BusDetailView';
import { useBus } from '../../states';
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
  const [bus] = useBus();
  return (
    <div>
      <Page className={classes.root} title="Buses">
        <Collapse in={bus.showListView}>
          <BusListView />
        </Collapse>
        <Collapse in={bus.showDetailView}>
          <BusDetailView />
        </Collapse>
      </Page>
    </div>
  );
};

export default BusView;
