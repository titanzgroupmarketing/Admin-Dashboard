import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../data/mockDatabase.js';
import {
  Users,
  Clock,
  Coins,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingUp,
  UserPlus,
  Play,
  ScanLine,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { DecimalMoney } from '../utils/decimalMath.js';

export default function Dashboard() {
  const { navigate } = useRouter();
  const { currentUser, isEmployeeOnly } = useAuth();

  const employees = db.getEmployees();
  const attendance = db.getAttendance();
  const payrollRuns = db.getPayrollRuns();
  const payslips = db.getPayslips();
  const auditLogs = db.getAuditLogs().slice(0, 6);

  // Computed metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const presentToday = attendance.filter((a) => a.status === 'Present').length;
  const lateToday = attendance.filter((a) => a.status === 'Late').length;
  const absentToday = attendance.filter((a) => a.status === 'Absent').length;
  const onLeaveToday = attendance.filter((a) => a.status === 'Approved Leave').length;

  const currentRun = payrollRuns[1] || payrollRuns[0]; // April run
  const pendingApprovalsCount = payrollRuns.filter((r) => r.status === 'Pending Approval' || r.status === 'Calculated').length;
  const publishedPayslipsCount = payslips.filter((p) => p.status === 'Published').length;

  // Department counts
  const deptMap = {};
  employees.forEach((e) => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });

  // Employee self-attendance check
  const myAttendance = attendance.find((a) => a.employeeId === currentUser?.employeeId);
  const [clockStatusMsg, setClockStatusMsg] = useState('');

  const handleSelfClock = (type) => {
    if (!currentUser?.employeeId) return;
    const res = db.recordClockEvent(currentUser.employeeId, type);
    setClockStatusMsg(`Clock-${type.toUpperCase()} recorded successfully at ${type === 'in' ? res.clockIn : res.clockOut}`);
    setTimeout(() => setClockStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Greeting & Operational Summary */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#A4B5DC] uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Thursday, 29 October 2026 | GST Dubai Time (UTC+4)</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEmployeeOnly
              ? 'Your personalized employee attendance, shift schedules, and official payslips.'
              : 'Workforce operational overview across 4 UAE branches and active security operations.'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {!isEmployeeOnly ? (
            <>
              <button
                onClick={() => navigate('/employees')}
                className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                Add Employee
              </button>
              <button
                onClick={() => navigate('/ocr')}
                className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
              >
                <ScanLine className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                OCR Document
              </button>
              <button
                onClick={() => navigate('/payroll')}
                className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Process Payroll
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelfClock('in')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Clock In
              </button>
              <button
                onClick={() => handleSelfClock('out')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Clock Out
              </button>
            </div>
          )}
        </div>
      </div>

      {clockStatusMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          {clockStatusMsg}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Workforce */}
        <div
          onClick={() => !isEmployeeOnly && navigate('/employees')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#A4B5DC] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Workforce
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-[#201B4F] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">{totalEmployees}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              100% Verified
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{activeEmployees} Active on duty rosters</p>
        </div>

        {/* Present Today */}
        <div
          onClick={() => navigate('/attendance')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#A4B5DC] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Present Today
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">{presentToday}</span>
            <span className="text-xs font-medium text-amber-600">
              {lateToday > 0 ? `${lateToday} Late Arrivals` : '0 Late'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{absentToday} Unexcused | {onLeaveToday} Approved Leave</p>
        </div>

        {/* Current Payroll Payable */}
        <div
          onClick={() => !isEmployeeOnly && navigate('/payroll')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#A4B5DC] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              April Net Payroll
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-bold text-[#111827]">
              AED {currentRun.netPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              {currentRun.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Employer Cost: AED {currentRun.totalEmployerCost.toLocaleString('en-US')}</p>
        </div>

        {/* Payslips & Publication */}
        <div
          onClick={() => navigate('/payslips')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#A4B5DC] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Published Payslips
            </span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">{publishedPayslipsCount}</span>
            <span className="text-xs font-medium text-blue-600">
              {pendingApprovalsCount} Run Pending
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">A4 Official Stored Snapshots</p>
        </div>
      </div>

      {/* Main Grid: Operational Panels & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Attendance & Exceptions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Live Attendance Roster */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Today's Live Attendance & Exceptions
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Real-time clock events with schedule adherence and grace period tracking
                </p>
              </div>
              <button
                onClick={() => navigate('/attendance')}
                className="text-xs font-semibold text-[#201B4F] hover:underline flex items-center"
              >
                View Full Roster <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase">
                    <th className="py-2.5 px-3">Employee</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Scheduled</th>
                    <th className="py-2.5 px-3">Clock In</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Exception Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendance.slice(0, 6).map((att) => (
                    <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{att.employeeName}</div>
                        <div className="text-[10px] text-gray-400">{att.employeeId}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-600 truncate max-w-[140px]">
                        {att.department}
                      </td>
                      <td className="py-3 px-3 text-gray-600 font-mono">
                        {att.scheduledStart} - {att.scheduledEnd}
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-gray-900">
                        {att.clockIn || '--:--'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            att.status === 'Present'
                              ? 'bg-emerald-50 text-emerald-700'
                              : att.status === 'Late'
                              ? 'bg-amber-50 text-amber-700'
                              : att.status === 'Approved Leave'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {att.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 text-[11px] truncate max-w-[160px]">
                        {att.exception}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payroll Expenditure Overview */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Monthly Payroll Reconciliation
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Authoritative monetary comparisons (Gross vs Net Pay vs Total Cost)
                </p>
              </div>
              <button
                onClick={() => navigate('/payroll')}
                className="text-xs font-semibold text-[#201B4F] hover:underline flex items-center"
              >
                Payroll Runs <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {payrollRuns.map((run) => (
                <div key={run.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900">{run.periodCode}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      run.status === 'Finalized' ? 'bg-emerald-100 text-emerald-800' :
                      run.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {run.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{run.periodName}</div>

                  <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Gross:</span>
                      <span className="font-mono font-medium">AED {run.grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Deductions:</span>
                      <span className="font-mono text-red-600">-AED {run.employeeDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold pt-1 border-t border-gray-200">
                      <span>Net Payable:</span>
                      <span className="font-mono text-[#201B4F]">AED {run.netPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Department Distribution & Audit Stream */}
        <div className="space-y-6">
          {/* Department Headcount Breakdown */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#111827] mb-1">
              Workforce by Department
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Real-time staffing allocations
            </p>

            <div className="space-y-3">
              {Object.entries(deptMap).map(([dept, count]) => {
                const pct = Math.round((count / totalEmployees) * 100);
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-700">
                      <span className="truncate max-w-[190px]">{dept}</span>
                      <span className="font-bold text-gray-900">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#201B4F] h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Audit Trail */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827]">
                Recent Audit Trail
              </h2>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Immutable</span>
            </div>

            <div className="space-y-3.5">
              {auditLogs.map((log) => (
                <div key={log.id} className="text-xs border-l-2 border-[#201B4F] pl-3 py-0.5">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="font-semibold text-gray-900">{log.action}</span>
                    <span className="text-[10px]">{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-snug mt-0.5">{log.details}</p>
                  <span className="text-[10px] text-[#A4B5DC] block mt-0.5 font-medium">By {log.actor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
