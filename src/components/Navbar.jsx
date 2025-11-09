import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, FileText } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FileText size={28} />
          AI Resume Builder
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              <Link to="/builder" className="hover:text-gray-200">Create Resume</Link>
              <Link to="/ats" className="hover:text-gray-200">ATS Analyzer</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}