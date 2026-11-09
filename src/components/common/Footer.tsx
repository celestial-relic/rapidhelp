import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveCustomerTab, setAuthModalOpen, setAuthMode, setAuthRole } =
    useRapidhelp();

  return (
    <footer className="bg-[#0C1C34] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <svg viewBox="0 0 32 32" className="w-5 h-5 text-[#FF7518]" fill="currentColor">
                  <path d="M18 3L6 17h8l-2 12 14-16h-9l3-10z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center">
                  RAPID<span className="text-[#FF7518]">HELP</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                  Find • Book • Get It Done
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Hyperlocal on-demand service marketplace connecting homeowners and businesses with
              vetted, background-verified technicians and service experts in 15–30 minutes.
            </p>

            {/* Social Links using Clean SVGs */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF7518] flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                aria-label="Twitter X"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF7518] flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF7518] flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center space-x-2 pt-1 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Professionals & Payment Protection</span>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Popular Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Electrician On-Demand
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Emergency Plumbing Fix
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  AC Jet Foam Servicing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Carpenter & Furniture Assembly
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Deep Home Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    setActiveCustomerTab('find-services');
                  }}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Vehicle Breakdown Mechanic
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Professionals & Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">For Providers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setAuthRole('professional');
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="hover:text-[#FF7518] flex items-center space-x-1 transition-colors"
                >
                  <span>Join as a Partner</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7518]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('professional')}
                  className="hover:text-[#FF7518] transition-colors"
                >
                  Provider Dashboard
                </button>
              </li>
              <li>
                <span className="text-slate-500">Partner Guidelines</span>
              </li>
              <li>
                <span className="text-slate-500">Safety Standards</span>
              </li>
              <li>
                <span className="text-slate-500">Earnings Guarantee</span>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-xs text-slate-400 hover:text-white pt-2 font-mono flex items-center gap-1"
                >
                  <span>🛡️ Staff Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#FF7518]" />
                <span>1800-RAPID-HELP (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#FF7518]" />
                <span>support@rapidhelp.in</span>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <MapPin className="w-4 h-4 text-[#FF7518] shrink-0 mt-0.5" />
                <span>Rapidhelp HQ, 100ft Road, Indiranagar, Bengaluru, KA 560038</span>
              </div>
            </div>

            <div className="pt-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-300 font-semibold block">Need Urgent Assistance?</span>
                <span className="text-slate-400">Our customer team is available 24/7.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Rapidhelp Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#security" className="hover:text-slate-300 transition-colors">
              Security
            </a>
            <a href="#sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </a>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF7518] fill-[#FF7518]" />
            <span>for local service excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
