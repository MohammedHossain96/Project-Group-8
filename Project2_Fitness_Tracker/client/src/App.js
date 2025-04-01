import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx("main", { className: 'container pt-5', children: _jsx(Outlet, {}) })] }));
}
export default App;
