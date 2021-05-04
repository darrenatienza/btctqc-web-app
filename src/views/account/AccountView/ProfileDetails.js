import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { date } from 'yup';

const useStyles = makeStyles(() => ({
  root: {}
}));
const gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];
const ProfileDetails = ({
  className,
  detail,
  affectedRows,
  onSubmit,
  ...rest
}) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, errors, setValue } = methods;

  useEffect(() => {
    if (detail) {
      setValue('firstName', detail.first_name);
      setValue('middleName', detail.middle_name);
      setValue('lastName', detail.last_name);
      setValue('address', detail.address);
      setValue('contactNumber', detail.contact_number);
      setValue('birthDate', moment(detail.birth_date).format('YYYY-MM-DD'));
      setValue('gender', detail.gender);
    }
  }, [detail]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Controller
                control={control}
                as={TextField}
                defaultValue=""
                rules={{ required: true }}
                fullWidth
                label="First name"
                name="firstName"
                variant="outlined"
                error={errors.firstName && true}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                control={control}
                as={TextField}
                defaultValue=""
                rules={{ required: true }}
                fullWidth
                label="Middle name"
                name="middleName"
                variant="outlined"
                error={errors.middleName && true}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                control={control}
                as={TextField}
                defaultValue=""
                rules={{ required: true }}
                fullWidth
                label="Last name"
                name="lastName"
                variant="outlined"
                error={errors.lastName && true}
              />
            </Grid>
            <Grid item md={8} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                type="date"
                name="birthDate"
                label="Birth Date"
                control={control}
                defaultValue={moment().format('YYYY-MM-DD')}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                select
                name="gender"
                label="Gender"
                control={control}
                defaultValue="male"
                variant="outlined"
                SelectProps={{
                  native: true
                }}
              >
                {gender.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                as={TextField}
                defaultValue=""
                rules={{ required: true }}
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                error={errors.address && true}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                as={TextField}
                defaultValue="+639"
                rules={{ required: true }}
                fullWidth
                type="tel"
                label="Contact Number"
                name="contactNumber"
                variant="outlined"
                error={errors.contactNumber && true}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
