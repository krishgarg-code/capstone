'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Redirect to home page after successful login
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Failed to login. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-4 tracking-tight">Sign In</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="bg-white dark:bg-elegant-gray-dark rounded-lg shadow-luxury-lg p-8 border border-gray-200 dark:border-gray-800">
          {error && (
            <div className="mb-6 text-red-500 text-sm text-center py-3 px-4 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-elegant-gray-dark text-black dark:text-white shadow-luxury"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-elegant-gray-dark text-black dark:text-white shadow-luxury"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-black dark:text-white hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-luxury hover:shadow-luxury-lg text-base font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-black dark:text-white hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}