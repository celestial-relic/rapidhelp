import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  X,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    setBookingModalOpen,
    selectedProForBooking,
    customerLocation,
    createBooking,
    setCurrentView,
    setActiveCustomerTab,
    setSelectedBookingId,
  } = useRapidhelp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [serviceDescription, setServiceDescription] = useState(
    'Main circuit breaker trips whenever high load appliance is turned on. Need inspection and repair.'
  );
  const [address, setAddress] = useState('Flat 402, Green Glen Layout, ' + customerLocation);
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent (Within 1 Hour)' | 'Scheduled'>('Urgent (Within 1 Hour)');
  const [scheduledDate, setScheduledDate] = useState('Today, within 45 mins');
  const [customerBudget, setCustomerBudget] = useState<number>(450);

  if (!bookingModalOpen || !selectedProForBooking) return null;

  const pro = selectedProForBooking;

  // Transparent Price Breakdown Math
  const baseServiceCharge = pro.startingPrice;
  const distanceCharge = Math.round(pro.distanceKm * 25);
  const urgencyCharge = urgency === 'Urgent (Within 1 Hour)' ? 150 : 0;
  const additionalWorkEstimate = 50; // standard minor consumables estimate
  const totalEstimatedPrice =
    baseServiceCharge + distanceCharge + urgencyCharge + additionalWorkEstimate;

  const handleNext = () => {
    if (step === 1) {
      // Initialize suggested budget close to estimate
      if (!customerBudget || customerBudget === 450) {
        setCustomerBudget(totalEstimatedPrice);
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2);
    }
  };

  const handleConfirmBooking = () => {
    const newBookingId = createBooking({
      customerId: 'cust-1',
      customerName: 'Aakash Verma',
      customerAvatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      customerPhone: '+91 98200 45678',
      customerAddress: address,
      professionalId: pro.id,
      professionalName: pro.name,
      professionalAvatar: pro.avatar,
      professionalPhone: pro.phone,
      professionalCategory: pro.category,
      serviceDescription,
      category: pro.category,
      bookingDate: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scheduledTime: scheduledDate,
      urgency,
      priceBreakdown: {
        baseServiceCharge,
        distanceCharge,
        urgencyCharge,
        additionalWorkCharge: additionalWorkEstimate,
        discount: 0,
        totalEstimatedPrice,
        isFinalQuotation: false, // Explicitly not final until negotiated!
      },
      customerProposedBudget: Number(customerBudget) || totalEstimatedPrice,
    });

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore if canvas-confetti environment issue
    }

    setBookingModalOpen(false);
    setSelectedBookingId(newBookingId);
    setCurrentView('customer');
    setActiveCustomerTab('my-bookings');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] relative flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0C1C34] p-5 sm:p-6 text-white relative">
          <button
            onClick={() => setBookingModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={pro.avatar}
              alt={pro.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF7518]"
            />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7518]">
                Book & Negotiate Price
              </span>
              <h3 className="text-lg font-black text-white">{pro.name}</h3>
              <p className="text-xs text-slate-300">
                {pro.category} • {pro.distanceKm} km away • {pro.rating} ★
              </p>
            </div>
          </div>

          {/* Stepper indicators */}
          <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-semibold">
            <div
              className={`p-1.5 rounded-lg text-center transition-all ${
                step === 1
                  ? 'bg-[#FF7518] text-white font-bold'
                  : 'bg-white/10 text-slate-300'
              }`}
            >
              1. Job Details
            </div>
            <div
              className={`p-1.5 rounded-lg text-center transition-all ${
                step === 2
                  ? 'bg-[#FF7518] text-white font-bold'
                  : 'bg-white/10 text-slate-300'
              }`}
            >
              2. Price & Budget
            </div>
            <div
              className={`p-1.5 rounded-lg text-center transition-all ${
                step === 3
                  ? 'bg-[#FF7518] text-white font-bold'
                  : 'bg-white/10 text-slate-300'
              }`}
            >
              3. Review & Send
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          {/* STEP 1: Service Scope & Urgency */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0C1C34] mb-1">
                  Describe Your Problem or Work Needed
                </label>
                <textarea
                  rows={3}
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="E.g., Switchboard sparking, need wire replacement, fan making rattling noise..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1C34] mb-1">
                  Service Address & Floor
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#FF7518]" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                  />
                </div>
              </div>

              {/* Urgency selector */}
              <div>
                <label className="block text-xs font-bold text-[#0C1C34] mb-1.5">
                  When do you need the service?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUrgency('Urgent (Within 1 Hour)');
                      setScheduledDate('Today, within 30-45 mins');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      urgency === 'Urgent (Within 1 Hour)'
                        ? 'border-[#FF7518] bg-[#FF7518]/5 text-[#0C1C34]'
                        : 'border-[#E2E8F0] hover:bg-[#F5F7FA] text-[#64748B]'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#FF7518] mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Urgent Help</span>
                    </div>
                    <div className="text-[11px]">Arrival in 15–45m</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">+₹150 priority</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUrgency('Normal');
                      setScheduledDate('Today, 05:00 PM - 07:00 PM');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      urgency === 'Normal'
                        ? 'border-[#FF7518] bg-[#FF7518]/5 text-[#0C1C34]'
                        : 'border-[#E2E8F0] hover:bg-[#F5F7FA] text-[#64748B]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0C1C34] mb-0.5">Standard Today</div>
                    <div className="text-[11px]">Today afternoon</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Standard rate</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUrgency('Scheduled');
                      setScheduledDate('Tomorrow, 10:00 AM');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      urgency === 'Scheduled'
                        ? 'border-[#FF7518] bg-[#FF7518]/5 text-[#0C1C34]'
                        : 'border-[#E2E8F0] hover:bg-[#F5F7FA] text-[#64748B]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0C1C34] mb-0.5">Schedule Later</div>
                    <div className="text-[11px]">Pick time slot</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-1">Tomorrow / Weekend</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Transparent Price Breakdown & Propose Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-[#E2E8F0] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#0C1C34] flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-[#FF7518]" />
                    Estimated Price Breakdown
                  </span>
                  <span className="text-[10px] font-semibold text-[#64748B] uppercase">
                    Non-binding Quote
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Base Service Inspection Fee</span>
                    <span className="font-semibold text-[#0C1C34]">₹{baseServiceCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance Fee ({pro.distanceKm} km @ ₹25/km)</span>
                    <span className="font-semibold text-[#0C1C34]">₹{distanceCharge}</span>
                  </div>
                  {urgencyCharge > 0 && (
                    <div className="flex justify-between text-amber-700">
                      <span>Express Priority Dispatch (within 1 hr)</span>
                      <span className="font-semibold">+₹{urgencyCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Minor Parts / Consumable Buffer</span>
                    <span className="font-semibold text-[#0C1C34]">₹{additionalWorkEstimate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-center text-sm font-bold text-[#0C1C34]">
                  <span>Total System Estimated Price</span>
                  <span className="text-base font-black text-[#FF7518]">₹{totalEstimatedPrice}</span>
                </div>
              </div>

              {/* Price Negotiation Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-[#FF7518] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-[#0C1C34]">
                      Propose Your Target Budget (Optional)
                    </h5>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      You can propose a price. {pro.name} can accept your proposal directly or send
                      a counteroffer before work begins.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-[#0C1C34]">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={customerBudget}
                      onChange={(e) => setCustomerBudget(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm font-bold rounded-xl border border-amber-300 focus:outline-none focus:border-[#FF7518] bg-white"
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div className="flex space-x-1.5">
                    {[totalEstimatedPrice - 50, totalEstimatedPrice, totalEstimatedPrice + 100].map(
                      (amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setCustomerBudget(amt)}
                          className={`px-2.5 py-2 text-xs rounded-lg font-bold border transition-colors ${
                            customerBudget === amt
                              ? 'bg-[#FF7518] text-white border-[#FF7518]'
                              : 'bg-white border-amber-300 text-[#0C1C34] hover:bg-amber-100'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review and Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-3">
                <h5 className="text-xs font-bold text-[#0C1C34] uppercase tracking-wider">
                  Booking Summary
                </h5>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Selected Professional</span>
                    <span className="font-bold text-[#0C1C34]">{pro.name}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Service Category</span>
                    <span className="font-bold text-[#0C1C34]">{pro.category}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Requested Schedule</span>
                    <span className="font-bold text-[#0C1C34]">{scheduledDate}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Your Proposed Budget</span>
                    <span className="font-black text-[#FF7518] text-sm">₹{customerBudget}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] text-xs">
                  <span className="text-[#64748B] block text-[11px]">Service Details</span>
                  <span className="text-[#0C1C34] italic">"{serviceDescription}"</span>
                </div>
              </div>

              {/* Requirement: Clearly distinguish estimated prices from confirmed quotations */}
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-start space-x-2.5 text-xs text-sky-900">
                <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    Important Note on Price Negotiation:
                  </span>
                  <p className="text-[11px] text-sky-800 leading-snug mt-0.5">
                    This is an <strong>Estimated Price / Proposal</strong>. The professional will
                    review your request and can accept or send a counteroffer. Your price becomes a
                    <strong> Confirmed Quotation</strong> only after mutual agreement. No money is
                    deducted right now.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#E2E8F0] bg-[#F5F7FA] rounded-b-3xl flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0C1C34] hover:bg-slate-100 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] hover:bg-slate-100"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#FF7518] hover:bg-[#E8630A] text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-[#FF7518]/25"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-7 py-2.5 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-700/25"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Request (₹{customerBudget})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
