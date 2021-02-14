import React, { useState, useEffect } from 'react';
import {
  Container, //Grid,
  makeStyles
} from '@material-ui/core';
import Detail from './Detail';
import { useBus } from '../../../states';
import useAxios from 'axios-hooks';

//import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const BusDetailView = () => {
  const [
    bus,
    { setShowDetailView, setSelectedBusID, setRefreshList }
  ] = useBus();
  const classes = useStyles();

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/bus_infos/${bus.selectedBusID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    {
      url: `/records/bus_infos`,
      method: 'POST'
    },
    { manual: true }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/bus_infos/${bus.selectedBusID}`,
      method: 'PUT'
    },
    { manual: true }
  );
  useEffect(() => {
    if (bus.selectedBusID > 0) {
      refetch();
    }
  }, [bus.selectedBusID]);
  const onClose = () => {
    setSelectedBusID(0);
    setShowDetailView(false);
  };
  const onSubmit = async data => {
    if (bus.selectedBusID > 0) {
      await executePut({
        data: {
          code: data.code,
          name: data.name
        }
      });
    } else {
      await executePost({
        data: {
          code: data.code,
          name: data.name
        }
      });
    }
    setRefreshList(true);
    setSelectedBusID(0);
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Detail
        detail={data}
        onSubmit={onSubmit}
        onClose={onClose}
        isLoading={postLoading || putLoading}
        isError={postError || putError}
      />
    </Container>
  );
};

export default BusDetailView;
