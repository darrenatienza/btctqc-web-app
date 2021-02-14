import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  //Card,
  //CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Button,
  makeStyles,
  Typography
  //Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(themes => ({
  root: {},
  addButton: {
    [themes.breakpoints.down('md')]: {
      marginBottom: '25px'
    }
  },
  search: {}
}));

const Toolbar = ({ className, onClose, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item lg={6} md={6} xs={12}>
            <Box className={classes.addButton}>
              <Typography variant="h1">Passenger Responses</Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
