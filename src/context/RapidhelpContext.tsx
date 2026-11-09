import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  ServiceCategory,
  Professional,
  Booking,
  BookingStatus,
  ChatThread,
  ChatMessage,
  AdminMetrics,
  NegotiationHistory,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROFESSIONALS,
  INITIAL_BOOKINGS,
  INITIAL_CHAT_THREADS,
  INITIAL_ADMIN_METRICS,
} from '../data/mockData';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

interface RapidhelpContextType {
  // Navigation & Role
  currentView: 'landing' | 'customer' | 'professional' | 'admin';
  setCurrentView: (view: 'landing' | 'customer' | 'professional' | 'admin') => void;
  activeCustomerTab: string;
  setActiveCustomerTab: (tab: string) => void;
  activeProTab: string;
  setActiveProTab: (tab: string) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;

  // Selected Booking Details View
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  authRole: 'customer' | 'professional';
  setAuthRole: (role: 'customer' | 'professional') => void;

  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  selectedProForBooking: Professional | null;
  setSelectedProForBooking: (pro: Professional | null) => void;

  proProfileModalOpen: boolean;
  setProProfileModalOpen: (open: boolean) => void;
  selectedProForProfile: Professional | null;
  setSelectedProForProfile: (pro: Professional | null) => void;

  counterOfferModalOpen: boolean;
  setCounterOfferModalOpen: (open: boolean) => void;
  selectedBookingForCounter: Booking | null;
  setSelectedBookingForCounter: (booking: Booking | null) => void;

  // Search & Filters for Customer
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
  maxDistanceFilter: number;
  setMaxDistanceFilter: (distance: number) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;
  minRatingFilter: number;
  setMinRatingFilter: (rating: number) => void;
  availabilityFilter: 'all' | 'available' | 'verified';
  setAvailabilityFilter: (filter: 'all' | 'available' | 'verified') => void;
  customerLocation: string;
  setCustomerLocation: (location: string) => void;

  // Marketplace & Data
  categories: ServiceCategory[];
  professionals: Professional[];
  bookings: Booking[];
  chatThreads: ChatThread[];
  activeChatThreadId: string | null;
  setActiveChatThreadId: (id: string | null) => void;
  adminMetrics: AdminMetrics;

  // Pro Specific State (for Ramesh Sharma pro-1)
  currentPro: Professional;
  proIsOnline: boolean;
  setProIsOnline: (online: boolean) => void;
  proWorkingHours: { start: string; end: string };
  setProWorkingHours: (hours: { start: string; end: string }) => void;
  proServiceRadius: number;
  setProServiceRadius: (radius: number) => void;

  // Actions
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'negotiationHistory'>) => string;
  acceptBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string, reason?: string) => void;
  sendCounterOffer: (bookingId: string, amount: number, note: string, byRole: 'customer' | 'professional') => void;
  acceptCounterOffer: (bookingId: string) => void;
  declineCounterOffer: (bookingId: string) => void;
  updateTrackingStatus: (bookingId: string, trackingStatus: Booking['trackingStatus'], eta?: number) => void;
  cancelBooking: (bookingId: string, reason: string) => void;
  completeBooking: (bookingId: string, rating?: number, review?: string) => void;

  // Chat Actions
  sendMessage: (threadId: string, text: string) => void;
  createOrOpenChatWithPro: (proId: string, bookingId?: string) => void;

  // Admin Actions
  verifyProfessional: (proId: string, approve: boolean) => void;
  toggleCategoryStatus: (categoryId: string) => void;
  addNewCategory: (newCategory: Omit<ServiceCategory, 'id' | 'activeProsCount'>) => void;
  updateBookingStatusAdmin: (bookingId: string, status: BookingStatus) => void;

  // Notifications
  notifications: ToastNotification[];
  removeNotification: (id: string) => void;
  triggerToast: (title: string, message: string, type?: ToastNotification['type']) => void;
}

const RapidhelpContext = createContext<RapidhelpContextType | undefined>(undefined);

export const RapidhelpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role states
  const [currentView, setCurrentView] = useState<'landing' | 'customer' | 'professional' | 'admin'>('landing');
  const [activeCustomerTab, setActiveCustomerTab] = useState<string>('overview');
  const [activeProTab, setActiveProTab] = useState<string>('overview');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authRole, setAuthRole] = useState<'customer' | 'professional'>('customer');

  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedProForBooking, setSelectedProForBooking] = useState<Professional | null>(null);

  const [proProfileModalOpen, setProProfileModalOpen] = useState<boolean>(false);
  const [selectedProForProfile, setSelectedProForProfile] = useState<Professional | null>(null);

  const [counterOfferModalOpen, setCounterOfferModalOpen] = useState<boolean>(false);
  const [selectedBookingForCounter, setSelectedBookingForCounter] = useState<Booking | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [maxDistanceFilter, setMaxDistanceFilter] = useState<number>(10);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(4.0);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'verified'>('all');
  const [customerLocation, setCustomerLocation] = useState<string>('Indiranagar, Bengaluru');

  // Persistence with localStorage
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem('rapidhelp_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [professionals, setProfessionals] = useState<Professional[]>(() => {
    const saved = localStorage.getItem('rapidhelp_pros');
    return saved ? JSON.parse(saved) : INITIAL_PROFESSIONALS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rapidhelp_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('rapidhelp_threads');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [activeChatThreadId, setActiveChatThreadId] = useState<string | null>(null);
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>(INITIAL_ADMIN_METRICS);

  // Pro availability state
  const [proIsOnline, setProIsOnline] = useState<boolean>(true);
  const [proWorkingHours, setProWorkingHours] = useState<{ start: string; end: string }>({
    start: '08:00 AM',
    end: '08:00 PM',
  });
  const [proServiceRadius, setProServiceRadius] = useState<number>(15);

  // Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('rapidhelp_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('rapidhelp_pros', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('rapidhelp_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('rapidhelp_threads', JSON.stringify(chatThreads));
  }, [chatThreads]);

  // Keep pro-1 in sync with pro online toggle
  useEffect(() => {
    setProfessionals((prev) =>
      prev.map((p) => (p.id === 'pro-1' ? { ...p, isAvailable: proIsOnline } : p))
    );
  }, [proIsOnline]);

  const currentPro = professionals.find((p) => p.id === 'pro-1') || professionals[0];

  const triggerToast = (
    title: string,
    message: string,
    type: ToastNotification['type'] = 'info'
  ) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, title, message, type, timestamp: new Date() }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Create Booking
  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'negotiationHistory'>
  ): string => {
    const newId = `RH-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = 'Just now';

    const initialNegotiation: NegotiationHistory = {
      id: `neg-${Date.now()}`,
      offeredBy: 'customer',
      offeredByName: bookingData.customerName,
      amount: bookingData.customerProposedBudget,
      note: 'Initial budget offer from customer',
      timestamp: nowStr,
      status: 'pending',
    };

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      negotiationHistory: [initialNegotiation],
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Create or link chat thread
    const existingThread = chatThreads.find((t) => t.participantId === bookingData.professionalId);
    if (!existingThread) {
      const newThread: ChatThread = {
        id: `thread-${Date.now()}`,
        bookingId: newId,
        participantId: bookingData.professionalId,
        participantName: bookingData.professionalName,
        participantAvatar: bookingData.professionalAvatar,
        participantRole: 'professional',
        participantCategory: bookingData.professionalCategory,
        lastMessage: `New booking request #${newId}: Proposed budget ₹${bookingData.customerProposedBudget}`,
        lastMessageTime: nowStr,
        unreadCount: 1,
        messages: [
          {
            id: `msg-${Date.now()}`,
            bookingId: newId,
            senderId: bookingData.customerId,
            senderName: bookingData.customerName,
            senderRole: 'customer',
            senderAvatar: bookingData.customerAvatar,
            text: `Hi ${bookingData.professionalName}, I just submitted a booking request for ${bookingData.category} (${bookingData.serviceDescription}). Proposed budget: ₹${bookingData.customerProposedBudget}`,
            timestamp: nowStr,
          },
        ],
      };
      setChatThreads((prev) => [newThread, ...prev]);
    }

    triggerToast(
      'Booking Request Sent!',
      `Booking #${newId} submitted to ${bookingData.professionalName}. Awaiting response or counteroffer.`,
      'success'
    );

    return newId;
  };

  // Pro accepts booking directly
  const acceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const agreed = b.customerProposedBudget || b.priceBreakdown.totalEstimatedPrice;
          return {
            ...b,
            status: 'Confirmed',
            agreedPrice: agreed,
            estimatedArrivalMinutes: 15,
            trackingStatus: 'pro_assigned',
            priceBreakdown: {
              ...b.priceBreakdown,
              totalEstimatedPrice: agreed,
              isFinalQuotation: true,
            },
            negotiationHistory: b.negotiationHistory.map((nh, idx) =>
              idx === b.negotiationHistory.length - 1 ? { ...nh, status: 'accepted' } : nh
            ),
          };
        }
        return b;
      })
    );

    triggerToast(
      'Booking Confirmed!',
      `Booking #${bookingId} accepted. Price locked and technician scheduled.`,
      'success'
    );
  };

  // Pro rejects booking
  const rejectBooking = (bookingId: string, reason = 'Unavailable at this time slot') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    triggerToast('Booking Declined', `Booking #${bookingId} was declined: ${reason}`, 'warning');
  };

  // Send Counteroffer (either from Pro or Customer)
  const sendCounterOffer = (
    bookingId: string,
    amount: number,
    note: string,
    byRole: 'customer' | 'professional'
  ) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const offererName = byRole === 'professional' ? booking.professionalName : booking.customerName;

    const newOffer: NegotiationHistory = {
      id: `neg-${Date.now()}`,
      offeredBy: byRole,
      offeredByName: offererName,
      amount,
      note,
      timestamp: 'Just now',
      status: 'pending',
    };

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          // Mark previous negotiation offers as countered
          const updatedHistory = b.negotiationHistory.map((nh) =>
            nh.status === 'pending' ? { ...nh, status: 'countered' as const } : nh
          );
          return {
            ...b,
            status: 'Negotiation',
            negotiationHistory: [...updatedHistory, newOffer],
          };
        }
        return b;
      })
    );

    // Also inject message into chat thread
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.bookingId === bookingId || thread.participantId === booking.professionalId) {
          const counterMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            bookingId,
            senderId: byRole === 'professional' ? booking.professionalId : booking.customerId,
            senderName: offererName,
            senderRole: byRole,
            senderAvatar: byRole === 'professional' ? booking.professionalAvatar : booking.customerAvatar,
            text: `Proposed counteroffer: ₹${amount}. Note: "${note}"`,
            timestamp: 'Just now',
            isCounterOffer: true,
            counterOfferAmount: amount,
            counterOfferStatus: 'pending',
          };
          return {
            ...thread,
            lastMessage: `Counteroffer: ₹${amount}`,
            lastMessageTime: 'Just now',
            unreadCount: thread.unreadCount + 1,
            messages: [...thread.messages, counterMsg],
          };
        }
        return thread;
      })
    );

    triggerToast(
      'Counteroffer Sent!',
      `Counteroffer of ₹${amount} sent for Booking #${bookingId}.`,
      'info'
    );
  };

  // Accept Counteroffer
  const acceptCounterOffer = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const latestOffer = b.negotiationHistory[b.negotiationHistory.length - 1];
          const finalPrice = latestOffer ? latestOffer.amount : b.customerProposedBudget;
          return {
            ...b,
            status: 'Confirmed',
            agreedPrice: finalPrice,
            estimatedArrivalMinutes: 14,
            trackingStatus: 'pro_assigned',
            priceBreakdown: {
              ...b.priceBreakdown,
              totalEstimatedPrice: finalPrice,
              isFinalQuotation: true,
            },
            negotiationHistory: b.negotiationHistory.map((nh, idx) =>
              idx === b.negotiationHistory.length - 1 ? { ...nh, status: 'accepted' as const } : nh
            ),
          };
        }
        return b;
      })
    );

    triggerToast(
      'Price Agreed & Confirmed!',
      `Counteroffer accepted. Booking #${bookingId} is now Confirmed!`,
      'success'
    );
  };

  // Decline Counteroffer
  const declineCounterOffer = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'Cancelled',
            negotiationHistory: b.negotiationHistory.map((nh, idx) =>
              idx === b.negotiationHistory.length - 1 ? { ...nh, status: 'declined' as const } : nh
            ),
          };
        }
        return b;
      })
    );
    triggerToast('Offer Declined', `Negotiation ended and booking #${bookingId} cancelled.`, 'warning');
  };

  // Tracking status update (simulation)
  const updateTrackingStatus = (
    bookingId: string,
    trackingStatus: Booking['trackingStatus'],
    eta?: number
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          let updatedBookingStatus = b.status;
          if (trackingStatus === 'en_route' || trackingStatus === 'arrived' || trackingStatus === 'work_in_progress') {
            updatedBookingStatus = 'In Progress';
          } else if (trackingStatus === 'completed') {
            updatedBookingStatus = 'Completed';
          }
          return {
            ...b,
            status: updatedBookingStatus,
            trackingStatus,
            estimatedArrivalMinutes: eta !== undefined ? eta : b.estimatedArrivalMinutes,
          };
        }
        return b;
      })
    );

    const labels: Record<string, string> = {
      pro_assigned: 'Professional Assigned',
      en_route: 'Technician is On the Way 🛵',
      arrived: 'Technician has Arrived at Doorstep 🚪',
      work_in_progress: 'Service Work In Progress ⚡',
      completed: 'Job Completed Successfully ✅',
    };

    triggerToast('Live Status Update', labels[trackingStatus || ''] || 'Status updated', 'info');
  };

  // Cancel Booking
  const cancelBooking = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    triggerToast('Booking Cancelled', `Booking #${bookingId} cancelled: ${reason}`, 'warning');
  };

  // Complete Booking
  const completeBooking = (bookingId: string, rating = 5, review = '') => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'Completed',
              trackingStatus: 'completed',
              ratingGiven: rating,
              reviewGiven: review,
            }
          : b
      )
    );
    triggerToast('Service Completed!', `Thank you! Booking #${bookingId} marked completed.`, 'success');
  };

  // Messaging & Auto-simulation
  const sendMessage = (threadId: string, text: string) => {
    const thread = chatThreads.find((t) => t.id === threadId);
    if (!thread) return;

    const senderRole = currentView === 'professional' ? 'professional' : 'customer';
    const senderName = senderRole === 'professional' ? 'Ramesh Sharma' : 'Aakash Verma';
    const senderAvatar =
      senderRole === 'professional'
        ? 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      bookingId: thread.bookingId,
      senderId: senderRole === 'professional' ? 'pro-1' : 'cust-1',
      senderName,
      senderRole,
      senderAvatar,
      text,
      timestamp: 'Just now',
    };

    setChatThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMessage: text,
              lastMessageTime: 'Just now',
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    // If sent by customer, simulate polite professional response
    if (senderRole === 'customer') {
      setTimeout(() => {
        const replies = [
          'Understood! I will reach your doorstep shortly.',
          'Noted! I have the spare parts ready in my toolkit.',
          'Thank you for confirming. I am currently 5 minutes away.',
          'Got it! Please keep the main breaker switch accessible.',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const autoReplyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          bookingId: thread.bookingId,
          senderId: thread.participantId,
          senderName: thread.participantName,
          senderRole: 'professional',
          senderAvatar: thread.participantAvatar,
          text: randomReply,
          timestamp: 'Just now',
        };

        setChatThreads((prevThreads) =>
          prevThreads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  lastMessage: randomReply,
                  lastMessageTime: 'Just now',
                  messages: [...t.messages, autoReplyMsg],
                }
              : t
          )
        );
      }, 1500);
    }
  };

  const createOrOpenChatWithPro = (proId: string, bookingId?: string) => {
    const existingThread = chatThreads.find((t) => t.participantId === proId);
    if (existingThread) {
      setActiveChatThreadId(existingThread.id);
    } else {
      const pro = professionals.find((p) => p.id === proId);
      if (!pro) return;
      const newThread: ChatThread = {
        id: `thread-${Date.now()}`,
        bookingId,
        participantId: pro.id,
        participantName: pro.name,
        participantAvatar: pro.avatar,
        participantRole: 'professional',
        participantCategory: pro.category,
        lastMessage: 'Conversation started',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [],
      };
      setChatThreads((prev) => [newThread, ...prev]);
      setActiveChatThreadId(newThread.id);
    }
  };

  // Admin Actions
  const verifyProfessional = (proId: string, approve: boolean) => {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === proId
          ? {
              ...p,
              verificationStatus: approve ? 'verified' : 'rejected',
              isVerified: approve,
            }
          : p
      )
    );
    setAdminMetrics((prev) => ({
      ...prev,
      pendingVerifications: Math.max(0, prev.pendingVerifications - 1),
    }));
    triggerToast(
      approve ? 'Pro Verified!' : 'Verification Declined',
      `Professional ${proId} has been ${approve ? 'approved with blue badge' : 'declined'}.`,
      approve ? 'success' : 'warning'
    );
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, isActive: !c.isActive } : c))
    );
    triggerToast('Category Updated', 'Service category visibility updated.', 'info');
  };

  const addNewCategory = (newCat: Omit<ServiceCategory, 'id' | 'activeProsCount'>) => {
    const id = newCat.name.toLowerCase().replace(/\s+/g, '-');
    const category: ServiceCategory = {
      ...newCat,
      id,
      activeProsCount: 12,
    };
    setCategories((prev) => [...prev, category]);
    triggerToast('Category Added', `Category "${newCat.name}" is now active in marketplace.`, 'success');
  };

  const updateBookingStatusAdmin = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
    triggerToast('Admin Override', `Booking #${bookingId} status changed to ${status}.`, 'info');
  };

  return (
    <RapidhelpContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeCustomerTab,
        setActiveCustomerTab,
        activeProTab,
        setActiveProTab,
        activeAdminTab,
        setActiveAdminTab,

        selectedBookingId,
        setSelectedBookingId,

        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        authRole,
        setAuthRole,

        bookingModalOpen,
        setBookingModalOpen,
        selectedProForBooking,
        setSelectedProForBooking,

        proProfileModalOpen,
        setProProfileModalOpen,
        selectedProForProfile,
        setSelectedProForProfile,

        counterOfferModalOpen,
        setCounterOfferModalOpen,
        selectedBookingForCounter,
        setSelectedBookingForCounter,

        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        maxDistanceFilter,
        setMaxDistanceFilter,
        maxPriceFilter,
        setMaxPriceFilter,
        minRatingFilter,
        setMinRatingFilter,
        availabilityFilter,
        setAvailabilityFilter,
        customerLocation,
        setCustomerLocation,

        categories,
        professionals,
        bookings,
        chatThreads,
        activeChatThreadId,
        setActiveChatThreadId,
        adminMetrics,

        currentPro,
        proIsOnline,
        setProIsOnline,
        proWorkingHours,
        setProWorkingHours,
        proServiceRadius,
        setProServiceRadius,

        createBooking,
        acceptBooking,
        rejectBooking,
        sendCounterOffer,
        acceptCounterOffer,
        declineCounterOffer,
        updateTrackingStatus,
        cancelBooking,
        completeBooking,

        sendMessage,
        createOrOpenChatWithPro,

        verifyProfessional,
        toggleCategoryStatus,
        addNewCategory,
        updateBookingStatusAdmin,

        notifications,
        removeNotification,
        triggerToast,
      }}
    >
      {children}
    </RapidhelpContext.Provider>
  );
};

export const useRapidhelp = () => {
  const context = useContext(RapidhelpContext);
  if (!context) {
    throw new Error('useRapidhelp must be used within a RapidhelpProvider');
  }
  return context;
};
