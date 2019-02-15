import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';

import App from './pages/App';

import store from './redux/store';

import { BASE_URL } from './constants/api';

axios.defaults.baseURL = `${BASE_URL}/api`;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#004d40' },
    secondary: { main: '#2e7d32' },
    background: {
      primary: {
        lightest: '#FAFAFA',
        light: '#eeeeee',
        main: '#9e9e9e',
        dark: '#212121'
      },
      secondary: {
        lightest: '#E0F7FA',
        light: '#4DD0E1',
        main: '#00BCD4',
        dark: '#006064'
      }
    },
    tonalOffset: 0.2
  }
});

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
