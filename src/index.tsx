import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { AuthProvider } from './modules/fe-auth/contexts/authContext';


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
