import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  withStyles,
  makeStyles
} from '@material-ui/core';

import { green, purple, red } from '@material-ui/core/colors';
import getInitials from 'src/utils/getInitials';
import { Eye as EyeIcon } from 'react-feather';
import { FiKey as KeyIcon, FiUser as UserIcon } from 'react-icons/fi';
const useStyles = makeStyles(theme => ({
  root: { paddingLeft: '15px', paddingRight: '15px' },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));
const ColorIconButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700]
    }
  }
}))(IconButton);
const Results = ({
  className,
  passengers,
  onView,
  onReset,
  onChangeRole,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell padding="default"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengers &&
                passengers
                  .slice(page * limit, page * limit + limit)
                  .map(passenger => (
                    <TableRow hover key={passenger.user_detail_id}>
                      <TableCell padding="default">
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {`${passenger.first_name} ${getInitials(
                              passenger.middle_name
                            )}. ${passenger.last_name}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{passenger.address}</TableCell>
                      <TableCell>{passenger.contact_number}</TableCell>

                      <TableCell>
                        {moment(passenger.create_time_stamp).format(
                          'DD/MM/YYYY'
                        )}
                      </TableCell>
                      <TableCell padding="default">
                        <IconButton
                          aria-controls="simple-open-button"
                          aria-haspopup="true"
                          aria-label="Role"
                          color={passenger.admin ? 'primary' : 'default'}
                          onClick={() =>
                            onChangeRole(passenger.user_id, passenger.admin)
                          }
                        >
                          <UserIcon />
                        </IconButton>

                        <IconButton
                          aria-controls="simple-open-button"
                          aria-haspopup="true"
                          aria-label="Key"
                          color={
                            passenger.request_password_reset
                              ? 'secondary'
                              : 'default'
                          }
                          onClick={() => onReset(passenger.user_id)}
                        >
                          <KeyIcon />
                        </IconButton>
                        <IconButton
                          aria-controls="simple-open-button"
                          aria-haspopup="true"
                          aria-label="Open"
                          onClick={() => onView(passenger.user_detail_id)}
                        >
                          <EyeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={passengers ? passengers.length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  passengers: PropTypes.array.isRequired
};

export default Results;
