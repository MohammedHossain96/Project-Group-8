import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { loginUser } from '../api/authAPI';
import Auth from '../utils/auth';
const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const data = await loginUser(userData);
            Auth.login(data.token);
        }
        catch (err) {
            console.error('Failed to login', err);
            setErrorMessage('Failed to login. Please check your credentials.');
        }
    };
    return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { type: "text", id: "username", name: "username", value: userData.username, onChange: handleChange, required: true })] }), _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: userData.password, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "btn", children: "Login" }), errorMessage && _jsx("p", { className: "red-text", children: errorMessage })] }), _jsxs("p", { className: "mt-3", children: ["Don't have an account? ", _jsx("a", { href: "/signup", children: "Sign up" })] })] }) }) }));
};
export default Login;
