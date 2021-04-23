import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useSurvey, useCurrentUser, useBus } from '../../../states';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginTop: '15px'
  }
}));

const SurveyDateListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [
    survey,
    { setSelectedSurveyID, setShowSurveyListView, setShowResponseListView }
  ] = useSurvey();
  // get only the selected bus info idcx
  const [
    bus,
    {
      setSelectedSurveyDate,
      setSelectedPassengerID,
      setShowSurveyDateListView,
      setShowSurveyPassengerListView,
      setShowSurveyInfoView,
      setShowListView
    }
  ] = useBus();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_surveys_dates?filter=bus_info_id,eq,${bus.selectedBusID}`,
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
  useEffect(() => {
    data && console.log(data.records);
  }, [data]);
  const onView = createTimeStamp => {
    setSelectedSurveyDate(createTimeStamp);
    setShowSurveyPassengerListView(true);
    setShowSurveyDateListView(false);
  };
  const handleOnBack = () => {
    setShowSurveyDateListView(false);
    setShowListView(true);
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
        <Toolbar onBack={handleOnBack} />
        <Box mt={3}>
          <Results onView={onView} surveyDates={(data && data.records) || []} />
        </Box>
      </Container>
    </div>
  );
};

export default SurveyDateListView;
