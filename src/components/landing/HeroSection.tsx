import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Zap,
  Sparkles,
  Award,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    setCurrentView,
    setActiveCustomerTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    customerLocation,
    setCustomerLocation,
    setAuthModalOpen,
    setAuthMode,
    setAuthRole,
  } = useRapidhelp();

  const [inputSearch, setInputSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(customerLocation);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputSearch.trim()) {
      setSearchQuery(inputSearch.trim());
    }
    setCurrentView('customer');
    setActiveCustomerTab('find-services');
  };

  const handleQuickCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setCurrentView('customer');
    setActiveCustomerTab('find-services');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#FF7518]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-96 h-96 bg-[#0C1C34]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0C1C34]/5 border border-[#0C1C34]/10 text-xs font-bold text-[#0C1C34]">
              <span className="w-2 h-2 rounded-full bg-[#FF7518] animate-ping" />
              <span className="text-[#FF7518]">HYPERLOCAL ON-DEMAND PLATFORM</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#64748B]">Blinkit-speed Home Services</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0C1C34] tracking-tight leading-[1.12]">
              Your Local Help, <br />
              <span className="text-[#FF7518]">Just a Click Away.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
              Find trusted professionals around you, compare prices, book instantly, and get your work
              done without the hassle. Transparent quotes, verified pros, and arrival in 15–30 minutes.
            </p>

            {/* Interactive Search Bar Box */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl shadow-slate-200/70 border border-[#E2E8F0] max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
                {/* Location Picker */}
                <div className="flex items-center space-x-2 px-3 py-2.5 bg-[#F5F7FA] rounded-2xl sm:w-1/3 border border-[#E2E8F0]/60">
                  <MapPin className="w-4 h-4 text-[#FF7518] shrink-0" />
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setCustomerLocation(e.target.value);
                    }}
                    placeholder="Location"
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0C1C34] focus:outline-none"
                  />
                </div>

                {/* Service Query Input */}
                <div className="flex items-center space-x-2 px-3 py-2.5 bg-[#F5F7FA] rounded-2xl flex-1 border border-[#E2E8F0]/60">
                  <Search className="w-4 h-4 text-[#64748B] shrink-0" />
                  <input
                    type="text"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder="E.g., Electrician, AC repair, Tap leak..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#0C1C34] placeholder-[#64748B] focus:outline-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold text-sm rounded-2xl shadow-md shadow-[#FF7518]/30 hover:shadow-lg transition-all flex items-center justify-center space-x-2 group shrink-0"
                >
                  <span>Find Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Popular quick tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#E2E8F0]/60 text-xs">
                <span className="text-[#64748B] font-medium mr-1">Trending:</span>
                {['Electrician', 'AC Repair', 'Plumbing', 'Carpenter', 'Home Cleaning'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickCategoryClick(tag.toLowerCase().replace(/\s+/g, '-'))}
                    className="px-2.5 py-1 rounded-lg bg-[#F5F7FA] hover:bg-[#FF7518]/10 hover:text-[#FF7518] text-[#0C1C34] font-medium transition-colors border border-slate-200/60"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary CTA & Pro onboarding link */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => {
                  setAuthRole('professional');
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl border-2 border-[#0C1C34] text-[#0C1C34] hover:bg-[#0C1C34] hover:text-white font-bold text-sm transition-all shadow-sm"
              >
                <Wrench className="w-4 h-4 text-[#FF7518]" />
                <span>Become a Professional</span>
              </button>

              <div className="flex items-center space-x-2 text-xs font-semibold text-[#64748B]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero platform commission during beta</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0C1C34]">10,000+</div>
                  <div className="text-[11px] text-[#64748B]">Verified Pros</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0C1C34]">4.9 / 5.0</div>
                  <div className="text-[11px] text-[#64748B]">Customer Rating</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0C1C34]">15–30 Mins</div>
                  <div className="text-[11px] text-[#64748B]">Doorstep ETA</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0C1C34]">100%</div>
                  <div className="text-[11px] text-[#64748B]">Price Protected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Attractive High-Tech Visual Illustration & Hero Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card Container */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E2E8F0] relative overflow-hidden">
                {/* Header Mockup Banner */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-[#64748B] ml-2">Rapidhelp Live Dispatch</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Nearby
                  </span>
                </div>

                {/* Hero Illustration Graphic */}
                <div className="my-5 rounded-2xl bg-gradient-to-br from-[#0C1C34] to-[#162B4E] p-6 text-white relative overflow-hidden shadow-inner">
                  <div className="absolute right-0 top-0 opacity-15">
                    <svg width="240" height="240" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
                      <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="2" fill="none" />
                      <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  {/* Customer & Technician Connection Scene */}
                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                        alt="Customer"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                      />
                      <div>
                        <div className="text-xs text-slate-300">Customer</div>
                        <div className="text-sm font-bold text-white">Aakash V.</div>
                        <div className="text-[10px] text-emerald-400 font-medium">Bellandur, Blr</div>
                      </div>
                    </div>

                    {/* Animated Connection Arrow */}
                    <div className="flex flex-col items-center px-2">
                      <span className="text-[10px] text-[#FF7518] font-bold tracking-wider uppercase mb-1">
                        1.2 km away
                      </span>
                      <div className="w-16 h-1 bg-white/20 rounded-full relative overflow-hidden">
                        <div className="w-8 h-full bg-[#FF7518] rounded-full animate-pulse" />
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">12 min ETA</span>
                    </div>

                    <div className="flex items-center space-x-3 text-right">
                      <div>
                        <div className="text-xs text-slate-300">Verified Pro</div>
                        <div className="text-sm font-bold text-white">Ramesh S.</div>
                        <div className="text-[10px] text-[#FF7518] font-semibold">Electrician (4.9 ★)</div>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80"
                        alt="Ramesh Sharma"
                        className="w-12 h-12 rounded-full border-2 border-[#FF7518] shadow-md object-cover"
                      />
                    </div>
                  </div>

                  {/* Simulated Live Route Progress */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF7518]" />
                        MCB & Wiring Inspection
                      </span>
                      <span className="font-bold text-emerald-400">₹549 Agreed</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FF7518] h-full w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-300 mt-1">
                      <span>Booking Confirmed</span>
                      <span>En Route (Arriving Soon)</span>
                    </div>
                  </div>
                </div>

                {/* Floating Testimonial Pill 1 */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-[#E2E8F0] flex items-center space-x-2 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#0C1C34]">Price Negotiated & Locked</div>
                    <div className="text-[9px] text-[#64748B]">Zero hidden charges</div>
                  </div>
                </div>

                {/* Floating Testimonial Pill 2 */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-[#E2E8F0] flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#FF7518]/15 flex items-center justify-center text-[#FF7518] font-bold">
                    ⚡
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#0C1C34]">Blinkit-Style Hyperlocal</div>
                    <div className="text-[9px] text-[#64748B]">Real-time GPS tracking</div>
                  </div>
                </div>

                {/* Bottom Quick Action in Hero Card */}
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="w-full py-2.5 mt-2 rounded-xl bg-[#F5F7FA] hover:bg-[#FF7518]/10 text-[#0C1C34] hover:text-[#FF7518] text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border border-[#E2E8F0]"
                >
                  <span>Explore 500+ Verified Pros in Bengaluru</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
