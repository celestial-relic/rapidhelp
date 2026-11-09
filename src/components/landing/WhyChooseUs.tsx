import React from 'react';
import {
  ShieldCheck,
  Tag,
  Radio,
  Zap,
  CreditCard,
  MessageSquareCheck,
  Check,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      title: 'Verified Professionals',
      desc: '100% of providers undergo strict identity verification, government ID checks, trade certification reviews, and criminal background checks.',
      icon: <ShieldCheck className="w-6 h-6 text-[#16A34A]" />,
      features: ['Aadhaar & Police KYC', 'Trade Skill Assessed', 'Regular Quality Audits'],
    },
    {
      title: 'Transparent Pricing',
      desc: 'No arbitrary quotes. Receive clear itemized breakdowns (base charge, distance fee, urgency rate, parts) with direct negotiation rights.',
      icon: <Tag className="w-6 h-6 text-[#FF7518]" />,
      features: ['Counteroffer Negotiation', 'Upfront Itemized Estimates', 'No Hidden Fees'],
    },
    {
      title: 'Real-Time Availability',
      desc: 'Instant GPS-matched dispatch. Know who is online, ready, and able to arrive at your door in 15–30 minutes without calling ten different people.',
      icon: <Radio className="w-6 h-6 text-sky-600" />,
      features: ['Live Status & Distance', 'Blinkit-style Matching', 'Emergency Roadside Help'],
    },
    {
      title: 'Easy Booking',
      desc: 'Book in less than 60 seconds from any phone, laptop, or tablet. Schedule now or reserve a preferred future time slot effortlessly.',
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      features: ['1-Click Re-order', 'Flexible Time Slots', 'Quick Voice/Chat Notes'],
    },
    {
      title: 'Secure Payments',
      desc: 'Pay safely through UPI, cards, net banking, or pay-on-completion cash. Funds are held in escrow until you approve the completed work.',
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
      features: ['UPI & Card Support', 'Escrow Price Protection', 'Instant Digital Receipts'],
    },
    {
      title: 'Authentic Customer Reviews',
      desc: 'Every review is tied to a verified booking ID. Read real feedback, ratings, and customer pictures before deciding who to invite inside.',
      icon: <MessageSquareCheck className="w-6 h-6 text-emerald-600" />,
      features: ['Verified Booking Only', 'Honest 5-Star Ratings', 'Provider Response Threads'],
    },
  ];

  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wider">
            Built for Trust & Quality
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0C1C34] tracking-tight">
            Why Choose Rapidhelp?
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Engineered to remove every frustration of traditional home services: uncertainty,
            price gouging, delayed arrivals, and untrusted handymen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#0C1C34]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0C1C34] mb-3">{item.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#E2E8F0]">
                {item.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#0C1C34] font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
