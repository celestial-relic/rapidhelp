import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { Booking } from '../../types';
import {
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Tag,
  DollarSign,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const IncomingRequests: React.FC = () => {
  const {
    bookings,
    acceptBooking,
    rejectBooking,
    setCounterOfferModalOpen,
    setSelectedBookingForCounter,
    createOrOpenChatWithPro,
    setCurrentView,
    setActiveProTab,
    setSelectedBookingId,
  } = useRapidhelp();

  // Requests that need pro attention
  const incoming = bookings.filter(
    (b) => b.status === 'Pending' || b.status === 'Negotiation'
  );

  const handleOpenCounter = (booking: Booking) => {
    setSelectedBookingForCounter(booking);
    setCounterOfferModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-[#0C1C34]">Incoming Service Requests</h2>
          <p className="text-xs text-[#64748B]">
            Review nearby jobs, accept customer budgets, or propose a counteroffer.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 self-start sm:self-auto">
          {incoming.length} Requests Awaiting Action
        </span>
      </div>

      {incoming.length > 0 ? (
        <div className="space-y-5">
          {incoming.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#E2E8F0] hover:border-[#FF7518]/50 shadow-sm transition-all space-y-5"
            >
              {/* Header: Customer info & Proposed Budget */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={req.customerAvatar}
                    alt={req.customerName}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#0C1C34]">{req.customerName}</h4>
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                        #{req.id}
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-[#0C1C34]">{req.category}</span>
                      <span>•</span>
                      <span className="text-[#FF7518] font-bold">{req.urgency}</span>
                    </div>
                  </div>
                </div>

                {/* Customer's Proposed Budget Pill */}
                <div className="bg-[#F5F7FA] px-4 py-2.5 rounded-2xl border border-[#E2E8F0] flex items-center space-x-3 self-start sm:self-auto">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">
                      Proposed Budget
                    </span>
                    <span className="text-xl font-black text-[#FF7518]">
                      ₹{req.customerProposedBudget}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 border-l border-slate-200 pl-3">
                    Est: ₹{req.priceBreakdown.totalEstimatedPrice}
                  </div>
                </div>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[#64748B] text-[11px] font-bold block uppercase">
                    Customer Location
                  </span>
                  <div className="flex items-start space-x-1.5 text-[#0C1C34] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7518] shrink-0 mt-0.5" />
                    <span>{req.customerAddress}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#64748B] text-[11px] font-bold block uppercase">
                    Requested Time
                  </span>
                  <div className="flex items-center space-x-1.5 text-[#0C1C34] font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{req.scheduledTime}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#64748B] text-[11px] font-bold block uppercase">
                    Distance from you
                  </span>
                  <span className="font-bold text-emerald-600">1.2 km away (6 mins ride)</span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-3.5 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0]">
                <span className="text-[11px] text-[#64748B] font-bold uppercase block mb-1">
                  Customer Problem Statement:
                </span>
                <p className="text-xs text-[#0C1C34] leading-relaxed">
                  "{req.serviceDescription}"
                </p>
              </div>

              {/* Negotiation Status (if ongoing) */}
              {req.status === 'Negotiation' && (
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-center justify-between">
                  <span className="font-semibold">
                    Counteroffer of ₹
                    {req.negotiationHistory[req.negotiationHistory.length - 1]?.amount} sent. Awaiting customer reply.
                  </span>
                  <button
                    onClick={() => {
                      createOrOpenChatWithPro(req.professionalId, req.id);
                      setActiveProTab('messages');
                    }}
                    className="text-[#FF7518] font-bold hover:underline"
                  >
                    View Chat Thread
                  </button>
                </div>
              )}

              {/* Action Buttons: Accept / Reject / Send Counteroffer */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => rejectBooking(req.id, 'Schedule busy')}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleOpenCounter(req)}
                  className="px-4 py-2.5 rounded-xl border-2 border-[#FF7518] text-[#FF7518] hover:bg-[#FF7518]/10 text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Send Counteroffer</span>
                </button>

                <button
                  onClick={() => acceptBooking(req.id)}
                  className="px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Job (₹{req.customerProposedBudget})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-base font-bold text-[#0C1C34]">All Caught Up!</h4>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            No pending incoming requests right now. Ensure your status is set to "Online" to
            receive instant notifications from customers nearby.
          </p>
        </div>
      )}
    </div>
  );
};
