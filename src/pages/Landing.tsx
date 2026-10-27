import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, FileCheck, CreditCard, AlertTriangle, CheckCircle, ArrowRight, Smartphone, Building2, Wrench } from 'lucide-react';

export default function Landing() {
  const features = [
    { icon: Shield, title: 'Payment Protection', desc: 'Funds are held securely until agreed work is completed and approved.' },
    { icon: FileCheck, title: 'Digital Contracts', desc: 'Create binding agreements with milestones, terms, and acceptance criteria.' },
    { icon: CreditCard, title: 'M-Pesa Integration', desc: 'Deposit and receive payments through M-Pesa with verified transactions.' },
    { icon: Users, title: 'Verified Providers', desc: 'Service providers are verified with identity and qualification checks.' },
    { icon: AlertTriangle, title: 'Dispute Resolution', desc: 'Fair dispute handling with evidence-based resolution process.' },
    { icon: Lock, title: 'Milestone Payments', desc: 'Pay only for completed work with partial completion support.' },
  ];

  const serviceCategories = [
    { icon: Building2, name: 'Construction & Renovation' },
    { icon: Wrench, name: 'Plumbing & Electrical' },
    { icon: Smartphone, name: 'Web Development' },
    { icon: CheckCircle, name: 'Cleaning Services' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-1.5 bg-emerald-700/50 rounded-full text-emerald-100 text-sm font-medium mb-6 border border-emerald-600/30">
              <Shield className="w-4 h-4 mr-2" />
              Kenya's Trusted Payment Guarantee Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Pay with Confidence.<br />
              <span className="text-emerald-300">Get Work Done Right.</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              PesaSure protects both customers and service providers by holding payment in escrow until agreed work is completed. 
              Fund contracts via M-Pesa, track milestones, and release payments only when conditions are met.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/workflow"
                className="inline-flex items-center px-8 py-4 bg-emerald-700/50 text-white font-semibold rounded-xl hover:bg-emerald-700/70 transition-all border border-emerald-500/30"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: 'KSh 2.4M+', label: 'Funds Protected' },
              { value: '150+', label: 'Active Contracts' },
              { value: '98%', label: 'Completion Rate' },
              { value: '< 24hrs', label: 'Avg. Resolution' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-emerald-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How PesaSure Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A simple, transparent process that protects everyone involved.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Create Contract', desc: 'Define the work, milestones, and payment terms.' },
              { step: '2', title: 'Fund via M-Pesa', desc: 'Deposit funds securely through M-Pesa STK Push.' },
              { step: '3', title: 'Work Completed', desc: 'Provider completes milestones and submits evidence.' },
              { step: '4', title: 'Payment Released', desc: 'Customer approves and funds are released to provider.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-700 font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Trust & Transparency</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every feature designed to protect both customers and service providers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Covered</h2>
            <p className="text-gray-600">From construction to web development, PesaSure has you covered.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceCategories.map((cat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all">
                <cat.icon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Confidence?</h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join PesaSure today and experience secure, milestone-based payments for every service contract.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg"
          >
            Open Dashboard <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-emerald-500" />
              <span className="text-white font-bold text-lg">PesaSure</span>
            </div>
            <p className="text-sm">© 2024 PesaSure. Payment Guarantee & Escrow Platform — Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
