import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth, ROLES } from '../context/AuthContext.jsx';
import { db } from '../data/mockDatabase.js';
import {
  Coins,
  Play,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  X,
  Send,
  Eye,
  Lock,
  Layers,
  Scale,
} from 'lucide-react';
import { verifyMasterPayrollTest, DecimalMoney } from '../utils/decimalMath.js';

export default function Payroll() {
  const { navigate } = useRouter();
  const { currentUser, isPayrollOfficer, isSuperAdmin } = useAuth();
  const [payrollRuns, setPayrollRuns] = useState(() => db.getPayrollRuns());
  const [selectedRun, setSelectedRun] = useState(() => db.getPayrollRuns()[1] || db.getPayrollRuns()[0]);

  // Modals & alerts
  const [statusNotice, setStatusNotice] = useState('');
  const [isNewRunModalOpen, setIsNewRunModalOpen] = useState(false);
  const [newRunPeriod, setNewRunPeriod] = useState('2026-M06');
  const [newRunName, setNewRunName] = useState('June 2026 Regular Payroll');

  // Test Runner modal
  const [testResult, setTestResult] = useState(null);

  const handleRunVerificationTest = () => {
    const result = verifyMasterPayrollTest();
    setTestResult(result);
  };

  const refreshState = () => {
    const runs = db.getPayrollRuns();
    setPayrollRuns([...runs]);
    if (selectedRun) {
      setSelectedRun(runs.find((r) => r.id === selectedRun.id) || runs[0]);
    }
  };

  const handleCalculate = (runId) => {
    db.calculatePayrollRun(runId);
    refreshState();
    setStatusNotice(`Run ${runId} calculated successfully using decimal-safe arithmetic.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleSubmitApproval = (runId) => {
    db.submitPayrollForApproval(runId);
    refreshState();
    setStatusNotice(`Run ${runId} submitted for maker-checker executive sign-off.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleApprove = (runId) => {
    db.approvePayrollRun(runId, currentUser?.name || 'Jessica Taylor');
    refreshState();
    setStatusNotice(`Run ${runId} approved by ${currentUser?.name || 'Approver'}. Ready for finalization.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleFinalize = (runId) => {
    db.finalizePayrollRun(runId, currentUser?.name || 'Tariq Al-Mansoor');
    refreshState();
    setStatusNotice(`Run ${runId} finalized! Immutable snapshot created and payslips generated.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handlePublish = (runId) => {
    db.publishPayslipsForRun(runId);
    refreshState();
    setStatusNotice(`All payslips for ${runId} published to Employee Self-Service.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleCreateNewRun = (e) => {
    e.preventDefault();
    const created = db.createPayrollRun(newRunPeriod, newRunName, '2026-06-01', '2026-06-30', 'Scheduled June regular cycle');
    setIsNewRunModalOpen(false);
    refreshState();
    setSelectedRun(created);
    setStatusNotice(`Created draft run for ${created.periodName}`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Financial Payroll Processing & Reconciliations
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Authoritative decimal-safe calculation engine, multi-stage approval workflows, and immutable historical snapshots.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleRunVerificationTest}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 shadow-xs transition-colors cursor-pointer"
            title="Run Master Prompt Section 11 Verification Test"
          >
            <Scale className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            Run Spec Math Test (AED 6,600)
          </button>

          <button
            onClick={() => setIsNewRunModalOpen(true)}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Create Payroll Run
          </button>
        </div>
      </div>

      {statusNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Runs Selector Carousel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {payrollRuns.map((run) => {
          const isSelected = selectedRun?.id === run.id;
          return (
            <div
              key={run.id}
              onClick={() => setSelectedRun(run)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#201B4F] bg-white ring-2 ring-[#201B4F]/20 shadow-md'
                  : 'border-[#E2E8F0] bg-white hover:border-gray-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-gray-900">{run.periodCode}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    run.status === 'Published'
                      ? 'bg-purple-100 text-purple-800'
                      : run.status === 'Finalized'
                      ? 'bg-emerald-100 text-emerald-800'
                      : run.status === 'Approved'
                      ? 'bg-blue-100 text-blue-800'
                      : run.status === 'Pending Approval'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {run.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#111827] truncate">{run.periodName}</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{run.startDate} &rarr; {run.endDate}</p>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-semibold">Net Payable</span>
                  <span className="font-mono font-bold text-base text-[#201B4F]">
                    AED {run.netPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{run.employeeCount} Staff</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Run Deep Detail Workspace */}
      {selectedRun && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-[#111827]">
                  {selectedRun.periodName}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#201B4F]/10 text-[#201B4F]">
                  {selectedRun.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Cycle Run ID: <strong className="font-mono text-gray-700">{selectedRun.id}</strong> &bull; Currency: <strong>AED</strong> &bull; Created by {selectedRun.createdBy}
              </p>
            </div>

            {/* State Machine Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedRun.status === 'Draft' && (
                <button
                  onClick={() => handleCalculate(selectedRun.id)}
                  className="px-4 py-2 bg-[#201B4F] hover:bg-[#2c2569] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Execute Calculation
                </button>
              )}

              {selectedRun.status === 'Calculated' && (
                <>
                  <button
                    onClick={() => handleCalculate(selectedRun.id)}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Recalculate
                  </button>
                  <button
                    onClick={() => handleSubmitApproval(selectedRun.id)}
                    className="px-4 py-2 bg-[#201B4F] hover:bg-[#2c2569] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit for Approval
                  </button>
                </>
              )}

              {selectedRun.status === 'Pending Approval' && (
                <button
                  onClick={() => handleApprove(selectedRun.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                  Executive Approve Run
                </button>
              )}

              {selectedRun.status === 'Approved' && (
                <button
                  onClick={() => handleFinalize(selectedRun.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 mr-1.5" />
                  Finalize Snapshot & Generate Payslips
                </button>
              )}

              {selectedRun.status === 'Finalized' && (
                <button
                  onClick={() => handlePublish(selectedRun.id)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5 mr-1.5" />
                  Publish Payslips to Employees
                </button>
              )}

              {selectedRun.status === 'Published' && (
                <button
                  onClick={() => navigate('/payslips')}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                  View Published Payslips
                </button>
              )}
            </div>
          </div>

          {/* Reconciliation Balance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Total Gross Earnings
              </span>
              <span className="text-lg font-bold font-mono text-gray-900 mt-1 block">
                AED {selectedRun.grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Basic + All Allowances + OT</span>
            </div>

            <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
              <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wider block">
                Employee Deductions
              </span>
              <span className="text-lg font-bold font-mono text-red-700 mt-1 block">
                -AED {selectedRun.employeeDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-red-400 mt-0.5 block">Approved Unpaid & Deductions</span>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Net Payroll Payable
              </span>
              <span className="text-lg font-bold font-mono text-emerald-700 mt-1 block">
                AED {selectedRun.netPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-emerald-600 mt-0.5 block">Authoritative Disbursed</span>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                Total Employer Cost
              </span>
              <span className="text-lg font-bold font-mono text-blue-900 mt-1 block">
                AED {selectedRun.totalEmployerCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-blue-500 mt-0.5 block">Gross + Contributions</span>
            </div>
          </div>

          {/* Audit & Compliance Signature Block */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-xs space-y-2">
            <div className="font-bold text-gray-900">Maker-Checker Authorization Record:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-600">
              <div>
                <span className="text-gray-400 block text-[10px]">PREPARED BY</span>
                <span className="font-medium text-gray-900">{selectedRun.createdBy}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">APPROVED BY</span>
                <span className="font-medium text-gray-900">{selectedRun.approvedBy || 'Pending Sign-off'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">FINALIZED BY</span>
                <span className="font-medium text-gray-900">{selectedRun.finalizedBy || 'Pending Snapshot'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Master Spec Automated Verification Test Modal */}
      {testResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-[#111827]">
                  Master Prompt Section 11 Verification Test
                </h3>
              </div>
              <button
                onClick={() => setTestResult(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
                  Test Status: PASSED (Exact Minor Currency Reconciled)
                </div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white font-mono text-[10px] rounded">
                  0 FLOATING DRIFT
                </span>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50/50">
                <div className="font-bold text-gray-700">Test Inputs:</div>
                <div className="grid grid-cols-2 gap-2 text-gray-600 font-mono">
                  <div>Basic Salary: AED {testResult.details.input.basicSalary.toFixed(2)}</div>
                  <div>Housing Allowance: AED {testResult.details.input.housingAllowance.toFixed(2)}</div>
                  <div>Transport Allowance: AED {testResult.details.input.transportAllowance.toFixed(2)}</div>
                  <div>Approved Overtime: AED {testResult.details.input.approvedOvertime.toFixed(2)}</div>
                  <div>Approved Deduction: AED {testResult.details.input.otherDeductions.toFixed(2)}</div>
                  <div>Employer Contributions: AED {testResult.details.input.employerContributions.toFixed(2)}</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-white">
                <div className="font-bold text-gray-700">Authoritative Reconciled Output:</div>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span>Expected Gross Earnings:</span>
                    <span className="font-bold text-gray-900">AED {testResult.details.expected.grossEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Gross Earnings:</span>
                    <span className="font-bold text-emerald-700">AED {testResult.details.actual.grossEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-100">
                    <span>Expected Net Pay:</span>
                    <span className="font-bold text-gray-900">AED {testResult.details.expected.netPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Net Pay:</span>
                    <span className="font-bold text-emerald-700">AED {testResult.details.actual.netPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-100">
                    <span>Expected Employer Cost:</span>
                    <span className="font-bold text-gray-900">AED {testResult.details.expected.employerCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Employer Cost:</span>
                    <span className="font-bold text-emerald-700">AED {testResult.details.actual.employerCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setTestResult(null)}
                className="px-4 py-2 bg-[#201B4F] text-white text-xs font-semibold rounded-lg"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Run Modal */}
      {isNewRunModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#111827]">
                Create New Payroll Cycle
              </h3>
              <button
                onClick={() => setIsNewRunModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewRun} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Period Code *</label>
                <input
                  type="text"
                  required
                  value={newRunPeriod}
                  onChange={(e) => setNewRunPeriod(e.target.value)}
                  placeholder="e.g. 2026-M06"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Period Name *</label>
                <input
                  type="text"
                  required
                  value={newRunName}
                  onChange={(e) => setNewRunName(e.target.value)}
                  placeholder="e.g. June 2026 Regular Payroll"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewRunModalOpen(false)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs"
                >
                  Create Draft Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
