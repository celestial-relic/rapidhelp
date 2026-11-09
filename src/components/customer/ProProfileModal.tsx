import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Phone,
  MessageSquare,
  Award,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export const ProProfileModal: React.FC = () => {
  const {
    proProfileModalOpen,
    setProProfileModalOpen,
    selectedProForProfile,
    setSelectedProForBooking,
    setBookingModalOpen,
    createOrOpenChatWithPro,
    setCurrentView,
    setActiveCustomerTab,
  } = useRapidhelp();

  if (!proProfileModalOpen || !selectedProForProfile) return null;

  const pro = selectedProForProfile;

  const handleBookNow = () => {
    setProProfileModalOpen(false);
    setSelectedProForBooking(pro);
    setBookingModalOpen(true);
  };

  const handleChatNow = () => {
    setProProfileModalOpen(false);
    createOrOpenChatWithPro(pro.id);
    setCurrentView('customer');
    setActiveCustomerTab('messages');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] relative">
        {/* Sticky Close Button */}
        <button
          onClick={() => setProProfileModalOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-r from-[#0C1C34] to-[#162B4E] p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            <div className="relative">
              <img
                src={pro.avatar}
                alt={pro.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              {pro.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow border-2 border-white" title="Verified Background & Trade Certificate">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF7518] text-white text-xs font-bold uppercase tracking-wider">
                  {pro.category}
                </span>
                {pro.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-300" />
                    {pro.badge}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    pro.isAvailable
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {pro.isAvailable ? '● Available Now' : '○ Busy'}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">{pro.name}</h3>
              <p className="text-xs text-slate-300">{pro.title}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-center space-x-1 font-bold text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300" />
                  <span>{pro.rating}</span>
                  <span className="text-slate-400 font-normal">({pro.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7518]" />
                  <span>{pro.distanceKm} km away</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                  <span>{pro.experienceYears} Years Exp.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Rates & Highlights Bar */}
          <div className="grid grid-cols-3 gap-3 bg-[#F5F7FA] p-4 rounded-2xl border border-[#E2E8F0] text-center">
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
                Starting Price
              </span>
              <span className="text-lg font-black text-[#0C1C34]">₹{pro.startingPrice}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
                Hourly Rate
              </span>
              <span className="text-lg font-black text-[#0C1C34]">₹{pro.hourlyRate}/hr</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
                Completed Jobs
              </span>
              <span className="text-lg font-black text-emerald-600">{pro.completedJobsCount}+</span>
            </div>
          </div>

          {/* About & Bio */}
          <div>
            <h4 className="text-sm font-bold text-[#0C1C34] mb-2 uppercase tracking-wider text-xs">
              About Professional
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">{pro.bio}</p>
          </div>

          {/* Core Skills & Expertise */}
          <div>
            <h4 className="text-sm font-bold text-[#0C1C34] mb-2.5 uppercase tracking-wider text-xs">
              Verified Skills & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {pro.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0C1C34] shadow-sm flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Verification Proof Badge */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950 block">Verified Identity & Credentials</span>
                <span className="text-[11px] text-emerald-800">{pro.idProofType || 'Govt. Aadhaar + Trade Certificate Verified'}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] font-bold">
              VERIFIED
            </span>
          </div>

          {/* Recent Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[#0C1C34] uppercase tracking-wider text-xs">
                Customer Reviews ({pro.reviews.length})
              </h4>
              <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {pro.rating} Overall
              </span>
            </div>

            {pro.reviews.length > 0 ? (
              <div className="space-y-3">
                {pro.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={rev.customerAvatar}
                          alt={rev.customerName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-[#0C1C34]">{rev.customerName}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B] italic">"{rev.comment}"</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>Service: {rev.serviceName}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No reviews yet for this professional.</p>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleChatNow}
              className="flex-1 py-3 px-4 rounded-2xl border border-[#E2E8F0] text-[#0C1C34] hover:bg-[#F5F7FA] font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#FF7518]" />
              <span>Message / Chat</span>
            </button>

            <button
              onClick={handleBookNow}
              className="flex-1 py-3 px-6 rounded-2xl bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#FF7518]/25 transition-all"
            >
              <span>Book & Negotiate Price</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
