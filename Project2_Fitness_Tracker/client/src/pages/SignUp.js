import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { createUser } from '../api/authAPI'; // API call to backend
import Auth from '../utils/auth';
const SignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // For errors
    const [successMessage, setSuccessMessage] = useState(''); // For success
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
        setSuccessMessage('');
        try {
            const data = await createUser(userData);
            setSuccessMessage('Account created successfully!');
            Auth.login(data.token); // Automatically log in after registration
        }
        catch (err) {
            console.error('Failed to create user', err);
            setErrorMessage('Failed to create account. Please try again.');
        }
    };
    return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Create Account" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { type: "text", id: "username", name: "username", value: userData.username, onChange: handleChange, required: true })] }), _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: userData.password, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "btn", children: "Register" }), errorMessage && _jsx("p", { className: "red-text", children: errorMessage }), successMessage && _jsx("p", { className: "green-text", children: successMessage })] }), _jsxs("p", { className: "mt-3", children: ["Already have an account? ", _jsx("a", { href: "/login", children: "Login" })] })] }) }) }));
};
export default SignUp;
