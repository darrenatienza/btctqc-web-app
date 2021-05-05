import React, { useEffect } from 'react';
import {
  Container, //Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Profile from './Profile';
import { useUsers } from '../../../states';
import useAxios from 'axios-hooks';
//import PassengerHistoryListView from '../PassengerHistoryListView';
const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.background.dark }
}));

const UserDetailView = () => {
  const [users, { setShowListView, setShowDetailView }] = useUsers();
  const classes = useStyles();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/user_details/${users.selectedUserID}`,
      method: 'GET'
    },
    { manual: true }
  );
  useEffect(() => {
    if (users.selectedUserID > 0) {
      refetch();
    }
  }, [users.selectedUserID]);
  const onBack = () => {
    setShowDetailView(false);
    setShowListView(true);
  };
  return (
    <Container className={classes.root}>
      <Profile detail={data} onBack={onBack} />
    </Container>
  );
};

export default UserDetailView;
