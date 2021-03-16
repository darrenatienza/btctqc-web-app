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
            <AlertTitle>Information</AlertTitle>
            For reseting your password, In pariatur culpa minim excepteur
            eiusmod. In dolore excepteur reprehenderit exercitation tempor sint
            do sunt cillum minim. Consectetur fugiat minim tempor amet. Magna
            proident excepteur occaecat voluptate id veniam anim irure labore
            tempor aute labore mollit laboris. Culpa qui consequat pariatur enim
            exercitation anim sunt pariatur. Quis proident consequat ut aute
            dolor commodo.
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
