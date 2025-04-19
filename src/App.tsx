import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/modules/fe-base/components/Layout';

import {
  protectedPages,
  noProtectedPages,
} from '@/routes/appRoutes';

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { AuthProvider } from '@/modules/fe-auth/contexts/authContext';

function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <Suspense
          fallback={<div className="flex flex-col h-screen ">Loading...</div>}
        >
          <Routes>
            {noProtectedPages.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<page.element />}
              />
            ))}
          </Routes>
        </Suspense>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AuthProvider>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {protectedPages.map((page) => (
                  <Route
                    key={page.path}
                    path={page.path}
                    element={<page.element />}
                  />
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </AuthProvider>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
