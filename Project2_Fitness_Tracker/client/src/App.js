import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
const App = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Outlet, {}), " "] }));
};
export default App;
