import React, { useState, useEffect } from 'react';
import { Card, Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';

import TasksProgress from './TasksProgress';
import TotalPassengers from './TotalPassengers';
import TotalProfit from './TotalProfit';
import DashboardBanner from 'src/components/DashboardBanner';
import TotalBuses from './TotalBuses';
import TotalSurveys from './TotalSurveys';
import useAxios from 'axios-hooks';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  banner: {
    maxWidth: '100%'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [summary, setSummary] = useState({
    passengerCount: 0,
    busCount: 0,
    surveyCount: 0
  });
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_summaries`,
      method: 'GET'
    },
    { manual: false }
  );
  useEffect(() => {
    data &&
      setSummary({
        ...summary,
        passengerCount: data.records[0].passenger_count,
        busCount: data.records[0].bus_count,
        surveyCount: data.records[0].survey_count
      });
  }, [data]);

  if (loading) {
    return (
      <Alert severity="info" variant="outlined">
        Loading...
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert severity="error" variant="outlined">
        Error!
      </Alert>
    );
  }
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="center" maxWidth={1000}>
          <Card>
            <Box m={1}>
              <DashboardBanner className={classes.banner} />
            </Box>
          </Card>
        </Box>

        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalPassengers passengerCount={summary.passengerCount} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalBuses busCount={summary.busCount} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalSurveys surveyCount={summary.surveyCount} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
