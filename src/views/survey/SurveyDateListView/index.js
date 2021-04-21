import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useSurvey, useCurrentUser, useBus } from '../../../states';
import PassengerSurveyResults from './PassengerSurveyResults';
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
  const [bus] = useBus();
  const [currentUser] = useCurrentUser();

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

  // search options
  useEffect(() => {
    reloadList();
  }, [criteria]);

  const onSearch = query => {
    setCriteria(query);
  };
  const onView = id => {
    setSelectedSurveyID(id);
    setShowResponseListView(true);
    setShowSurveyListView(false);
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
        {currentUser.accountType === 'admin' ? (
          <>
            <Toolbar onSearch={onSearch} />
            <Box mt={3}>
              <Results onView={onView} surveys={(data && data.records) || []} />
            </Box>
          </>
        ) : (
          <PassengerSurveyResults
            onView={onView}
            surveys={data ? data.records : []}
          />
        )}
      </Container>
    </div>
  );
};

export default SurveyDateListView;
