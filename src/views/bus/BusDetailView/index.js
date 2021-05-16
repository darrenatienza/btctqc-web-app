import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid, //Grid,
  makeStyles
} from '@material-ui/core';
import Detail from './Detail';
import { useBus } from '../../../states';
import useAxios from 'axios-hooks';
import QrCodePreview from './QrCodePreview';

//import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const BusDetailView = () => {
  const [
    bus,
    { setShowDetailView, setShowListView, setSelectedBusID, setRefreshList }
  ] = useBus();
  const classes = useStyles();
  const [busInfo, setBusInfo] = useState({ code: '', name: '' });

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
    if (data) {
      setBusInfo({ code: data.code, name: data.name });
    }
  }, [data]);
  useEffect(() => {
    if (bus.selectedBusID > 0) {
      refetch();
    } else {
      setBusInfo({ code: '', name: '' });
    }
  }, [bus.showDetailView]);
  const onClose = () => {
    setSelectedBusID(0);
    setShowListView(true);
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
    setShowListView(true);
    setShowDetailView(false);
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Detail
            detail={data}
            onSubmit={onSubmit}
            onClose={onClose}
            isLoading={postLoading || putLoading}
            isError={postError || putError}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <QrCodePreview detail={busInfo} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusDetailView;
