import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  X,
  User,
  Wrench,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    authRole,
    setAuthRole,
    setCurrentView,
    triggerToast,
  } = useRapidhelp();

  const [formData, setFormData] = useState({
    name: 'Aakash Verma',
    email: 'aakash.v@example.com',
    phone: '+91 98200 45678',
    password: 'password123',
    tradeCategory: 'Electrician',
    experienceYears: '5',
    idType: 'Aadhaar Card + Trade Certificate',
    location: 'Indiranagar, Bengaluru',
  });

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthModalOpen(false);

    if (authRole === 'customer') {
      setCurrentView('customer');
      triggerToast(
        `Welcome ${authMode === 'login' ? 'back' : ''}, ${formData.name}!`,
        'Logged in as Customer. Browse nearby professionals and book anytime.',
        'success'
      );
    } else {
      setCurrentView('professional');
      triggerToast(
        `Welcome ${authMode === 'login' ? 'back' : ''}, Partner!`,
        'Logged into Professional Provider Portal. Ramesh Sharma profile active.',
        'success'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E8F0] relative">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-slate-200 flex items-center justify-center text-[#64748B] hover:text-[#0C1C34] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#0C1C34] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#FF7518]/10 rounded-full blur-2xl" />
          <div className="w-12 h-12 rounded-2xl bg-[#FF7518]/20 border border-[#FF7518]/30 flex items-center justify-center mx-auto mb-3 text-[#FF7518]">
            {authRole === 'customer' ? <User className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome Back to Rapidhelp' : 'Create Your Rapidhelp Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {authRole === 'customer'
              ? 'Find and book certified local experts near you'
              : 'Join 10,000+ certified service technicians & grow your earnings'}
          </p>

          {/* Role Toggle Selector */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-white/10 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthRole('customer')}
              className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                authRole === 'customer' ? 'bg-[#FF7518] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>I am a Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthRole('professional')}
              className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                authRole === 'professional' ? 'bg-[#FF7518] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>I am a Professional</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#0C1C34] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0C1C34] mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1C34] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
              />
            </div>
          </div>

          {authRole === 'professional' && authMode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0C1C34] mb-1">Primary Skill</label>
                <select
                  value={formData.tradeCategory}
                  onChange={(e) => setFormData({ ...formData, tradeCategory: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518] bg-white"
                >
                  <option value="Electrician">Electrician</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="Appliance Repair">Appliance Repair</option>
                  <option value="Vehicle Mechanic">Vehicle Mechanic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1C34] mb-1">Experience</label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518] bg-white"
                >
                  <option value="2">2+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="8">8+ Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0C1C34] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill hint */}
          <div className="p-2.5 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
            <span>Demo Mode: Instant login with prefilled credentials</span>
            <span className="font-semibold text-emerald-600">✓ Ready</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold rounded-xl shadow-md shadow-[#FF7518]/25 hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
          >
            <span>{authMode === 'login' ? 'Sign In to Account' : 'Create Rapidhelp Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Toggle Login / Register */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-[#64748B] hover:text-[#0C1C34] font-medium"
            >
              {authMode === 'login' ? (
                <>
                  Don't have an account? <span className="text-[#FF7518] font-bold">Register free</span>
                </>
              ) : (
                <>
                  Already registered? <span className="text-[#FF7518] font-bold">Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
