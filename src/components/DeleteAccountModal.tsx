'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirm, isDeleting }: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111] border border-red-500/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-red-900/20"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-red-500/5">
                        <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Delete Account
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/40 hover:text-white transition-colors"
                            disabled={isDeleting}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Are you sure?</h3>
                            <p className="text-white/60">
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Account'
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                disabled={isDeleting}
                                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
