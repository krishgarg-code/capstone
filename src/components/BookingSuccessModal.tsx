'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from '@/context/TransitionContext';

interface BookingSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingSuccessModal({ isOpen, onClose }: BookingSuccessModalProps) {
    const router = useRouter();
    const { startTransition } = useTransition();

    if (!isOpen) return null;

    const handleDashboardClick = () => {
        onClose();
        startTransition('/dashboard');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative bg-[#111] border-2 border-[#00963c] rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,150,60,0.5)]"
                >
                    {/* Graffiti Background Effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')]" />
                    </div>

                    <div className="relative p-8 flex flex-col items-center text-center">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 bg-[#00963c] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_#00963c]"
                        >
                            <PartyPopper className="w-12 h-12 text-black" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic" style={{ textShadow: '4px 4px 0px #00963c' }}>
                            HURRAY!
                        </h2>

                        <div className="space-y-2 mb-8 transform -rotate-2">
                            <p className="text-2xl font-bold text-[#00963c] uppercase tracking-widest">
                                Booking Confirmed!
                            </p>
                            <p className="text-xl text-white font-medium">
                                Wishing you an amazing time!
                            </p>
                            <p className="text-lg text-white/60 italic">
                                Enjoy your event!
                            </p>
                        </div>

                        <button
                            onClick={handleDashboardClick}
                            className="w-full py-4 px-6 rounded-xl font-black text-xl text-black bg-[#00963c] hover:bg-[#00b347] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,150,60,0.4)] uppercase tracking-wider"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
