import React from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BusListView from './BusListView';
import BusDetailView from './BusDetailView';
import { useBus } from '../../states';
import SurveyDateListView from './SurveyDateListView';
import BusPassengerListView from './BusPassengerListView';
import PassengerInfoSurveyView from './PassengerInfoSurveyView';
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
        <Collapse in={bus.showSurveyDateListView}>
          <SurveyDateListView />
        </Collapse>
        <Collapse in={bus.showSurveyPassengerListView}>
          <BusPassengerListView />
        </Collapse>
        <Collapse in={bus.showSurveyInfoView}>
          <PassengerInfoSurveyView />
        </Collapse>
      </Page>
    </div>
  );
};

export default BusView;
