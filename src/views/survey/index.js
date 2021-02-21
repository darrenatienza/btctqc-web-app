import React from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import SurveyListView from './SurveyListView';
import ResponseListView from './ResponseListView';
import { useSurvey } from '../../states';
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
  const [survey] = useSurvey();
  return (
    <div>
      <Page className={classes.root} title="Surveys">
        <Collapse in={survey.showSurveyListView}>
          <SurveyListView />
        </Collapse>
        <Collapse in={survey.showResponseListView}>
          <ResponseListView />
        </Collapse>
      </Page>
    </div>
  );
};

export default SurveyView;
