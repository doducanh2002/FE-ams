import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/toast';
import { Navigation } from './components/Layout/Navigation';
import { Home } from './screens/Home';
import { SignUp } from './screens/SignUp';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { FlightSearch } from './screens/FlightSearch';
import { CheckIn } from './screens/CheckIn';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignUp />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <FlightSearch />;
      case 'checkin':
        return <CheckIn />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-white">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;