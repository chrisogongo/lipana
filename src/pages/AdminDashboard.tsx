import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, DollarSign, FileText, AlertTriangle, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { contracts, transactions, disputes } = useApp();

  const totalContractValue = contracts.reduce((sum, c) => sum + c.totalValue, 0);
  const totalFundsHeld = transactions
    .filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalReleased = transactions
    .filter(t => t.type === 'milestone_payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const platformFees = contracts.reduce((sum, c) => sum + c.platformFee, 0);
  const underDispute = contracts.filter(c => c.status === 'disputed').reduce((sum, c) => {
    return sum + c.milestones.filter(m => m.status === 'disputed').reduce((s, m) => s + m.amount, 0);
  }, 0);

  const statusDistribution = [
    { name: 'In Progress', value: contracts.filter(c => c.status === 'in_progress').length, color: '#3b82f6' },
    { name: 'Funded', value: contracts.filter(c => c.status === 'funded').length, color: '#10b981' },
    { name: 'Awaiting Funding', value: contracts.filter(c => c.status === 'awaiting_funding').length, color: '#f59e0b' },
    { name: 'Disputed', value: contracts.filter(c => c.status === 'disputed').length, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const monthlyData = [
    { month: 'Jan', contracts: 4, value: 285000 },
    { month: 'Feb', contracts: 3, value: 160000 },
    { month: 'Mar', contracts: 2, value: 95000 },
    { month: 'Apr', contracts: 1, value: 40000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview, financial reconciliation, and operational monitoring.</p>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Contract Value', value: `KSh ${(totalContractValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Funds Held', value: `KSh ${(totalFundsHeld / 1000).toFixed(0)}K`, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Released to Providers', value: `KSh ${(totalReleased / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Platform Fees Earned', value: `KSh ${platformFees.toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Under Dispute', value: `KSh ${underDispute.toLocaleString()}`, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Contract Value Over Time */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Contract Value by Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => [`KSh ${value.toLocaleString()}`, 'Value']} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Contract Status Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Contract Status Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {statusDistribution.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reconciliation Table */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Financial Reconciliation</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount (KSh)</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-5 py-4 text-sm text-gray-900">Total deposits received</td>
                  <td className="px-5 py-4 text-sm text-right font-medium">{totalFundsHeld.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Verified</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-sm text-gray-900">Milestone payments released</td>
                  <td className="px-5 py-4 text-sm text-right font-medium">{totalReleased.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Confirmed</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-sm text-gray-900">Platform fees collected</td>
                  <td className="px-5 py-4 text-sm text-right font-medium">{platformFees.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Settled</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-sm text-gray-900">Amount under dispute (held)</td>
                  <td className="px-5 py-4 text-sm text-right font-medium text-red-600">{underDispute.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">On Hold</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">Remaining balance (held in escrow)</td>
                  <td className="px-5 py-4 text-sm text-right font-bold text-emerald-700">{(totalFundsHeld - totalReleased - platformFees).toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Safeguarded</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disputes & Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Disputes */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Active Disputes</h2>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{disputes.length} open</span>
            </div>
            <div className="divide-y divide-gray-100">
              {disputes.map(d => {
                const contract = contracts.find(c => c.id === d.contractId);
                return (
                  <div key={d.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contract?.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.reason.slice(0, 80)}...</p>
                        <p className="text-xs text-gray-400 mt-1">Raised {d.createdAt} • {d.status.replace(/_/g, ' ')}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${d.status === 'under_review' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Recent Activity Log</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { action: 'Milestone payment released', detail: 'KSh 20,000 → BuildRight Construction', time: '2 hours ago', icon: CheckCircle, color: 'text-emerald-500' },
                { action: 'Dispute opened', detail: 'PS-2024-004 — Furniture Manufacturing', time: '1 day ago', icon: AlertTriangle, color: 'text-red-500' },
                { action: 'Contract funded', detail: 'PS-2024-002 — E-Commerce Website', time: '3 days ago', icon: DollarSign, color: 'text-blue-500' },
                { action: 'Milestone submitted for review', detail: 'PS-2024-001 — Masonry & Structural', time: '4 days ago', icon: Clock, color: 'text-orange-500' },
                { action: 'New contract created', detail: 'PS-2024-003 — Office Cleaning Service', time: '5 days ago', icon: FileText, color: 'text-purple-500' },
              ].map((log, i) => (
                <div key={i} className="p-4 flex items-center space-x-3">
                  <log.icon className={`w-4 h-4 ${log.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500 truncate">{log.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
