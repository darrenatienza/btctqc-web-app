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
              List of Bus
            </Typography>
          </Box>
          {/* table itself */}
          <Box m={1}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Qr Code</TableCell>
                  <TableCell>Bus Code</TableCell>
                  <TableCell>Bus Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((bus, i) => (
                  <TableRow key={bus.bus_info_id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <QRCode value={bus.code} size={60} />
                    </TableCell>
                    <TableCell>{bus.code}</TableCell>
                    <TableCell>{bus.name}</TableCell>
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
