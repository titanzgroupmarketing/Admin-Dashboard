import React, { useState } from 'react';
import { db, COMPANY_PROFILE, DEPARTMENTS, BRANCHES } from '../data/mockDatabase.js';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Settings as SettingsIcon,
  Building2,
  Coins,
  Clock,
  Shield,
  Users,
  Save,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export default function Settings() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('company');
  const [saveNotice, setSaveNotice] = useState('');

  // Form states
  const [companyName, setCompanyName] = useState(COMPANY_PROFILE.name);
  const [trn, setTrn] = useState(COMPANY_PROFILE.taxRegistrationNumber);
  const [address, setAddress] = useState(COMPANY_PROFILE.address);
  const [currency, setCurrency] = useState(COMPANY_PROFILE.currency);
  const [timezone, setTimezone] = useState(COMPANY_PROFILE.timezone);

  const [cutoffDay, setCutoffDay] = useState(COMPANY_PROFILE.payrollCutoffDay);
  const [gracePeriod, setGracePeriod] = useState(COMPANY_PROFILE.gracePeriodMinutes);
  const [otRate, setOtRate] = useState(COMPANY_PROFILE.defaultOvertimeMultiplier);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveNotice('Settings updated successfully in corporate configuration registry.');
    setTimeout(() => setSaveNotice(''), 4000);
  };

  const handleResetDatabase = () => {
    if (window.confirm('Reset database to clean initial seed data? All temporary changes will be restored to initial defaults.')) {
      db.resetToDefault();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Enterprise System Configuration & Rules
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Corporate entity profiles, payroll cutoff parameters, attendance rules, and role authorization matrix.
          </p>
        </div>

        <button
          onClick={handleResetDatabase}
          className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 shadow-xs transition-colors cursor-pointer w-fit"
          title="Restore original seed records"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset Demo Database
        </button>
      </div>

      {saveNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          {saveNotice}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-2 flex space-x-2">
        <button
          onClick={() => setActiveTab('company')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            activeTab === 'company'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 mr-1.5" />
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            activeTab === 'payroll'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Coins className="w-3.5 h-3.5 mr-1.5" />
          Payroll & Overtime
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            activeTab === 'attendance'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          Attendance & Grace
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            activeTab === 'roles'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5 mr-1.5" />
          Role Permissions Matrix
        </button>
      </div>

      {/* Settings Form Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'company' && (
            <div className="space-y-4 max-w-2xl text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Corporate Entity Legal Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">UAE Tax Registration Number (TRN)</label>
                <input
                  type="text"
                  value={trn}
                  onChange={(e) => setTrn(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg font-mono text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Headquarters Physical Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Default Operating Currency</label>
                  <input
                    type="text"
                    disabled
                    value={currency}
                    className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg font-bold text-gray-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Operating Timezone</label>
                  <input
                    type="text"
                    disabled
                    value={timezone}
                    className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="space-y-4 max-w-2xl text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Monthly Payroll Cutoff Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={cutoffDay}
                    onChange={(e) => setCutoffDay(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#201B4F]"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">25th of month (standard UAE WPS cycle)</p>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Standard Overtime Multiplier</label>
                  <input
                    type="number"
                    step="0.05"
                    value={otRate}
                    onChange={(e) => setOtRate(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#201B4F]"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">1.25x for standard weekday shifts</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="font-bold text-gray-900 block mb-1">Decimal-Safe Rounding Policy:</span>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Monetary calculations strictly adhere to 2-decimal precision (fils) using minor currency integers. Native floating point approximation is disabled.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4 max-w-2xl text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Grace Period for Clock-In (Minutes)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#201B4F]"
                />
                <p className="text-[10px] text-gray-400 mt-1">Arrivals within 15 minutes of scheduled start are marked on-time.</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="font-bold text-gray-900 block mb-1">Midnight Boundary Shift Support:</span>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Night shifts (e.g. 20:00 to 05:00) crossing 00:00 are consolidated into a single contiguous operational shift record without clock event duplication.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-4 text-xs">
              <p className="text-gray-500 mb-2">
                Granular Separation of Duties (SOD) and Permissions Matrix across Titanz Management System:
              </p>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Role / Designation</th>
                      <th className="py-2.5 px-3">Workforce Dossiers</th>
                      <th className="py-2.5 px-3">Attendance Corrections</th>
                      <th className="py-2.5 px-3">Payroll Calculation</th>
                      <th className="py-2.5 px-3">Finalize & Publish</th>
                      <th className="py-2.5 px-3">OCR Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-gray-900">Super Administrator</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-gray-900">HR Administrator</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-gray-400">&times; View only</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Publish</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Approve</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-gray-900">Payroll Officer</td>
                      <td className="py-2.5 px-3 text-gray-600">Compensation only</td>
                      <td className="py-2.5 px-3 text-gray-600">Audit view</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Full</td>
                      <td className="py-2.5 px-3 text-amber-600 font-medium">Pending Maker</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-gray-900">Department Manager</td>
                      <td className="py-2.5 px-3 text-gray-600">Department only</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Shift level</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-gray-900">Employee (ESS)</td>
                      <td className="py-2.5 px-3 text-gray-600">Own profile</td>
                      <td className="py-2.5 px-3 text-gray-600">Own clocking</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">&check; Own payslip</td>
                      <td className="py-2.5 px-3 text-gray-400">&times;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 text-xs font-bold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Save Configuration Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
