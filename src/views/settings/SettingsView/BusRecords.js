import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useAxios from 'axios-hooks';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const BusRecords = ({ className, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  //const [records, setRecords] = useState([]);
  // http request
  const [
    { data, loading, error }
    //refetch
  ] = useAxios(
    {
      url: `/records/bus_infos`,
      method: 'GET'
    },
    {
      manual: false
    }
  );
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader subheader="List of recorded buses" title="Bus Records" />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
          <Box maxWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="default">Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.records.slice(0, limit).map(record => (
                    <TableRow hover key={record.bus_info_id}>
                      <TableCell>{record.code}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data && data.records.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardContent>
    </Card>
  );
};

BusRecords.propTypes = {
  className: PropTypes.string
};

export default BusRecords;
