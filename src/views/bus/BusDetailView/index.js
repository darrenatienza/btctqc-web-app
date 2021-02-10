import React, { useEffect } from 'react';
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
  const [bus] = useBus();
  const classes = useStyles();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/bus_infos/${bus.selectedBusID}`,
      method: 'GET'
    },
    { manual: true }
  );
  useEffect(() => {
    if (bus.selectedBusID > 0) {
      refetch();
    } else {
      console.log('add');
    }
  }, [bus.selectedBusID]);
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Detail detail={data} />
    </Container>
  );
};

export default BusDetailView;
