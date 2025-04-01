import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                index: true,
                element: _jsx(MainPage, {}),
            },
            {
                path: '/login',
                element: _jsx(Login, {}),
            },
            {
                path: '/createuser', // New route for CreateUser
                element: _jsx(CreateUser, {}), // Import and use CreateUser component
            }
        ],
    }
]);
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(RouterProvider, { router: router }));
}
