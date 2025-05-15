import React, { ReactNode } from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const title = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        <p>BugTracker © 2025 - Developed by Mohd. Hamza Hussain</p>
      </footer>
    </div>
  );
};

export default MainLayout;