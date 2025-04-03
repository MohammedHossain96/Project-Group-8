import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserProfile extends JwtPayload {
  id: string | number;
  username: string;
}

class Auth {
  // Retrieve the token from localStorage
  static getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  // Decode the token to get the user's profile
  static getProfile(): UserProfile | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<UserProfile>(token);
      console.log('Decoded token:', decoded);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if the user is logged in by verifying the token exists and is not expired
  static loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  static isTokenExpired(token: string): boolean {
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

  // Save the token to localStorage and redirect to the main page
  static login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/main'); // Redirect to the main page
  }

  // Remove the token from localStorage and redirect to the login page
  static logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default Auth;
