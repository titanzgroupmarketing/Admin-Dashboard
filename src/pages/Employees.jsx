import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db, DEPARTMENTS, BRANCHES } from '../data/mockDatabase.js';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  Mail,
  Phone,
} from 'lucide-react';

export default function Employees() {
  const { navigate } = useRouter();
  const { isEmployeeOnly, currentUser } = useAuth();
  const [employees, setEmployees] = useState(() => db.getEmployees());

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Add Employee Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: DEPARTMENTS[0],
    title: '',
    branch: BRANCHES[0],
    employmentType: 'Full-time',
    joiningDate: '2026-11-01',
    basicSalary: 6000,
    housingAllowance: 1500,
    transportAllowance: 600,
    otherAllowances: 300,
    bankName: 'Emirates NBD',
    iban: 'AE000000000000000000000',
    emergencyContact: '',
  });

  // Filtered list
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        searchQuery === '' ||
        emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept = selectedDept === 'All' || emp.department === selectedDept;
      const matchBranch = selectedBranch === 'All' || emp.branch === selectedBranch;
      const matchStatus = selectedStatus === 'All' || emp.status === selectedStatus;

      return matchSearch && matchDept && matchBranch && matchStatus;
    });
  }, [employees, searchQuery, selectedDept, selectedBranch, selectedStatus]);

  // Paginated list
  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Employee ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Department', 'Job Title', 'Branch', 'Status', 'Basic Salary (AED)', 'Net Pay Basis'];
    const rows = filteredEmployees.map((e) => [
      e.id,
      e.firstName,
      e.lastName,
      e.email,
      e.phone,
      `"${e.department}"`,
      `"${e.title}"`,
      `"${e.branch}"`,
      e.status,
      e.basicSalary.toFixed(2),
      (e.basicSalary + e.housingAllowance + e.transportAllowance).toFixed(2),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DomiHR_Employees_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.title) {
      setFormError('Please fill in all required fields');
      return;
    }

    // Check duplicate email
    if (employees.some((emp) => emp.email.toLowerCase() === formData.email.toLowerCase())) {
      setFormError('An employee with this email already exists in Titanz Security Group.');
      return;
    }

    const created = db.addEmployee({
      ...formData,
      basicSalary: parseFloat(formData.basicSalary) || 0,
      housingAllowance: parseFloat(formData.housingAllowance) || 0,
      transportAllowance: parseFloat(formData.transportAllowance) || 0,
      otherAllowances: parseFloat(formData.otherAllowances) || 0,
    });

    setEmployees(db.getEmployees());
    setIsModalOpen(false);
    navigate(`/employees/${created.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Employee Directory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Official personnel master records, duty assignments, and authorized compensation profiles.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
            Export CSV
          </button>
          {!isEmployeeOnly && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, ID (e.g. TSG-004), job title, or email..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="All">All Branches</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Probation">Probation</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Showing <strong className="text-gray-900">{filteredEmployees.length}</strong> employees
            {filteredEmployees.length !== employees.length && ` (filtered from ${employees.length})`}
          </span>
          {(searchQuery || selectedDept !== 'All' || selectedBranch !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedBranch('All');
                setSelectedStatus('All');
                setCurrentPage(1);
              }}
              className="text-xs text-[#201B4F] font-semibold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Role & Department</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Joining Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No matching employees found. Try adjusting your search query or filters.
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={emp.avatar}
                          alt={emp.firstName}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-[#201B4F] transition-colors">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-[11px] font-mono text-gray-500">{emp.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{emp.title}</div>
                      <div className="text-[11px] text-gray-500">{emp.department}</div>
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{emp.branch}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      <div className="truncate max-w-[170px]">{emp.email}</div>
                      <div className="text-[11px] text-gray-400">{emp.phone}</div>
                    </td>

                    <td className="py-3 px-4 text-gray-600 font-mono">
                      {emp.joiningDate}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          emp.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : emp.status === 'Probation'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-sky-50 text-sky-700'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate(`/employees/${emp.id}`)}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-[#201B4F] bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                        title="View Full Dossier"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>
            Page <strong className="text-gray-900">{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Employee Multi-Section Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Register New Workforce Employee
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Complete personnel file, security role, and authorized compensation profile.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-gray-200 px-6 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setActiveTab('personal')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'personal'
                    ? 'border-[#201B4F] text-[#201B4F]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                1. Personal & Contact
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('employment')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'employment'
                    ? 'border-[#201B4F] text-[#201B4F]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                2. Employment & Duty
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('payroll')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'payroll'
                    ? 'border-[#201B4F] text-[#201B4F]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                3. Payroll & Banking (Restricted)
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="e.g. Tariq"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="e.g. Al-Mansoor"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@titanzsecurity.ae"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Emergency Contact Details</label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="e.g. Next of Kin (+971 55 987 6543)"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'employment' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title / Designation *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Close Protection Officer"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Department *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned Branch *</label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Joining Date *</label>
                      <input
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payroll' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs">
                    <strong>Notice:</strong> Compensation records are encrypted and versioned. Changes require maker-checker approval.
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Basic Monthly Salary (AED) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={formData.basicSalary}
                        onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Housing Allowance (AED)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.housingAllowance}
                        onChange={(e) => setFormData({ ...formData, housingAllowance: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Transport Allowance (AED)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.transportAllowance}
                        onChange={(e) => setFormData({ ...formData, transportAllowance: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Other Allowances (AED)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.otherAllowances}
                        onChange={(e) => setFormData({ ...formData, otherAllowances: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Disbursement Bank Name</label>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">UAE IBAN Account Number</label>
                      <input
                        type="text"
                        value={formData.iban}
                        onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <div className="flex space-x-2">
                  {activeTab !== 'payroll' ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'personal' ? 'employment' : 'payroll')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg"
                    >
                      Next Step &rarr;
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                    >
                      Save & Commit Employee
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
