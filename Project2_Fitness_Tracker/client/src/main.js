import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                index: true,
                element: _jsx(Login, {}), // Show the Login page by default
            },
            {
                path: '/main',
                element: _jsx(MainPage, {}), // MainPage is now at /main
            },
            {
                path: '/createuser',
                element: _jsx(CreateUser, {}),
            },
        ],
    },
]);
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(RouterProvider, { router: router }));
}
