import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import MainPage from './pages/MainPage'; // Ensure this file exists at the specified path
import ErrorPage from './pages/ErrorPage'; // Ensure this file exists at the specified path
import Login from './pages/Login';
import CreateUser from './pages/CreateUser'; // Import CreateUser component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/createuser', // New route for CreateUser
        element: <CreateUser />, // Import and use CreateUser component
      }
    ],
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
