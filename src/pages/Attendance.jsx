import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db, DEPARTMENTS } from '../data/mockDatabase.js';
import {
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Download,
  Edit,
  X,
  History,
  ShieldAlert,
} from 'lucide-react';

export default function Attendance() {
  const { isEmployeeOnly, currentUser } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState(() => db.getAttendance());

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  // Correction Modal
  const [correctionRecord, setCorrectionRecord] = useState(null);
  const [newStatus, setNewStatus] = useState('Present');
  const [correctionReason, setCorrectionReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Filtered List
  const filtered = useMemo(() => {
    return attendanceRecords.filter((rec) => {
      const matchSearch =
        searchQuery === '' ||
        rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'All' || rec.status === selectedStatus;
      const matchDept = selectedDept === 'All' || rec.department === selectedDept;

      return matchSearch && matchStatus && matchDept;
    });
  }, [attendanceRecords, searchQuery, selectedStatus, selectedDept]);

  const handleOpenCorrection = (rec) => {
    setCorrectionRecord(rec);
    setNewStatus(rec.status);
    setCorrectionReason('');
  };

  const handleSaveCorrection = (e) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      alert('An audit reason is required for any manual attendance correction.');
      return;
    }

    db.correctAttendance(
      correctionRecord.id,
      newStatus,
      correctionReason,
      currentUser?.name || 'HR Administrator'
    );

    setAttendanceRecords(db.getAttendance());
    setCorrectionRecord(null);
    setSuccessMessage(`Attendance status for ${correctionRecord.employeeName} corrected to ${newStatus}.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleExportCSV = () => {
    const headers = ['Record ID', 'Employee ID', 'Name', 'Department', 'Date', 'Scheduled Start', 'Scheduled End', 'Clock In', 'Clock Out', 'Worked Hours', 'Overtime Hours', 'Status', 'Exception'];
    const rows = filtered.map((r) => [
      r.id,
      r.employeeId,
      `"${r.employeeName}"`,
      `"${r.department}"`,
      r.date,
      r.scheduledStart,
      r.scheduledEnd,
      r.clockIn || '',
      r.clockOut || '',
      r.workedDurationHours,
      r.overtimeHours,
      r.status,
      `"${r.exception}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DomiHR_Attendance_${new Date().toISOString().substring(0, 10)}.csv`);
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
            Workforce Attendance & Shift Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time clock tracking, overnight duty shifts, exception detection, and auditable manual adjustments.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Download className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Export Attendance CSV
        </button>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          {successMessage}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by employee name or employee ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late Arrival</option>
              <option value="Absent">Absent</option>
              <option value="Approved Leave">Approved Leave</option>
              <option value="Early Departure">Early Departure</option>
            </select>

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
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Displaying <strong className="text-gray-900">{filtered.length}</strong> attendance records for <strong>29 October 2026</strong>
          </span>
          <span className="text-[11px] text-[#201B4F] font-medium">
            Configured 15-Minute Grace Period Active
          </span>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Scheduled Shift</th>
                <th className="py-3 px-4">Clock In / Out</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Overtime</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Exception Notes</th>
                <th className="py-3 px-4 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{att.employeeName}</div>
                    <div className="text-[11px] font-mono text-gray-500">{att.employeeId}</div>
                  </td>

                  <td className="py-3 px-4 text-gray-600 truncate max-w-[150px]">
                    {att.department}
                  </td>

                  <td className="py-3 px-4 text-gray-700 font-mono">
                    {att.scheduledStart} - {att.scheduledEnd}
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-gray-900">
                    {att.clockIn || '--:--'} &rarr; {att.clockOut || '--:--'}
                  </td>

                  <td className="py-3 px-4 font-mono text-gray-700">
                    {att.workedDurationHours}h
                  </td>

                  <td className="py-3 px-4 font-mono">
                    {att.overtimeHours > 0 ? (
                      <span className="font-bold text-emerald-600">+{att.overtimeHours}h OT</span>
                    ) : (
                      <span className="text-gray-400">0.0h</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
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

                  <td className="py-3 px-4 text-gray-500 text-[11px] max-w-[180px] truncate" title={att.exception}>
                    {att.exception}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {!isEmployeeOnly && (
                      <button
                        onClick={() => handleOpenCorrection(att)}
                        className="inline-flex items-center px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors cursor-pointer"
                        title="Audit Correct Status"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Correct
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Correction Modal with Audit Trail */}
      {correctionRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  Audited Attendance Correction
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Record adjustment for {correctionRecord.employeeName} ({correctionRecord.employeeId})
                </p>
              </div>
              <button
                onClick={() => setCorrectionRecord(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCorrection} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                <div className="flex items-center font-bold mb-1">
                  <ShieldAlert className="w-4 h-4 mr-1.5" />
                  Preserved Audit Trail Notice
                </div>
                Per enterprise security regulations, the previous status ({correctionRecord.status}) will be archived in the permanent audit trail with your name and timestamp.
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Target Corrected Status *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                >
                  <option value="Present">Present (Excused / Overridden)</option>
                  <option value="Late">Late Arrival</option>
                  <option value="Approved Leave">Approved Emergency Leave</option>
                  <option value="Absent">Unexcused Absence</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Required Justification / Audit Reason *
                </label>
                <textarea
                  required
                  rows={3}
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="Detail official operational grounds for adjustment (e.g. Traffic accident report on SZR, approved supervisor radio log, or client site hold)..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCorrectionRecord(null)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs"
                >
                  Commit Audited Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
