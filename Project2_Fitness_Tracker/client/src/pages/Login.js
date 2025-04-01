import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const data = await login(loginData); // Call the login API
            Auth.login(data.token); // Save the JWT in localStorage
            navigate('/main'); // Redirect to MainPage
        }
        catch (err) {
            console.error('Failed to login', err);
            setErrorMessage('Invalid username or password');
        }
    };
    return (_jsx("div", { className: "container", children: _jsxs("form", { className: "form", onSubmit: handleSubmit, children: [_jsx("h1", { children: "Login" }), _jsx("label", { children: "Username" }), _jsx("input", { type: "text", name: "username", value: loginData.username, onChange: handleChange, required: true }), _jsx("label", { children: "Password" }), _jsx("input", { type: "password", name: "password", value: loginData.password, onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: "Login" }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage })] }) }));
};
export default Login;
