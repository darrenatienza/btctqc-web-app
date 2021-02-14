import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import SurveyListView from './SurveyListView';
import ResponseListView from './ResponseListView';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const SurveyView = () => {
  const classes = useStyles();
  return (
    <div>
      <Page className={classes.root} title="Surveys">
        <SurveyListView />
        <ResponseListView />
      </Page>
    </div>
  );
};

export default SurveyView;
