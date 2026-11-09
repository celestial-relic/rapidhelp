import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { LiveTrackingMap } from './LiveTrackingMap';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  DollarSign,
  Tag,
  Star,
  Sparkles,
} from 'lucide-react';

export const BookingDetailsView: React.FC = () => {
  const {
    selectedBookingId,
    setSelectedBookingId,
    bookings,
    cancelBooking,
    completeBooking,
    acceptCounterOffer,
    declineCounterOffer,
    createOrOpenChatWithPro,
    setCurrentView,
    setActiveCustomerTab,
    triggerToast,
  } = useRapidhelp();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Issue resolved by self');
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewNote, setReviewNote] = useState('Excellent, fast and professional service!');
  const [simulatedCallOpen, setSimulatedCallOpen] = useState(false);

  const booking = bookings.find((b) => b.id === selectedBookingId);

  if (!booking) {
    return (
      <div className="p-8 text-center space-y-3 bg-white rounded-3xl border border-[#E2E8F0]">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
        <h4 className="text-base font-bold text-[#0C1C34]">Booking Not Found</h4>
        <p className="text-xs text-[#64748B]">Please select a valid booking from your list.</p>
        <button
          onClick={() => setSelectedBookingId(null)}
          className="px-4 py-2 bg-[#FF7518] text-white text-xs font-bold rounded-xl"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  // Stepper timeline calculation
  const statusSteps = [
    { key: 'Pending', label: 'Request Placed', desc: 'Awaiting pro review' },
    { key: 'Negotiation', label: 'Price Agreed', desc: 'Mutual confirmation' },
    { key: 'Confirmed', label: 'Confirmed', desc: 'Technician assigned' },
    { key: 'In Progress', label: 'In Progress', desc: 'En route / Doorstep fix' },
    { key: 'Completed', label: 'Completed', desc: 'Payment settled & reviewed' },
  ];

  const getStepState = (stepKey: string) => {
    const order = ['Pending', 'Negotiation', 'Confirmed', 'In Progress', 'Completed'];
    const currentIdx = order.indexOf(
      booking.status === 'Accepted' ? 'Confirmed' : booking.status
    );
    const targetIdx = order.indexOf(stepKey);

    if (booking.status === 'Cancelled') {
      return 'cancelled';
    }
    if (targetIdx < currentIdx) return 'done';
    if (targetIdx === currentIdx) return 'current';
    return 'upcoming';
  };

  const handleOpenChat = () => {
    createOrOpenChatWithPro(booking.professionalId, booking.id);
    setCurrentView('customer');
    setActiveCustomerTab('messages');
  };

  const handleConfirmCompletion = () => {
    completeBooking(booking.id, rating, reviewNote);
    setCompleteModalOpen(false);
  };

  const handleConfirmCancellation = () => {
    cancelBooking(booking.id, cancelReason);
    setCancelModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Back Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedBookingId(null)}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#0C1C34] hover:text-[#FF7518] bg-white px-3.5 py-2 rounded-xl border border-[#E2E8F0] shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bookings</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#64748B]">Booking Reference:</span>
          <span className="font-mono text-xs font-extrabold text-[#0C1C34] bg-slate-100 px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
            {booking.id}
          </span>
        </div>
      </div>

      {/* Main Grid: Details Left, Map & Timeline Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Pro Info, Price Breakdown, Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Alert Card */}
          <div
            className={`p-4 rounded-3xl border shadow-sm flex items-start space-x-3 ${
              booking.status === 'Confirmed' || booking.status === 'In Progress'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : booking.status === 'Negotiation'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : booking.status === 'Cancelled'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-sky-50 border-sky-200 text-sky-950'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              {booking.status === 'Completed' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : booking.status === 'Cancelled' ? (
                <XCircle className="w-5 h-5 text-rose-600" />
              ) : (
                <Sparkles className="w-5 h-5 text-[#FF7518]" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Status: {booking.status}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">
                {booking.status === 'In Progress'
                  ? `Technician ${booking.professionalName} is dispatched and approaching your location.`
                  : booking.status === 'Negotiation'
                  ? 'A counteroffer is pending your review. View the breakdown below.'
                  : booking.status === 'Confirmed'
                  ? 'Price agreed and technician is scheduled.'
                  : booking.status === 'Completed'
                  ? 'Service successfully completed and verified.'
                  : 'Awaiting technician acceptance.'}
              </p>
            </div>
          </div>

          {/* If in Negotiation status: Interactive Counteroffer Box */}
          {booking.status === 'Negotiation' && (
            <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#FF7518]" />
                  Counteroffer Received
                </span>
                <span className="text-xs font-black text-[#FF7518] bg-white px-2.5 py-0.5 rounded-full border border-amber-200">
                  ₹{booking.negotiationHistory[booking.negotiationHistory.length - 1]?.amount || 550}
                </span>
              </div>

              <p className="text-xs text-amber-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-200/60 italic">
                "{booking.negotiationHistory[booking.negotiationHistory.length - 1]?.note ||
                  'Technician proposed counter price based on job scope.'}"
              </p>

              <div className="flex space-x-2 pt-1">
                <button
                  onClick={() => acceptCounterOffer(booking.id)}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Offer</span>
                </button>
                <button
                  onClick={() => declineCounterOffer(booking.id)}
                  className="py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Assigned Professional Profile Card */}
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Assigned Technician
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Pro
              </span>
            </div>

            <div className="flex items-center space-x-3.5">
              <img
                src={booking.professionalAvatar}
                alt={booking.professionalName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FF7518]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-[#0C1C34] truncate">
                  {booking.professionalName}
                </h4>
                <div className="text-xs text-[#64748B]">{booking.professionalCategory}</div>
                <div className="text-xs font-semibold text-emerald-600 mt-0.5">
                  ● On Duty • 4.9 ★ (180+ jobs)
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setSimulatedCallOpen(true)}
                className="py-2.5 px-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F5F7FA] text-xs font-bold text-[#0C1C34] flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call {booking.professionalPhone.split(' ')[1] || 'Pro'}</span>
              </button>
              <button
                onClick={handleOpenChat}
                className="py-2.5 px-3 rounded-xl bg-[#0C1C34] hover:bg-[#162B4E] text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF7518]" />
                <span>Open Chat</span>
              </button>
            </div>
          </div>

          {/* Transparent Price Breakdown */}
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0C1C34] flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#FF7518]" />
                Price Breakdown
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  booking.priceBreakdown.isFinalQuotation
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {booking.priceBreakdown.isFinalQuotation ? 'Confirmed Quotation' : 'Estimated Proposal'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Base Service Labor</span>
                <span className="font-semibold text-[#0C1C34]">
                  ₹{booking.priceBreakdown.baseServiceCharge}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Distance Fee</span>
                <span className="font-semibold text-[#0C1C34]">
                  ₹{booking.priceBreakdown.distanceCharge}
                </span>
              </div>
              {booking.priceBreakdown.urgencyCharge > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Urgency Priority (1 Hour)</span>
                  <span className="font-semibold">+₹{booking.priceBreakdown.urgencyCharge}</span>
                </div>
              )}
              {booking.priceBreakdown.additionalWorkCharge > 0 && (
                <div className="flex justify-between">
                  <span>Additional Consumables</span>
                  <span className="font-semibold text-[#0C1C34]">
                    ₹{booking.priceBreakdown.additionalWorkCharge}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-between items-center">
              <div>
                <span className="text-[10px] text-[#64748B] block uppercase font-bold">
                  {booking.agreedPrice ? 'Agreed Locked Price' : 'Estimated Total'}
                </span>
                <span className="text-xl font-black text-[#FF7518]">
                  ₹{booking.agreedPrice || booking.priceBreakdown.totalEstimatedPrice}
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                UPI / Cash on completion
              </span>
            </div>
          </div>

          {/* Cancellation & Completion Action buttons */}
          {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
            <div className="flex space-x-2">
              <button
                onClick={() => setCancelModalOpen(true)}
                className="flex-1 py-2.5 px-3 rounded-2xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => setCompleteModalOpen(true)}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors flex items-center justify-center space-x-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Completed</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Live Map & Status Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Tracking Map Component */}
          <LiveTrackingMap booking={booking} />

          {/* Timeline Stepper */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-[#0C1C34] uppercase tracking-wider">
              Booking Progress Timeline
            </h4>

            <div className="space-y-4">
              {statusSteps.map((s, idx) => {
                const state = getStepState(s.key);
                return (
                  <div key={s.key} className="flex items-start space-x-3.5 relative">
                    {/* Connecting line */}
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 w-0.5 h-8 -ml-[1px] ${
                          state === 'done' ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'
                        }`}
                      />
                    )}

                    {/* Step Icon Node */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                        state === 'done'
                          ? 'bg-[#16A34A] text-white'
                          : state === 'current'
                          ? 'bg-[#FF7518] text-white ring-4 ring-[#FF7518]/20 animate-pulse'
                          : 'bg-[#F5F7FA] text-[#64748B] border border-[#E2E8F0]'
                      }`}
                    >
                      {state === 'done' ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            state === 'current'
                              ? 'text-[#FF7518]'
                              : state === 'done'
                              ? 'text-[#0C1C34]'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {s.label}
                        </span>
                        {state === 'current' && (
                          <span className="text-[10px] font-bold text-[#FF7518] bg-[#FF7518]/10 px-2 py-0.5 rounded-full">
                            Active Stage
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#0C1C34] uppercase tracking-wider">
              Service Job Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#64748B] block text-[11px]">Category</span>
                <span className="font-bold text-[#0C1C34]">{booking.category}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[#64748B] block text-[11px]">Requested Schedule</span>
                <span className="font-bold text-[#0C1C34] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF7518]" />
                  {booking.scheduledTime}
                </span>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-[#64748B] block text-[11px]">Service Location</span>
                <span className="font-bold text-[#0C1C34] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7518]" />
                  {booking.customerAddress}
                </span>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-[#64748B] block text-[11px]">Customer Problem Statement</span>
                <p className="text-xs text-[#0C1C34] bg-[#F5F7FA] p-3 rounded-xl border border-[#E2E8F0] italic">
                  "{booking.serviceDescription}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Call Modal */}
      {simulatedCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0C1C34]">Connected via Rapidhelp Masked Call</h4>
              <p className="text-xs text-[#64748B] mt-1">
                Calling {booking.professionalName} ({booking.professionalPhone})
              </p>
              <div className="text-xs font-mono text-emerald-600 mt-2 font-bold">00:14 • In Call</div>
            </div>
            <button
              onClick={() => setSimulatedCallOpen(false)}
              className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Cancel Reason Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E2E8F0]">
            <h4 className="text-base font-bold text-[#0C1C34]">Cancel Booking #{booking.id}?</h4>
            <p className="text-xs text-[#64748B]">Please share a reason for cancellation:</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#FF7518]"
            >
              <option value="Issue resolved by self">Issue resolved by self</option>
              <option value="Need to reschedule to another day">Need to reschedule to another day</option>
              <option value="Technician taking too long">Technician taking too long</option>
              <option value="Booked by mistake">Booked by mistake</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B]"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmCancellation}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion & Review Modal */}
      {completeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E2E8F0]">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#0C1C34]">Service Completed Successfully</h4>
              <p className="text-xs text-[#64748B]">
                How was your experience with {booking.professionalName}?
              </p>
            </div>

            {/* Star Rating Selector */}
            <div className="flex justify-center space-x-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${s <= rating ? 'fill-amber-400' : 'text-slate-300'}`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0C1C34] mb-1">Your Review</label>
              <textarea
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                placeholder="Share your experience..."
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCompleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B]"
              >
                Dismiss
              </button>
              <button
                onClick={handleConfirmCompletion}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow"
              >
                Submit & Close Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
