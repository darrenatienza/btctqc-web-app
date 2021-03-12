import 'react-perfect-scrollbar/dist/css/styles.css';

import React, { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useCurrentUser } from './states';
const App = () => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const [currentUser, { loadCurrentUser }] = useCurrentUser();
  const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
  });
  // response interceptor intercepting 401 responses, refreshing token and retrying the request

  const cache = new LRU({ max: 10 });

  configure({ axios, cache });
  // request interceptor to add token to request headers
  //axios.interceptors.request.use(
  //  async config => {
  //    const cookie = Cookies.get('PHPSESSID');
  //    const currentUrl = window.location.pathname;
  //    // check for deleted session
  //    if (!cookie) {
  //      //public url must not require interceptor
  //      if (currentUrl !== '/login' && currentUrl !== '/register') {
  //        navigate('/login');
  //      }
  //    }
  //    return config;
  //  },
  //  error => Promise.reject(error)
  //);
  useEffect(() => {
    loadCurrentUser();
  }, [currentUser.accountType]);

  axios.interceptors.response.use(
    response => {
      //console.log(response);
      return response;
    },
    error => {
      const config = error.config;

      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        navigate('/login');
      }

      return Promise.reject(error);
    }
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
