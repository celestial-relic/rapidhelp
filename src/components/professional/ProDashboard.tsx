import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { ProOverview } from './ProOverview';
import { IncomingRequests } from './IncomingRequests';
import { ProEarnings } from './ProEarnings';
import { ProAvailability } from './ProAvailability';
import { CounterofferModal } from './CounterofferModal';
import { MessagingCenter } from '../chat/MessagingCenter';
import { MyBookings } from '../customer/MyBookings';
import {
  LayoutDashboard,
  BellRing,
  CalendarCheck,
  TrendingUp,
  Clock,
  Star,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export const ProDashboard: React.FC = () => {
  const {
    activeProTab,
    setActiveProTab,
    currentPro,
    proIsOnline,
    bookings,
    setCurrentView,
    triggerToast,
  } = useRapidhelp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingRequestsCount = bookings.filter((b) => b.status === 'Pending').length;

  const handleTabChange = (tab: string) => {
    setActiveProTab(tab);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'incoming-requests',
      label: 'Incoming Requests',
      icon: BellRing,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { id: 'my-bookings', label: 'My Bookings', icon: CalendarCheck },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'messages', label: 'Messages', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Mobile Bar */}
      <div className="lg:hidden bg-white px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-[#0C1C34] hover:bg-[#F5F7FA]"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="text-sm font-black text-[#0C1C34]">
          Provider Portal • <span className="text-[#FF7518] capitalize">{activeProTab.replace('-', ' ')}</span>
        </span>
        <div className="w-8" />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Pro Sidebar (3 Cols) */}
          <aside
            className={`lg:col-span-3 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 space-y-6 ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Pro Profile Badge */}
            <div className="p-3 bg-[#F5F7FA] rounded-2xl flex items-center space-x-3 border border-[#E2E8F0]/60">
              <div className="relative">
                <img
                  src={currentPro.avatar}
                  alt={currentPro.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-[#FF7518]"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    proIsOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#0C1C34] truncate">{currentPro.name}</div>
                <div className="text-[10px] text-[#64748B] truncate">
                  {currentPro.category} • {proIsOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeProTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0C1C34] text-white shadow-md'
                        : 'text-[#64748B] hover:text-[#0C1C34] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF7518]' : ''}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FF7518] text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Switch / Sign Out */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  triggerToast('Logged Out', 'Returned to landing page.');
                }}
                className="w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Portal</span>
              </button>
            </div>
          </aside>

          {/* Main Pro Canvas (9 Cols) */}
          <main className="lg:col-span-9 space-y-6">
            {activeProTab === 'overview' && <ProOverview />}
            {activeProTab === 'incoming-requests' && <IncomingRequests />}
            {activeProTab === 'my-bookings' && <MyBookings />}
            {activeProTab === 'earnings' && <ProEarnings />}
            {activeProTab === 'availability' && <ProAvailability />}
            {activeProTab === 'messages' && <MessagingCenter />}
            {activeProTab === 'profile' && <ProAvailability />}
            {activeProTab === 'settings' && <ProAvailability />}
          </main>
        </div>
      </div>

      <CounterofferModal />
    </div>
  );
};
