'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';
import { generateSlug } from '@/lib/utils';
import { events as allEvents } from '@/lib/data';
import {
  LayoutDashboard,
  Ticket,
  Calendar,
  LogOut,
  User,
  Settings,
  Plus,
  CreditCard,
  MapPin,
  Clock,
  QrCode,
  ChevronRight,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview'); // 'overview', 'tickets', or 'events'

  // Mock data for tickets and events
  const [tickets, setTickets] = useState([
    {
      id: 1,
      eventName: "Summer Music Festival",
      date: "2023-07-15",
      time: "19:00",
      venue: "Central Park Amphitheater",
      status: "Confirmed",
      ticketType: "VIP Pass",
      qrCode: "#123456"
    },
    {
      id: 2,
      eventName: "Art Exhibition Premiere",
      date: "2023-08-22",
      time: "18:30",
      venue: "Modern Art Gallery",
      status: "Pending",
      ticketType: "General Admission",
      qrCode: "#789012"
    },
    {
      id: 3,
      eventName: "Tech Conference 2023",
      date: "2023-09-05",
      time: "09:00",
      venue: "Convention Center",
      status: "Confirmed",
      ticketType: "Early Bird",
      qrCode: "#345678"
    },
    {
      id: 4,
      eventName: "Jazz Night at Blue Note",
      date: "2023-07-20",
      time: "20:00",
      venue: "Blue Note Jazz Club",
      status: "Confirmed",
      ticketType: "Balcony Seat",
      qrCode: "#901234"
    },
    {
      id: 5,
      eventName: "Wine Tasting Experience",
      date: "2023-08-15",
      time: "17:30",
      venue: "Vineyard Estate",
      status: "Confirmed",
      ticketType: "Premium Package",
      qrCode: "#567890"
    }
  ]);

  const [events, setEvents] = useState(allEvents);

  useEffect(() => {
    if (!loading && !user && !error) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [user, loading, error, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00963c] mx-auto"></div>
          <p className="mt-4 text-white/60 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-luxury-lg p-10 max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/60 mb-8">
            You need to be logged in to view this page.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 text-base font-bold rounded-xl text-black bg-white hover:bg-gray-200 transition-all duration-300 shadow-luxury"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Function to render the main content based on active section
  const renderMainContent = () => {
    switch (activeSection) {
      case 'tickets':
        return (
          <div className="animate-fade-in-up">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">My Tickets</h1>
                <p className="text-white/60">View and manage all your event tickets</p>
              </div>
              <TransitionLink href="/events" className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#00963c]/10 text-[#00963c] rounded-lg hover:bg-[#00963c]/20 transition-colors font-medium">
                <Plus className="w-4 h-4" /> Add Ticket
              </TransitionLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map(ticket => (
                <div key={ticket.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Ticket className="w-6 h-6 text-[#00963c]" />
                    </div>
                    {/* Ticket Type removed */}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{ticket.eventName}</h3>

                  <div className="space-y-3 text-white/60 mb-6 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#00963c]" />
                      <span>{new Date(ticket.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#00963c]" />
                      <span>{ticket.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#00963c]" />
                      <span className="truncate">{ticket.venue}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      {/* QR Code removed */}
                    </div>
                    <TransitionLink
                      href={`/events/${generateSlug(ticket.eventName)}`}
                      className="flex items-center gap-1 text-sm font-bold text-white hover:text-[#00963c] transition-colors"
                    >
                      Details <ChevronRight className="w-4 h-4" />
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="animate-fade-in-up">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">My Events</h1>
                <p className="text-white/60">Manage events you've created</p>
              </div>
              <TransitionLink href="/create-event" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold shadow-luxury">
                <Plus className="w-4 h-4" /> Create Event
              </TransitionLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-[#00963c]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{event.title}</h3>

                  <div className="space-y-3 text-white/60 mb-6 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#00963c]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#00963c]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#00963c]" />
                      <span>{event.attendees}/{event.capacity} Attendees</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <TransitionLink
                      href={`/create-event?edit=${event.id}`}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
                    >
                      Edit
                    </TransitionLink>
                    <TransitionLink
                      href={`/events/${generateSlug(event.title)}`}
                      className="flex-1 px-3 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-luxury text-center"
                    >
                      View
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // overview
        return (
          <div className="animate-fade-in-up">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                Welcome back, <span className="text-[#00963c]">{user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/60 text-lg">Here's what's happening with your events today.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Ticket className="w-6 h-6 text-[#00963c]" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-white/60 font-medium mb-1">Total Tickets</div>
                  <div className="text-4xl font-bold text-white mb-2">{tickets.length}</div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-[#00963c]" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-white/60 font-medium mb-1">Active Events</div>
                  <div className="text-4xl font-bold text-white mb-2">{events.length}</div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-[#00963c]" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-white/60 font-medium mb-1">Total Attendees</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {events.reduce((acc, event) => acc + event.attendees, 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TransitionLink href="/events" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00963c]/30 transition-all duration-300 shadow-luxury text-left">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Ticket className="w-6 h-6 text-[#00963c]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1">Buy Tickets</h3>
                  <p className="text-white/50 text-sm">Browse and purchase event tickets</p>
                </TransitionLink>

                <TransitionLink href="/create-event" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00963c]/30 transition-all duration-300 shadow-luxury text-left">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-6 h-6 text-[#00963c]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1">Create Event</h3>
                  <p className="text-white/50 text-sm">Start planning your own event</p>
                </TransitionLink>

                <button className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00963c]/30 transition-all duration-300 shadow-luxury text-left">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-6 h-6 text-[#00963c]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1">Edit Profile</h3>
                  <p className="text-white/50 text-sm">Update your personal information</p>
                </button>

                {/* Settings card removed */}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 bg-black border-r border-white/10 fixed h-full z-20 transition-all duration-300 flex flex-col">
        <div className="p-6 flex items-center justify-center lg:justify-start">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span className="text-black font-bold text-xl">V</span>
          </div>
          <span className="ml-3 text-2xl font-bold tracking-tight hidden lg:block">Viora</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${activeSection === 'overview'
              ? 'bg-[#00963c] text-white shadow-[0_0_20px_rgba(0,150,60,0.4)]'
              : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
          >
            <LayoutDashboard className="w-6 h-6 min-w-[24px]" />
            <span className="ml-3 font-medium hidden lg:block">Overview</span>
          </button>

          <button
            onClick={() => setActiveSection('tickets')}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${activeSection === 'tickets'
              ? 'bg-[#00963c] text-white shadow-[0_0_20px_rgba(0,150,60,0.4)]'
              : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
          >
            <Ticket className="w-6 h-6 min-w-[24px]" />
            <span className="ml-3 font-medium hidden lg:block">My Tickets</span>
          </button>

          <button
            onClick={() => setActiveSection('events')}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${activeSection === 'events'
              ? 'bg-[#00963c] text-white shadow-[0_0_20px_rgba(0,150,60,0.4)]'
              : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
          >
            <Calendar className="w-6 h-6 min-w-[24px]" />
            <span className="ml-3 font-medium hidden lg:block">My Events</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00963c] to-emerald-300 flex items-center justify-center text-white font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3 hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-xs text-white/50 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-72 p-6 md:p-10 lg:p-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}