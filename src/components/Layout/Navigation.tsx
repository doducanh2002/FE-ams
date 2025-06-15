import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon, 
  SearchIcon, 
  PlaneIcon, 
  UserIcon, 
  LogInIcon,
  UserPlusIcon
} from 'lucide-react';
import { Button } from '../ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { isAuthenticated, user } = useAuth();

  const publicPages = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search Flights', icon: SearchIcon },
    { id: 'checkin', label: 'Check-In', icon: PlaneIcon },
  ];

  const authPages = [
    { id: 'login', label: 'Login', icon: LogInIcon },
    { id: 'signup', label: 'Sign Up', icon: UserPlusIcon },
  ];

  const userPages = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <img className="w-8 h-8" alt="AMS Logo" src="/layer-1.svg" />
            <span className="font-['Bayon'] text-2xl text-orange-600 tracking-wider">AMS</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {/* Public Pages */}
            {publicPages.map((page) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {page.label}
                </button>
              );
            })}

            {/* Authentication or User Pages */}
            {isAuthenticated ? (
              userPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => onNavigate(page.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {page.label}
                  </button>
                );
              })
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-2"
                >
                  <LogInIcon className="w-4 h-4" />
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};