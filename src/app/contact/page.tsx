'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Ticket, Calendar } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'ticket-support',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. Our support team will respond shortly.');
    setFormData({ name: '', email: '', subject: 'ticket-support', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Partner with <span className="text-[#00963c]">Viora</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Have questions about tickets, hosting an event, or partnerships? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-luxury-lg">
              <h2 className="text-2xl font-bold mb-8 text-white">Support & Inquiries</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-[#00963c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00963c] transition-colors duration-300">
                    <Ticket className="w-6 h-6 text-[#00963c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Box Office Support</h3>
                    <p className="text-white/60 mb-1">Issues with tickets or bookings?</p>
                    <a href="mailto:support@viora.com" className="text-[#00963c] hover:text-white transition-colors font-medium">support@viora.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-[#00963c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00963c] transition-colors duration-300">
                    <Calendar className="w-6 h-6 text-[#00963c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Event Organizers</h3>
                    <p className="text-white/60 mb-1">Want to host an event with us?</p>
                    <a href="mailto:partners@viora.com" className="text-[#00963c] hover:text-white transition-colors font-medium">partners@viora.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-[#00963c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00963c] transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-[#00963c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Headquarters</h3>
                    <p className="text-white/60 mb-1">Come say hello at our office</p>
                    <p className="text-white font-medium">123 Innovation Drive, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-64 overflow-hidden relative group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-100 group-hover:scale-110"
                style={{ backgroundImage: 'url(https://picsum.photos/800/400?grayscale)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-[#00963c] hover:border-[#00963c] transition-all shadow-lg">
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-luxury-lg">
            <h2 className="text-2xl font-bold mb-2 text-white">Send us a Message</h2>
            <p className="text-white/60 mb-8">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00963c] focus:ring-1 focus:ring-[#00963c] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00963c] focus:ring-1 focus:ring-[#00963c] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white/80 ml-1">Subject</label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-[#00963c] focus:ring-1 focus:ring-[#00963c] transition-all"
                  >
                    <option value="ticket-support">Ticket Issue / Support</option>
                    <option value="event-inquiry">Hosting an Event</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="media">Media / Press</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00963c] focus:ring-1 focus:ring-[#00963c] transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#00963c] text-white font-bold rounded-xl hover:bg-[#007a30] transition-all shadow-lg hover:shadow-[#00963c]/30 flex items-center justify-center gap-2 group"
              >
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}