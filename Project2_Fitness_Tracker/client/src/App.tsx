import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Auth from './utils/auth';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This renders the child routes */}
    </div>
  );
};

export default App;
