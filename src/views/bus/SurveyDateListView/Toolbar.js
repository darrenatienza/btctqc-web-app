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

const Toolbar = ({ className, onSearch, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => onSearch(query), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);

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
              <Typography variant="h1">Survey Dates</Typography>
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
