import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { createUser } from '../api/authAPI'; // API call to backend
import Auth from '../utils/auth';
const CreateUser = () => {
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
            Auth.login(data.token); // Automatically log in after registration
        }
        catch (err) {
            console.error('Failed to create user', err);
            setErrorMessage('Failed to create account. Please try again.');
        }
    };
    return (_jsx("div", { className: "container", children: _jsxs("form", { className: "form", onSubmit: handleSubmit, children: [_jsx("h1", { children: "Create Account" }), _jsx("label", { children: "Username" }), _jsx("input", { type: "text", name: "username", value: userData.username, onChange: handleChange, required: true }), _jsx("label", { children: "Password" }), _jsx("input", { type: "password", name: "password", value: userData.password, onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: "Register" }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), successMessage && _jsx("p", { className: "success-message", children: successMessage })] }) }));
};
export default CreateUser;
