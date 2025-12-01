'use client';

import { Users, Target, Award, Sparkles, ArrowRight, Music, Calendar, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?grayscale&blur=2)' }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
            <span className="block text-white">Experience the</span>
            <span className="block text-[#00963c] mt-2">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Your gateway to the world's most exclusive concerts, festivals, and live events.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-luxury-lg hover:border-[#00963c]/30 transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#00963c]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00963c] transition-colors duration-300">
              <Music className="w-8 h-8 text-[#00963c] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              We envision a world where every live event is an unforgettable memory.
              We strive to connect fans with their favorite artists and creators through
              seamless, secure, and premium ticketing experiences.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-luxury-lg hover:border-[#00963c]/30 transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#00963c]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00963c] transition-colors duration-300">
              <Ticket className="w-8 h-8 text-[#00963c] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              To revolutionize the event industry by providing a platform that prioritizes
              accessibility, security, and the fan experience. We make discovering and
              booking the best events effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-[#00963c]">10k+</div>
              <div className="text-white/60 font-medium uppercase tracking-wider text-sm">Events Hosted</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-[#00963c]">1M+</div>
              <div className="text-white/60 font-medium uppercase tracking-wider text-sm">Tickets Sold</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-[#00963c]">500+</div>
              <div className="text-white/60 font-medium uppercase tracking-wider text-sm">Venues Partnered</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-[#00963c]">4.9/5</div>
              <div className="text-white/60 font-medium uppercase tracking-wider text-sm">Fan Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Viora?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">The principles that power our platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#00963c]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Premium Access</h3>
              <p className="text-white/60">Get exclusive access to VIP packages, early bird tickets, and premium seating options.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#00963c]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fan First</h3>
              <p className="text-white/60">We prioritize the fan experience with transparent pricing and 24/7 support.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#00963c]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Curated Events</h3>
              <p className="text-white/60">Discover the best events in your city, hand-picked by our team of experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#00963c]/20 to-black border border-[#00963c]/30 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready for your next adventure?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Browse thousands of events and secure your spot today.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00963c] text-white font-bold rounded-full hover:bg-[#007a30] transition-all shadow-lg hover:shadow-[#00963c]/50 hover:scale-105"
            >
              Explore Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}