import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FiEye as EyeIcon } from 'react-icons/fi';
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
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';
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

const Results = ({ className, surveyDates, onView, ...rest }) => {
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
                <TableCell padding="default">Survey Date</TableCell>
                <TableCell padding="default">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveyDates &&
                surveyDates.slice(0, limit).map(survey => (
                  <TableRow hover key={survey.survey_id}>
                    <TableCell padding="default">
                      {moment(survey.create_time_stamp).format(
                        'DD/MM/YYYY HH:MM:SS'
                      )}
                    </TableCell>
                    <TableCell padding="default">
                      <IconButton
                        aria-controls="simple-edi-button"
                        aria-haspopup="true"
                        aria-label="Edit"
                        onClick={() => onView(survey.survey_id)}
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
        count={surveyDates ? surveyDates.length : 0}
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
  surveyDates: PropTypes.array.isRequired
};

export default Results;
