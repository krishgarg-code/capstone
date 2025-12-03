'use client';

import React, { useState, useRef } from 'react';
import { X, User, Camera, Save } from 'lucide-react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onUpdate: () => void;
}

export default function EditProfileModal({ isOpen, onClose, user, onUpdate }: EditProfileModalProps) {
    const [name, setName] = useState(user?.name || '');
    const [age, setAge] = useState(user?.age || '');
    const [city, setCity] = useState(user?.city || '');
    const [state, setState] = useState(user?.state || '');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profile_image || null);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('city', city);
        formData.append('state', state);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/users/${user.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                onUpdate();
                onClose();
            } else {
                const error = await response.json();
                alert(`Failed to update profile: ${error.error}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-[#00963c]" />
                        Edit Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#00963c] bg-white/5">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/40">
                                        <User className="w-10 h-10" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <p className="mt-2 text-sm text-white/40">Click to change photo</p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00963c] transition-colors"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Age Input */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00963c] transition-colors"
                            placeholder="Enter your age"
                        />
                    </div>

                    {/* City Input */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00963c] transition-colors"
                            placeholder="Enter your city"
                        />
                    </div>

                    {/* State Input */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00963c] transition-colors"
                            placeholder="Enter your state"
                        />
                    </div>

                    {/* Footer */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-black bg-white hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
