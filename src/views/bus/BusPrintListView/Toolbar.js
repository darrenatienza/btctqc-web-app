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
  makeStyles
  //Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(themes => ({
  root: {},
  button: {
    marginRight: '1rem'
  },
  search: {}
}));

const Toolbar = ({ className, onClose, onPrint, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex">
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Back
        </Button>

        <Button variant="contained" color="primary" onClick={onPrint}>
          Print
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
