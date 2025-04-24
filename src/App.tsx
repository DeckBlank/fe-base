import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/modules/fe-base/components/Layout';

import { protectedPages, noProtectedPages } from '@/routes/appRoutes';

import { AuthProvider, useAuth } from '@/modules/fe-auth/contexts/authContext';

function App() {
  const { accessToken } = useAuth();
  console.log('accessToken', accessToken);
  return (
    <>
      {!accessToken ? (
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
      ) : (
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
      )}
    </>
  );
}

export default App;
