'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';
import { generateSlug } from '@/lib/utils';
import { events } from '@/lib/data';
import { Search, Calendar, Filter, MapPin, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventsPage() {
  // Banner carousel state
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
      id: 1,
      title: "Summer Music Festival",
      subtitle: "Experience the ultimate musical journey",
      image: "https://picsum.photos/1200/400?grayscale&random=1",
    },
    {
      id: 2,
      title: "Art Exhibition Premiere",
      subtitle: "Discover contemporary masterpieces",
      image: "https://picsum.photos/1200/400?grayscale&random=2",
    },
    {
      id: 3,
      title: "Luxury Wine Tasting",
      subtitle: "Indulge in premium vintages",
      image: "https://picsum.photos/1200/400?grayscale&random=3",
    },
  ];

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
  });

  // Auto-advance banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Immersive Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-[10000ms]"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
            </div>
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
              <span className="block text-white">Discover Extraordinary</span>
              <span className="block text-[#00963c] mt-2">Events & Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Curated selection of the most exclusive gatherings, performances, and celebrations.
            </p>
          </div>
        </div>

        {/* Banner Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentBanner ? 'bg-[#00963c] w-8' : 'bg-white/30 w-4 hover:bg-white/50'
                }`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        {/* Horizontal Filter Bar */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-luxury-xl mb-16">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, artists, or venues..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#00963c]/50 focus:ring-1 focus:ring-[#00963c]/50 transition-all"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <div className="relative min-w-[140px]">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <select
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-8 text-white focus:outline-none focus:border-[#00963c]/50 transition-all cursor-pointer"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                >
                  <option value="">Any Date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="weekend">This Weekend</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-white/10 pl-2">
                  <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="relative min-w-[160px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <select
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-8 text-white focus:outline-none focus:border-[#00963c]/50 transition-all cursor-pointer"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="music">Music</option>
                  <option value="tech">Tech</option>
                  <option value="comedy">Comedy</option>
                  <option value="sports">Sports</option>
                  <option value="meetup">Meetup</option>
                  <option value="festival">Festival</option>
                  <option value="theatre-arts">Theatre / Arts</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-white/10 pl-2">
                  <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Events Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Upcoming Events</h2>
            <p className="text-white/60">Explore the best events happening around you</p>
          </div>
          <div className="hidden md:flex gap-2">
            {/* View toggle removed */}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <TransitionLink
              href={`/events/${generateSlug(event.title)}`}
              key={event.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00963c]/50 hover:shadow-[0_0_30px_-10px_rgba(0,150,60,0.3)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badges Removed */}

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                  <span className="text-white font-bold">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[#00963c] text-sm font-medium mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                  <span>{event.time}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00963c] transition-colors line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-white/60 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    {/* Location removed */}
                  </div>

                  <span className="flex items-center gap-2 text-white font-medium group-hover:translate-x-1 transition-transform">
                    Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>

        {/* Load More */}
        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-[#00963c] text-white font-bold flex items-center justify-center shadow-luxury">1</button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center">2</button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center">3</button>
            <span className="text-white/50">...</span>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center">8</button>
          </div>
          <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}