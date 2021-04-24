import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import {
  BiBus as BusIcon,
  BiListCheck as ListCheckIcon,
  BiGridAlt as GridAltIcon
} from 'react-icons/bi';
import NavItem from './NavItem';
import { useCurrentUser } from '../../../states';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    id: 5,
    href: '/app/surveys',
    icon: ListCheckIcon,
    title: 'Surveys',
    admin: true
  },
  {
    id: 6,
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    id: 7,
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const adminItems = [
  ...items,
  {
    id: 1,
    href: '/app/dashboard',
    icon: GridAltIcon,
    title: 'Dashboard'
  },
  {
    id: 2,
    href: '/app/admins',
    icon: UsersIcon,
    title: 'Admins',
    admin: true
  },
  {
    id: 3,
    href: '/app/passengers',
    icon: UsersIcon,
    title: 'Passengers',
    admin: true
  },
  {
    id: 4,
    href: '/app/buses',
    icon: BusIcon,
    title: 'Buses',
    admin: true
  }
];
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [currentUser, { loadCurrentUser }] = useCurrentUser();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
        <List>
          {currentUser.accountType == 'passenger' &&
            items.map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          {currentUser.accountType == 'admin' &&
            adminItems
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map(
                item =>
                  item.id !== 5 && (
                    <NavItem
                      href={item.href}
                      key={item.title}
                      title={item.title}
                      icon={item.icon}
                    />
                  )
              )}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
