import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { X, Tag, DollarSign, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CounterofferModal: React.FC = () => {
  const {
    counterOfferModalOpen,
    setCounterOfferModalOpen,
    selectedBookingForCounter,
    sendCounterOffer,
  } = useRapidhelp();

  const [counterPrice, setCounterPrice] = useState<number>(550);
  const [counterNote, setCounterNote] = useState(
    'Includes complete switchboard inspection, MCB terminal replacement, and 30-day labor warranty.'
  );

  if (!counterOfferModalOpen || !selectedBookingForCounter) return null;

  const booking = selectedBookingForCounter;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendCounterOffer(booking.id, Number(counterPrice), counterNote, 'professional');
    setCounterOfferModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E2E8F0] relative">
        <button
          onClick={() => setCounterOfferModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-slate-200 flex items-center justify-center text-[#64748B]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#FF7518]">
            <Tag className="w-4 h-4" />
            <span>PRICE NEGOTIATION</span>
          </div>
          <h3 className="text-xl font-black text-[#0C1C34]">
            Send Counteroffer for Booking #{booking.id}
          </h3>
          <p className="text-xs text-[#64748B]">
            Customer {booking.customerName} proposed a budget of{' '}
            <strong className="text-[#0C1C34]">₹{booking.customerProposedBudget}</strong>.
          </p>
        </div>

        {/* Customer Problem Scope Review */}
        <div className="p-3.5 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] text-xs space-y-1">
          <span className="font-bold text-[#0C1C34] block">Customer Service Scope:</span>
          <p className="text-[#64748B] italic">"{booking.serviceDescription}"</p>
          <div className="pt-1 text-[11px] text-slate-500">
            Location: {booking.customerAddress} ({booking.urgency})
          </div>
        </div>

        {/* Counter Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0C1C34] mb-1">
              Your Counter Quote (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-sm text-[#0C1C34]">
                ₹
              </span>
              <input
                type="number"
                required
                min="100"
                step="25"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2.5 text-base font-black rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
              />
            </div>
            <div className="flex space-x-2 mt-2">
              {[booking.customerProposedBudget + 50, booking.customerProposedBudget + 100, booking.customerProposedBudget + 150].map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() => setCounterPrice(quick)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] text-[#0C1C34] font-semibold hover:border-[#FF7518]"
                >
                  ₹{quick}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1C34] mb-1">
              Explanation for Customer
            </label>
            <textarea
              rows={3}
              required
              value={counterNote}
              onChange={(e) => setCounterNote(e.target.value)}
              placeholder="Explain what additional labor, tools, or parts are covered in this quote..."
              className="w-full p-3 text-xs rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>The customer can accept, decline, or counter your offer.</span>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setCounterOfferModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#FF7518] hover:bg-[#E8630A] text-white text-xs font-bold shadow-md shadow-[#FF7518]/25 flex items-center justify-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Send Counteroffer (₹{counterPrice})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
