import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Clock, CheckCircle, AlertTriangle, Eye, CreditCard } from 'lucide-react';

export default function ContractsList() {
  const { contracts, currentRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    expired: 'bg-gray-100 text-gray-500',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    awaiting_funding: <CreditCard className="w-3.5 h-3.5" />,
    in_progress: <Clock className="w-3.5 h-3.5" />,
    submitted_review: <Eye className="w-3.5 h-3.5" />,
    disputed: <AlertTriangle className="w-3.5 h-3.5" />,
    paid: <CheckCircle className="w-3.5 h-3.5" />,
    funded: <CheckCircle className="w-3.5 h-3.5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
            <p className="text-gray-600 mt-1">View and manage all service contracts.</p>
          </div>
          {currentRole === 'customer' && (
            <button className="mt-4 md:mt-0 inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" /> Create New Contract
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contracts by name, ID, or party..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="awaiting_funding">Awaiting Funding</option>
                <option value="funded">Funded</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted_review">Submitted for Review</option>
                <option value="disputed">Disputed</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No contracts found matching your criteria.</p>
            </div>
          ) : (
            filteredContracts.map((contract, index) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/contracts/${contract.id}`} className="block">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xs font-mono text-gray-400">{contract.contractId}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center space-x-1 ${statusColors[contract.status]}`}>
                            {statusIcons[contract.status]}
                            <span>{contract.status.replace(/_/g, ' ')}</span>
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{contract.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{contract.description.slice(0, 100)}...</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-xs text-gray-500">
                            {currentRole === 'customer' ? `Provider: ${contract.providerName}` : `Customer: ${contract.customerName}`}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{contract.milestones.length} milestones</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">Due: {contract.completionDate}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:text-right">
                        <div className="text-xl font-bold text-gray-900">KSh {contract.totalValue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {contract.milestones.filter(m => m.status === 'paid').length}/{contract.milestones.length} milestones paid
                        </div>
                        {/* Mini progress bar */}
                        <div className="mt-2 w-full md:w-32 bg-gray-100 rounded-full h-1.5 ml-auto">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${(contract.milestones.filter(m => m.status === 'paid').length / contract.milestones.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
