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
  axios.interceptors.request.use(
    async config => {
      const cookie = Cookies.get('PHPSESSID');
      if (!cookie) {
        navigate('/login');
      }
      return config;
    },
    error => Promise.reject(error)
  );
  useEffect(() => {
    loadCurrentUser();
  }, [currentUser.accountType]);
  //axios.interceptors.response.use(
  //  response => {
  //    console.log(response);
  //    return response;
  //  },
  //  error => {
  //    const config = error.config;
  //    console.log(error.status);
  //    //if (error.status === 403) {
  //    //  navigate('/login');
  //    //
  //    //  return axios(config);
  //    //} else if (error.status === 401) {
  //    //  console.log(error && error.response);
  //    //  navigate('/login');
  //    //
  //    //  return axios(config);
  //    //}
  //
  //    return Promise.reject(error);
  //  }
  //);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
