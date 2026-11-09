import React from 'react';
import { Search, Users, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRapidhelp } from '../../context/RapidhelpContext';

export const HowItWorks: React.FC = () => {
  const { setCurrentView, setActiveCustomerTab } = useRapidhelp();

  const steps = [
    {
      step: '01',
      title: 'Search for a Service',
      desc: 'Pick your required service, specify your location, and describe your issue with optional urgency flags.',
      icon: <Search className="w-6 h-6 text-[#FF7518]" />,
      badge: 'Blinkit-Fast',
    },
    {
      step: '02',
      title: 'Compare Nearby Pros',
      desc: 'View real verified ratings, distance, hourly rates, and past completed projects within a 15 km radius.',
      icon: <Users className="w-6 h-6 text-[#FF7518]" />,
      badge: 'Vetted KYC',
    },
    {
      step: '03',
      title: 'Confirm Price & Booking',
      desc: 'Propose your budget or negotiate with transparent counteroffers before any commitment is made.',
      icon: <Calculator className="w-6 h-6 text-[#FF7518]" />,
      badge: 'Zero Surprises',
    },
    {
      step: '04',
      title: 'Get Your Service Done',
      desc: 'Track technician arrival live on the map. Pay securely through UPI or cash only after 100% satisfaction.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#FF7518]" />,
      badge: 'Satisfaction Guarenteed',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#0C1C34]/5 text-[#0C1C34] text-xs font-bold uppercase tracking-wider">
            Simple & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0C1C34] tracking-tight">
            How Rapidhelp Works
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            From identifying a faulty switchboard to having a certified electrician at your door,
            in 4 effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-[#F5F7FA] rounded-3xl p-7 border border-[#E2E8F0] relative hover:shadow-xl hover:border-[#FF7518]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-[#E2E8F0]">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-[#0C1C34]/15">{item.step}</span>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FF7518]/10 text-[#FF7518] text-[10px] font-bold uppercase tracking-wider mb-2">
                  {item.badge}
                </span>

                <h3 className="text-lg font-bold text-[#0C1C34] mb-2">{item.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-[#E2E8F0] flex items-center justify-center text-[#FF7518]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner below How it Works */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#0C1C34] to-[#162B4E] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Have an urgent service issue right now?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Nearby electricians, plumbers, and mechanics are available on-call.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('customer');
              setActiveCustomerTab('find-services');
            }}
            className="px-6 py-3 bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold text-sm rounded-2xl shadow-lg transition-all shrink-0 flex items-center space-x-2"
          >
            <span>Book Instant Help</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
