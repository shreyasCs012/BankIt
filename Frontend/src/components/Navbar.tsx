import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, CreditCard, Landmark } from 'lucide-react';
import logo from '../assets/bankit_logo1.png';
export const Navbar = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex  mt-3 ml-0 ">
           <img
                src={logo}
                alt="BankIt Logo"
                className="h-56 w-56 object-contain"
              />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/accounts"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Accounts</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{customer?.customer_name}</span>
              <span className="text-xs text-gray-500">{customer?.customer_mail}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link
            to="/dashboard"
            className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors py-2 px-4"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link
            to="/accounts"
            className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors py-2 px-4"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs font-medium">Accounts</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors py-2 px-4"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
