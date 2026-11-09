import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  Users,
  BellRing,
  ToggleRight,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const ProCtaSection: React.FC = () => {
  const { setAuthModalOpen, setAuthMode, setAuthRole, setCurrentView } = useRapidhelp();

  const handleJoinPro = () => {
    setAuthRole('professional');
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const proBenefits = [
    {
      title: 'Reach More Customers',
      desc: 'Get discovered by thousands of homeowners and commercial offices within your preferred service radius.',
      icon: <Users className="w-5 h-5 text-[#FF7518]" />,
    },
    {
      title: 'Receive Instant Requests',
      desc: 'No bidding wars. Direct service bookings land straight in your dashboard with clear budget proposals.',
      icon: <BellRing className="w-5 h-5 text-[#FF7518]" />,
    },
    {
      title: 'Manage Your Availability',
      desc: 'Work on your own terms. Toggle online/offline anytime, set your work hours, and control your service radius.',
      icon: <ToggleRight className="w-5 h-5 text-[#FF7518]" />,
    },
    {
      title: 'Build Your Professional Reputation',
      desc: 'Collect verified reviews, earn badges like "Top Rated" or "Super Pro", and charge premium rates as you grow.',
      icon: <TrendingUp className="w-5 h-5 text-[#FF7518]" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C1C34] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF7518]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Headline and Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FF7518] text-xs font-bold uppercase tracking-wider">
                <span>For Skilled Technicians & Tradespeople</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Turn Your Skills <br />
                <span className="text-[#FF7518]">Into Opportunities.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                Whether you are an independent electrician, master plumber, AC technician, or
                carpenter, Rapidhelp connects you with high-intent paying customers nearby with zero
                lead fees.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {proBenefits.map((b) => (
                  <div key={b.title} className="flex items-start space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{b.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleJoinPro}
                  className="px-8 py-3.5 bg-[#FF7518] hover:bg-[#E8630A] text-white font-bold text-sm rounded-2xl shadow-xl shadow-[#FF7518]/25 hover:shadow-2xl transition-all flex items-center space-x-2"
                >
                  <span>Join as a Professional</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('professional')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-2xl border border-white/15 transition-all"
                >
                  <span>Explore Provider Portal</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fast 24-Hour Verification • Instant Payouts via UPI</span>
              </div>
            </div>

            {/* Right Column: Earnings Highlight & Pro Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160&auto=format&fit=crop&q=80"
                      alt="Ramesh Sharma"
                      className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">Ramesh Sharma</h4>
                      <div className="text-xs text-slate-300">Licensed Electrician</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    Online
                  </span>
                </div>

                {/* Simulated Earnings Snapshot */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">This Month</span>
                    <span className="text-2xl font-black text-white">₹48,250</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">↑ 24% vs last month</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Jobs Done</span>
                    <span className="text-2xl font-black text-white">38</span>
                    <span className="text-[10px] text-amber-300 block mt-0.5">4.9 ★ Rating</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Average Daily Inquiries:</span>
                    <span className="font-bold text-white">4–6 Requests</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Direct UPI Payouts:</span>
                    <span className="font-bold text-emerald-400">Same Day (Zero Hold)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FF7518]/20 border border-[#FF7518]/30 rounded-xl text-center text-xs text-[#FF7518] font-bold">
                  🚀 Register today and get ₹500 welcome bonus on your first 3 completed jobs!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
