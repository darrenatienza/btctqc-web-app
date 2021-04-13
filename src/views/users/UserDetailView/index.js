import React, { useEffect } from 'react';
import {
  Container, //Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Profile from './Profile';
import { usePassenger } from '../../../states';
import useAxios from 'axios-hooks';
//import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const UserDetailView = () => {
  const [passenger, { setShowListView, setShowDetailView }] = usePassenger();
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
  const onBack = () => {
    setShowDetailView(false);
    setShowListView(true);
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Profile detail={data} onBack={onBack} />
    </Container>
  );
};

export default UserDetailView;
