// API functions for authentication
// Base URL for API calls
const API_URL = 'http://localhost:3001/api';
// Function to create a new user
export const createUser = async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return response.json();
};
// Function to login a user
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};
// Function to get user data
export const getMe = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to get user data');
    }
    return response.json();
};
