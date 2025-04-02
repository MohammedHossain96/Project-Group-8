// API functions for authentication

interface UserData {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    username: string;
    id: string;
  };
}

// Base URL for API calls
const API_URL = 'http://localhost:3001/api';

// Function to create a new user
export const createUser = async (userData: UserData): Promise<AuthResponse> => {
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
export const loginUser = async (userData: UserData): Promise<AuthResponse> => {
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
export const getMe = async (token: string): Promise<any> => {
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
