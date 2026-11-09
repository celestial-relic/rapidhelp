import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowRight,
  Star,
  MapPin,
  Sparkles,
  Zap,
  Tag,
  Wrench,
  ShieldCheck,
} from 'lucide-react';

export const CustomerOverview: React.FC = () => {
  const {
    bookings,
    categories,
    professionals,
    setActiveCustomerTab,
    setSelectedCategoryFilter,
    setSelectedBookingId,
    setSelectedProForBooking,
    setBookingModalOpen,
  } = useRapidhelp();

  // Metrics
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (b) => b.status === 'In Progress' || b.status === 'Confirmed' || b.status === 'Accepted'
  ).length;
  const completedServices = bookings.filter((b) => b.status === 'Completed').length;
  const pendingRequests = bookings.filter(
    (b) => b.status === 'Pending' || b.status === 'Negotiation'
  ).length;

  const recentBookings = bookings.slice(0, 3);
  const featuredPros = professionals.slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">Pending</span>;
      case 'Negotiation':
        return <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200 animate-pulse">Counteroffer</span>;
      case 'Confirmed':
      case 'Accepted':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">Confirmed</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">In Progress</span>;
      case 'Completed':
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">Completed</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#0C1C34] to-[#162B4E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-[#FF7518]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF7518] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Hyperlocal Dispatch</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back! What service do you need today?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            Over 500+ verified electricians, plumbers, and technicians are online in your area.
            Average technician arrival time is 18 minutes.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCustomerTab('find-services')}
              className="px-5 py-2.5 bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Services Nearby</span>
            </button>
            <button
              onClick={() => setActiveCustomerTab('my-bookings')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all"
            >
              <span>Track Active Bookings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Total Bookings
            </span>
            <span className="text-2xl font-black text-[#0C1C34]">{totalBookings}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Active Bookings
            </span>
            <span className="text-2xl font-black text-[#0C1C34]">{activeBookings}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Completed Services
            </span>
            <span className="text-2xl font-black text-[#0C1C34]">{completedServices}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Pending Requests
            </span>
            <span className="text-2xl font-black text-[#FF7518]">{pendingRequests}</span>
          </div>
        </div>
      </div>

      {/* Quick Category Shortcuts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0C1C34]">Popular Services</h3>
          <button
            onClick={() => setActiveCustomerTab('find-services')}
            className="text-xs font-bold text-[#FF7518] hover:underline"
          >
            View all categories
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryFilter(cat.id);
                setActiveCustomerTab('find-services');
              }}
              className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] hover:border-[#FF7518] hover:shadow-md transition-all text-center group flex flex-col items-center justify-center space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F5F7FA] group-hover:bg-[#FF7518]/10 flex items-center justify-center text-[#FF7518] transition-colors">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0C1C34] group-hover:text-[#FF7518] transition-colors truncate w-full">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#64748B]">from ₹{cat.startingPrice}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0C1C34]">Recent Bookings</h3>
            <p className="text-xs text-[#64748B]">Real-time status of your service requests</p>
          </div>
          <button
            onClick={() => setActiveCustomerTab('my-bookings')}
            className="text-xs font-bold text-[#FF7518] hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#64748B] font-bold uppercase tracking-wider rounded-xl">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Booking ID</th>
                  <th className="py-3 px-4">Professional</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0C1C34]">#{b.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={b.professionalAvatar}
                          alt={b.professionalName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-[#0C1C34]">{b.professionalName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] font-medium">{b.category}</td>
                    <td className="py-3.5 px-4 text-[#64748B]">{b.scheduledTime}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(b.status)}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0C1C34]">
                      ₹{b.agreedPrice || b.customerProposedBudget}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedBookingId(b.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#0C1C34] text-white hover:bg-[#FF7518] text-[11px] font-bold transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-[#64748B]">No recent bookings yet.</p>
        )}
      </div>

      {/* Featured Nearby Professionals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0C1C34]">Top Rated Pros Around You</h3>
            <p className="text-xs text-[#64748B]">Certified with 4.8+ rating and instant response</p>
          </div>
          <button
            onClick={() => setActiveCustomerTab('find-services')}
            className="text-xs font-bold text-[#FF7518] hover:underline"
          >
            Explore all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredPros.map((pro) => (
            <div
              key={pro.id}
              className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0C1C34]">{pro.name}</h4>
                    <div className="text-xs text-[#64748B]">{pro.category}</div>
                    <div className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{pro.rating}</span>
                      <span className="text-slate-400 font-normal">({pro.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#64748B] line-clamp-2 mb-3">{pro.bio}</p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-sm font-black text-[#0C1C34]">₹{pro.startingPrice}</span>
                <button
                  onClick={() => {
                    setSelectedProForBooking(pro);
                    setBookingModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#FF7518] hover:bg-[#E8630A] text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
