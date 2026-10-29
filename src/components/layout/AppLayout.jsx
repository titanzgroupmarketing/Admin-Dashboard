import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext.jsx';
import { useAuth, ROLES } from '../../context/AuthContext.jsx';
import {
  LayoutDashboard,
  Clock,
  Users,
  Coins,
  FileText,
  ScanLine,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  Building2,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { db } from '../../data/mockDatabase.js';

export default function AppLayout({ children, activePageTitle = 'Dashboard' }) {
  const { currentPath, navigate } = useRouter();
  const { currentUser, logout, switchRole, isEmployeeOnly } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // If user is Employee only, restrict visible menu items per enterprise security rules
  const allNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: 'all' },
    { label: 'Attendance', path: '/attendance', icon: Clock, roles: 'all' },
    { label: 'Employees', path: '/employees', icon: Users, roles: 'admin' },
    { label: 'Payroll', path: '/payroll', icon: Coins, roles: 'admin' },
    { label: 'Payslips', path: '/payslips', icon: FileText, roles: 'all' },
    { label: 'OCR Document Center', path: '/ocr', icon: ScanLine, roles: 'admin' },
    { label: 'Reports', path: '/reports', icon: BarChart3, roles: 'admin' },
    { label: 'Settings', path: '/settings', icon: Settings, roles: 'admin' },
  ];

  const visibleNavItems = allNavItems.filter((item) => {
    if (item.roles === 'all') return true;
    return !isEmployeeOnly;
  });

  const auditLogs = db.getAuditLogs().slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#201B4F] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              T
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[#111827] text-base tracking-tight">Titanz</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#201B4F]/10 text-[#201B4F] font-semibold">
                  Domi HR
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">Titanz Security Group ERP</p>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Quick Demo Role Switcher Badge */}
          <div className="relative hidden md:block">
            <select
              value={currentUser?.role || ROLES.HR_ADMIN}
              onChange={(e) => switchRole(e.target.value)}
              className="text-xs font-medium py-1.5 px-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#201B4F] cursor-pointer"
              title="Quickly simulate different enterprise roles for testing"
            >
              <option value={ROLES.SUPER_ADMIN}>Role: Super Admin</option>
              <option value={ROLES.HR_ADMIN}>Role: HR Admin</option>
              <option value={ROLES.PAYROLL_OFFICER}>Role: Payroll Officer</option>
              <option value={ROLES.PAYROLL_APPROVER}>Role: Payroll Approver</option>
              <option value={ROLES.MANAGER}>Role: Department Manager</option>
              <option value={ROLES.EMPLOYEE}>Role: Employee (Self-Service)</option>
            </select>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative cursor-pointer"
              aria-label="View system notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Recent Operational Events</h3>
                  <span className="text-xs text-gray-500">Live Audit Trail</span>
                </div>
                <div className="mt-3 space-y-3 max-h-72 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="text-xs border-b border-gray-50 pb-2.5">
                      <div className="flex items-center justify-between text-gray-500 mb-1">
                        <span className="font-semibold text-gray-800">{log.action}</span>
                        <span>{log.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className="text-gray-600 leading-snug">{log.details}</p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">Actor: {log.actor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-gray-900 leading-tight">
                  {currentUser?.name || 'Administrator'}
                </div>
                <div className="text-[11px] text-gray-500 truncate max-w-[130px]">
                  {currentUser?.role || 'Super Admin'}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{currentUser?.email}</p>
                  <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-[#201B4F]/10 text-[#201B4F]">
                    {currentUser?.role}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Settings className="w-3.5 h-3.5 mr-2 text-gray-400" />
                  Account Settings
                </button>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E2E8F0] shrink-0">
          <div className="p-4 flex-1 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {isEmployeeOnly ? 'Self-Service Space' : 'Workforce Modules'}
            </div>

            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#201B4F] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
                <Building2 className="w-4 h-4 text-[#201B4F]" />
                <span className="truncate">Dubai Main HQ</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">AED Currency | GST (UTC+4)</p>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[85%] bg-white h-full shadow-2xl flex flex-col p-4 z-50">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#201B4F] flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Titanz Domi HR</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex-1 space-y-1">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));

                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#201B4F] text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
