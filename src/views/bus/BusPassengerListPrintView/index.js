import React, { useEffect, useRef, useState } from 'react';
import { useBus } from 'src/states';
import Toolbar from './Toolbar';
import { useReactToPrint } from 'react-to-print';
import PrintPreview from './PrintPreview';
import useAxios from 'axios-hooks';
import moment from 'moment';
const BusPassengerListPrintView = () => {
  const [
    bus,
    {
      setSelectedBusID,
      setShowListView,
      setShowDetailView,
      setRefreshList,
      setShowSurveyDateListView,
      setShowPrintListView,
      setShowBusPassengerListPrintView
    }
  ] = useBus();
  const [surveyDate, setSurveyDate] = useState('');
  const [busPassengerList, setBusPassengerList] = useState([]);
  const componentRef = useRef();
  const handleOnPrint = useReactToPrint({
    content: () => componentRef.current
  });
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_bus_passenger_list?filter=bus_info_id,eq,${bus.selectedBusID}&filter=create_time_stamp,cs,${surveyDate}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [
    {
      data: getSurveyDateData,
      loading: getSurveyDateLoading,
      error: getSurveyDateError
    },
    refetchSurveyDates
  ] = useAxios(
    {
      url: `/records/view_surveys_dates?filter=bus_info_id,eq,${bus.selectedBusID}&order=create_time_stamp,desc`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    if (bus.showBusPassengerListPrintView) {
      refetchSurveyDates();
    } else {
      setBusPassengerList([]);
    }
  }, [bus.showBusPassengerListPrintView]);
  useEffect(() => {
    refetch();
  }, [surveyDate]);
  const handleOnBack = () => {
    setShowListView(true);
    setShowBusPassengerListPrintView(false);
  };
  const handleOnChangeDate = date => {
    console.log(date);
    setSurveyDate(moment(date).format('YYYY-MM-DD'));
  };
  useEffect(() => {
    const _data = data ? data.records : [];
    if (_data.length > 0) {
      setBusPassengerList(_data);
    }
  }, [data]);
  return (
    <div>
      <Toolbar
        onClose={handleOnBack}
        onPrint={handleOnPrint}
        surveyDates={getSurveyDateData ? getSurveyDateData.records : []}
        onChangeDate={handleOnChangeDate}
      />
      <PrintPreview ref={componentRef} data={busPassengerList} />
    </div>
  );
};

export default BusPassengerListPrintView;
