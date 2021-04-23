import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useSurvey, useCurrentUser, useBus } from '../../../states';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginTop: '15px'
  }
}));

const PassengerInfoSurveyView = () => {
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
      setShowSurveyInfoView
    }
  ] = useBus();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_responses?filter=survey_id,eq,${bus.selectedSurveyID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    { data: surveyData, loading: surveyLoading, error: surveyError },
    refetchSurvey
  ] = useAxios(
    {
      url: `/records/surveys/${bus.selectedSurveyID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    {
      data: passengerInfoData,
      loading: passengerInfoLoading,
      error: passengerInfoError
    },
    refetchPassengerInfo
  ] = useAxios(
    {
      url: `/records/view_user_details?filter=user_id,eq,${bus.selectedPassengerID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const reload = async () => {
    await refetch();
    await refetchPassengerInfo();
    await refetchSurvey();
  };
  useEffect(() => {
    console.log(bus.selectedPassengerID);
    reload();
  }, [bus.selectedSurveyID, bus.selectedPassengerID]);
  useEffect(() => {
    passengerInfoData && console.log(passengerInfoData.records[0]);
  }, [passengerInfoData]);
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
          <Profile
            detail={passengerInfoData && passengerInfoData.records[0]}
            survey={(surveyData && surveyData) || {}}
          />
          <Results responses={(data && data.records) || []} />
        </Box>
      </Container>
    </div>
  );
};

export default PassengerInfoSurveyView;
