import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  Box,
  makeStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  root: {},
  closeButton: {
    marginRight: '5px'
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const Detail = ({
  className,
  detail,
  onClose,
  onSubmit,
  isLoading,
  isError,
  ...rest
}) => {
  const classes = useStyles();
  const methods = useForm();
  // callbacks
  const { handleSubmit, control, errors, setValue } = methods;

  useEffect(() => {
    if (detail) {
      console.log(detail);
      setValue('name', detail.name);
      setValue('code', detail.code);
    }
  }, [detail]);
  const handleClose = () => {
    clear();
    onClose();
  };
  const clear = () => {
    setValue('name', '');
    setValue('code', '');
  };
  const onSubmitForm = data => {
    clear();
    onSubmit(data);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Card>
          <CardHeader
            title="Bus Details"
            subheader="Please provide correct information"
          />
          <Divider />
          <CardContent>
            <Controller
              as={TextField}
              fullWidth
              margin="normal"
              name="code"
              label="Bus Code"
              control={control}
              defaultValue=""
              variant="standard"
              rules={{ required: true }}
              error={errors.code && true}
            />
            <Controller
              as={TextField}
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              control={control}
              defaultValue=""
              variant="standard"
              rules={{ required: true }}
              error={errors.name && true}
            />

            {isError && (
              <Alert severity="error" color="error">
                Error while saving your details
              </Alert>
            )}
            {isLoading && (
              <Alert severity="info" color="info">
                Please wait while saving your records
              </Alert>
            )}
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleClose}
              className={classes.closeButton}
            >
              Close
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

Detail.propTypes = {
  className: PropTypes.string
};

export default Detail;
