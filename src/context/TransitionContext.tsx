'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type TransitionContextType = {
    isTransitioning: boolean;
    startTransition: (href: string) => void;
    endTransition: () => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    const startTransition = (href: string) => {
        setIsTransitioning(true);
        // Wait for the exit animation (stairs down) to complete before pushing route
        // Animation duration is approx 0.5s + staggered delays ~ 1s total
        setTimeout(() => {
            router.push(href);
            // We don't set isTransitioning(false) here. 
            // It will be handled by the StairsLoader's enter animation or a separate effect if needed.
            // Actually, for this pattern, we usually keep it true until the new page mounts, 
            // but since we are in a SPA-like transition, we can trigger the "enter" phase 
            // after a short delay or let the component re-render handle it.
            // However, since we are using a global layout, the provider state persists.
            // So we need to trigger the "enter" phase (stairs up) after navigation.

            setTimeout(() => {
                setIsTransitioning(false);
            }, 500); // Wait a bit for navigation to process
        }, 1000); // Wait for exit animation
    };

    const endTransition = () => {
        setIsTransitioning(false);
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (context === undefined) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
}
