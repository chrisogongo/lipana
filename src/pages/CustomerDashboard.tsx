import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, FileText, Clock, CheckCircle, AlertTriangle, CreditCard, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

export default function CustomerDashboard() {
  const { contracts, transactions } = useApp();

  const myContracts = contracts;
  const activeContracts = myContracts.filter(c => ['funded', 'in_progress', 'submitted_review'].includes(c.status));
  const awaitingFunding = myContracts.filter(c => c.status === 'awaiting_funding');
  const awaitingReview = myContracts.filter(c => c.status === 'submitted_review' || c.milestones.some(m => m.status === 'submitted'));
  const disputed = myContracts.filter(c => c.status === 'disputed');
  const completed = myContracts.filter(c => c.status === 'paid');

  const totalFunded = transactions
    .filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = transactions
    .filter(t => t.type === 'milestone_payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    accepted: 'bg-blue-100 text-blue-700',
    awaiting_funding: 'bg-yellow-100 text-yellow-700',
    funded: 'bg-emerald-100 text-emerald-700',
    in_progress: 'bg-blue-100 text-blue-700',
    submitted_review: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    payment_processing: 'bg-purple-100 text-purple-700',
    paid: 'bg-emerald-100 text-emerald-700',
    disputed: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700',
  };

  const milestoneStatusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4 text-gray-400" />,
    in_progress: <Clock className="w-4 h-4 text-blue-500" />,
    submitted: <Eye className="w-4 h-4 text-orange-500" />,
    approved: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    paid: <CheckCircle className="w-4 h-4 text-emerald-600" />,
    disputed: <AlertTriangle className="w-4 h-4 text-red-500" />,
    revision_requested: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your contracts, track milestones, and review completed work.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Funded', value: `KSh ${totalFunded.toLocaleString()}`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Released to Providers', value: `KSh ${totalPaid.toLocaleString()}`, icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Contracts', value: activeContracts.length.toString(), icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Awaiting Review', value: awaitingReview.length.toString(), icon: Eye, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        {(awaitingFunding.length > 0 || disputed.length > 0) && (
          <div className="space-y-3 mb-8">
            {awaitingFunding.map(c => (
              <div key={c.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Contract needs funding</p>
                    <p className="text-sm text-yellow-600">{c.title} — KSh {c.totalValue.toLocaleString()}</p>
                  </div>
                </div>
                <Link to={`/contracts/${c.id}`} className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700">
                  Fund Now
                </Link>
              </div>
            ))}
            {disputed.map(c => (
              <div key={c.id} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Dispute in progress</p>
                    <p className="text-sm text-red-600">{c.title} — Awaiting resolution</p>
                  </div>
                </div>
                <Link to={`/contracts/${c.id}`} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Active Contracts */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Active Contracts</h2>
            <Link to="/contracts" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All →</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {myContracts.filter(c => !['paid', 'cancelled', 'expired'].includes(c.status)).map(contract => (
              <Link key={contract.id} to={`/contracts/${contract.id}`} className="p-5 hover:bg-gray-50 transition-colors block">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-mono text-gray-400">{contract.contractId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[contract.status] || 'bg-gray-100 text-gray-700'}`}>
                        {contract.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{contract.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">Provider: {contract.providerName}</p>
                    
                    {/* Milestone Progress */}
                    <div className="flex items-center space-x-2">
                      {contract.milestones.map(m => (
                        <div key={m.id} className="flex items-center space-x-1" title={`${m.title}: ${m.status}`}>
                          {milestoneStatusIcons[m.status]}
                          <span className="text-xs text-gray-500">KSh {m.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">KSh {contract.totalValue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{contract.milestones.filter(m => m.status === 'paid').length}/{contract.milestones.length} milestones paid</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                    {tx.type === 'deposit' ? <ArrowDownRight className="w-4 h-4 text-emerald-600" /> : <ArrowUpRight className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.date} • {tx.mpesaRef}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-blue-600'}`}>
                    KSh {tx.amount.toLocaleString()}
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${tx.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
