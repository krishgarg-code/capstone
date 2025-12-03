'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Image as ImageIcon,
    X,
    Upload,
    IndianRupee,
    Type,
    AlignLeft,
    Layers,
    Globe,
    Users,
    Building2,
    Hash,
    ArrowLeft
} from 'lucide-react';

function CreateEventContent() {
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { user } = useAuth();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const [isLoading, setIsLoading] = useState(false);

    // Form refs for pre-filling
    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLInputElement>(null);
    const venueTypeRef = useRef<HTMLInputElement>(null);
    const audienceRef = useRef<HTMLSelectElement>(null);
    const capacityRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editId) {
            setIsLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/events/user/${user?.id}`)
                .then(res => res.json())
                .then(events => {
                    const event = events.find((e: any) => e.id.toString() === editId);
                    if (event) {
                        // Pre-fill form
                        if (titleRef.current) titleRef.current.value = event.title;
                        if (dateRef.current) dateRef.current.value = new Date(event.date).toISOString().split('T')[0];
                        if (timeRef.current) timeRef.current.value = event.time;
                        if (locationRef.current) locationRef.current.value = event.location;
                        if (categoryRef.current) categoryRef.current.value = event.category || '';
                        if (priceRef.current) priceRef.current.value = event.price;
                        if (languageRef.current) languageRef.current.value = event.language || '';
                        if (venueTypeRef.current) venueTypeRef.current.value = event.venue_type || '';
                        if (audienceRef.current) audienceRef.current.value = event.audience || '';
                        if (capacityRef.current) capacityRef.current.value = event.capacity || '';
                        if (descriptionRef.current) descriptionRef.current.value = event.description;

                        // Set images
                        if (event.images) {
                            setImages(event.images);
                        }
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching event:', err);
                    setIsLoading(false);
                });
        }
    }, [editId, user]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
        }
    };

    const handleFiles = (newFiles: File[]) => {
        if (images.length + newFiles.length > 3) {
            alert('You can only upload a maximum of 3 images.');
            return;
        }

        const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImageUrls]);
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeImage = (index: number) => {
        const imageToRemove = images[index];
        if (imageToRemove.startsWith('blob:')) {
            // It's a new file.
            // Count how many new files are before this index.
            let newFilesBefore = 0;
            for (let i = 0; i < index; i++) {
                if (images[i].startsWith('blob:')) newFilesBefore++;
            }
            setFiles(prev => prev.filter((_, i) => i !== newFilesBefore));
        }

        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // Append new images
        files.forEach(file => {
            formData.append('images', file);
        });

        // Append existing images
        const existingImages = images.filter(img => !img.startsWith('blob:'));
        existingImages.forEach(img => {
            formData.append('existingImages', img);
        });

        // Append user ID if available
        if (user && user.id) {
            formData.append('userId', user.id.toString());
        }

        try {
            const url = editId
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/events/${editId}`
                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/events`;

            const method = editId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.ok) {
                router.push('/events');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || errorData.error}`);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Ambient Glow - Green instead of Purple */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#00963c]/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Back</span>
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        {editId ? 'Edit Event' : 'Create New Event'}
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {editId ? 'Update your event details below.' : 'Curate an unforgettable experience. Fill in the details below to launch your premium event.'}
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Event Title */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                <Type className="w-4 h-4 mr-2 text-[#00963c]" />
                                Event Title
                            </label>
                            <input
                                ref={titleRef}
                                name="title"
                                type="text"
                                required
                                placeholder="e.g. Midnight Jazz Gala"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 text-lg"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Calendar className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Date
                                </label>
                                <input
                                    ref={dateRef}
                                    name="date"
                                    type="date"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 [color-scheme:dark]"
                                />
                            </div>

                            {/* Time */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Calendar className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Time
                                </label>
                                <input
                                    ref={timeRef}
                                    name="time"
                                    type="time"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                <MapPin className="w-4 h-4 mr-2 text-[#00963c]" />
                                Location
                            </label>
                            <input
                                ref={locationRef}
                                name="location"
                                type="text"
                                required
                                placeholder="Venue or Address"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Layers className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Category
                                </label>
                                <div className="relative">
                                    <select ref={categoryRef} name="category" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 appearance-none">
                                        <option value="" disabled selected>Select a category</option>
                                        <option value="music">Music</option>
                                        <option value="tech">Tech</option>
                                        <option value="comedy">Comedy</option>
                                        <option value="sports">Sports</option>
                                        <option value="meetup">Meetup</option>
                                        <option value="festival">Festival</option>
                                        <option value="theatre-arts">Theatre / Arts</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <IndianRupee className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Price
                                </label>
                                <input
                                    ref={priceRef}
                                    name="price"
                                    type="number"
                                    required
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* New Fields Row 1: Language & Venue Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Language */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Globe className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Language
                                </label>
                                <input
                                    ref={languageRef}
                                    name="language"
                                    type="text"
                                    placeholder="e.g. English, Spanish"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300"
                                />
                            </div>

                            {/* Venue Type */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Building2 className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Venue Type
                                </label>
                                <input
                                    ref={venueTypeRef}
                                    name="venueType"
                                    type="text"
                                    placeholder="e.g. Indoor, Outdoor, Stadium"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* New Fields Row 2: Audience & Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Audience */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Users className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Audience
                                </label>
                                <div className="relative">
                                    <select ref={audienceRef} name="audience" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 appearance-none">
                                        <option value="" disabled selected>Select audience type</option>
                                        <option value="all-ages">All Ages</option>
                                        <option value="18+">18+</option>
                                        <option value="21+">21+</option>
                                        <option value="kids">Kids & Family</option>
                                        <option value="seniors">Seniors</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Capacity */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                    <Hash className="w-4 h-4 mr-2 text-[#00963c]" />
                                    Capacity
                                </label>
                                <input
                                    ref={capacityRef}
                                    name="capacity"
                                    type="number"
                                    placeholder="e.g. 500"
                                    min="1"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                <AlignLeft className="w-4 h-4 mr-2 text-[#00963c]" />
                                Description
                            </label>
                            <textarea
                                ref={descriptionRef}
                                name="description"
                                required
                                rows={4}
                                placeholder="Describe your event..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 transition-all duration-300 resize-none"
                            />
                            <div className="text-right text-xs text-gray-500">0/500 characters</div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="flex items-center text-sm font-medium text-gray-300 ml-1">
                                <ImageIcon className="w-4 h-4 mr-2 text-[#00963c]" />
                                Event Images (Max 3)
                            </label>

                            <div
                                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragging
                                    ? 'border-[#00963c] bg-[#00963c]/10'
                                    : 'border-white/10 hover:border-white/20 bg-black/20'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {images.length < 3 ? (
                                    <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <p className="text-gray-300 font-medium mb-1">Click to upload or drag and drop</p>
                                        <p className="text-gray-500 text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileInput}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-yellow-400">Maximum limit of 3 images reached</p>
                                )}
                            </div>

                            {/* Image Previews */}
                            <AnimatePresence>
                                {images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        {images.map((img, index) => (
                                            <motion.div
                                                key={img}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="relative aspect-video rounded-xl overflow-hidden group border border-white/10"
                                            >
                                                <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors duration-300 shadow-lg shadow-white/10 text-lg tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (editId ? 'Updating Event...' : 'Creating Event...') : (editId ? 'Update Event' : 'Create Event')}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default function CreateEventPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00963c]"></div>
            </div>
        }>
            <CreateEventContent />
        </Suspense>
    );
}
