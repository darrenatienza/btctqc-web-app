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
const temperatures = [
  {
    id: 0,
    name: 'Select Temperature'
  },
  {
    id: 1,
    name: 'Below 37 degree celcius'
  },

  { id: 2, name: 'Above 37 degree celcius' }
];
const Toolbar = ({ className, onSearch, onBack, onChangeTemp, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => onSearch(query), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Box display="flex">
          <Box marginTop="auto" marginBottom="auto">
            <Typography variant="h1">Passenger List</Typography>
          </Box>

          <Box marginLeft="auto">
            <Box display="flex">
              <Box mr={3}>
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  name="temp"
                  label="Temperature"
                  defaultValue={1}
                  onChange={e => onChangeTemp(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true
                  }}
                >
                  {temperatures.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Box>

              <Box display="flex">
                <Box marginTop="auto" marginBottom="auto">
                  <Button variant="outlined" color="primary" onClick={onBack}>
                    Back
                  </Button>
                </Box>
              </Box>
            </Box>
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
