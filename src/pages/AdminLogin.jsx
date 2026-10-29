import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth, ROLES } from '../context/AuthContext.jsx';
import { ArrowLeft, Shield, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@titanzsecurity.ae');
  const [password, setPassword] = useState('Admin@1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login(email, password, 'admin');
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPreset = (presetEmail, presetRole) => {
    setEmail(presetEmail);
    setPassword('Admin@1234');
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Branding Panel */}
      <div className="w-full lg:w-1/2 bg-[#201B4F] flex flex-col justify-between px-8 sm:px-16 lg:px-24 py-12 lg:py-16 min-h-[280px] lg:min-h-screen">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center text-sm font-medium text-[#A4B5DC] hover:text-white transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </button>

        <div className="max-w-xl my-auto py-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#2c2569] text-[#A4B5DC] mb-6 border border-[#3b3387]">
            <Shield className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Administrative Security Gateway
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            Titanz<br />
            Management System
          </h1>
          <p className="mt-6 text-base lg:text-[18px] text-[#A4B5DC] leading-relaxed max-w-lg">
            Authorized administrative access for workforce oversight, payroll processing, compliance verification, and HR operations.
          </p>
        </div>

        <p className="text-xs text-[#A4B5DC]/70">
          TLS 1.3 256-Bit Encrypted & Role-Based Access Control
        </p>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 sm:px-12 py-12 min-h-screen">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] tracking-tight">
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your corporate administrator credentials to proceed.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@titanzsecurity.ae"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#201B4F] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-gray-500">Requires 2FA token</span>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#201B4F] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#201B4F] hover:bg-[#2c2569] text-white font-medium text-sm rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#201B4F] focus:ring-offset-2 flex justify-center items-center cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In to Admin Portal'
              )}
            </button>
          </form>

          {/* Quick Demo Role Presets for convenient evaluation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              One-Click Evaluation Presets:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPreset('admin@titanzsecurity.ae', ROLES.SUPER_ADMIN)}
                className="px-2.5 py-1.5 text-xs text-left bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors"
              >
                <div className="font-semibold text-gray-900 truncate">Super Admin</div>
                <div className="text-[10px] text-gray-500 truncate">Tariq Al-M.</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('zayd.khoury@titanzsecurity.ae', ROLES.PAYROLL_OFFICER)}
                className="px-2.5 py-1.5 text-xs text-left bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors"
              >
                <div className="font-semibold text-gray-900 truncate">Payroll Officer</div>
                <div className="text-[10px] text-gray-500 truncate">Zayd Khoury</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('omar.farouk@titanzsecurity.ae', ROLES.MANAGER)}
                className="px-2.5 py-1.5 text-xs text-left bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors"
              >
                <div className="font-semibold text-gray-900 truncate">Ops Manager</div>
                <div className="text-[10px] text-gray-500 truncate">Omar Farouk</div>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#A4B5DC]">
              @ 2026 Titanz Security Group. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
