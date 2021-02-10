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
  makeStyles
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

const Detail = ({ className, detail, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardHeader title="Passenger Details" />
          <Divider />
          <CardContent>
            <Box alignItems="start" display="flex" flexDirection="column">
              {detail && (
                <>
                  <Typography color="textPrimary" gutterBottom variant="h3">
                    {`${detail.first_name} ${detail.middle_name} ${detail.last_name}`}
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    {detail.address}
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    {detail.contact_number}
                  </Typography>
                  <Typography
                    className={classes.dateText}
                    color="textSecondary"
                    variant="body1"
                  >
                    {`${moment(detail.create_time_stamp).format('YYYY-MM-DD')}
                      
                    `}
                  </Typography>
                </>
              )}
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </Box>
    </div>
  );
};

Detail.propTypes = {
  className: PropTypes.string
};

export default Detail;
