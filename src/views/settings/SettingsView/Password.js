import React, { useState, useEffect } from 'react';
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
  const [showInvalidPasswordAlert, setShowInvalidPasswordAlert] = useState(
    false
  );
  const [showOtherErrorAlert, setShowOtherErrorAlert] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const { handleSubmit, control, errors, setValue, setError } = methods;
  const handleOnSubmit = data => {
    if (data.newPassword !== data.confirmPassword) {
      setError('newPassword', { shouldFocus: true });
      setError('confirmPassword', { shouldFocus: true });
      setPasswordNotMatch(true);
    } else {
      onSubmit(data);
      setPasswordNotMatch(false);
    }
  };
  useEffect(() => {
    if (error) {
      if (error.response.status === 403) {
        setShowInvalidPasswordAlert(true);
        setShowOtherErrorAlert(false);
      } else {
        setShowInvalidPasswordAlert(false);
        setShowOtherErrorAlert(true);
      }
    }
  }, [error]);
  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit(handleOnSubmit)}
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
            name="oldPassword"
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
            error={errors.oldPassword && true}
          />

          <Controller
            control={control}
            as={TextField}
            defaultValue=""
            margin="normal"
            rules={{ required: true }}
            fullWidth
            label="New Password"
            name="newPassword"
            variant="filled"
            type="password"
            error={errors.newPassword && true}
          />
          <Controller
            control={control}
            as={TextField}
            defaultValue=""
            margin="normal"
            rules={{ required: true }}
            fullWidth
            label="Confirm New password"
            name="confirmPassword"
            variant="filled"
            type="password"
            error={errors.confirmPassword && true}
          />
          {showOtherErrorAlert && (
            <Alert
              severity="error"
              color="error"
              onClose={() => {
                setShowOtherErrorAlert(false);
              }}
            >
              Error while saving your details
            </Alert>
          )}
          {showInvalidPasswordAlert && (
            <Alert
              severity="error"
              color="error"
              onClose={() => {
                setShowInvalidPasswordAlert(false);
              }}
            >
              Invalid Old Password
            </Alert>
          )}

          {loading && (
            <Alert severity="info" color="info">
              Please wait while saving your records
            </Alert>
          )}
          {passwordNotMatch && (
            <Alert severity="error" color="error">
              Your new password and confirmation password not match!
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
