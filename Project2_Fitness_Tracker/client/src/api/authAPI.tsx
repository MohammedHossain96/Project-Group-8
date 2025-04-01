import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // This will include the token if the login is successful
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const createUser = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`); // Fixed error message
    }

    const data = await response.json();
    return data; // This will include the token if the registration is successful
  } catch (error) {
    console.error('Error during registration:', error); // Fixed message here
    throw error;
  }
};

export {login, createUser};
