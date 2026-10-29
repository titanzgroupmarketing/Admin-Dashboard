import React, { useState } from 'react';
import { db, DEPARTMENTS, BRANCHES, COMPANY_PROFILE } from '../data/mockDatabase.js';
import {
  BarChart3,
  Download,
  Calendar,
  Building2,
  Users,
  Coins,
  Clock,
  Printer,
  FileText,
} from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState('workforce'); // 'workforce' | 'attendance' | 'payroll'
  const employees = db.getEmployees();
  const attendance = db.getAttendance();
  const payrollRuns = db.getPayrollRuns();

  const handleExportCurrentReport = () => {
    let headers = [];
    let rows = [];

    if (reportType === 'workforce') {
      headers = ['ID', 'Name', 'Department', 'Branch', 'Title', 'Status', 'Basic Salary (AED)'];
      rows = employees.map((e) => [e.id, `"${e.firstName} ${e.lastName}"`, `"${e.department}"`, `"${e.branch}"`, `"${e.title}"`, e.status, e.basicSalary.toFixed(2)]);
    } else if (reportType === 'attendance') {
      headers = ['Date', 'Employee ID', 'Name', 'Department', 'Scheduled', 'Clock In', 'Clock Out', 'Status', 'Overtime Hours'];
      rows = attendance.map((a) => [a.date, a.employeeId, `"${a.employeeName}"`, `"${a.department}"`, `${a.scheduledStart}-${a.scheduledEnd}`, a.clockIn || '', a.clockOut || '', a.status, a.overtimeHours]);
    } else {
      headers = ['Run ID', 'Period', 'Status', 'Gross Earnings (AED)', 'Deductions (AED)', 'Net Payable (AED)', 'Employer Cost (AED)'];
      rows = payrollRuns.map((r) => [r.id, r.periodName, r.status, r.grossEarnings.toFixed(2), r.employeeDeductions.toFixed(2), r.netPayable.toFixed(2), r.totalEmployerCost.toFixed(2)]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DomiHR_Report_${reportType.toUpperCase()}_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Executive Analytics & Regulatory Reports
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Official compliance reporting for UAE Ministry of Human Resources & Emiratisation (MOHRE) and internal audits.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
            Print Report
          </button>
          <button
            onClick={handleExportCurrentReport}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Report CSV
          </button>
        </div>
      </div>

      {/* Report Selector Tabs */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-2 flex space-x-2">
        <button
          onClick={() => setReportType('workforce')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            reportType === 'workforce'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Workforce & Headcount Distribution
        </button>

        <button
          onClick={() => setReportType('attendance')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            reportType === 'attendance'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4 mr-2" />
          Attendance & Shift Adherence Log
        </button>

        <button
          onClick={() => setReportType('payroll')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            reportType === 'payroll'
              ? 'bg-[#201B4F] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Coins className="w-4 h-4 mr-2" />
          Payroll & WPS Central Bank Reconciliation
        </button>
      </div>

      {/* Report Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">
              {reportType === 'workforce' && 'Workforce Distribution & Compensation Register'}
              {reportType === 'attendance' && 'Daily Attendance, Exceptions & Overtime Log'}
              {reportType === 'payroll' && 'Authoritative Payroll Reconciliation & WPS Audit'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Entity: {COMPANY_PROFILE.name} &bull; TRN: {COMPANY_PROFILE.taxRegistrationNumber} &bull; Generated: 29 Oct 2026
            </p>
          </div>
          <span className="text-xs font-mono bg-gray-100 px-2.5 py-1 rounded text-gray-700 font-semibold">
            Status: AUDITED & CERTIFIED
          </span>
        </div>

        {/* Dynamic Report Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            {reportType === 'workforce' && (
              <>
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Employee</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Branch</th>
                    <th className="py-2.5 px-3">Job Title</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Basic Salary</th>
                    <th className="py-2.5 px-3 text-right">Gross Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {employees.slice(0, 10).map((e) => (
                    <tr key={e.id}>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{e.firstName} {e.lastName} ({e.id})</td>
                      <td className="py-2.5 px-3 text-gray-600">{e.department}</td>
                      <td className="py-2.5 px-3 text-gray-600">{e.branch}</td>
                      <td className="py-2.5 px-3 text-gray-800">{e.title}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">{e.status}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">AED {e.basicSalary.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#201B4F]">
                        AED {(e.basicSalary + e.housingAllowance + e.transportAllowance + e.otherAllowances).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {reportType === 'attendance' && (
              <>
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Employee</th>
                    <th className="py-2.5 px-3">Shift Hours</th>
                    <th className="py-2.5 px-3">Actual In / Out</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Exceptions / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendance.map((a) => (
                    <tr key={a.id}>
                      <td className="py-2.5 px-3 font-mono font-semibold text-gray-900">{a.date}</td>
                      <td className="py-2.5 px-3 font-medium text-gray-900">{a.employeeName} ({a.employeeId})</td>
                      <td className="py-2.5 px-3 font-mono text-gray-600">{a.scheduledStart} - {a.scheduledEnd}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-gray-900">{a.clockIn || '--:--'} / {a.clockOut || '--:--'}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">{a.status}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 text-[11px]">{a.exception}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {reportType === 'payroll' && (
              <>
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Period</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Staff Count</th>
                    <th className="py-2.5 px-3 text-right">Gross Earnings</th>
                    <th className="py-2.5 px-3 text-right">Employee Deductions</th>
                    <th className="py-2.5 px-3 text-right">Net Payable</th>
                    <th className="py-2.5 px-3 text-right">Total Employer Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payrollRuns.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 px-3 font-semibold text-gray-900">{r.periodName} ({r.periodCode})</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">{r.status}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700">{r.employeeCount}</td>
                      <td className="py-3 px-3 text-right font-mono">AED {r.grossEarnings.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-mono text-red-600">-AED {r.employeeDeductions.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#201B4F]">AED {r.netPayable.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">AED {r.totalEmployerCost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
