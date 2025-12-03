'use client';

import { useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { Search } from 'lucide-react';

export default function HeroSearch() {
    const [query, setQuery] = useState('');
    const { startTransition } = useTransition();

    const handleSearch = () => {
        if (query.trim()) {
            startTransition(`/events?search=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full max-w-2xl">
            <input
                type="text"
                placeholder="Find & Book Amazing Events"
                className="w-full px-6 py-5 pr-14 text-lg rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00963c]/50 focus:border-[#00963c]/50 focus:bg-white/10 transition-all duration-300 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
                <Search className="h-6 w-6" />
            </button>
        </div>
    );
}
