import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from '../src/store/store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import theme from './them';

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider></BrowserRouter>
  </ThemeProvider>
  ,
  document.getElementById('root')
);