import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAxios from 'axios-hooks';
import { useCurrentUser } from '../../states';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openLogOutConfirmation, setOpenLogoutConfirmation] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentUser, { resetCurrentUser }] = useCurrentUser();
  const [{ data, loading, error }, executeLogout] = useAxios(
    {
      url: `/logout`,
      method: 'POST'
    },
    { manual: true }
  );
  const onLogout = async () => {
    await executeLogout();
    resetCurrentUser();
    navigate('/login');
  };
  const onCloseLogOutConfirmation = confirm => {
    if (confirm) {
      onLogout();
    } else {
      setOpenLogoutConfirmation(false);
    }
  };
  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onLogout={() => setOpenLogoutConfirmation(true)}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
            <ConfirmationDialog
              title="Logout"
              message="Are you sure you want to logout"
              open={openLogOutConfirmation}
              onClose={onCloseLogOutConfirmation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
