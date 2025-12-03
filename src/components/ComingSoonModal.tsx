'use client';

import React from 'react';
import { X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#00963c]" />
                            Coming Soon
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-[#00963c]/10 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-8 h-8 text-[#00963c]" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Stay Tuned!</h3>
                            <p className="text-white/60">
                                We are currently working on our social media presence. Follow us for updates coming very soon.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 rounded-xl font-bold text-black bg-white hover:bg-gray-200 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
