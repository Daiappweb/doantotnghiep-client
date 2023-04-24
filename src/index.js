import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <SnackbarProvider  anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>
  </BrowserRouter>
);
