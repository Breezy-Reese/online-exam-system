import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getHomeLink = () => {
    if (!user) return '#';
    switch (user.role) {
      case 'student':
        return '/exams';
      case 'teacher':
        return '/teacher';
      case 'admin':
        return '/admin';
      default:
        return '#';
    }
  };

  const getProfileLink = () => {
    if (!user) return '#';
    return '/profile';
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Online Exam System</h1>
        <div className="space-x-4">
          <Link to={getHomeLink()} className="text-white hover:text-gray-200">Home</Link>
          <Link to={getProfileLink()} className="text-white hover:text-gray-200">Profile</Link>
          <button onClick={handleLogout} className="text-white hover:text-gray-200 bg-transparent border-none cursor-pointer">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
