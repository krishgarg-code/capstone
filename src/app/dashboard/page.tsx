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
  Activity,
  Trash,
  MoreVertical
} from 'lucide-react';
import EditProfileModal from '@/components/EditProfileModal';
import DeleteAccountModal from '@/components/DeleteAccountModal';

export default function Dashboard() {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview'); // 'overview', 'tickets', or 'events'

  interface Ticket {
    id: number;
    eventName: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    ticketType: string;
    qrCode: string;
  }

  interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    attendees: number;
    capacity: number;
    images: string[];
    price: number;
    description: string;
  }

  // Mock data for tickets and events
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [events, setEvents] = useState<Event[]>([]);
  const [totalTicketsSold, setTotalTicketsSold] = useState(0);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && !error) {
      // Redirect to login if not authenticated
      router.push('/login');
    }

    if (user) {
      const fetchUserEvents = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/events/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setEvents(data);
          }
        } catch (error) {
          console.error('Error fetching user events:', error);
        }
      };

      const fetchUserTickets = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/tickets/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setTickets(data);
          }
        } catch (error) {
          console.error('Error fetching user tickets:', error);
        }
      };

      const fetchTicketStats = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/tickets/stats/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setTotalTicketsSold(data.totalTickets);
          }
        } catch (error) {
          console.error('Error fetching ticket stats:', error);
        }
      };

      fetchUserEvents();
      fetchUserTickets();
      fetchTicketStats();
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
              {tickets.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                  <Ticket className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No tickets to show</h3>
                  <p className="text-white/50">You haven't purchased any tickets yet.</p>
                  <TransitionLink href="/events" className="inline-block mt-6 px-6 py-2 bg-[#00963c] text-white rounded-lg hover:bg-[#00963c]/80 transition-colors font-medium">
                    Browse Events
                  </TransitionLink>
                </div>
              ) : (
                tickets.map(ticket => (
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
                ))
              )}
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
              {events.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                  <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No events to show</h3>
                  <p className="text-white/50">You haven't created any events yet.</p>
                  <TransitionLink href="/create-event" className="inline-block mt-6 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold shadow-luxury">
                    Create Your First Event
                  </TransitionLink>
                </div>
              ) : (
                events.map(event => (
                  <div key={event.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-luxury hover:border-[#00963c]/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-6 h-6 text-[#00963c]" />
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors text-white/40"
                        title="Delete Event"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
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
                ))
              )}
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
                    {totalTicketsSold}
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

                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00963c]/30 transition-all duration-300 shadow-luxury text-left"
                >
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



  const handleProfileUpdate = () => {
    // Refresh user data (this might require a more robust auth context update, 
    // but for now we can rely on page reload or re-fetching if we had a method)
    // Since useAuth fetches on mount, a reload is simplest, or we can expose a refresh method.
    // Let's try to reload the page for now to ensure all state is fresh.
    window.location.reload();
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setEvents(events.filter(event => event.id !== eventId));
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('An error occurred while deleting the event');
      }
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const response = await fetch(`http://localhost:5001/api/users/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Logout and redirect to home
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        alert('Failed to delete account');
        setIsDeletingAccount(false);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account');
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 bg-black border-r border-white/10 fixed h-full z-20 transition-all duration-300 flex flex-col">
        <TransitionLink href="/" className="p-6 flex items-center justify-center lg:justify-start hover:opacity-80 transition-opacity">
          <span className="text-2xl font-bold tracking-tight text-white">Viora</span>
        </TransitionLink>

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

        <div className="p-4 border-t border-white/10 relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00963c] to-emerald-300 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden shrink-0">
              {user.profile_image ? (
                <img src={user.profile_image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <div className="ml-3 hidden lg:block overflow-hidden flex-1">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-xs text-white/50 truncate">{user.email}</p>
            </div>
            <MoreVertical className="w-4 h-4 text-white/40 hidden lg:block ml-2" />
          </button>

          {/* Profile Menu Popover */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden z-30">
              <button
                onClick={() => {
                  setIsEditProfileOpen(true);
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Edit Profile
              </button>
              <button
                onClick={() => {
                  setIsDeleteAccountOpen(true);
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-white/10"
              >
                <Trash className="w-4 h-4" /> Delete Account
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-72 p-6 md:p-10 lg:p-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
        onUpdate={handleProfileUpdate}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
        onConfirm={handleDeleteAccount}
        isDeleting={isDeletingAccount}
      />
    </div>
  );
}