import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import useAxios from 'axios-hooks';
import { useForm, Controller } from 'react-hook-form';
import { FiKey as KeyIcon } from 'react-icons/fi';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles({
  root: {}
});

const Password = ({ className, onSubmit, loading, error, ...rest }) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, errors, setValue, setError } = methods;
  const handleOnSubmit = data => {
    if (data.password !== data.confirm) {
      setError('password');
      setError('confirm');
    }
  };
  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader subheader="Update your account password" title="Password" />
        <Divider />
        <CardContent>
          <Controller
            control={control}
            as={TextField}
            defaultValue=""
            margin="normal"
            rules={{ required: true }}
            fullWidth
            label="Old Password"
            name="old"
            variant="standard"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <KeyIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            error={errors.password && true}
          />

          <Controller
            control={control}
            as={TextField}
            defaultValue=""
            margin="normal"
            rules={{ required: true }}
            fullWidth
            label="New Password"
            name="password"
            variant="filled"
            type="password"
            error={errors.password && true}
          />
          <Controller
            control={control}
            as={TextField}
            defaultValue=""
            margin="normal"
            rules={{ required: true }}
            fullWidth
            label="Confirm New password"
            name="confirm"
            variant="filled"
            type="password"
            error={errors.confirm && true}
          />
          {error && (
            <Alert severity="error" color="error">
              Error while saving your details.
            </Alert>
          )}
          {loading && (
            <Alert severity="info" color="info">
              Please wait while saving your records
            </Alert>
          )}
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
