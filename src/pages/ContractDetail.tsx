import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Upload, Eye, CreditCard, Shield, FileText, MessageSquare } from 'lucide-react';

export default function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  const { contracts, transactions, disputes, currentRole } = useApp();
  const contract = contracts.find(c => c.id === id);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contract Not Found</h2>
          <Link to="/contracts" className="text-emerald-600 hover:text-emerald-700">← Back to Contracts</Link>
        </div>
      </div>
    );
  }

  const contractTransactions = transactions.filter(t => t.contractId === contract.id);
  const contractDisputes = disputes.filter(d => d.contractId === contract.id);
  const totalPaid = contract.milestones.filter(m => m.status === 'paid').reduce((sum, m) => sum + (m.approvedAmount || m.amount), 0);
  const totalFunded = contractTransactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

  const milestoneStatusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
    pending: { color: 'text-gray-600', bg: 'bg-gray-100', icon: <Clock className="w-4 h-4" /> },
    in_progress: { color: 'text-blue-600', bg: 'bg-blue-100', icon: <Clock className="w-4 h-4" /> },
    submitted: { color: 'text-orange-600', bg: 'bg-orange-100', icon: <Eye className="w-4 h-4" /> },
    approved: { color: 'text-green-600', bg: 'bg-green-100', icon: <CheckCircle className="w-4 h-4" /> },
    paid: { color: 'text-emerald-600', bg: 'bg-emerald-100', icon: <CheckCircle className="w-4 h-4" /> },
    disputed: { color: 'text-red-600', bg: 'bg-red-100', icon: <AlertTriangle className="w-4 h-4" /> },
    revision_requested: { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <AlertTriangle className="w-4 h-4" /> },
    partially_completed: { color: 'text-purple-600', bg: 'bg-purple-100', icon: <Clock className="w-4 h-4" /> },
  };

  const contractStatusColors: Record<string, string> = {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link to="/contracts" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Contracts
        </Link>

        {/* Contract Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-mono text-gray-400">{contract.contractId}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${contractStatusColors[contract.status]}`}>
                  {contract.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{contract.title}</h1>
              <p className="text-gray-600 mt-1">{contract.description}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-gray-900">KSh {contract.totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Contract Value</div>
            </div>
          </div>

          {/* Contract Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 mb-1">Customer</div>
              <div className="text-sm font-medium text-gray-900">{contract.customerName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Provider</div>
              <div className="text-sm font-medium text-gray-900">{contract.providerName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Start Date</div>
              <div className="text-sm font-medium text-gray-900">{contract.startDate}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Completion Date</div>
              <div className="text-sm font-medium text-gray-900">{contract.completionDate}</div>
            </div>
          </div>
        </motion.div>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-500 mb-1">Total Funded</div>
            <div className="text-lg font-bold text-emerald-600">KSh {totalFunded.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-500 mb-1">Released to Provider</div>
            <div className="text-lg font-bold text-blue-600">KSh {totalPaid.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-500 mb-1">Held in Escrow</div>
            <div className="text-lg font-bold text-purple-600">KSh {(totalFunded - totalPaid).toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-500 mb-1">Platform Fee</div>
            <div className="text-lg font-bold text-gray-600">KSh {contract.platformFee.toLocaleString()}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {contract.status === 'awaiting_funding' && currentRole === 'customer' && (
            <button
              onClick={() => setShowFundModal(true)}
              className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Fund Contract via M-Pesa
            </button>
          )}
          {contract.status === 'disputed' && currentRole === 'provider' && (
            <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <MessageSquare className="w-4 h-4 mr-2" /> Respond to Dispute
            </button>
          )}
          {contract.status === 'disputed' && currentRole === 'customer' && (
            <button className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
              <Shield className="w-4 h-4 mr-2" /> View Dispute Details
            </button>
          )}
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-400" /> Milestones & Payment Schedule
            </h2>
            <span className="text-sm text-gray-500">{contract.milestones.filter(m => m.status === 'paid').length}/{contract.milestones.length} completed</span>
          </div>
          <div className="divide-y divide-gray-100">
            {contract.milestones.map((milestone, index) => {
              const config = milestoneStatusConfig[milestone.status] || milestoneStatusConfig.pending;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full ${config.bg} ${config.color} flex items-center justify-center flex-shrink-0`}>
                        {config.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium text-gray-400">Stage {index + 1}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.color}`}>
                            {milestone.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-400">Due: {milestone.dueDate}</span>
                          {milestone.partialCompletion !== undefined && (
                            <span className="text-xs text-purple-600 font-medium">{milestone.partialCompletion}% complete</span>
                          )}
                        </div>
                        {/* Progress bar for partial completion */}
                        {milestone.partialCompletion !== undefined && milestone.status !== 'paid' && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${milestone.partialCompletion}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-gray-900">KSh {milestone.amount.toLocaleString()}</div>
                      {milestone.status === 'paid' && (
                        <div className="text-xs text-emerald-600 font-medium">Paid</div>
                      )}
                      {milestone.status === 'submitted' && currentRole === 'customer' && (
                        <div className="flex space-x-2 mt-2">
                          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
                            Approve
                          </button>
                          <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200">
                            Request Revision
                          </button>
                        </div>
                      )}
                      {milestone.status === 'in_progress' && currentRole === 'provider' && (
                        <button className="mt-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 flex items-center">
                          <Upload className="w-3 h-3 mr-1" /> Submit Work
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disputes */}
        {contractDisputes.length > 0 && (
          <div className="bg-white rounded-xl border border-red-200 mb-6">
            <div className="p-5 border-b border-red-100 bg-red-50 rounded-t-xl">
              <h2 className="font-semibold text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" /> Active Disputes
              </h2>
            </div>
            <div className="p-5">
              {contractDisputes.map(d => (
                <div key={d.id} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.status === 'under_review' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {d.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-gray-500">Raised: {d.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-700">{d.reason}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Evidence:</span>
                    {d.evidence.map((e, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{e.split('/').pop()}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-gray-400" /> Transaction History
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {contractTransactions.length === 0 ? (
              <div className="p-5 text-center text-gray-500 text-sm">No transactions yet</div>
            ) : (
              contractTransactions.map(tx => (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                      {tx.type === 'deposit' ? (
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-500">{tx.date} • M-Pesa Ref: {tx.mpesaRef}</p>
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Fund Contract Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Fund Contract via M-Pesa</h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <div className="text-sm text-emerald-800">
                <p className="font-medium">Contract: {contract.title}</p>
                <p className="mt-1">Amount: <span className="font-bold">KSh {contract.totalValue.toLocaleString()}</span></p>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">M-Pesa Phone Number</label>
              <input
                type="text"
                placeholder="+254 7XX XXX XXX"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                defaultValue="+254 712 345 678"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-600">
                <strong>How it works:</strong> An STK Push will be sent to your phone. Enter your M-Pesa PIN to authorize the payment. 
                Funds will be held securely until milestones are approved.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFundModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFundModal(false)}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
              >
                Send STK Push
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
