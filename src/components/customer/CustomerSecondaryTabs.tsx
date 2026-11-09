import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Star,
  MapPin,
  User,
  Shield,
  Bell,
  Smartphone,
  Plus,
} from 'lucide-react';

export const CustomerPaymentsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[#0C1C34]">Payments & Invoices</h2>
          <p className="text-xs text-[#64748B]">Manage your payment methods and download GST receipts.</p>
        </div>
        <button className="px-4 py-2 bg-[#FF7518] text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Payment Method</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-[#0C1C34] to-[#162B4E] text-white p-6 rounded-3xl shadow-lg space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Rapidhelp Pay Balance</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Active</span>
          </div>
          <div className="text-3xl font-black">₹1,250.00</div>
          <div className="text-[11px] text-slate-400">Available for instant 1-click booking checkout</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0C1C34]">Default UPI ID</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-base font-bold text-[#0C1C34]">aakash.verma@okhdfcbank</div>
          <div className="text-xs text-[#64748B]">Primary account for service settlements</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0C1C34]">Saved Credit Card</span>
            <CreditCard className="w-4 h-4 text-[#FF7518]" />
          </div>
          <div className="text-base font-bold text-[#0C1C34]">•••• •••• •••• 4291</div>
          <div className="text-xs text-[#64748B]">HDFC Regalia Visa Card (Exp 09/28)</div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0C1C34] uppercase tracking-wider text-xs">Past Transactions</h3>
        <div className="divide-y divide-[#E2E8F0] text-xs">
          {[
            { id: 'TXN-9841', date: '07 Nov 2026', pro: 'Vikram Singh (Plumbing)', amount: 299, mode: 'UPI', status: 'Settled' },
            { id: 'TXN-9120', date: '28 Oct 2026', pro: 'Anita Devi (Deep Cleaning)', amount: 1450, mode: 'Card', status: 'Settled' },
            { id: 'TXN-8742', date: '14 Oct 2026', pro: 'Ramesh Sharma (Electrician)', amount: 450, mode: 'UPI', status: 'Settled' },
          ].map((txn) => (
            <div key={txn.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#0C1C34]">{txn.pro}</div>
                <div className="text-[11px] text-[#64748B]">{txn.id} • {txn.date} via {txn.mode}</div>
              </div>
              <div className="text-right flex items-center space-x-3">
                <span className="font-bold text-sm text-[#0C1C34]">₹{txn.amount}</span>
                <button className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0C1C34] hover:bg-slate-50" title="Download Invoice">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CustomerReviewsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-[#0C1C34]">My Reviews & Ratings</h2>
        <p className="text-xs text-[#64748B]">Feedback you've provided for certified service partners.</p>
      </div>

      <div className="space-y-4">
        {[
          {
            pro: 'Vikram Singh',
            trade: 'Plumber',
            date: '07 Nov 2026',
            rating: 5,
            comment: 'Very fast service, stopped the water damage immediately! Arrived with genuine CPVC elbow replacement parts.',
            response: 'Thank you Aakash ji for your kind words! Glad I could fix the leak promptly.',
          },
          {
            pro: 'Anita Devi & Team',
            trade: 'Home Cleaning',
            date: '28 Oct 2026',
            rating: 5,
            comment: 'Spotless 3BHK deep cleaning before Diwali. Highly recommended for thorough sanitization.',
            response: 'Thank you! We always aim for complete customer satisfaction.',
          },
        ].map((rev, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#0C1C34]">{rev.pro} ({rev.trade})</h4>
                <div className="text-[11px] text-[#64748B]">{rev.date}</div>
              </div>
              <div className="flex text-amber-400">
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#0C1C34] italic">"{rev.comment}"</p>
            {rev.response && (
              <div className="p-3 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
                <span className="font-bold text-[#0C1C34] block text-[11px]">Pro Response:</span>
                <span>{rev.response}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomerProfileTab: React.FC = () => {
  const { customerLocation } = useRapidhelp();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-[#0C1C34]">Customer Profile & Saved Addresses</h2>
        <p className="text-xs text-[#64748B]">Manage your contact information and service locations.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80"
            alt="Customer Profile"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FF7518]"
          />
          <div>
            <h3 className="text-lg font-bold text-[#0C1C34]">Aakash Verma</h3>
            <p className="text-xs text-[#64748B]">Verified Customer • Member since Oct 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Phone Number</label>
            <input type="text" readOnly value="+91 98200 45678" className="w-full p-2.5 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-[#0C1C34] font-semibold" />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Email Address</label>
            <input type="text" readOnly value="aakash.verma@example.com" className="w-full p-2.5 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-[#0C1C34] font-semibold" />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0]">
          <h4 className="text-xs font-bold text-[#0C1C34] uppercase tracking-wider mb-3">Saved Addresses</h4>
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#FF7518]" />
                <div>
                  <span className="font-bold text-[#0C1C34]">Home: Flat 402, Green Glen Layout</span>
                  <div className="text-[11px] text-[#64748B]">{customerLocation}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">DEFAULT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
