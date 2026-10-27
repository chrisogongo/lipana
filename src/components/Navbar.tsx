import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Shield, Menu, X, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { currentRole, setCurrentRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  const roleLabels: Record<UserRole, string> = {
    customer: 'Customer',
    provider: 'Provider',
    admin: 'Administrator',
  };

  const roleColors: Record<UserRole, string> = {
    customer: 'bg-blue-100 text-blue-800',
    provider: 'bg-emerald-100 text-emerald-800',
    admin: 'bg-purple-100 text-purple-800',
  };

  const isActive = (path: string) => location.pathname === path;

  const navBg = isLanding
    ? 'bg-emerald-900/95 backdrop-blur-sm border-emerald-800'
    : 'bg-white border-gray-200 shadow-sm';
  
  const textColor = isLanding ? 'text-white' : 'text-gray-900';
  const linkColor = isLanding ? 'text-emerald-100 hover:text-white hover:bg-emerald-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  const activeLinkColor = isLanding ? 'bg-emerald-800/50 text-white' : 'bg-emerald-50 text-emerald-700';

  return (
    <nav className={`${navBg} border-b sticky top-0 z-50 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${textColor}`}>Pesa<span className="text-emerald-400">Sure</span></span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? activeLinkColor : linkColor}`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard') ? activeLinkColor : linkColor}`}
              >
                Dashboard
              </Link>
              <Link
                to="/contracts"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contracts') || isActive('/contracts/') ? activeLinkColor : linkColor}`}
              >
                Contracts
              </Link>
              <Link
                to="/workflow"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/workflow') ? activeLinkColor : linkColor}`}
              >
                How It Works
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-colors ${isLanding ? 'border-emerald-600 hover:border-emerald-500' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <User className={`w-4 h-4 ${isLanding ? 'text-emerald-300' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[currentRole]}`}>
                  {roleLabels[currentRole]}
                </span>
                <ChevronDown className={`w-3 h-3 ${isLanding ? 'text-emerald-400' : 'text-gray-400'}`} />
              </button>
              {roleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-3 py-2 text-xs text-gray-500 font-medium">Switch Demo View</div>
                    {(['customer', 'provider', 'admin'] as UserRole[]).map(role => (
                      <button
                        key={role}
                        onClick={() => { setCurrentRole(role); setRoleDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${currentRole === role ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${role === 'customer' ? 'bg-blue-500' : role === 'provider' ? 'bg-emerald-500' : 'bg-purple-500'}`}></span>
                        {roleLabels[role]} View
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-md ${isLanding ? 'text-emerald-200 hover:bg-emerald-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${isLanding ? 'border-emerald-800 bg-emerald-900' : 'border-gray-200 bg-white'}`}>
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isLanding ? 'text-emerald-100 hover:bg-emerald-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${isLanding ? 'text-emerald-100 hover:bg-emerald-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/contracts" className={`block px-3 py-2 rounded-md text-base font-medium ${isLanding ? 'text-emerald-100 hover:bg-emerald-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setMobileMenuOpen(false)}>Contracts</Link>
            <Link to="/workflow" className={`block px-3 py-2 rounded-md text-base font-medium ${isLanding ? 'text-emerald-100 hover:bg-emerald-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
