import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { CustomerOverview } from './CustomerOverview';
import { FindServices } from './FindServices';
import { MyBookings } from './MyBookings';
import { BookingDetailsView } from '../booking/BookingDetailsView';
import { MessagingCenter } from '../chat/MessagingCenter';
import {
  CustomerPaymentsTab,
  CustomerReviewsTab,
  CustomerProfileTab,
} from './CustomerSecondaryTabs';
import { ProProfileModal } from './ProProfileModal';
import { BookingModal } from './BookingModal';
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  MessageSquare,
  CreditCard,
  Star,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    activeCustomerTab,
    setActiveCustomerTab,
    selectedBookingId,
    setSelectedBookingId,
    bookings,
    customerLocation,
    setCurrentView,
    triggerToast,
  } = useRapidhelp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeBookingsCount = bookings.filter(
    (b) =>
      b.status === 'Pending' ||
      b.status === 'Negotiation' ||
      b.status === 'Confirmed' ||
      b.status === 'In Progress'
  ).length;

  const handleTabChange = (tab: string) => {
    setActiveCustomerTab(tab);
    setSelectedBookingId(null);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'find-services', label: 'Find Services', icon: Search },
    {
      id: 'my-bookings',
      label: 'My Bookings',
      icon: CalendarCheck,
      badge: activeBookingsCount > 0 ? activeBookingsCount : undefined,
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-[#0C1C34] hover:bg-[#F5F7FA]"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="text-sm font-black text-[#0C1C34]">
          Customer Portal • <span className="text-[#FF7518] capitalize">{activeCustomerTab.replace('-', ' ')}</span>
        </span>
        <div className="w-8" />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar (3 Cols) */}
          <aside
            className={`lg:col-span-3 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 space-y-6 ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Customer Profile Snapshot */}
            <div className="p-3 bg-[#F5F7FA] rounded-2xl flex items-center space-x-3 border border-[#E2E8F0]/60">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                alt="Aakash Verma"
                className="w-11 h-11 rounded-xl object-cover border-2 border-[#FF7518]"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#0C1C34] truncate">Aakash Verma</div>
                <div className="text-[10px] text-[#64748B] flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-[#FF7518]" />
                  <span>{customerLocation}</span>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeCustomerTab === item.id && !selectedBookingId;
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
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FF7518] text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout / Switch Role */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  triggerToast('Logged Out', 'Returned to landing page.');
                }}
                className="w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Canvas (9 Cols) */}
          <main className="lg:col-span-9 space-y-6">
            {selectedBookingId ? (
              <BookingDetailsView />
            ) : (
              <>
                {activeCustomerTab === 'overview' && <CustomerOverview />}
                {activeCustomerTab === 'find-services' && <FindServices />}
                {activeCustomerTab === 'my-bookings' && <MyBookings />}
                {activeCustomerTab === 'messages' && <MessagingCenter />}
                {activeCustomerTab === 'payments' && <CustomerPaymentsTab />}
                {activeCustomerTab === 'reviews' && <CustomerReviewsTab />}
                {activeCustomerTab === 'profile' && <CustomerProfileTab />}
                {activeCustomerTab === 'settings' && <CustomerProfileTab />}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <ProProfileModal />
      <BookingModal />
    </div>
  );
};
