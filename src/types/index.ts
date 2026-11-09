export type UserRole = 'customer' | 'professional' | 'admin' | 'guest';

export type BookingStatus =
  | 'Pending'
  | 'Accepted'
  | 'Negotiation'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  startingPrice: number;
  popularServices: string[];
  activeProsCount: number;
  averageTime: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  startingPrice: number;
  hourlyRate: number;
  isAvailable: boolean;
  isVerified: boolean;
  experienceYears: number;
  location: string;
  coordinates: { x: number; y: number }; // Percentage for simulated map
  phone: string;
  bio: string;
  skills: string[];
  completedJobsCount: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  idProofType?: string;
  badge?: 'Top Rated' | 'Express 15m' | 'Super Pro' | 'Verified Partner';
  reviews: Review[];
}

export interface PriceBreakdown {
  baseServiceCharge: number;
  distanceCharge: number;
  urgencyCharge: number;
  additionalWorkCharge: number;
  discount: number;
  totalEstimatedPrice: number;
  isFinalQuotation: boolean;
}

export interface NegotiationHistory {
  id: string;
  offeredBy: 'customer' | 'professional';
  offeredByName: string;
  amount: number;
  note: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  customerPhone: string;
  customerAddress: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalPhone: string;
  professionalCategory: string;
  serviceDescription: string;
  category: string;
  bookingDate: string;
  scheduledTime: string;
  urgency: 'Normal' | 'Urgent (Within 1 Hour)' | 'Scheduled';
  status: BookingStatus;
  priceBreakdown: PriceBreakdown;
  customerProposedBudget: number;
  agreedPrice?: number;
  negotiationHistory: NegotiationHistory[];
  estimatedArrivalMinutes?: number;
  trackingStatus?: 'pro_assigned' | 'en_route' | 'arrived' | 'work_in_progress' | 'completed';
  createdAt: string;
  problemPhotos?: string[];
  ratingGiven?: number;
  reviewGiven?: string;
}

export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'professional' | 'system';
  senderAvatar: string;
  text: string;
  timestamp: string;
  isCounterOffer?: boolean;
  counterOfferAmount?: number;
  counterOfferStatus?: 'pending' | 'accepted' | 'declined';
}

export interface ChatThread {
  id: string;
  bookingId?: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: 'customer' | 'professional';
  participantCategory?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface AdminMetrics {
  totalCustomers: number;
  totalProfessionals: number;
  totalBookings: number;
  completedBookings: number;
  pendingVerifications: number;
  reportedIssues: number;
  totalRevenue: number;
}
