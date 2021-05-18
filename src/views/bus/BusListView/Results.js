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
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Eye as ViewIcon,
  Printer as PrintIcon
} from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: { paddingLeft: '15px', paddingRight: '15px' },
  avatar: {
    marginRight: theme.spacing(2)
  },
  nameTableCell: {
    [theme.breakpoints.up('md')]: {
      width: '500px'
    }
  }
}));

const Results = ({
  className,
  buses,
  onEdit,
  onDelete,
  onPrint,
  onViewSurvey,
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
        <Box minWidth={450}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Code</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Registration date</TableCell> */}
                <TableCell padding="default"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buses.slice(page * limit, page * limit + limit).map(bus => (
                <TableRow hover key={bus.bus_info_id}>
                  <TableCell padding="default">
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {bus.code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.nameTableCell}>
                    {bus.name}
                  </TableCell>
                  {/* <TableCell>
                      {moment(bus.create_time_stamp).format('DD/MM/YYYY')}
                    </TableCell> */}
                  <TableCell padding="default">
                    <IconButton
                      aria-controls="simple-view-button"
                      aria-haspopup="true"
                      aria-label="View"
                      onClick={() => onViewSurvey(bus.bus_info_id)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      aria-controls="simple-edi-button"
                      aria-haspopup="true"
                      aria-label="Edit"
                      onClick={() => onEdit(bus.bus_info_id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-controls="simple-delete-button"
                      aria-haspopup="true"
                      aria-label="Delete"
                      onClick={() => onDelete(bus.bus_info_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-controls="simple-delete-button"
                      aria-haspopup="true"
                      aria-label="Delete"
                      onClick={() => onPrint(bus.bus_info_id)}
                    >
                      <PrintIcon />
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
        count={buses ? buses.length : 0}
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
  buses: PropTypes.array.isRequired
};

export default Results;
