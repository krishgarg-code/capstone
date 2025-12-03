'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import TransitionLink from "./TransitionLink";

interface MenuItem {
  label: string;
  href: string;
}

export default function StaggeredMenu() {
  console.log('StaggeredMenu rendering');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    // Refresh the page to update the UI
    window.location.reload();
  };

  const menuItems: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Menu Button - Positioned as overlay */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col justify-center items-center w-12 h-12 rounded-full backdrop-blur-sm shadow-luxury-lg transition-all duration-300 ${isOpen ? 'bg-black hover:bg-black' : 'bg-white hover:bg-gray-200'}`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${isOpen ? 'bg-white rotate-45 translate-y-1' : 'bg-black -translate-y-0.5'}`}></span>
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 mt-1 ${isOpen ? 'bg-white opacity-0' : 'bg-black opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 mt-1 ${isOpen ? 'bg-white -rotate-45 -translate-y-1' : 'bg-black translate-y-0.5'}`}></span>
        </button>
      </div>

      {/* Slide-in Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full bg-white/90 dark:bg-elegant-gray-dark/90 backdrop-blur-xl shadow-luxury-xl z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '320px' }}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-800/50">
            <TransitionLink
              href="/"
              className="text-2xl font-bold text-black dark:text-white tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              Viora
            </TransitionLink>

          </div>

          {/* Menu Items */}
          <div className="flex flex-col flex-grow py-12 px-6 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item, index) => (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  className={`text-2xl md:text-3xl font-medium transition-colors duration-300 ${pathname === item.href
                    ? 'text-black dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </TransitionLink>
              ))}

              {isClient && !loading && user && (
                <TransitionLink
                  href="/dashboard"
                  className={`text-2xl md:text-3xl font-medium transition-colors duration-300 ${pathname === '/dashboard'
                    ? 'text-black dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </TransitionLink>
              )}
            </nav>

            {/* Authentication Section */}
            <div className="mt-auto pt-12">
              {isClient && !loading && user ? (
                <div className="space-y-6">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-xl font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 py-3 border-2 border-black-300 dark:border-black-900 rounded-md hover:bg-black/10 dark:hover:bg-white/10"

                  >
                    Logout
                  </button>
                </div>
              ) : isClient && !loading ? (
                <div className="space-y-6">
                  <TransitionLink
                    href="/login"
                    className="block w-full text-center text-xl font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </TransitionLink>
                  <TransitionLink
                    href="/signup"
                    className="block w-full text-center text-xl font-medium text-black dark:text-white bg-transparent border border-black dark:border-white rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </TransitionLink>
                </div>
              ) : (
                <div>
                  <span className="text-xl text-gray-600 dark:text-gray-400">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}