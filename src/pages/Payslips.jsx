import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db, DEPARTMENTS } from '../data/mockDatabase.js';
import {
  FileText,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Send,
} from 'lucide-react';

export default function Payslips() {
  const { navigate } = useRouter();
  const { currentUser, isEmployeeOnly } = useAuth();

  // If employee only, restrict to own employeeId
  const allPayslips = isEmployeeOnly
    ? db.getPayslips(currentUser?.employeeId)
    : db.getPayslips();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  // Filtered
  const filtered = useMemo(() => {
    return allPayslips.filter((ps) => {
      const matchSearch =
        searchQuery === '' ||
        ps.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ps.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ps.payslipNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPeriod = selectedPeriod === 'All' || ps.periodCode === selectedPeriod;
      const matchDept = selectedDept === 'All' || ps.department === selectedDept;

      return matchSearch && matchPeriod && matchDept;
    });
  }, [allPayslips, searchQuery, selectedPeriod, selectedDept]);

  // Export Summary CSV
  const handleExportCSV = () => {
    const headers = ['Payslip Number', 'Employee ID', 'Employee Name', 'Department', 'Period Code', 'Gross Earnings (AED)', 'Deductions (AED)', 'Net Pay (AED)', 'Payment Date', 'Status'];
    const rows = filtered.map((p) => [
      p.payslipNumber,
      p.employeeId,
      `"${p.employeeName}"`,
      `"${p.department}"`,
      p.periodCode,
      p.grossEarnings.toFixed(2),
      p.totalDeductions.toFixed(2),
      p.netPay.toFixed(2),
      p.paymentDate,
      p.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DomiHR_Payslips_Summary_${new Date().toISOString().substring(0, 10)}.csv`);
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
            {isEmployeeOnly ? 'My Official Stored Payslips' : 'Workforce Electronic Payslips'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Historical immutable payslip snapshots generated from finalized payroll runs.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Download className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Export Payslip Registry
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by payslip number, employee name, or ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="All">All Payroll Cycles</option>
              <option value="2026-M03">March 2026</option>
              <option value="2026-M04">April 2026</option>
            </select>

            {!isEmployeeOnly && (
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Showing <strong className="text-gray-900">{filtered.length}</strong> official payslip documents
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Central Bank UAE WPS Reconciled
          </span>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <th className="py-3 px-4">Payslip Document</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Gross Earnings</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Remitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No payslips matched your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((ps) => (
                  <tr key={ps.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-gray-900 group-hover:text-[#201B4F] transition-colors">
                        {ps.payslipNumber}
                      </div>
                      <div className="text-[10px] text-gray-400">Disbursed via {ps.bankName}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{ps.employeeName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{ps.employeeId} &bull; {ps.department}</div>
                    </td>

                    <td className="py-3 px-4 text-gray-700 font-mono">
                      {ps.periodCode}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-900">
                      AED {ps.grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 px-4 font-mono text-red-600">
                      -AED {ps.totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#201B4F]">
                      AED {ps.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {ps.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate(`/print/payslips/${ps.id}`)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer"
                        title="Dedicated A4 Print Layout"
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        Print / PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
