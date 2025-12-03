'use client';

import React from 'react';
import { X, Ticket, Check } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    eventTitle: string;
    price: number;
    isBooking: boolean;
}

export default function BookingModal({ isOpen, onClose, onConfirm, eventTitle, price, isBooking }: BookingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-[#00963c]" />
                        Confirm Booking
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <p className="text-white/60 mb-2">You are about to book a ticket for:</p>
                        <h3 className="text-2xl font-bold text-white mb-1">{eventTitle}</h3>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/60">Ticket Price</span>
                            <span className="text-white font-bold">₹{price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/60">Booking Fee</span>
                            <span className="text-white font-bold">₹0.00</span>
                        </div>
                        <div className="border-t border-white/10 my-2 pt-2 flex justify-between items-center">
                            <span className="text-white font-bold">Total</span>
                            <span className="text-[#00963c] font-bold text-xl">₹{price}</span>
                        </div>
                    </div>

                    <p className="text-xs text-center text-white/40">
                        By clicking "Confirm Booking", you agree to our terms and conditions.
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                        disabled={isBooking}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-black bg-white hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        disabled={isBooking}
                    >
                        {isBooking ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                Confirm Booking
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
