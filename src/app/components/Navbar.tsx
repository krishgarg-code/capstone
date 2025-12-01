'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    // Refresh the page to update the UI
    window.location.reload();
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-black dark:text-white tracking-tight">Viora</Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === link.href
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isClient && !loading && user && (
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === '/dashboard'
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isClient && !loading && user ? (
              <>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 mr-6">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : isClient && !loading ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="ml-6 text-sm font-medium text-black dark:text-white bg-transparent border border-black dark:border-white px-5 py-2 rounded-md hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-luxury hover:shadow-luxury-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <span className="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}