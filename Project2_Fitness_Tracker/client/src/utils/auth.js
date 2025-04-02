// Auth utility class for handling JWT tokens
class Auth {
    // Get token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }
    // Check if user is logged in
    loggedIn() {
        const token = this.getToken();
        // If there is a token and it's not expired, return true
        return token ? true : false;
    }
    // Save token to localStorage and redirect
    login(token) {
        localStorage.setItem('id_token', token);
        window.location.assign('/');
    }
    // Clear token from localStorage and redirect
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}
export default new Auth();
