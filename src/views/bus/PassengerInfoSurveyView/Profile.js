import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  //Button,
  Card,
  //CardActions,
  CardContent,
  Divider,
  Typography,
  CardHeader,
  makeStyles,
  Button,
  Grid,
  Avatar
} from '@material-ui/core';

const detail = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, detail, onBack, survey, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Card>
          <CardHeader title="Passenger Details" />
          <Divider />
          <CardContent>
            <Box
              alignItems="start"
              display="flex"
              flexDirection="column"
              pl={3}
            >
              {detail && (
                <Grid container spacing={3}>
                  <Grid item>
                    <Avatar
                      className={classes.avatar}
                      src={`data:image/jpeg;base64,${detail.profile_pic}`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      {` ${detail.first_name} ${detail.middle_name} ${detail.last_name}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`Gender: ${detail.gender}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`Age: ${moment().diff(
                        detail.birth_date,
                        'years',
                        false
                      )}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`Address: ${detail.address}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`Contact Number: ${detail.contact_number}`}
                    </Typography>
                    <Typography
                      className={classes.dateText}
                      color="textSecondary"
                      variant="body1"
                    >
                      {`Joined Date: ${moment(detail.create_time_stamp).format(
                        'YYYY-MM-DD'
                      )}
                      
                    `}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`Temperature: ${survey.temperature}`}
                    </Typography>
                    <Box mt={3}>
                      <Typography color="textPrimary" variant="body1">
                        {`Start Route: ${survey.start_route ??
                          'Not specified'}`}
                      </Typography>
                      <Typography color="textSecondary" variant="body1">
                        {`Destination Route: ${survey.destination_route ??
                          'Not specified'}`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </Box>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
