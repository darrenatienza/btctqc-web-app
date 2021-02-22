import React, { useState, useEffect, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Divider,
  Box
} from '@material-ui/core';
import QrCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';
import { PrintPreview } from './PrintPreview';

const useStyles = makeStyles(() => ({
  root: {}
}));
const QrCodePreview = ({ className, detail, ...rest }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          title="Generated Qr Code"
          subheader="This is the generated Qr Code"
        ></CardHeader>
        <CardContent>
          <Box display="flex" justifyContent="center">
            <PrintPreview
              ref={componentRef}
              code={detail ? detail.code : ''}
              name={detail ? detail.name : ''}
            />
          </Box>
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="center" p={2}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default QrCodePreview;
