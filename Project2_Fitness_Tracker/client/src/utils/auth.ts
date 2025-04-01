import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // Check if the user is logged in by verifying the token exists and is not expired
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // Check if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return true; // If no expiration date, consider it expired
      }
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If decoding fails, consider the token expired
    }
  }

  getToken(): string {
    // Retrieve the token from localStorage
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // Save the token to localStorage and redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    // Remove the token from localStorage and redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

class Auth {
  static login(token: string) {
    localStorage.setItem('token', token);
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static loggedIn() {
    const token = localStorage.getItem('token');
    // Add logic to validate the token if needed
    return !!token;
  }
}

export default Auth;
