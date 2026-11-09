import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { Booking, BookingStatus } from '../../types';
import {
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  Tag,
  MapPin,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const MyBookings: React.FC = () => {
  const { bookings, setSelectedBookingId, createOrOpenChatWithPro, setCurrentView, setActiveCustomerTab } =
    useRapidhelp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>(
    'all'
  );

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
            Pending Approval
          </span>
        );
      case 'Negotiation':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold animate-pulse">
            Counteroffer Pending
          </span>
        );
      case 'Accepted':
      case 'Confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            Confirmed & Scheduled
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
            In Progress (En Route)
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'active') {
      return (
        b.status === 'Pending' ||
        b.status === 'Negotiation' ||
        b.status === 'Confirmed' ||
        b.status === 'In Progress' ||
        b.status === 'Accepted'
      );
    }
    if (statusFilter === 'completed') return b.status === 'Completed';
    if (statusFilter === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0C1C34]">My Service Bookings</h2>
          <p className="text-xs text-[#64748B]">
            Track ongoing repairs, negotiate prices, or review completed jobs.
          </p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-[#E2E8F0] shadow-sm text-xs font-semibold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'all'
                ? 'bg-[#0C1C34] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0C1C34]'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'active'
                ? 'bg-[#FF7518] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0C1C34]'
            }`}
          >
            Active (
            {
              bookings.filter(
                (b) =>
                  b.status !== 'Completed' && b.status !== 'Cancelled'
              ).length
            }
            )
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'completed'
                ? 'bg-[#0C1C34] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0C1C34]'
            }`}
          >
            Completed ({bookings.filter((b) => b.status === 'Completed').length})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-[#0C1C34] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0C1C34]'
            }`}
          >
            Cancelled ({bookings.filter((b) => b.status === 'Cancelled').length})
          </button>
        </div>
      </div>

      {/* Bookings List Cards */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((b: Booking) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-black text-[#0C1C34] bg-[#F5F7FA] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                    #{b.id}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FF7518]" />
                    {b.bookingDate}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(b.status)}
                  <span className="text-sm font-black text-[#0C1C34]">
                    ₹{b.agreedPrice || b.customerProposedBudget || b.priceBreakdown.totalEstimatedPrice}
                  </span>
                </div>
              </div>

              {/* Main Booking Content Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 flex items-start space-x-4">
                  <img
                    src={b.professionalAvatar}
                    alt={b.professionalName}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E2E8F0] shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0C1C34] flex items-center gap-2">
                      <span>{b.professionalName}</span>
                      <span className="text-xs font-normal text-[#64748B]">
                        ({b.category})
                      </span>
                    </h4>
                    <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                      {b.serviceDescription}
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-[#64748B] mt-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF7518]" />
                        {b.customerAddress}
                      </span>
                      <span>•</span>
                      <span>{b.scheduledTime}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="md:col-span-4 flex items-center justify-end space-x-2 pt-2 md:pt-0">
                  <button
                    onClick={() => {
                      createOrOpenChatWithPro(b.professionalId, b.id);
                      setCurrentView('customer');
                      setActiveCustomerTab('messages');
                    }}
                    className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#0C1C34] hover:bg-[#F5F7FA] text-xs font-bold"
                    title="Chat with pro"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FF7518]" />
                  </button>

                  <button
                    onClick={() => setSelectedBookingId(b.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#0C1C34] hover:bg-[#FF7518] text-white text-xs font-bold shadow-sm transition-colors flex items-center space-x-1.5"
                  >
                    <span>View Details & Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Special banner if counteroffer received */}
              {b.status === 'Negotiation' && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-amber-900 font-medium">
                    <Tag className="w-4 h-4 text-[#FF7518]" />
                    <span>
                      Counteroffer received:{' '}
                      <strong>
                        ₹
                        {b.negotiationHistory[b.negotiationHistory.length - 1]?.amount ||
                          550}
                      </strong>{' '}
                      from {b.professionalName}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBookingId(b.id)}
                    className="px-3 py-1 bg-[#FF7518] text-white font-bold rounded-lg text-[11px]"
                  >
                    Respond Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-[#0C1C34]">No Bookings Found</h4>
          <p className="text-xs text-[#64748B]">
            You have no bookings matching the selected status.
          </p>
          <button
            onClick={() => setActiveCustomerTab('find-services')}
            className="px-5 py-2.5 bg-[#FF7518] text-white text-xs font-bold rounded-xl shadow"
          >
            Find a Service Now
          </button>
        </div>
      )}
    </div>
  );
};
