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
  addButton: {
    [themes.breakpoints.down('md')]: {
      marginBottom: '25px'
    },
    marginRight: '1rem'
  },
  search: {}
}));

const Toolbar = ({ className, onSearch, onAdd, onPrint, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item lg={6} xs={12}>
            <Box display="flex">
              <Box className={classes.addButton}>
                <Button color="primary" variant="contained" onClick={onAdd}>
                  Add New Bus
                </Button>
              </Box>
              <Box className={classes.addButton}>
                <Button color="primary" variant="contained" onClick={onPrint}>
                  Print List
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={6} xs={12}>
            <TextField
              onChange={e => setQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Bus name, code"
            />
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
