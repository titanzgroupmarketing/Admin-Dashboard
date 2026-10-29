import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../data/mockDatabase.js';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Shield,
  Clock,
  Coins,
  FileText,
  Calendar,
  CreditCard,
  UserCheck,
  AlertCircle,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { DecimalMoney } from '../utils/decimalMath.js';

export default function EmployeeDetails({ employeeId }) {
  const { navigate } = useRouter();
  const { isEmployeeOnly } = useAuth();
  const employee = db.getEmployeeById(employeeId);

  const [activeTab, setActiveTab] = useState('overview');

  if (!employee) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Employee Not Found</h2>
        <p className="text-xs text-gray-500 mt-1">The employee record for ID "{employeeId}" does not exist.</p>
        <button
          onClick={() => navigate('/employees')}
          className="mt-6 px-4 py-2 bg-[#201B4F] text-white text-xs font-semibold rounded-lg"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Attendance history
  const attendanceList = db.getAttendance().filter((a) => a.employeeId === employee.id);
  // Payslips history
  const payslipsList = db.getPayslips(employee.id);

  // Compensation totals
  const totalAllowances = employee.housingAllowance + employee.transportAllowance + employee.otherAllowances;
  const grossMonthlyBasis = employee.basicSalary + totalAllowances;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/employees')}
        className="inline-flex items-center text-xs font-semibold text-[#201B4F] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Employee Directory
      </button>

      {/* Dossier Header Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-5">
            <img
              src={employee.avatar}
              alt={employee.firstName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E2E8F0] shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl font-bold text-[#111827]">
                  {employee.firstName} {employee.lastName}
                </h1>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    employee.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {employee.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium mt-1">
                {employee.title} &bull; <span className="text-[#201B4F] font-semibold">{employee.department}</span>
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-700">
                  ID: {employee.id}
                </span>
                <span className="flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  {employee.branch}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  Joined: {employee.joiningDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 uppercase font-semibold">Gross Monthly Basis</span>
            <span className="text-2xl font-bold text-[#201B4F] font-mono mt-1">
              AED {grossMonthlyBasis.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5">
              Verified by Titanz Payroll
            </span>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex space-x-6 pt-4 text-xs font-semibold border-b border-gray-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#201B4F] text-[#201B4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overview & Compensation
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'attendance'
                ? 'border-[#201B4F] text-[#201B4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Attendance Logs ({attendanceList.length})
          </button>
          <button
            onClick={() => setActiveTab('payslips')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'payslips'
                ? 'border-[#201B4F] text-[#201B4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Official Payslips ({payslipsList.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compensation Breakdown Card */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                  <Coins className="w-4 h-4 mr-2 text-[#201B4F]" />
                  Authoritative Compensation Breakdown
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-gray-200/80">
                    <span className="text-gray-600">Basic Monthly Salary:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      AED {employee.basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200/80">
                    <span className="text-gray-600">Housing Allowance:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      AED {employee.housingAllowance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200/80">
                    <span className="text-gray-600">Transport Allowance:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      AED {employee.transportAllowance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200/80">
                    <span className="text-gray-600">Security / Hazard Allowance:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      AED {employee.otherAllowances.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-gray-900 text-sm bg-white px-3 rounded-lg border border-gray-200 mt-2">
                    <span>Total Monthly Gross Basis:</span>
                    <span className="font-mono text-[#201B4F]">
                      AED {grossMonthlyBasis.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Banking & Contact Card */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-[#201B4F]" />
                  Banking & Contact Credentials
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Primary Bank</span>
                    <span className="font-semibold text-gray-900">{employee.bankName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Central Bank UAE IBAN</span>
                    <span className="font-mono font-semibold text-gray-900 text-[11px] bg-white px-2 py-1 rounded border border-gray-200 block mt-0.5">
                      {employee.iban}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/80 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-500 block text-[11px]">Work Email</span>
                      <span className="text-gray-800 truncate block">{employee.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">Phone</span>
                      <span className="text-gray-800">{employee.phone}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Emergency Contact</span>
                    <span className="text-gray-800">{employee.emergencyContact || 'Verified on file'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Scheduled Hours</th>
                    <th className="py-2.5 px-4">Clock In / Out</th>
                    <th className="py-2.5 px-4">Worked</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Audit Exceptions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendanceList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-400">
                        No recorded attendance exceptions for this employee today.
                      </td>
                    </tr>
                  ) : (
                    attendanceList.map((a) => (
                      <tr key={a.id}>
                        <td className="py-3 px-4 font-mono font-semibold text-gray-900">{a.date}</td>
                        <td className="py-3 px-4 font-mono text-gray-600">{a.scheduledStart} - {a.scheduledEnd}</td>
                        <td className="py-3 px-4 font-mono font-medium text-gray-900">{a.clockIn || '--:--'} / {a.clockOut || '--:--'}</td>
                        <td className="py-3 px-4 font-mono text-gray-700">{a.workedDurationHours}h</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            a.status === 'Present' ? 'bg-emerald-50 text-emerald-700' :
                            a.status === 'Late' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-[11px]">{a.exception}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payslips' && (
            <div className="space-y-3">
              {payslipsList.length === 0 ? (
                <div className="p-8 text-center text-gray-400 border border-gray-200 rounded-xl">
                  No finalized payslips available for this employee.
                </div>
              ) : (
                payslipsList.map((ps) => (
                  <div
                    key={ps.id}
                    className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#A4B5DC] transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-gray-900 text-sm">{ps.payslipNumber}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                          {ps.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{ps.periodName} &bull; Payment: {ps.paymentDate}</p>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 block">Net Remitted</span>
                        <span className="font-mono font-bold text-sm text-[#201B4F]">
                          AED {ps.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/print/payslips/${ps.id}`)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Print / View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
