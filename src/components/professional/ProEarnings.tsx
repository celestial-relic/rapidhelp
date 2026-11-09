import React, { useState } from 'react';
import {
  TrendingUp,
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { useRapidhelp } from '../../context/RapidhelpContext';

const weeklyEarningsData = [
  { day: 'Mon', earnings: 1450, jobs: 3 },
  { day: 'Tue', earnings: 2100, jobs: 4 },
  { day: 'Wed', earnings: 1800, jobs: 3 },
  { day: 'Thu', earnings: 2900, jobs: 5 },
  { day: 'Fri', earnings: 3400, jobs: 6 },
  { day: 'Sat', earnings: 4200, jobs: 7 },
  { day: 'Sun', earnings: 3800, jobs: 6 },
];

export const ProEarnings: React.FC = () => {
  const { triggerToast } = useRapidhelp();
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      triggerToast(
        'Payout Transferred!',
        '₹9,800 transferred to Ramesh Sharma Bank A/C (HDFC •••• 9102) via IMPS.',
        'success'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header and Payout Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0C1C34]">Provider Earnings & Settlements</h2>
          <p className="text-xs text-[#64748B]">
            Real-time balance, weekly performance metrics, and instant bank transfers.
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={withdrawing}
          className="px-5 py-2.5 bg-[#FF7518] hover:bg-[#E8630A] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-[#FF7518]/25 flex items-center space-x-2 transition-all self-start sm:self-auto"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>{withdrawing ? 'Processing Payout...' : 'Withdraw to Bank (₹9,800)'}</span>
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Total Lifetime Earnings
          </span>
          <div className="text-2xl font-black text-[#0C1C34]">₹48,250</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            This Week (Ready for Payout)
          </span>
          <div className="text-2xl font-black text-[#FF7518]">₹9,800</div>
          <div className="text-[10px] text-slate-500 mt-1">34 Completed Orders</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            This Month
          </span>
          <div className="text-2xl font-black text-[#0C1C34]">₹34,500</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Avg ₹840 / order</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
            Platform Commission
          </span>
          <div className="text-2xl font-black text-emerald-600">0% (Beta)</div>
          <div className="text-[10px] text-slate-500 mt-1">100% earnings to provider</div>
        </div>
      </div>

      {/* Chart: Earnings Trends */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0C1C34] uppercase tracking-wider text-xs">
              Weekly Revenue Breakdown
            </h3>
            <p className="text-xs text-[#64748B]">Daily earnings across past 7 days</p>
          </div>
          <span className="text-xs font-bold text-[#0C1C34] bg-[#F5F7FA] px-3 py-1 rounded-full border border-[#E2E8F0]">
            Past 7 Days
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEarningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                formatter={(value: any) => [`₹${value}`, 'Earnings']}
                contentStyle={{ backgroundColor: '#0C1C34', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
              />
              <Bar dataKey="earnings" fill="#FF7518" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completed Transactions Table */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0C1C34] uppercase tracking-wider text-xs">
            Recent Completed Transactions
          </h3>
          <button className="text-xs font-bold text-[#FF7518] hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </button>
        </div>

        <div className="divide-y divide-[#E2E8F0] text-xs">
          {[
            { id: 'TXN-9021', cust: 'Aakash Verma', service: 'Electrician MCB Fix', date: 'Today, 03:30 PM', amount: 549, status: 'Settled to Wallet' },
            { id: 'TXN-8840', cust: 'Siddharth Rao', service: 'Inverter Wiring', date: 'Yesterday, 06:15 PM', amount: 850, status: 'Settled to Wallet' },
            { id: 'TXN-8722', cust: 'Priya Sundaram', service: 'Ceiling Fan Installation (2x)', date: '06 Nov 2026', amount: 498, status: 'Settled to Wallet' },
            { id: 'TXN-8601', cust: 'Deepa Krishnan', service: 'Switchboard Overhaul', date: '05 Nov 2026', amount: 620, status: 'Settled to Wallet' },
          ].map((item) => (
            <div key={item.id} className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#0C1C34]">{item.service}</div>
                <div className="text-[11px] text-[#64748B]">
                  Customer: {item.cust} • {item.date} • {item.id}
                </div>
              </div>

              <div className="text-right">
                <span className="font-black text-sm text-[#0C1C34] block">₹{item.amount}</span>
                <span className="text-[10px] text-emerald-600 font-bold">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
