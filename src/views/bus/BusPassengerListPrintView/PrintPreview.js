import { withStyles, withTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { PureComponent } from 'react';
import Logo from 'src/components/Logo';
import moment from 'moment';

import {
  Box,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import QRCode from 'react-qr-code';
import getInitials from 'src/utils/getInitials';
const useStyles = theme => ({
  root: { padding: theme.spacing(1) },
  avatar: {
    marginRight: theme.spacing(2)
  },
  header: {
    fontSize: '14px',
    textAlign: 'center'
  },
  headerTitle: {
    fontFamily: 'Algerian, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '20px',
    marginTop: '30px'
  },
  paragraph: {
    marginTop: '16px',
    textIndent: '48px',
    marginBottom: '10px',
    textAlign: 'justify'
  },
  thumbBox: {
    height: '150px',
    border: '1px solid',
    borderColor: '#00000',
    marginBottom: '10px'
  },
  logo: {
    width: '75px',
    height: '75px'
  },
  field: { textDecoration: 'underline', fontWeight: 'bold' },
  title: { marginBottom: theme.spacing(3) }
});
class PrintPreview extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <Box border="1px solid">
          <Box textAlign="center" m={3}>
            <Typography
              color="textPrimary"
              variant="h3"
              className={classes.title}
            >
              Bus Transport Contact Tracing <br />
              using QR Code System
            </Typography>

            <Typography
              color="textPrimary"
              variant="h5"
              className={classes.subTitle}
            >
              List of Passenger
            </Typography>
          </Box>
          {/* table itself */}
          <Box m={1}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Passenger</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Start Route</TableCell>
                  <TableCell>Destination Route</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((bus, i) => (
                  <TableRow key={bus.survey_id}>
                    <TableCell>
                      {moment(bus.create_time_stamp).format('MM-DD-YYYY')}
                    </TableCell>
                    <TableCell>{`${bus.last_name}, ${
                      bus.first_name
                    } ${getInitials(bus.middle_name)}`}</TableCell>
                    <TableCell>{bus.address}</TableCell>
                    <TableCell>{bus.contact_number}</TableCell>
                    <TableCell>{bus.temperature}</TableCell>
                    <TableCell>{bus.start_route}</TableCell>
                    <TableCell>{bus.destination_route}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withTheme(withStyles(useStyles)(PrintPreview));
