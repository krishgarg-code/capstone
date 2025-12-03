'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/user';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

interface AuthContextType extends AuthState {
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    console.log('AuthProvider mounting');
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setAuthState({
                    user: data.user,
                    loading: false,
                    error: null,
                });
            } else {
                setAuthState({
                    user: null,
                    loading: false,
                    error: 'Not authenticated',
                });
            }
        } catch (error) {
            setAuthState({
                user: null,
                loading: false,
                error: 'Failed to check authentication',
            });
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setAuthState({
                user: null,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
