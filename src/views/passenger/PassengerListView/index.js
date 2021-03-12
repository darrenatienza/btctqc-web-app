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
import ConfirmationDialog from '../../shared/ConfirmationDialog';
//const useStyles = makeStyles(theme => ({
//  root: {}
//}));

const PassengerListView = () => {
  const [criteria, setCriteria] = useState('');
  const [userID, setUserID] = useState(0);
  // determines if the selected passenger is admin or not
  const [isAdmin, setIsAdmin] = useState(false);
  const [
    passenger,
    { setSelectedPassengerID, setShowListView, setShowDetailView }
  ] = usePassenger();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openChangeRoleDialog, setOpenChangeRoleDialog] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_user_details?filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    {
      data: putUserRoleData,
      loading: putUserRoleLoading,
      error: putUserRoleError
    },
    executeUserRoleUpdate
  ] = useAxios(
    {
      url: `/records/users/${userID}`,
      method: 'PUT'
    },
    { manual: true }
  );
  const [
    {
      data: resetPasswordData,
      loading: resetPasswordLoading,
      error: resetPasswordError
    },
    resetPassword
  ] = useAxios(
    {
      url: `/records/users/${userID}`,
      method: 'PUT'
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
  const handleCloseConfirmationDialog = async result => {
    console.log(result);
    if (result) {
      await resetPassword({
        data: {
          password: 'survey'
        }
      });
    }
    setOpenConfirmDialog(false);
  };
  const handleResetPassword = id => {
    setUserID(id);
    setOpenConfirmDialog(true);
  };
  const handleChangeRole = (id, isAdmin) => {
    setUserID(id);
    setIsAdmin(isAdmin);
    setOpenChangeRoleDialog(true);
  };
  const handleCloseChangeRoleDialog = async result => {
    console.log(result);
    if (result) {
      await executeUserRoleUpdate({
        data: {
          admin: !isAdmin
        }
      });
      await refetch();
    }

    setOpenChangeRoleDialog(false);
  };
  return (
    <Container maxWidth={false}>
      <Toolbar onSearch={onSearch} />
      {loading && <Alert severity="info">Loading...</Alert>}
      {error && (
        <Alert severity="error">Error while loading data from server!</Alert>
      )}
      <Box mt={3}>
        <Results
          passengers={(data && data.records) || []}
          onView={onView}
          onReset={handleResetPassword}
          onChangeRole={handleChangeRole}
        />
      </Box>
      <ConfirmationDialog
        title="Change User Role"
        message={`Do you want to change user role to ${
          !isAdmin ? 'Administrator' : 'Guest User'
        }`}
        open={openChangeRoleDialog}
        onClose={handleCloseChangeRoleDialog}
      />
      {/* change user role "admin or not" */}
      <ConfirmationDialog
        title="Reset Passenger Password"
        message="Do you want to reset password. If yes, new password will be 'survey'."
        open={openConfirmDialog}
        onClose={handleCloseConfirmationDialog}
      />
    </Container>
  );
};

export default PassengerListView;
