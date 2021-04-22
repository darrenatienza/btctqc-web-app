import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { Alert } from '@material-ui/lab';
import { useBus } from '../../../states';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginTop: '15px'
  }
}));

const BusListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [
    openConfirmationDeleteDialog,
    setOpenConfirmationDeleteDialog
  ] = useState(false);
  const [
    bus,
    {
      setSelectedBusID,
      setShowListView,
      setShowDetailView,
      setRefreshList,
      setShowSurveyDateListView
    }
  ] = useBus();
  const [selectedID, setSelectedID] = useState(0);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/bus_infos?filter1=name,cs,${criteria}&filter2=code,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    {
      url: `/records/bus_infos/${selectedID}`,
      method: 'DELETE'
    },
    { manual: true }
  );
  // search options
  useEffect(() => {
    reloadList();
  }, [criteria]);

  useEffect(() => {
    if (bus.refreshList) {
      reloadList();
      setRefreshList(false);
    }
  }, [bus.refreshList]);
  const reloadList = async () => {
    await refetch();
  };

  const onSearch = query => {
    setCriteria(query);
  };
  const onEdit = id => {
    setShowListView(false);
    setShowDetailView(true);
    setSelectedBusID(id);
  };
  const onDelete = id => {
    setSelectedID(id);
    setOpenConfirmationDeleteDialog(true);
  };
  const onAdd = () => {
    setShowListView(false);
    setShowDetailView(true);
    setSelectedBusID(-1);
  };
  const handleCloseConfirmationDeleteDialog = async confirm => {
    if (confirm) {
      await executeDelete();
      await reloadList();
    }
    setOpenConfirmationDeleteDialog(false);
  };
  const handleViewSurveyDates = id => {
    setSelectedBusID(id);
    setShowSurveyDateListView(true);
    setShowListView(false);
  };
  return (
    <div>
      <Container maxWidth={false}>
        <Toolbar onSearch={onSearch} onAdd={onAdd} />
        {loading || deleteLoading ? (
          <Alert severity="info" className={classes.alert}>
            Loading...
          </Alert>
        ) : (
          ''
        )}
        {error || deleteError ? (
          <Alert severity="error" className={classes.alert}>
            Error while loading data from server!
          </Alert>
        ) : (
          ''
        )}
        <Box mt={3}>
          <Results
            buses={(data && data.records) || []}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewSurvey={handleViewSurveyDates}
          />
        </Box>
        <ConfirmationDialog
          title="Delete Bus Information"
          message="Do you want to delete this record?"
          open={openConfirmationDeleteDialog}
          onClose={handleCloseConfirmationDeleteDialog}
        />
      </Container>
    </div>
  );
};

export default BusListView;
