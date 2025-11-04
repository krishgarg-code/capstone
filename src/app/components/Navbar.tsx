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
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-black dark:text-white -ml-30">Viora</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isClient && !loading && user && (
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : isClient && !loading ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 text-sm font-medium text-white bg-black dark:bg-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}