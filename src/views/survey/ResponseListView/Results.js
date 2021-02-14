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
  root: { paddingLeft: '15px', paddingRight: '15px', maxWidth: 420 },
  avatar: {
    marginRight: theme.spacing(2)
  },
  nameTableCell: {
    [theme.breakpoints.up('md')]: {
      width: '500px'
    }
  }
}));

const Results = ({ className, responses, ...rest }) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Condition</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responses &&
                responses.slice(0, limit).map(response => (
                  <TableRow hover key={response.response_id}>
                    <TableCell padding="default">
                      {response.condition_name}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  responses: PropTypes.array.isRequired
};

export default Results;
