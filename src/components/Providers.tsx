'use client';

import { TransitionProvider } from "@/context/TransitionContext";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TransitionProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </TransitionProvider>
    );
}
