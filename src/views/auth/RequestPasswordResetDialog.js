import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const RequestPasswordResetDialog = ({ notFoundError, open, onClose }) => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    open && setUserName('');
  }, [open]);
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose('', false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Request Password Reset</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please input your user name here.
        </DialogContentText>
        <TextField
          error={(userName == '' || notFoundError) ?? false}
          helperText={notFoundError && 'User not found'}
          fullWidth
          autoFocus
          margin="dense"
          label="User Name"
          onChange={e => setUserName(e.target.value)}
        />
        <Box mt={2}>
          <Alert severity="info">
            <AlertTitle>Fix problems with your password</AlertTitle>
            <p>
              If you're having trouble resetting your password or can’t sign in
              to your account, or If you forget your password, you can request
              to reset your password by emailing us in ({' '}
              <span style={{ fontWeight: 'bold' }}>BusTrans@gmail.com</span> ).
            </p>
            <br />
            <p style={{ fontWeight: 'bold' }}>Procedure</p>
            <p>
              <span style={{ fontWeight: 'bold' }}>1.</span>By emailing us pls
              include your full name or the account name, phone number, and
              birth date for confirmation that you are the owner of the account.
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>2.</span> Wait for the admin
              to respond to the request.
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>3.</span> when the admin
              respond the passenger can login again through its user name and by
              using its default password.
            </p>
          </Alert>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose('', false)} color="primary">
          Cancel
        </Button>
        <Button
          disabled={userName == '' ?? false}
          onClick={() => onClose(userName, true)}
          color="primary"
          autoFocus
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestPasswordResetDialog;
