import React, { useState } from 'react';
import { Booking } from '../../types';
import { useRapidhelp } from '../../context/RapidhelpContext';
import {
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface LiveTrackingMapProps {
  booking: Booking;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ booking }) => {
  const { updateTrackingStatus } = useRapidhelp();

  // Coordinates simulation for pro marker
  // 0% -> pro starts, 100% -> customer doorstep
  const getSimulatedCoords = () => {
    switch (booking.trackingStatus) {
      case 'pro_assigned':
        return { x: 20, y: 30, text: 'Preparing toolkit at service hub' };
      case 'en_route':
        return { x: 55, y: 50, text: 'En route on 100ft Inner Ring Road' };
      case 'arrived':
        return { x: 80, y: 70, text: 'Arrived at your gate / entrance' };
      case 'work_in_progress':
        return { x: 82, y: 72, text: 'Service in progress' };
      case 'completed':
        return { x: 82, y: 72, text: 'Service completed successfully' };
      default:
        return { x: 30, y: 40, text: 'Dispatched' };
    }
  };

  const coords = getSimulatedCoords();

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
      {/* Map Header Status Banner */}
      <div className="bg-[#0C1C34] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#FF7518]/20 border border-[#FF7518]/30 flex items-center justify-center text-[#FF7518]">
            <Navigation className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{booking.professionalName}</span>
              <span className="text-[#FF7518]">•</span>
              <span className="text-slate-300 capitalize">
                {booking.trackingStatus ? booking.trackingStatus.replace('_', ' ') : 'Scheduled'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">{coords.text}</div>
          </div>
        </div>

        {booking.status === 'In Progress' && (
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-[#FF7518]" />
            <span className="text-xs font-bold text-white">
              ETA: {booking.estimatedArrivalMinutes || 8} mins away
            </span>
          </div>
        )}
      </div>

      {/* Interactive Simulated Map Canvas */}
      <div className="relative w-full h-72 sm:h-80 bg-slate-100 overflow-hidden select-none">
        {/* Vector City Grid Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle street grids */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f1f5f9" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Major simulated avenue routes */}
          <path
            d="M -20 180 Q 200 120 400 240 T 900 160"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="14"
            opacity="0.5"
          />
          <path
            d="M 120 -20 Q 240 180 320 380"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="10"
            opacity="0.5"
          />

          {/* Active Navigation Path (Dashed with orange accent) */}
          <path
            d="M 120 100 Q 280 140 450 180 T 600 220"
            fill="none"
            stroke="#FF7518"
            strokeWidth="4"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          {/* Parks & Water bodies */}
          <rect x="30" y="220" width="120" height="70" rx="10" fill="#dcfce7" opacity="0.6" />
          <text x="50" y="260" fill="#15803d" fontSize="10" fontWeight="bold">
            Indiranagar Park
          </text>
        </svg>

        {/* Landmarks Labels */}
        <div className="absolute top-4 left-6 px-2 py-1 bg-white/80 backdrop-blur rounded shadow-sm text-[10px] font-semibold text-[#0C1C34] border border-slate-200">
          📍 100ft Road Signal
        </div>
        <div className="absolute bottom-6 left-12 px-2 py-1 bg-white/80 backdrop-blur rounded shadow-sm text-[10px] font-semibold text-[#0C1C34] border border-slate-200">
          📍 Metro Station Pillar 124
        </div>

        {/* Destination: Customer Doorstep Pin */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-full transition-all duration-700"
          style={{ left: '80%', top: '72%' }}
        >
          <div className="relative flex flex-col items-center">
            {/* Radar wave */}
            <div className="absolute -bottom-2 w-10 h-10 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="px-2.5 py-1 bg-[#0C1C34] text-white rounded-lg shadow-lg text-[10px] font-bold whitespace-nowrap mb-1 border border-white/20">
              🏠 Your Location
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Origin / Moving Technician Marker */}
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-full transition-all duration-1000 ease-out"
          style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
        >
          <div className="relative flex flex-col items-center">
            <div className="px-2.5 py-1 bg-[#FF7518] text-white rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap mb-1 flex items-center space-x-1">
              <span>🛵 {booking.professionalName}</span>
              <span className="text-white/80 text-[9px]">(Pro)</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0C1C34] border-2 border-[#FF7518] text-white flex items-center justify-center shadow-2xl relative">
              <img
                src={booking.professionalAvatar}
                alt={booking.professionalName}
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Simulation Controls Bar (Requested for rich interactive experience) */}
      <div className="p-4 bg-[#F5F7FA] border-t border-[#E2E8F0] space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#0C1C34]">
          <span className="flex items-center gap-1.5 text-[#FF7518]">
            <Play className="w-3.5 h-3.5 fill-[#FF7518]" />
            Live Dispatch Simulator (Test Technician Progress)
          </span>
          <span className="text-[11px] text-[#64748B]">Click any step to preview</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => updateTrackingStatus(booking.id, 'en_route', 12)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
              booking.trackingStatus === 'en_route'
                ? 'bg-[#FF7518] text-white border-[#FF7518] shadow'
                : 'bg-white text-[#0C1C34] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            🛵 1. On The Way (12m)
          </button>

          <button
            onClick={() => updateTrackingStatus(booking.id, 'en_route', 3)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
              booking.estimatedArrivalMinutes === 3
                ? 'bg-[#FF7518] text-white border-[#FF7518] shadow'
                : 'bg-white text-[#0C1C34] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            ⚡ 2. Arriving Soon (3m)
          </button>

          <button
            onClick={() => updateTrackingStatus(booking.id, 'arrived', 0)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
              booking.trackingStatus === 'arrived'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                : 'bg-white text-[#0C1C34] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            🚪 3. Arrived at Door
          </button>

          <button
            onClick={() => updateTrackingStatus(booking.id, 'work_in_progress', 0)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
              booking.trackingStatus === 'work_in_progress'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                : 'bg-white text-[#0C1C34] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            🔧 4. Work in Progress
          </button>
        </div>
      </div>
    </div>
  );
};
