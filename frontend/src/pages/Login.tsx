import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@minierp.com');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-slate-900 items-center justify-center shadow-md mb-3">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">NexERP <span className="text-blue-600 font-normal">Portal</span></h1>
          <p className="text-sm text-slate-500 mt-1">Enterprise Operations & CRM Platform</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                'Authenticating...'
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
              Quick Demo Role Selection
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@minierp.com', 'Admin123!')}
                className="px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-medium transition-all text-left flex items-center justify-between"
              >
                <span>Admin</span>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('sales@minierp.com', 'Sales123!')}
                className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-medium transition-all text-left flex items-center justify-between"
              >
                <span>Sales Exec</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('warehouse@minierp.com', 'Warehouse123!')}
                className="px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-medium transition-all text-left flex items-center justify-between"
              >
                <span>Warehouse</span>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('accounts@minierp.com', 'Accounts123!')}
                className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-medium transition-all text-left flex items-center justify-between"
              >
                <span>Accounts</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

