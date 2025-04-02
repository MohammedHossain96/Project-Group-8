import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getMe } from '../api/authAPI';
import Auth from '../utils/auth';
const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = Auth.getToken();
                if (!token) {
                    setError('You need to be logged in to view this page');
                    setLoading(false);
                    return;
                }
                const userData = await getMe(token);
                setUserProfile(userData);
            }
            catch (err) {
                console.error('Failed to get user profile', err);
                setError('Failed to load profile data');
            }
            finally {
                setLoading(false);
            }
        };
        getUserProfile();
    }, []);
    // Redirect if not logged in
    if (!Auth.loggedIn()) {
        return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Please Login" }), _jsx("p", { children: "You need to be logged in to view your profile." }), _jsx("a", { href: "/login", className: "btn", children: "Go to Login" })] }) }) }));
    }
    if (loading) {
        return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsx("div", { className: "card-content", children: _jsx("p", { children: "Loading profile..." }) }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Error" }), _jsx("p", { className: "red-text", children: error }), _jsx("button", { className: "btn", onClick: () => Auth.logout(), children: "Logout" })] }) }) }));
    }
    return (_jsx("div", { className: "container", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Your Profile" }), _jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", userProfile?.username] }), _jsxs("div", { className: "section", children: [_jsx("h5", { children: "Fitness Stats" }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col s12 m4", children: _jsx("div", { className: "card blue-grey darken-1", children: _jsxs("div", { className: "card-content white-text", children: [_jsx("span", { className: "card-title", children: "Weekly Steps" }), _jsx("p", { className: "flow-text", children: "12,345" })] }) }) }), _jsx("div", { className: "col s12 m4", children: _jsx("div", { className: "card blue-grey darken-1", children: _jsxs("div", { className: "card-content white-text", children: [_jsx("span", { className: "card-title", children: "Calories Burned" }), _jsx("p", { className: "flow-text", children: "1,234" })] }) }) }), _jsx("div", { className: "col s12 m4", children: _jsx("div", { className: "card blue-grey darken-1", children: _jsxs("div", { className: "card-content white-text", children: [_jsx("span", { className: "card-title", children: "Workouts" }), _jsx("p", { className: "flow-text", children: userProfile?.workouts?.length || 0 })] }) }) })] })] }), _jsx("button", { className: "btn red", onClick: () => Auth.logout(), children: "Logout" })] }) }) }));
};
export default Profile;
