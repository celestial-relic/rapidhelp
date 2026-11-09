import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { BookingStatus, ServiceCategory } from '../../types';
import {
  Users,
  Wrench,
  CalendarCheck,
  ShieldCheck,
  AlertTriangle,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  TrendingUp,
  Sliders,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const adminRevenueData = [
  { month: 'Jun', bookings: 2100, volume: 1800000 },
  { month: 'Jul', bookings: 2800, volume: 2200000 },
  { month: 'Aug', bookings: 3400, volume: 2700000 },
  { month: 'Sep', bookings: 4100, volume: 3300000 },
  { month: 'Oct', bookings: 4900, volume: 4100000 },
  { month: 'Nov', bookings: 5400, volume: 4600000 },
];

export const AdminDashboard: React.FC = () => {
  const {
    adminMetrics,
    professionals,
    bookings,
    categories,
    verifyProfessional,
    toggleCategoryStatus,
    addNewCategory,
    updateBookingStatusAdmin,
  } = useRapidhelp();

  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'bookings' | 'categories'>('overview');

  // Add Category modal
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatPrice, setNewCatPrice] = useState(299);

  const pendingPros = professionals.filter((p) => p.verificationStatus === 'pending' || !p.isVerified);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addNewCategory({
      name: newCatName.trim(),
      description: newCatDesc.trim() || 'Professional on-demand service',
      icon: 'Wrench',
      startingPrice: Number(newCatPrice) || 299,
      popularServices: ['Standard Inspection', 'Repair & Tuning'],
      averageTime: '30 mins',
      isActive: true,
    });
    setNewCatName('');
    setNewCatDesc('');
    setNewCatOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0C1C34] text-white flex items-center justify-center font-bold text-xl shadow-md border border-white/10">
              🛡️
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0C1C34]">
                RAPID<span className="text-[#FF7518]">HELP</span> Operations Control
              </h1>
              <p className="text-xs text-[#64748B]">
                Hyperlocal platform health, verification queues, and system governance.
              </p>
            </div>
          </div>

          <div className="flex bg-white p-1 rounded-2xl border border-[#E2E8F0] shadow-sm text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0C1C34] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0C1C34]'
              }`}
            >
              Overview & Analytics
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'verifications'
                  ? 'bg-[#FF7518] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0C1C34]'
              }`}
            >
              KYC Verifications ({pendingPros.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'bookings'
                  ? 'bg-[#0C1C34] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0C1C34]'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#0C1C34] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0C1C34]'
              }`}
            >
              Categories & Pricing
            </button>
          </div>
        </div>

        {/* 6 High-Level Admin Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Customers</span>
            <span className="text-xl font-black text-[#0C1C34]">
              {adminMetrics.totalCustomers.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Professionals</span>
            <span className="text-xl font-black text-[#0C1C34]">
              {adminMetrics.totalProfessionals.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Total Bookings</span>
            <span className="text-xl font-black text-[#FF7518]">
              {adminMetrics.totalBookings.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Completed Jobs</span>
            <span className="text-xl font-black text-emerald-600">
              {adminMetrics.completedBookings.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Pending KYC</span>
            <span className="text-xl font-black text-amber-500">
              {pendingPros.length}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Reported Issues</span>
            <span className="text-xl font-black text-rose-600">
              {adminMetrics.reportedIssues}
            </span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0C1C34] uppercase tracking-wider text-xs">
                    Platform Gross Merchandise Value (GMV)
                  </h3>
                  <p className="text-xs text-[#64748B]">Monthly booking volume (₹ INR)</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ↑ 32% Month-over-Month
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adminRevenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF7518" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF7518" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      tickFormatter={(val) => `₹${val / 100000}L`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Monthly GMV']}
                      contentStyle={{ backgroundColor: '#0C1C34', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="volume" stroke="#FF7518" strokeWidth={3} fillOpacity={1} fill="url(#colorGmv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick action grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-[#0C1C34]">KYC Verification Queue</h4>
                <p className="text-xs text-[#64748B]">
                  {pendingPros.length} service technicians awaiting document inspection.
                </p>
                <button
                  onClick={() => setActiveTab('verifications')}
                  className="px-4 py-2 bg-[#FF7518] text-white text-xs font-bold rounded-xl"
                >
                  Review Pending Professionals
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-[#0C1C34]">Active Marketplace Categories</h4>
                <p className="text-xs text-[#64748B]">
                  {categories.filter((c) => c.isActive).length} of {categories.length} categories enabled for booking.
                </p>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="px-4 py-2 bg-[#0C1C34] text-white text-xs font-bold rounded-xl"
                >
                  Manage Service Rates & Categories
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFICATIONS MANAGEMENT */}
        {activeTab === 'verifications' && (
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-[#0C1C34]">Professional KYC Verification</h3>
              <p className="text-xs text-[#64748B]">
                Verify government IDs, trade skill certifications, and police clearances before granting the verified blue badge.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F7FA] text-[#64748B] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Applicant</th>
                    <th className="py-3 px-4">Trade Category</th>
                    <th className="py-3 px-4">Submitted Documents</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {professionals.map((pro) => (
                    <tr key={pro.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={pro.avatar}
                            alt={pro.name}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <div className="font-bold text-[#0C1C34]">{pro.name}</div>
                            <div className="text-[11px] text-[#64748B]">{pro.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#0C1C34]">{pro.category}</td>
                      <td className="py-3.5 px-4 text-[#64748B]">
                        {pro.idProofType || 'Aadhaar + Trade Certificate'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pro.isVerified
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {pro.isVerified ? 'VERIFIED' : 'PENDING'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {pro.isVerified ? (
                          <button
                            onClick={() => verifyProfessional(pro.id, false)}
                            className="px-3 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold"
                          >
                            Revoke Badge
                          </button>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => verifyProfessional(pro.id, true)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] font-bold shadow"
                            >
                              Approve KYC
                            </button>
                            <button
                              onClick={() => verifyProfessional(pro.id, false)}
                              className="px-3 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALL BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-[#0C1C34]">Live Platform Bookings</h3>
              <p className="text-xs text-[#64748B]">
                Override statuses, monitor disputes, and resolve technician assignments.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F7FA] text-[#64748B] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Professional</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Override Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0C1C34]">#{b.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#0C1C34]">{b.customerName}</td>
                      <td className="py-3.5 px-4">{b.professionalName}</td>
                      <td className="py-3.5 px-4">{b.category}</td>
                      <td className="py-3.5 px-4 font-bold text-[#FF7518]">
                        ₹{b.agreedPrice || b.customerProposedBudget}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateBookingStatusAdmin(b.id, e.target.value as BookingStatus)
                          }
                          className="px-2 py-1 bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg text-[11px] font-bold text-[#0C1C34] focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICE CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0C1C34]">Service Category Management</h3>
                <p className="text-xs text-[#64748B]">
                  Enable/disable categories and customize starting inspection rates.
                </p>
              </div>

              <button
                onClick={() => setNewCatOpen(true)}
                className="px-4 py-2 bg-[#FF7518] hover:bg-[#E8630A] text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    c.isActive
                      ? 'bg-white border-[#E2E8F0] shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-[#0C1C34]">{c.name}</h4>
                    <button
                      onClick={() => toggleCategoryStatus(c.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-xs text-[#64748B] line-clamp-2 mb-3">{c.description}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0]">
                    <span className="text-[#64748B]">Starting Rate:</span>
                    <span className="font-black text-[#0C1C34]">₹{c.startingPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {newCatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0C1C34]">Add New Service Category</h3>
              <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#0C1C34] mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Pest Control, Solar Panel Cleaning"
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#FF7518]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0C1C34] mb-1">Short Description</label>
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Brief description of service scope"
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#FF7518]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0C1C34] mb-1">Starting Base Rate (₹)</label>
                  <input
                    type="number"
                    value={newCatPrice}
                    onChange={(e) => setNewCatPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#FF7518]"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewCatOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] font-bold text-[#64748B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#FF7518] text-white font-bold hover:bg-[#E8630A]"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
