# RAPIDHELP — Hyperlocal On-Demand Service Marketplace

> **Tagline:** *Find • Book • Get It Done*  
> Modern, premium, fully responsive on-demand service marketplace prototype connecting customers with nearby certified skilled professionals (electricians, plumbers, mechanics, carpenters, AC technicians, cleaners, etc.).

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎨 Brand Identity & Design System

RAPIDHELP follows a cohesive, funded startup-grade design language:
- **Primary Navy:** `#0C1C34` (Headers, authority elements, dark cards)
- **Primary Orange:** `#FF7518` (Primary CTAs, badges, action highlights)
- **Background:** `#F5F7FA` (Clean soft background)
- **White:** `#FFFFFF` (Elevated card surfaces)
- **Secondary Text:** `#64748B` (Subtitles, meta values)
- **Borders:** `#E2E8F0` (Card borders)
- **Success:** `#16A34A` (Verified KYC badges, locked quotations)
- **Typography:** `Inter` + `Plus Jakarta Sans`

---

## ✨ Features & Modules

### 1. 🏠 High-Conversion Landing Page
- **Hero Section:** Dynamic location picker (`📍 Indiranagar, Bengaluru`), trending repair tags, and direct search dispatch.
- **Visual Scene:** Live illustration showing customer connecting with verified electrician (1.2 km away, 12 min ETA, ₹549 agreed quote).
- **Popular Service Categories:** 8 icon-based service cards (Electrician, Plumbing, AC Repair, Carpenter, Cleaning, Appliance Repair, Painting, Vehicle Mechanic).
- **How It Works:** 4-step transparent flow (Search ➔ Compare ➔ Confirm & Negotiate ➔ Get It Done).
- **Why Choose Us:** 6 value props (KYC vetting, transparent pricing, real-time availability, 1-click booking, escrow payments, verified reviews).
- **Become a Professional Section:** Benefits and earnings overview for technicians.
- **Corporate Footer:** Full support contacts, legal links, and internal portals.

### 2. 👤 Customer Dashboard
- **Overview:** Booking summaries (Total, Active, Completed, Pending), quick service shortcuts, and featured top-rated pros.
- **Service Search & Filter:**
  - Name/keyword search and category filter.
  - **Distance Radius Slider:** 1 km to 25 km.
  - **Price Range Slider:** Filter by maximum starting fee.
  - **Rating Buttons:** 4.0★, 4.5★, 4.8★ filters.
  - **Availability:** Online Now vs All.
  - **Sorting:** By Recommended, Closest Distance, Highest Rated, Lowest Starting Price.
- **Nearby Professionals Cards:** Ratings, distance, verified badge, starting rate, *"View Profile"*, and *"Book Now"*.
- **Verified Pro Profile Modal:** Bio, credentials, verified skills chips, starting/hourly rates, and customer reviews.
- **My Bookings:** Status indicators (`Pending`, `Negotiation`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`).

### 3. 🤝 Booking & Price Negotiation System
- **Job Scope Form:** Describe issue, select address, and pick urgency (`Urgent (Within 1 Hour) +₹150`, `Normal`, or `Scheduled`).
- **Transparent Price Calculator:**
  - Base Service Inspection Fee
  - Distance Charge (per km)
  - Urgency Priority Fee
  - Minor Consumables Buffer
  - Final Estimated Total
- **Budget Proposal & Negotiation:**
  - Customer can propose custom budget or select quick chips.
  - Clearly distinguishes estimated prices from confirmed quotations.
  - Two-sided workflow: Provider can **Accept Job** or **Send Counteroffer** with a custom price and explanation.
  - Customer can accept counteroffer or decline.

### 4. 📍 Booking Details & Live GPS Tracking
- **Booking Reference Card:** Booking ID (e.g., `#RH-9021`), masked phone call simulation, technician profile, and locked quotation breakdown.
- **Progress Stepper:** `Request Placed` ➔ `Price Agreed` ➔ `Confirmed` ➔ `In Progress` ➔ `Completed`.
- **Interactive Simulated GPS Map:**
  - Vector street grid and avenue routes.
  - Customer doorstep marker with radar pulse.
  - Moving technician marker with coordinates.
  - **Live Dispatch Simulator:** Interactive buttons to preview the technician's journey in real-time (`🛵 On The Way`, `⚡ Arriving Soon`, `🚪 Arrived at Door`, `🔧 Work in Progress`).
- **Actions:** Cancel booking with reason selection, or mark completed with 5-star review submission.

### 5. 💬 In-App Messaging Center
- Booking-linked chat threads between customers and technicians.
- **Embedded Negotiation Cards:** Interactive counteroffer cards directly inside messages with **"Accept"** and **"Decline"** buttons.
- **Contextual Quick Replies:** One-click chips for both customer and pro.
- **Automated Reply Simulator:** Realistic responses from the technician after 1.5s when a customer sends a message.

### 6. 🛠️ Professional Dashboard (Provider Portal)
- **Performance Overview:** Lifetime Earnings (`₹48,250`), Completed Jobs (`38`), Pending Requests, and Average Rating (`4.9 ★`).
- **Incoming Requests:** Direct **Accept**, **Reject**, and **Send Counteroffer** modal.
- **Earnings & Payouts:** Recharts daily earnings bar chart, zero commission guarantee, and instant IMPS bank payout simulation (`₹9,800`).
- **Availability Management:** Real-time Online/Offline duty toggle, working hours selector, and service radius slider (`3 km` to `30 km`).

### 7. 🛡️ Staff Admin Dashboard
- **Platform Analytics:** Total customers (`14,820`), total pros (`1,245`), bookings (`28,910`), and monthly GMV Area Chart.
- **KYC Verification Queue:** Inspect submitted Aadhaar cards and trade certificates; approve with verified blue badge or decline.
- **Booking Management:** Live status override and monitoring across all platform jobs.
- **Service Categories & Base Pricing:** Toggle category visibility on/off and add new categories with base inspection fees.

### 8. 🎛️ Demo Role Switcher
Sticky top bar allowing 1-click toggling between:
- `🏠 Landing Page`
- `👤 Customer View`
- `🛠️ Pro Dashboard (Ramesh Sharma)`
- `🛡️ Admin Dashboard`
- Pro Online/Offline switch & Reset Mock Data button.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/celestial-relic/rapidhelp.git

# Navigate to project folder
cd rapidhelp

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Project Structure

```
rapidhelp/
├── public/                 # Static assets
├── src/
│   ├── types/              # TypeScript definitions & data contracts
│   ├── context/            # RapidhelpContext (localStorage persistence & simulators)
│   ├── data/               # Rich seed database (categories, pros, bookings, chats)
│   ├── components/
│   │   ├── common/         # RoleSwitcherBar, Navbar, Footer, AuthModal, NotificationToast
│   │   ├── landing/        # HeroSection, CategoryGrid, HowItWorks, WhyChooseUs, ProCtaSection
│   │   ├── customer/       # CustomerDashboard, CustomerOverview, FindServices, MyBookings, ProProfileModal, BookingModal
│   │   ├── professional/   # ProDashboard, ProOverview, IncomingRequests, CounterofferModal, ProEarnings, ProAvailability
│   │   ├── booking/        # BookingDetailsView, LiveTrackingMap
│   │   ├── chat/           # MessagingCenter
│   │   └── admin/          # AdminDashboard
│   ├── App.tsx             # Root layout & view switcher
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind CSS imports & theme definitions
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 📄 License
This project is licensed under the MIT License.
