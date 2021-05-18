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
import moment from 'moment';

const useStyles = makeStyles(themes => ({
  root: {},
  button: {
    marginRight: '1rem',
    height: '2rem'
  },
  dates: { minWidth: '10rem' }
}));

const Toolbar = ({
  className,
  onClose,
  onPrint,
  surveyDates,
  onChangeDate,
  ...rest
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" alignItems="center">
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Back
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onPrint}
        >
          Print
        </Button>

        <Box marginLeft="auto">
          <TextField
            className={classes.dates}
            fullWidth
            margin="normal"
            onChange={e => onChangeDate(e.target.value)}
            select
            name="surveDates"
            label="Survey Dates"
            variant="outlined"
            SelectProps={{
              native: true
            }}
          >
            <option value={0}>Select Survey Date</option>
            {surveyDates.map(option => (
              <option key={option.survey_id} value={option.create_time_stamp}>
                {moment(option.create_time_stamp).format('MM-DD-YYYY')}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
