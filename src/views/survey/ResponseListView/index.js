import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useSurvey } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginTop: '15px'
  }
}));

const ResponseListView = () => {
  const classes = useStyles();

  const [
    survey,
    { setSelectedSurveyID, setShowSurveyListView, setShowResponseListView }
  ] = useSurvey();

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_responses?filter=survey_id,eq,${survey.selectedSurveyID}`,
      method: 'GET'
    },
    { manual: false }
  );
  const onClose = () => {
    setSelectedSurveyID(0);
    setShowResponseListView(false);
    setShowSurveyListView(true);
    console.log(survey.selectedSurveyID);
  };
  return (
    <div>
      <Container maxWidth={false}>
        <Toolbar onClose={onClose} />
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
        <Box mt={3}>
          <Results responses={data ? data.records : []} />
        </Box>
      </Container>
    </div>
  );
};

export default ResponseListView;
