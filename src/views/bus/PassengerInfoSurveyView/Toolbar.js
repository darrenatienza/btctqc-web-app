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

const Toolbar = ({ className, onSearch, onBack, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => onSearch(query), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Box display="flex">
          <Typography variant="h1">
            Passenger Details and Survey Result
          </Typography>
          <Box marginLeft="auto">
            <Button variant="outlined" color="primary" onClick={onBack}>
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
