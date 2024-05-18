import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AuthWrapper from './pages/auth/AuthWrapper';
import Login from './pages/auth/Login';
import AddModel from './pages/AddModel';
import ModelList from './pages/ModelList';
import NotFound from './pages/NotFound';

function App() {
  const routes = [
    {
      path: '/model/add',
      element: <AddModel />,
      allowedRoles: ['admin'],
    },
    {
      path: '/',
      element: <ModelList />,
      allowedRoles: ['admin'],
    },
    {
      path: '/login',
      element: <Login />,
      allowedRoles: [],
    },
    {
      path: '*',
      element: <NotFound />,
      allowedRoles: ['admin'],
    },
  ];
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => {
            if (route.allowedRoles.length > 0) {
              return (
                <Route
                  key={route.path}
                  element={<AuthWrapper allowedRoles={route.allowedRoles} />}
                >
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                </Route>
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
