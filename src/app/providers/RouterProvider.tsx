import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

import { MainPage } from 'pages/MainPage';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
};
