import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { Sparkles, User, Wrench, Shield, Home, RefreshCw, Zap } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    bookings,
    proIsOnline,
    setProIsOnline,
    triggerToast,
  } = useRapidhelp();

  const pendingBookingsForPro = bookings.filter((b) => b.status === 'Pending').length;
  const activeCustomerBookings = bookings.filter(
    (b) => b.status === 'In Progress' || b.status === 'Negotiation' || b.status === 'Confirmed'
  ).length;

  const handleResetData = () => {
    localStorage.removeItem('rapidhelp_categories');
    localStorage.removeItem('rapidhelp_pros');
    localStorage.removeItem('rapidhelp_bookings');
    localStorage.removeItem('rapidhelp_threads');
    window.location.reload();
  };

  return (
    <div className="bg-[#0C1C34] text-white border-b border-white/10 px-4 py-2 text-xs font-medium sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand / Demo Indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#FF7518]/20 text-[#FF7518] font-bold border border-[#FF7518]/30">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>INTERACTIVE PROTOTYPE</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            Switch views to test the two-sided marketplace & live negotiation
          </span>
        </div>

        {/* Center: Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'landing'
                ? 'bg-[#FF7518] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={() => setCurrentView('customer')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'customer'
                ? 'bg-[#FF7518] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer View</span>
            {activeCustomerBookings > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-white rounded-full text-[10px] font-bold">
                {activeCustomerBookings}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('professional')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'professional'
                ? 'bg-[#FF7518] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Pro Dashboard (Ramesh)</span>
            {pendingBookingsForPro > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full text-[10px] font-bold animate-pulse">
                {pendingBookingsForPro} new
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'admin'
                ? 'bg-[#FF7518] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Right: Pro online quick toggle & Reset */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/5">
            <span className="text-[11px] text-slate-400">Pro Status:</span>
            <button
              onClick={() => {
                const next = !proIsOnline;
                setProIsOnline(next);
                triggerToast(
                  'Pro Status Toggled',
                  `Ramesh Sharma is now ${next ? 'Online & accepting jobs' : 'Offline'}`,
                  next ? 'success' : 'warning'
                );
              }}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                proIsOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  proIsOnline ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'
                }`}
              />
              <span>{proIsOnline ? 'Online' : 'Offline'}</span>
            </button>
          </div>

          <button
            onClick={handleResetData}
            title="Reset mock data to initial defaults"
            className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Mock</span>
          </button>
        </div>
      </div>
    </div>
  );
};
