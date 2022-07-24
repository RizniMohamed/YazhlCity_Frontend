import React from 'react';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Store/store';
import Theme from './Theme/theme'
import Views from './Routes/Views';
import Dialogs from './Dialogs/Dialogs';
import Header from "./Components/Header"
import { Toolbar } from '@mui/material'

const rootID = document.getElementById('root')
const root = ReactDOM.createRoot(rootID);
const theme = createTheme(Theme)

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Toolbar />
          <Views />
          <Dialogs />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
);

/**
 * CssBaselin -> fundamental css styles
 * Header     -> Header component is visibile for all the pages
 * Toolbar    -> Get header margin for below components
 * Views      -> Routing
 * Dialogs    -> Popup dialogs
 */