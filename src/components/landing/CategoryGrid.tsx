import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  Zap,
  Wrench,
  Wind,
  Hammer,
  Sparkles,
  Cpu,
  Paintbrush,
  Car,
  ArrowRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { ServiceCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { categories, setCurrentView, setActiveCustomerTab, setSelectedCategoryFilter } =
    useRapidhelp();

  // Helper to render icon component based on string identifier
  const getCategoryIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7' };
    switch (iconName) {
      case 'Zap':
        return <Zap {...props} className="w-7 h-7 text-[#FF7518]" />;
      case 'Wrench':
        return <Wrench {...props} className="w-7 h-7 text-sky-600" />;
      case 'Wind':
        return <Wind {...props} className="w-7 h-7 text-teal-600" />;
      case 'Hammer':
        return <Hammer {...props} className="w-7 h-7 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-7 h-7 text-violet-600" />;
      case 'Cpu':
        return <Cpu {...props} className="w-7 h-7 text-indigo-600" />;
      case 'Paintbrush':
        return <Paintbrush {...props} className="w-7 h-7 text-pink-600" />;
      case 'Car':
        return <Car {...props} className="w-7 h-7 text-rose-600" />;
      default:
        return <Wrench {...props} className="w-7 h-7 text-[#FF7518]" />;
    }
  };

  const handleExploreCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setCurrentView('customer');
    setActiveCustomerTab('find-services');
  };

  return (
    <section id="services" className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF7518]/10 text-[#FF7518] text-xs font-bold uppercase tracking-wider">
              <span>Hyperlocal Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C1C34] tracking-tight">
              Popular Service Categories
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Browse vetted and certified service professionals ready to arrive within minutes
              anywhere in your city.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setCurrentView('customer');
              setActiveCustomerTab('find-services');
            }}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-[#FF7518] hover:text-[#E8630A] transition-colors group"
          >
            <span>View All Categories & Rates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat: ServiceCategory) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#FF7518]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Active Pros Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F7FA] group-hover:bg-[#FF7518]/10 flex items-center justify-center transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#F5F7FA] text-[#64748B] text-xs font-semibold group-hover:text-[#0C1C34] transition-colors">
                    {cat.activeProsCount} Pros nearby
                  </span>
                </div>

                {/* Name & Description */}
                <h3 className="text-lg font-bold text-[#0C1C34] mb-2 group-hover:text-[#FF7518] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>

                {/* Popular service chips */}
                <div className="space-y-1.5 mb-5">
                  {cat.popularServices.slice(0, 2).map((sub, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-[#0C1C34]/80 flex items-center space-x-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#FF7518]" />
                      <span className="truncate">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer: Price & Explore Button */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] block uppercase font-bold tracking-wider">
                    Starting from
                  </span>
                  <span className="text-base font-extrabold text-[#0C1C34]">
                    ₹{cat.startingPrice}
                  </span>
                </div>

                <button
                  onClick={() => handleExploreCategory(cat.id)}
                  className="px-4 py-2 rounded-xl bg-[#0C1C34] text-white hover:bg-[#FF7518] text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 group-hover:shadow-md"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
