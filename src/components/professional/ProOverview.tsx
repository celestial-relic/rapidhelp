import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  DollarSign,
  Briefcase,
  AlertCircle,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const ProOverview: React.FC = () => {
  const {
    bookings,
    currentPro,
    proIsOnline,
    setProIsOnline,
    setActiveProTab,
    acceptBooking,
    rejectBooking,
    setCounterOfferModalOpen,
    setSelectedBookingForCounter,
    triggerToast,
  } = useRapidhelp();

  const pendingRequests = bookings.filter((b) => b.status === 'Pending');
  const activeJobs = bookings.filter(
    (b) => b.status === 'In Progress' || b.status === 'Confirmed' || b.status === 'Negotiation'
  );

  return (
    <div className="space-y-8">
      {/* Welcome & Online Status Banner */}
      <div className="bg-gradient-to-r from-[#0C1C34] to-[#162B4E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-[#FF7518]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={currentPro.avatar}
              alt={currentPro.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FF7518] shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">{currentPro.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  VERIFIED PRO
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{currentPro.title}</p>
              <div className="flex items-center space-x-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {currentPro.rating} Rating
                </span>
                <span>•</span>
                <span>{currentPro.completedJobsCount} Lifetime Jobs</span>
              </div>
            </div>
          </div>

          {/* Quick Online Switch */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between sm:justify-start space-x-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Duty Mode</span>
              <span className="text-xs font-bold text-white">
                {proIsOnline ? 'Accepting Nearby Orders' : 'Paused / Off-Duty'}
              </span>
            </div>
            <button
              onClick={() => {
                const next = !proIsOnline;
                setProIsOnline(next);
                triggerToast(
                  'Status Changed',
                  `You are now ${next ? 'Online' : 'Offline'}`,
                  next ? 'success' : 'warning'
                );
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                proIsOnline
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
            >
              {proIsOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Total Earnings
          </span>
          <div className="text-2xl font-black text-[#0C1C34]">₹48,250</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Ready for weekly payout</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Completed Jobs
          </span>
          <div className="text-2xl font-black text-[#0C1C34]">38</div>
          <div className="text-[10px] text-slate-500 mt-1">100% on-time arrival</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Pending Requests
          </span>
          <div className="text-2xl font-black text-[#FF7518]">{pendingRequests.length}</div>
          <div className="text-[10px] text-amber-600 font-bold mt-1">Requires review</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Average Rating
          </span>
          <div className="text-2xl font-black text-amber-500">4.9 ★</div>
          <div className="text-[10px] text-slate-500 mt-1">Based on 184 reviews</div>
        </div>
      </div>

      {/* Incoming Requests Direct Action Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0C1C34]">Incoming Job Requests</h3>
            <p className="text-xs text-[#64748B]">Respond quickly to secure jobs before other providers</p>
          </div>
          <button
            onClick={() => setActiveProTab('incoming-requests')}
            className="text-xs font-bold text-[#FF7518] hover:underline flex items-center space-x-1"
          >
            <span>View All ({pendingRequests.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.slice(0, 2).map((req) => (
              <div
                key={req.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.customerAvatar}
                      alt={req.customerName}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#0C1C34]">{req.customerName}</h4>
                      <div className="text-xs text-[#64748B]">{req.category} • {req.urgency}</div>
                    </div>
                  </div>

                  <div className="text-right self-start sm:self-auto">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">
                      Proposed Budget
                    </span>
                    <span className="text-base font-black text-[#FF7518]">
                      ₹{req.customerProposedBudget}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#0C1C34] bg-white p-3 rounded-xl border border-[#E2E8F0] italic">
                  "{req.serviceDescription}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  <span className="text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7518]" />
                    {req.customerAddress}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => rejectBooking(req.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBookingForCounter(req);
                        setCounterOfferModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-[#FF7518] text-[#FF7518] text-xs font-bold hover:bg-[#FF7518]/10"
                    >
                      Counteroffer
                    </button>
                    <button
                      onClick={() => acceptBooking(req.id)}
                      className="px-4 py-1.5 rounded-lg bg-[#16A34A] text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                    >
                      Accept Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#64748B] italic">No pending requests right now.</p>
        )}
      </div>

      {/* Active Jobs in Progress */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#0C1C34]">Active Jobs in Progress</h3>
        <div className="divide-y divide-[#E2E8F0] text-xs">
          {activeJobs.map((job) => (
            <div key={job.id} className="py-3.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0C1C34] block">
                  #{job.id} • {job.customerName} ({job.category})
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Schedule: {job.scheduledTime} • {job.customerAddress}
                </span>
              </div>
              <div className="text-right">
                <span className="font-black text-sm text-[#0C1C34] block">
                  ₹{job.agreedPrice || job.customerProposedBudget}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700">
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
