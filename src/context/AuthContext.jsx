import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../data/mockDatabase.js';

const AuthContext = createContext(null);

export const ROLES = {
  SUPER_ADMIN: 'Super Administrator',
  HR_ADMIN: 'HR Administrator',
  PAYROLL_OFFICER: 'Payroll Officer',
  PAYROLL_APPROVER: 'Payroll Approver',
  MANAGER: 'Department Manager',
  EMPLOYEE: 'Employee',
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('DOMI_HR_AUTH_USER');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored user', e);
    }
    // Default null (unauthenticated, redirecting to login page)
    return null;
  });

  const [portalType, setPortalType] = useState('admin'); // 'admin' | 'employee'

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('DOMI_HR_AUTH_USER', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('DOMI_HR_AUTH_USER');
    }
  }, [currentUser]);

  const login = async (email, password, portal = 'admin') => {
    const cleanEmail = email.trim().toLowerCase();

    // Check employees in database
    const employees = db.getEmployees();
    const matchedEmp = employees.find((e) => e.email.toLowerCase() === cleanEmail);

    if (portal === 'employee') {
      if (matchedEmp) {
        const user = {
          id: matchedEmp.id,
          employeeId: matchedEmp.id,
          name: `${matchedEmp.firstName} ${matchedEmp.lastName}`,
          email: matchedEmp.email,
          role: ROLES.EMPLOYEE,
          department: matchedEmp.department,
          avatar: matchedEmp.avatar,
          title: matchedEmp.title,
          portal: 'employee',
        };
        setCurrentUser(user);
        setPortalType('employee');
        db.addAuditLog(user.name, 'USER_LOGIN', 'Employee Portal', 'Successful authentication via employee portal');
        return { success: true, user };
      }
      return { success: false, message: 'Invalid employee email or credentials' };
    }

    // Admin portal
    if (cleanEmail === 'admin@titanzsecurity.ae' || cleanEmail === 'admin') {
      const user = {
        id: 'USR-ADMIN',
        employeeId: 'TSG-001',
        name: 'Tariq Al-Mansoor',
        email: 'admin@titanzsecurity.ae',
        role: ROLES.SUPER_ADMIN,
        department: 'Executive Management',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Director of Human Capital',
        portal: 'admin',
      };
      setCurrentUser(user);
      setPortalType('admin');
      db.addAuditLog(user.name, 'USER_LOGIN', 'Admin Portal', 'Successful authentication as Super Administrator');
      return { success: true, user };
    }

    if (matchedEmp && matchedEmp.role !== ROLES.EMPLOYEE) {
      const user = {
        id: matchedEmp.id,
        employeeId: matchedEmp.id,
        name: `${matchedEmp.firstName} ${matchedEmp.lastName}`,
        email: matchedEmp.email,
        role: matchedEmp.role,
        department: matchedEmp.department,
        avatar: matchedEmp.avatar,
        title: matchedEmp.title,
        portal: 'admin',
      };
      setCurrentUser(user);
      setPortalType('admin');
      db.addAuditLog(user.name, 'USER_LOGIN', 'Admin Portal', `Successful authentication as ${user.role}`);
      return { success: true, user };
    }

    // Fallback if testing with any admin credentials
    if (portal === 'admin') {
      const user = {
        id: 'USR-ADMIN',
        employeeId: 'TSG-001',
        name: 'Tariq Al-Mansoor',
        email: cleanEmail || 'admin@titanzsecurity.ae',
        role: ROLES.HR_ADMIN,
        department: 'Human Resources & Compliance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'HR Administrator',
        portal: 'admin',
      };
      setCurrentUser(user);
      setPortalType('admin');
      return { success: true, user };
    }

    return { success: false, message: 'Invalid credentials or unauthorized portal access' };
  };

  const logout = () => {
    if (currentUser) {
      db.addAuditLog(currentUser.name, 'USER_LOGOUT', 'System', 'Session ended by user');
    }
    setCurrentUser(null);
    localStorage.removeItem('DOMI_HR_AUTH_USER');
  };

  const switchRole = (newRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    db.addAuditLog(currentUser.name, 'ROLE_SIMULATION_SWITCH', 'Auth Context', `Switched active role to ${newRole} for testing`);
  };

  const isSuperAdmin = currentUser?.role === ROLES.SUPER_ADMIN;
  const isHRAdmin = currentUser?.role === ROLES.HR_ADMIN || isSuperAdmin;
  const isPayrollOfficer = currentUser?.role === ROLES.PAYROLL_OFFICER || currentUser?.role === ROLES.PAYROLL_APPROVER || isSuperAdmin;
  const isEmployeeOnly = currentUser?.role === ROLES.EMPLOYEE;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        portalType,
        setPortalType,
        login,
        logout,
        switchRole,
        isSuperAdmin,
        isHRAdmin,
        isPayrollOfficer,
        isEmployeeOnly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
