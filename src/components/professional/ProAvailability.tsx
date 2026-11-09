import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  ToggleRight,
  Clock,
  MapPin,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const ProAvailability: React.FC = () => {
  const {
    proIsOnline,
    setProIsOnline,
    proWorkingHours,
    setProWorkingHours,
    proServiceRadius,
    setProServiceRadius,
    categories,
    triggerToast,
  } = useRapidhelp();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'electrician',
    'appliance-repair',
  ]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleSave = () => {
    triggerToast(
      'Availability Saved',
      `Status: ${proIsOnline ? 'Online' : 'Offline'} • Radius: ${proServiceRadius} km • Working hours updated.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-[#0C1C34]">Availability & Service Preferences</h2>
        <p className="text-xs text-[#64748B]">
          Control when and where you appear in customer searches.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
        {/* Real-time Online / Offline Toggle */}
        <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0C1C34] uppercase tracking-wider block">
              Live Duty Status
            </span>
            <div className="text-sm font-bold text-[#0C1C34] flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  proIsOnline ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'
                }`}
              />
              <span>{proIsOnline ? 'You are ONLINE and receiving requests' : 'You are OFFLINE'}</span>
            </div>
            <p className="text-xs text-[#64748B]">
              When online, customers within {proServiceRadius} km can discover and book your services.
            </p>
          </div>

          <button
            onClick={() => setProIsOnline(!proIsOnline)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              proIsOnline
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
            }`}
          >
            {proIsOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        {/* Working Hours */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#0C1C34] uppercase tracking-wider">
            Daily Working Hours
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-[#64748B] block mb-1">Start Time</span>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="text"
                  value={proWorkingHours.start}
                  onChange={(e) =>
                    setProWorkingHours({ ...proWorkingHours, start: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block mb-1">End Time</span>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="text"
                  value={proWorkingHours.end}
                  onChange={(e) =>
                    setProWorkingHours({ ...proWorkingHours, end: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#FF7518]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Radius Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#0C1C34]">
            <span className="uppercase tracking-wider">Maximum Service Radius</span>
            <span className="text-base font-black text-[#FF7518]">{proServiceRadius} km</span>
          </div>
          <input
            type="range"
            min="3"
            max="30"
            value={proServiceRadius}
            onChange={(e) => setProServiceRadius(Number(e.target.value))}
            className="w-full accent-[#FF7518] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#64748B]">
            <span>3 km (Neighborhood only)</span>
            <span>15 km (Recommended city reach)</span>
            <span>30 km (Entire metro zone)</span>
          </div>
        </div>

        {/* Supported Service Categories */}
        <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
          <label className="block text-xs font-bold text-[#0C1C34] uppercase tracking-wider">
            Supported Service Categories
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                    checked
                      ? 'border-[#FF7518] bg-[#FF7518]/5 text-[#0C1C34]'
                      : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F5F7FA]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {checked && <CheckCircle2 className="w-4 h-4 text-[#FF7518] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0C1C34] hover:bg-[#FF7518] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Save Availability Changes
          </button>
        </div>
      </div>
    </div>
  );
};
