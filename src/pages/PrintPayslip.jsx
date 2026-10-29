import React from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { db, COMPANY_PROFILE } from '../data/mockDatabase.js';
import { Printer, Download, ArrowLeft, ShieldCheck, Building2 } from 'lucide-react';

export default function PrintPayslip({ payslipId }) {
  const { navigate } = useRouter();
  const payslip = db.getPayslipById(payslipId);

  if (!payslip) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Payslip Not Found</h2>
          <p className="text-xs text-gray-500 mb-6">
            The requested payslip record ({payslipId}) could not be located in finalized records.
          </p>
          <button
            onClick={() => navigate('/payslips')}
            className="px-4 py-2 bg-[#201B4F] text-white text-xs font-semibold rounded-lg"
          >
            Return to Payslips
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 selection:bg-gray-200">
      {/* Top Action Bar (Hidden on print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex items-center justify-between bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-xs">
        <button
          onClick={() => navigate('/payslips')}
          className="inline-flex items-center text-xs font-semibold text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payslips Registry
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Official Payslip (A4)
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 mr-1.5 text-gray-500" />
            Save as PDF
          </button>
        </div>
      </div>

      {/* Formal A4 Printable Document Container */}
      <div className="payslip-page max-w-4xl mx-auto bg-white border border-gray-300 shadow-md p-8 sm:p-12 text-[#111827] print:border-none print:shadow-none print:p-0">
        {/* Company Header */}
        <div className="flex justify-between items-start pb-6 border-b-2 border-[#201B4F]">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#201B4F] flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#201B4F]">
                  {COMPANY_PROFILE.name}
                </h1>
                <p className="text-[11px] text-gray-500 font-medium">Titanz Management System &bull; Domi HR</p>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-gray-600 space-y-0.5">
              <p>{COMPANY_PROFILE.address}</p>
              <p>TRN: <strong className="font-mono text-gray-800">{COMPANY_PROFILE.taxRegistrationNumber}</strong></p>
              <p>Email: {COMPANY_PROFILE.email} | Tel: {COMPANY_PROFILE.phone}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded bg-gray-100 text-[#201B4F] text-xs font-bold uppercase tracking-wider mb-2">
              Official Salary Slip
            </span>
            <div className="text-xs text-gray-600 font-mono">
              <div>Payslip No: <strong className="text-gray-900">{payslip.payslipNumber}</strong></div>
              <div>Period: <strong className="text-gray-900">{payslip.periodName}</strong></div>
              <div>Payment Date: <strong className="text-gray-900">{payslip.paymentDate}</strong></div>
            </div>
          </div>
        </div>

        {/* Employee Identification Details Box */}
        <div className="mt-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Employee Name</span>
              <span className="font-bold text-gray-900 text-sm">{payslip.employeeName}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Employee ID</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{payslip.employeeId}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Designation</span>
              <span className="font-semibold text-gray-800">{payslip.jobTitle}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Department</span>
              <span className="font-semibold text-gray-800">{payslip.department}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Duty Branch</span>
              <span className="text-gray-700">{payslip.branch}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Bank Name</span>
              <span className="text-gray-700">{payslip.bankName}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Central Bank IBAN</span>
              <span className="font-mono text-gray-800 text-[11px]">{payslip.iban}</span>
            </div>
          </div>
        </div>

        {/* Itemized Earnings and Deductions Columns */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Earnings */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-[#201B4F] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider flex justify-between">
              <span>Earnings Component</span>
              <span>Amount ({payslip.currency})</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Basic Salary</span>
                <span className="font-mono font-medium">{payslip.basicSalary.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Housing Allowance</span>
                <span className="font-mono font-medium">{payslip.housingAllowance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Transport Allowance</span>
                <span className="font-mono font-medium">{payslip.transportAllowance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Security / Hazard Allowance</span>
                <span className="font-mono font-medium">{payslip.otherAllowances.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Approved Overtime Hours</span>
                <span className="font-mono font-medium">{payslip.approvedOvertime.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Performance Bonuses</span>
                <span className="font-mono font-medium">{payslip.bonuses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 font-bold text-gray-900">
                <span>Total Gross Earnings</span>
                <span className="font-mono text-sm">{payslip.currency} {payslip.grossEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-2 font-bold text-xs uppercase tracking-wider flex justify-between">
              <span>Deductions Component</span>
              <span>Amount ({payslip.currency})</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Approved Unpaid Leave</span>
                <span className="font-mono font-medium">{payslip.unpaidLeaveDeductions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Authorized Loan / Advance Repayment</span>
                <span className="font-mono font-medium">{payslip.loanRepayments.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-gray-700">Statutory / Other Validated Deductions</span>
                <span className="font-mono font-medium">{payslip.otherDeductions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2.5 text-gray-300">
                <span>--</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between p-2.5 text-gray-300">
                <span>--</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between p-2.5 text-gray-300">
                <span>--</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 font-bold text-red-700">
                <span>Total Deductions</span>
                <span className="font-mono text-sm">{payslip.currency} {payslip.totalDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay Highlight Banner */}
        <div className="mt-6 bg-[#201B4F] text-white rounded-lg p-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#A4B5DC] font-semibold block">
              Net Remittance Payable to Employee Account
            </span>
            <span className="text-xs text-white/80 mt-0.5 block">
              Disbursed in full via UAE Central Bank Wages Protection System (WPS)
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              {payslip.currency} {payslip.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Employer Cost & Contribution Note (Informational) */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-[11px] text-gray-600 flex justify-between">
          <span>Employer Pension & Statutory Benefits Cost (Not deducted from employee pay):</span>
          <span className="font-mono font-bold text-gray-800">
            {payslip.currency} {payslip.employerContributions.toFixed(2)}
          </span>
        </div>

        {/* Signatures & Security Stamp */}
        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6 text-center text-xs text-gray-500">
          <div>
            <div className="border-b border-gray-300 pb-8 font-mono text-[11px] text-gray-400">
              [Electronic Stamp & Hash Verified]
            </div>
            <p className="mt-2 font-semibold text-gray-700">Prepared by Payroll Officer</p>
            <p className="text-[10px] text-gray-400">Zayd Khoury</p>
          </div>

          <div>
            <div className="border-b border-gray-300 pb-8 font-mono text-[11px] text-emerald-600 font-bold">
              APPROVED & VERIFIED
            </div>
            <p className="mt-2 font-semibold text-gray-700">Director of Human Capital</p>
            <p className="text-[10px] text-gray-400">Tariq Al-Mansoor</p>
          </div>

          <div>
            <div className="border-b border-gray-300 pb-8 font-mono text-[11px] text-gray-400">
              [Employee Signature / Portal Acknowledgment]
            </div>
            <p className="mt-2 font-semibold text-gray-700">Employee Acknowledgment</p>
            <p className="text-[10px] text-gray-400">{payslip.employeeName}</p>
          </div>
        </div>

        {/* Document Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
          <span>Titanz Security Group &bull; Confidential Official Payroll Record</span>
          <span>Generated on {payslip.paymentDate} &bull; Document Reference: {payslip.id}</span>
        </div>
      </div>
    </div>
  );
}
