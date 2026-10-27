import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserPlus, FileText, CreditCard, Hammer, Eye, CheckCircle, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Registration & Verification',
      description: 'Customers and providers register with verified phone numbers, IDs, and business details.',
      details: ['OTP verification via mobile', 'Identity document upload', 'Business registration check', 'Service category selection'],
      color: 'emerald',
    },
    {
      icon: FileText,
      title: 'Create Service Contract',
      description: 'Customer defines the work, milestones, acceptance criteria, and payment schedule.',
      details: ['Work description & scope', 'Milestone breakdown', 'Partial completion rules', 'Dispute period & refund conditions'],
      color: 'blue',
    },
    {
      icon: CheckCircle,
      title: 'Provider Accepts Contract',
      description: 'Provider reviews terms, can accept, reject, or propose changes to the contract.',
      details: ['Review scope & deadlines', 'Confirm payment terms', 'Accept or negotiate', 'Contract becomes active'],
      color: 'purple',
    },
    {
      icon: CreditCard,
      title: 'Customer Funds via M-Pesa',
      description: 'Customer deposits funds through M-Pesa STK Push. Payment is verified before contract activates.',
      details: ['STK Push to customer phone', 'M-Pesa PIN entry', 'Payment verification', 'Funds held in escrow'],
      color: 'emerald',
    },
    {
      icon: Hammer,
      title: 'Provider Completes Work',
      description: 'Provider works through milestones, submitting evidence of completion at each stage.',
      details: ['Milestone-by-milestone progress', 'Photo/document evidence', 'Completion claims', 'Partial completion tracking'],
      color: 'orange',
    },
    {
      icon: Eye,
      title: 'Customer Reviews Work',
      description: 'Customer reviews submitted work against the agreed acceptance criteria.',
      details: ['Review evidence & deliverables', 'Approve or request revision', 'Auto-approval after deadline', 'Partial completion assessment'],
      color: 'blue',
    },
    {
      icon: DollarSign,
      title: 'Payment Released',
      description: 'Approved milestone payments are released to the provider through verified channels.',
      details: ['Authorization checks', 'M-Pesa payout to provider', 'Transaction confirmation', 'Ledger updated'],
      color: 'emerald',
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; lightBg: string }> = {
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', lightBg: 'bg-emerald-50' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', lightBg: 'bg-blue-50' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-200', lightBg: 'bg-purple-50' },
    orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-200', lightBg: 'bg-orange-50' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" /> Platform Workflow
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How PesaSure Works</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From registration to payment release — a complete guide to our payment guarantee workflow.
            </p>
          </motion.div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const colors = colorMap[step.color];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 hidden md:block"></div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>Step {index + 1}</span>
                      {index < steps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-300 hidden md:block" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className={`flex items-center space-x-2 ${colors.lightBg} rounded-lg px-3 py-2`}>
                          <CheckCircle className={`w-3.5 h-3.5 ${colors.text} flex-shrink-0`} />
                          <span className="text-xs text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partial Completion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl border border-gray-200 p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Partial Completion Handling</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">A. Full Completion</h3>
              <p className="text-sm text-emerald-700">
                Provider finishes the milestone. Customer reviews and approves. Full milestone amount is released.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">B. Agreed Partial</h3>
              <p className="text-sm text-blue-700">
                Both parties agree on the payable amount for partially completed work based on pre-agreed rules and deliverables.
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">C. Disputed Partial</h3>
              <p className="text-sm text-red-700">
                Parties disagree on completion %. Disputed amount is held until resolution. Undisputed portions may be released.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-emerald-800 rounded-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Key Principles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Customer commits money before work begins',
              'Provider completes agreed milestones',
              'Payment released only when conditions are satisfied',
              'Every payment has an auditable authorization trail',
              'Disputed amounts are protected until resolution',
              'Platform operates as digital contract system, not just payment gateway',
            ].map((principle, i) => (
              <div key={i} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span className="text-emerald-100 text-sm">{principle}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
