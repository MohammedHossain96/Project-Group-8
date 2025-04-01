import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />, // Show the Login page by default
      },
      {
        path: '/main',
        element: <MainPage />, // MainPage is now at /main
      },
      {
        path: '/createuser',
        element: <CreateUser />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
