import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  MapPin,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Wrench,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setActiveCustomerTab,
    customerLocation,
    setCustomerLocation,
    setAuthModalOpen,
    setAuthMode,
    setAuthRole,
  } = useRapidhelp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const locations = [
    'Indiranagar, Bengaluru',
    'Koramangala 4th Block, Bengaluru',
    'HSR Layout Sector 2, Bengaluru',
    'Whitefield Main Road, Bengaluru',
    'BTM Layout 2nd Stage, Bengaluru',
    'Jayanagar 4th Block, Bengaluru',
  ];

  const handleNavClick = (view: 'landing' | 'customer' | 'professional', tab?: string) => {
    setCurrentView(view);
    if (tab && view === 'customer') {
      setActiveCustomerTab(tab);
    }
    setMobileMenuOpen(false);
  };

  const handleOpenAuth = (mode: 'login' | 'register', role: 'customer' | 'professional') => {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] sticky top-9 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Location */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center space-x-2 text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0C1C34] flex items-center justify-center shadow-md shadow-[#0C1C34]/15 group-hover:scale-105 transition-transform">
                {/* Custom Brand Bolt & Wrench geometric icon */}
                <svg
                  viewBox="0 0 32 32"
                  className="w-6 h-6 text-[#FF7518]"
                  fill="currentColor"
                >
                  <path d="M18 3L6 17h8l-2 12 14-16h-9l3-10z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#0C1C34] flex items-center">
                  RAPID<span className="text-[#FF7518]">HELP</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] -mt-1">
                  Find • Book • Get It Done
                </span>
              </div>
            </button>

            {/* Location selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] hover:border-[#FF7518]/50 text-xs text-[#0C1C34] font-medium transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF7518]" />
                <span className="max-w-[160px] truncate">{customerLocation}</span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                    Select Your City / Area
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setCustomerLocation(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F5F7FA] transition-colors ${
                        customerLocation === loc
                          ? 'text-[#FF7518] font-bold bg-[#FF7518]/5'
                          : 'text-[#0C1C34]'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {customerLocation === loc && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7518]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('landing')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'landing'
                  ? 'text-[#FF7518]'
                  : 'text-[#0C1C34] hover:text-[#FF7518]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('customer', 'find-services')}
              className="text-sm font-semibold text-[#0C1C34] hover:text-[#FF7518] transition-colors"
            >
              Explore Services
            </button>

            <a
              href="#how-it-works"
              onClick={(e) => {
                if (currentView !== 'landing') {
                  setCurrentView('landing');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-sm font-semibold text-[#0C1C34] hover:text-[#FF7518] transition-colors"
            >
              How It Works
            </a>

            <button
              onClick={() => handleOpenAuth('register', 'professional')}
              className="text-sm font-semibold text-[#0C1C34] hover:text-[#FF7518] flex items-center space-x-1.5 transition-colors"
            >
              <span>Become a Professional</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold rounded-md">
                Earn ₹50k+
              </span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleOpenAuth('login', 'customer')}
              className="px-4 py-2 text-sm font-semibold text-[#0C1C34] hover:text-[#FF7518] hover:bg-[#F5F7FA] rounded-xl transition-all"
            >
              Login
            </button>

            <button
              onClick={() => handleNavClick('customer', 'find-services')}
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#FF7518] hover:bg-[#E8630A] rounded-xl shadow-md shadow-[#FF7518]/25 hover:shadow-lg hover:shadow-[#FF7518]/35 transition-all flex items-center space-x-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0C1C34] hover:bg-[#F5F7FA] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0C1C34]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="p-3 bg-[#F5F7FA] rounded-xl flex items-center justify-between text-xs font-medium">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF7518]" />
              <span className="text-[#0C1C34] font-semibold">{customerLocation}</span>
            </div>
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="text-[#FF7518] font-bold"
            >
              Change
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('landing')}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#0C1C34] hover:bg-[#F5F7FA]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('customer', 'find-services')}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#0C1C34] hover:bg-[#F5F7FA]"
            >
              Explore Services
            </button>
            <button
              onClick={() => handleNavClick('customer', 'my-bookings')}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#0C1C34] hover:bg-[#F5F7FA]"
            >
              Customer Dashboard
            </button>
            <button
              onClick={() => handleNavClick('professional', 'overview')}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#0C1C34] hover:bg-[#F5F7FA]"
            >
              Professional Dashboard
            </button>
            <button
              onClick={() => handleOpenAuth('register', 'professional')}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#FF7518] hover:bg-[#FF7518]/10"
            >
              Become a Professional
            </button>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col space-y-2">
            <button
              onClick={() => handleOpenAuth('login', 'customer')}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#0C1C34] bg-[#F5F7FA] rounded-xl"
            >
              Customer Login
            </button>
            <button
              onClick={() => handleNavClick('customer', 'find-services')}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-[#FF7518] rounded-xl shadow-md"
            >
              Find Services Near Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
