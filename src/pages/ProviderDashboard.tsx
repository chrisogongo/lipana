import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle, AlertTriangle, Wallet, ArrowUpRight, Eye, Upload } from 'lucide-react';

export default function ProviderDashboard() {
  const { contracts, transactions } = useApp();

  const myContracts = contracts;
  const activeJobs = myContracts.filter(c => ['funded', 'in_progress', 'submitted_review'].includes(c.status));
  const awaitingAcceptance = myContracts.filter(c => c.status === 'draft' || c.status === 'accepted');
  const fundedContracts = myContracts.filter(c => c.status === 'funded');
  const submittedWork = myContracts.filter(c => c.milestones.some(m => m.status === 'submitted'));
  const disputed = myContracts.filter(c => c.status === 'disputed');

  const totalEarnings = transactions
    .filter(t => t.type === 'milestone_payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingPayouts = contracts
    .flatMap(c => c.milestones.filter(m => m.status === 'approved'))
    .reduce((sum, m) => sum + (m.approvedAmount || m.amount), 0);

  const statusColors: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-blue-100 text-blue-700',
    submitted: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    paid: 'bg-emerald-100 text-emerald-700',
    disputed: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your jobs, submit milestones, and manage payouts.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: activeJobs.length.toString(), icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Earnings', value: `KSh ${totalEarnings.toLocaleString()}`, icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Payouts', value: `KSh ${pendingPayouts.toLocaleString()}`, icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Work Submitted', value: submittedWork.length.toString(), icon: Upload, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        {disputed.length > 0 && (
          <div className="mb-6">
            {disputed.map(c => (
              <div key={c.id} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Dispute raised on contract</p>
                    <p className="text-sm text-red-600">{c.title} — Submit your response</p>
                  </div>
                </div>
                <Link to={`/contracts/${c.id}`} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                  Respond
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Funded - Ready to Start */}
        {fundedContracts.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Funded Contracts — Ready to Start
            </h3>
            {fundedContracts.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2 border-t border-emerald-100">
                <div>
                  <p className="font-medium text-emerald-900">{c.title}</p>
                  <p className="text-sm text-emerald-600">KSh {c.totalValue.toLocaleString()} • Starts {c.startDate}</p>
                </div>
                <Link to={`/contracts/${c.id}`} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                  Start Work
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Active Jobs with Milestones */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Active Jobs & Milestones</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {activeJobs.map(contract => (
              <div key={contract.id} className="p-5">
                <Link to={`/contracts/${contract.id}`} className="block mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-mono text-gray-400">{contract.contractId}</span>
                      <h3 className="font-medium text-gray-900">{contract.title}</h3>
                    </div>
                    <span className="text-lg font-bold text-gray-900">KSh {contract.totalValue.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500">Customer: {contract.customerName}</p>
                </Link>
                
                {/* Milestones */}
                <div className="space-y-2">
                  {contract.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[milestone.status]}`}>
                          {milestone.status.replace(/_/g, ' ')}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{milestone.title}</p>
                          {milestone.partialCompletion !== undefined && (
                            <p className="text-xs text-gray-500">{milestone.partialCompletion}% complete</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold text-gray-700">KSh {milestone.amount.toLocaleString()}</span>
                        {milestone.status === 'in_progress' && (
                          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
                            Submit Work
                          </button>
                        )}
                        {milestone.status === 'pending' && contract.status === 'funded' && (
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Work */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Completed Payouts</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.filter(t => t.type === 'milestone_payment' && t.status === 'completed').map(tx => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date} • Ref: {tx.mpesaRef}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-emerald-600">+KSh {tx.amount.toLocaleString()}</div>
                  <span className="text-xs text-green-600">Received</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
