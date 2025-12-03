'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';
import { Calendar, MapPin, Clock, Globe, Users, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import BookingSuccessModal from '@/components/BookingSuccessModal';
import AuthRequiredModal from '@/components/AuthRequiredModal';
import { useAuth } from '@/lib/useAuth';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log('Slug from params:', slug); // Debug log
      if (slug) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/events/${slug}`;
          console.log('Fetching URL:', url); // Debug log
          const response = await fetch(url);
          console.log('Response status:', response.status); // Debug log

          if (response.ok) {
            const data = await response.json();
            console.log('Event data received:', data); // Debug log
            setEvent(data);
          } else {
            console.error('Event not found');
            // router.push('/events'); // Comment out redirect for debugging
          }
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      }
    };

    fetchEvent();
  }, [slug, router]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();

  const handleBookClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!user) return;
    setIsBooking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: event.id,
        }),
      });

      if (response.ok) {
        // Success
        setIsBookingModalOpen(false);
        setIsSuccessModalOpen(true);
        // alert('Ticket booked successfully! Check your dashboard.');
        // router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Failed to book ticket. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00963c] mx-auto"></div>
          <p className="mt-4 text-white/70">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute top-6 left-0 w-full px-4 md:px-8 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full transition-all hover:bg-black/50"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Status and Category removed */}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">{event.title}</h1>
                <div className="flex items-center gap-2 text-white/80 text-lg">
                  <MapPin className="w-5 h-5 text-[#00963c]" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-md border transition-all ${isLiked
                    ? 'bg-red-500/20 border-red-500/50 text-red-500'
                    : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                {/* Share button removed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-12">

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#00963c] rounded-full"></span>
                About This Event
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                {event.description}
              </p>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#00963c] rounded-full"></span>
                Event Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden border border-white/10 shadow-luxury group cursor-pointer ${idx === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Details Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#00963c] rounded-full"></span>
                Key Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-[#00963c]/20 rounded-lg text-[#00963c]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Audience</h3>
                    <p className="text-white/60">{event.audience}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-[#00963c]/20 rounded-lg text-[#00963c]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Language</h3>
                    <p className="text-white/60">{event.language}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-[#00963c]/20 rounded-lg text-[#00963c]">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Venue Type</h3>
                    <p className="text-white/60">{event.venue_type}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-[#00963c]/20 rounded-lg text-[#00963c]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Capacity</h3>
                    <p className="text-white/60">{event.attendees} / {event.capacity} Attendees</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-luxury-lg">
                <div className="flex justify-between items-end mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Price per person</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">
                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${event.capacity > event.attendees
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                    }`}>
                    {event.capacity > event.attendees ? 'Available' : 'Sold Out'}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="w-5 h-5 text-[#00963c]" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Clock className="w-5 h-5 text-[#00963c]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-[#00963c]" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookClick}
                  disabled={event.capacity <= event.attendees}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all shadow-luxury mb-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {event.capacity <= event.attendees ? 'Sold Out' : 'Book Now'}
                </button>
                <p className="text-center text-white/40 text-sm">
                  No credit card required for reservation
                </p>
              </div>

              <div className="bg-[#00963c]/10 border border-[#00963c]/20 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Need Help?</h3>
                <p className="text-white/70 text-sm mb-4">
                  Contact our support team for any questions about this event.
                </p>
                <TransitionLink href="/contact" className="text-[#00963c] font-medium hover:text-[#00963c]/80 transition-colors text-sm inline-block">
                  Contact Support →
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleConfirmBooking}
        eventTitle={event.title}
        price={event.price}
        isBooking={isBooking}
      />

      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}