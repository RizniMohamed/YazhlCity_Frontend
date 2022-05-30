import React from 'react';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from './Store/store';
import Theme from './Theme/theme'
import Views from './Routes/Views';

const rootID = document.getElementById('root')
const root = ReactDOM.createRoot(rootID);
const theme = createTheme(Theme)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Views />
      </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);