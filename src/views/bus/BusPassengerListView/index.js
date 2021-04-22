import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useSurvey, useCurrentUser, useBus } from '../../../states';
import { setSelectedPassengerID } from 'src/states/passenger';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginTop: '15px'
  }
}));

const BusPassengerListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');

  // get only the selected bus info idcx
  const [
    bus,
    {
      setSelectedSurveyDate,
      setSelectedPassengerID,
      setShowSurveyDateListView,
      setShowSurveyPassengerListView,
      setShowSurveyInfoView,
      setSelectedSurveyID
    }
  ] = useBus();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_bus_passenger_list?filter=bus_info_id,eq,${bus.selectedBusID}&filter=create_time_stamp,cs,${bus.selectedSurveyDate}`,
      method: 'GET'
    },
    { manual: true }
  );
  const reloadList = async () => {
    await refetch();
  };
  useEffect(() => {
    reloadList();
  }, [bus.selectedBusID]);

  const onView = (userID, surveyID) => {
    setSelectedSurveyID(surveyID);
    setSelectedPassengerID(userID);
    setShowSurveyInfoView(true);
    setShowSurveyPassengerListView(false);
  };
  return (
    <div>
      <Container maxWidth={false}>
        {loading ? (
          <Alert severity="info" className={classes.alert}>
            Loading...
          </Alert>
        ) : (
          ''
        )}
        {error ? (
          <Alert severity="error" className={classes.alert}>
            Error while loading data from server!
          </Alert>
        ) : (
          ''
        )}
        <Toolbar />
        <Box mt={3}>
          <Results
            onView={onView}
            passengerList={(data && data.records) || []}
          />
        </Box>
      </Container>
    </div>
  );
};

export default BusPassengerListView;
