import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import {
  Box,
  Container
  //makeStyles
} from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { usePassenger } from '../../../states';
//const useStyles = makeStyles(theme => ({
//  root: {}
//}));

const PassengerListView = () => {
  const [criteria, setCriteria] = useState('');
  const [
    passenger,
    { setSelectedPassengerID, setShowListView, setShowDetailView }
  ] = usePassenger();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/user_details?filter1=first_name,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );

  // search options
  useEffect(() => {
    reloadList();
  }, [criteria]);

  const reloadList = async () => {
    await refetch();
  };

  const onSearch = query => {
    setCriteria(query);
  };
  const onView = id => {
    setShowDetailView(true);
    setShowListView(false);
    setSelectedPassengerID(id);
  };
  return (
    <Container maxWidth={false}>
      <Toolbar onSearch={onSearch} />
      {loading && <Alert severity="info">Loading...</Alert>}
      {error && (
        <Alert severity="error">Error while loading data from server!</Alert>
      )}
      <Box mt={3}>
        <Results passengers={data ? data.records : []} onView={onView} />
      </Box>
    </Container>
  );
};

export default PassengerListView;
