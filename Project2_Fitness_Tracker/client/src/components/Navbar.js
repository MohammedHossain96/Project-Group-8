import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
const Navbar = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    useEffect(() => {
        // Check if the user is logged in and update the state
        setLoginCheck(auth.loggedIn());
    }, []);
    const handleLogout = () => {
        auth.logout(); // Remove the token and redirect
        window.location.assign('/login'); // Redirect to the login page
    };
    return (_jsxs("div", { className: "nav", children: [_jsx("div", { className: "nav-title", children: _jsx(Link, { to: "/", children: "Fitness Tracker" }) }), _jsx("ul", { children: !loginCheck ? (_jsx("li", { className: "nav-item", children: _jsx("button", { type: "button", children: _jsx(Link, { to: "/login", children: "Login" }) }) })) : (_jsx("li", { className: "nav-item", children: _jsx("button", { type: "button", onClick: handleLogout, children: "Logout" }) })) })] }));
};
export default Navbar;
