import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Using jsx transform, no need to import React
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
function Navbar() {
    const navStyle = {
        background: 'rgba(15, 15, 15, 0.75)', // Darker background
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '0',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Deeper shadow
        borderBottom: '1px solid rgba(70, 70, 70, 0.2)', // Darker border
        color: '#e0e0e0', // Light gray instead of pure white
        position: 'relative',
        zIndex: 1000
    };
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
    };
    const brandStyle = {
        fontSize: '1.5rem',
        color: '#e0e0e0', // Light gray instead of pure white
        textDecoration: 'none',
        fontWeight: '500',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
    };
    const navListStyle = {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        alignItems: 'center'
    };
    const navItemStyle = {
        marginLeft: '20px'
    };
    const navLinkStyle = {
        color: '#e0e0e0', // Light gray instead of pure white
        textDecoration: 'none',
        fontWeight: '500',
        padding: '2px 5px', 
        display: 'inline-block', 
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        transition: 'color 0.3s',
        borderRadius: '4px' 
    };
    
    // Add hover style through className instead of inline style
    return (_jsx("nav", { style: navStyle, children: _jsx("div", { className: "container", children: _jsxs("div", { style: containerStyle, children: [_jsx(Link, { to: "/", style: brandStyle, children: "Fitness Tracker" }), _jsxs("ul", { style: navListStyle, children: [_jsx("li", { style: { ...navItemStyle, marginLeft: 0 }, children: _jsx(Link, { to: "/", className: "nav-link", children: "Home" }) }), Auth.loggedIn() ? (_jsxs(_Fragment, { children: [_jsx("li", { style: navItemStyle, children: _jsx(Link, { to: "/profile", className: "nav-link", children: "Profile" }) }), _jsx("li", { style: navItemStyle, children: _jsx("a", { onClick: () => Auth.logout(), className: "nav-link", style: { cursor: 'pointer' }, children: "Logout" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("li", { style: navItemStyle, children: _jsx(Link, { to: "/login", className: "nav-link", children: "Login" }) }), _jsx("li", { style: navItemStyle, children: _jsx(Link, { to: "/signup", className: "nav-link", children: "Sign Up" }) })] }))] })] }) }) }))
}
export default Navbar;
