import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { useCurrentUser } from '../../../states';
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
const ProfileDetails = ({ className, ...rest }) => {
  const [affectedRows, setAffectedRows] = useState(0);
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, errors, setValue } = methods;
  //app states
  const [currentUser] = useCurrentUser();
  //http request
  const [
    {
      //data,
      putLoading,
      putError
    },
    executePut
  ] = useAxios(
    {
      url: `/records/user_details/${currentUser.currentUserDetailID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  const [
    { data: getDetailData, loading: getDetailLoading, error: getDetailError },
    refetchUserDetails
  ] = useAxios(
    {
      url: `/records/user_details?filter=user_id,eq,${currentUser.currentUserID}`,
      method: 'GET'
    },
    {
      manual: false
    }
  );
  //observers
  useEffect(() => {
    const timeOutId = setTimeout(() => setAffectedRows(0), 2000);
    return () => clearTimeout(timeOutId);
  }, [affectedRows]);

  useEffect(() => {
    if (getDetailData) {
      console.log(getDetailData);
      setValue('firstName', getDetailData.records[0].first_name);
      setValue('middleName', getDetailData.records[0].middle_name);
      setValue('lastName', getDetailData.records[0].last_name);
      setValue('address', getDetailData.records[0].address);
      setValue('contactNumber', getDetailData.records[0].contact_number);
      setValue(
        'birthDate',
        moment(getDetailData.records[0].birth_date).format('YYYY-MM-DD')
      );
      setValue('gender', getDetailData.records[0].gender);
    }
  }, [getDetailData]);
  //callback
  const onSubmit = async data => {
    if (currentUser.currentUserID > 0) {
      const { data: rows } = await executePut({
        data: {
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          address: data.address,
          contact_number: data.contactNumber,
          birth_date: data.birthDate,
          gender: data.gender
        }
      });
      setAffectedRows(rows);
    }
    //user.user_id > 0 && navigate('/app/dashboard');
  };
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
          <Box mt={2}>
            {putError ||
              (getDetailError && (
                <Alert severity="error" color="error">
                  Error while requesting to server.
                </Alert>
              ))}
            {putLoading ||
              (getDetailLoading && (
                <Alert severity="info" color="info">
                  Saving...
                </Alert>
              ))}
            {affectedRows > 0 && (
              <Alert severity="success" color="success">
                Details has been saved!
              </Alert>
            )}
          </Box>
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
