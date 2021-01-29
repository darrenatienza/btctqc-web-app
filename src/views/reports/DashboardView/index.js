import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';

import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6}></Grid>
          <Grid item lg={6}>
            <Grid container spacing={3}>
              <Grid item lg={12} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item lg={12} sm={6} xl={3} xs={12}>
                <TotalCustomers />
              </Grid>
              <Grid item lg={12} sm={6} xl={3} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid item lg={12} sm={6} xl={3} xs={12}>
                <TotalProfit />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
