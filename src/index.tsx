import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import './index.css';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './modules/fe-auth/msalt/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
  <MsalProvider instance={msalInstance}>
    <Router>
      <App />
    </Router>
  </MsalProvider>,
);
