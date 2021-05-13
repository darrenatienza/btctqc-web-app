import { Box, Button, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import useAxios from 'axios-hooks';
import { useBus } from 'src/states';
import PrintPreview from './PrintPreview';
import Toolbar from './Toolbar';

const BusPrintListView = () => {
  const [
    bus,
    {
      setSelectedBusID,
      setShowListView,
      setShowDetailView,
      setRefreshList,
      setShowSurveyDateListView,
      setShowPrintListView
    }
  ] = useBus();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/bus_infos`,
      method: 'GET'
    },
    {
      manual: false
    }
  );
  useEffect(() => {
    bus.showPrintListView && refetch();
  }, [bus.showPrintListView]);
  const handleClose = () => {
    setShowListView(true);
    setShowPrintListView(false);
  };
  return (
    <div>
      <Box display="flex"></Box>
      <Toolbar onClose={handleClose} onPrint={handlePrint} />
      <Box mt={3}>
        <Card>
          <CardContent>
            <PrintPreview ref={componentRef} data={data ? data.records : []} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BusPrintListView;
