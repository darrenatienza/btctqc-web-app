import React, { useEffect } from 'react';
import {
  Container, //Grid,
  makeStyles
} from '@material-ui/core';
import Profile from './Profile';
import { usePassenger } from '../../../states';
import useAxios from 'axios-hooks';
//import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const PassengerDetailView = () => {
  const [passenger] = usePassenger();
  const classes = useStyles();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/user_details/${passenger.selectedPassengerID}`,
      method: 'GET'
    },
    { manual: true }
  );
  useEffect(() => {
    if (passenger.selectedPassengerID > 0) {
      refetch();
    }
  }, [passenger.selectedPassengerID]);
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Profile detail={data} />
    </Container>
  );
};

export default PassengerDetailView;
