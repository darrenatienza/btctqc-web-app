import React, { useState } from 'react';
import {
  Box
  //makeStyles
} from '@material-ui/core';

import Results from './Results';
import Responses from './Responses';
import Toolbar from './Toolbar';
import data from './data';

//const useStyles = makeStyles(theme => ({
//  root: {
//    backgroundColor: theme.palette.background.dark
//  }
//}));

const PassengerHistoryListView = () => {
  //const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Box>
      <Toolbar />

      <Results customers={customers} />

      <Responses customers={customers} />
    </Box>
  );
};

export default PassengerHistoryListView;
