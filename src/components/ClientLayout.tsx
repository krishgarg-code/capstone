'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './Preloader';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for the preloader animation to finish
        // The preloader takes roughly 2-2.5 seconds based on the word sequence
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>
            {children}
        </>
    );
}
