import React, { useEffect } from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PassengerDetailView from './UserDetailView';
import PassengerListView from './UserListView';
import { useUsers } from '../../states';
import UserListView from './UserListView';
import UserDetailView from './UserDetailView';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const UsersView = () => {
  const classes = useStyles();
  const [users, { setShowDetailView, setShowListView }] = useUsers();
  useEffect(() => {
    setShowDetailView(false);
    setShowListView(true);
  }, []);
  return (
    <div>
      <Page className={classes.root} title="Admins">
        <Collapse in={users.showListView}>
          <UserListView />
        </Collapse>
        <Collapse in={users.showDetailView}>
          <UserDetailView />
        </Collapse>
      </Page>
    </div>
  );
};

export default UsersView;
