import React from 'react';
import { RapidhelpProvider, useRapidhelp } from './context/RapidhelpContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { NotificationToast } from './components/common/NotificationToast';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ProDashboard } from './components/professional/ProDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useRapidhelp();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Sticky Role Switcher for instant Demo testing across all user roles */}
      <RoleSwitcherBar />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Dynamic View rendering */}
      <div className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'customer' && <CustomerDashboard />}
        {currentView === 'professional' && <ProDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Toasts */}
      <AuthModal />
      <NotificationToast />
    </div>
  );
};

export function App() {
  return (
    <RapidhelpProvider>
      <MainContent />
    </RapidhelpProvider>
  );
}

export default App;
