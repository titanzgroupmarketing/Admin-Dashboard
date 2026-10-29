import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';

// Pages
import LoginLanding from './pages/LoginLanding.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import EmployeeLogin from './pages/EmployeeLogin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Employees from './pages/Employees.jsx';
import EmployeeDetails from './pages/EmployeeDetails.jsx';
import Attendance from './pages/Attendance.jsx';
import Payroll from './pages/Payroll.jsx';
import Payslips from './pages/Payslips.jsx';
import PrintPayslip from './pages/PrintPayslip.jsx';
import OcrDocumentCenter from './pages/OcrDocumentCenter.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

function MainRouter() {
  const { currentPath, navigate, matchRoute } = useRouter();
  const { currentUser } = useAuth();

  // Root redirect logic
  React.useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      if (currentUser) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [currentPath, currentUser]);

  // Dedicated Print Payslip Route: strictly standalone, NO sidebar, NO top navigation
  const printMatch = matchRoute('/print/payslips/:id');
  if (printMatch) {
    return <PrintPayslip payslipId={printMatch.id} />;
  }

  // Unauthenticated Portal Login Routes: strictly matching uploaded screenshot
  if (currentPath === '/login') {
    return <LoginLanding />;
  }
  if (currentPath === '/login/admin') {
    return <AdminLogin />;
  }
  if (currentPath === '/login/employee') {
    return <EmployeeLogin />;
  }

  // If user is not authenticated and trying to access a protected route, direct them to /login
  if (!currentUser) {
    return <LoginLanding />;
  }

  // Match /employees/:id
  const empMatch = matchRoute('/employees/:id');
  if (empMatch) {
    return (
      <AppLayout activePageTitle="Employee Dossier">
        <EmployeeDetails employeeId={empMatch.id} />
      </AppLayout>
    );
  }

  // Standard Authenticated Routes inside AppLayout
  let pageContent = null;
  let pageTitle = 'Dashboard';

  if (currentPath === '/dashboard') {
    pageContent = <Dashboard />;
    pageTitle = 'Dashboard';
  } else if (currentPath === '/attendance') {
    pageContent = <Attendance />;
    pageTitle = 'Attendance';
  } else if (currentPath === '/employees') {
    pageContent = <Employees />;
    pageTitle = 'Employees';
  } else if (currentPath === '/payroll') {
    pageContent = <Payroll />;
    pageTitle = 'Payroll';
  } else if (currentPath === '/payslips') {
    pageContent = <Payslips />;
    pageTitle = 'Payslips';
  } else if (currentPath === '/ocr') {
    pageContent = <OcrDocumentCenter />;
    pageTitle = 'OCR Document Center';
  } else if (currentPath === '/reports') {
    pageContent = <Reports />;
    pageTitle = 'Reports';
  } else if (currentPath === '/settings') {
    pageContent = <Settings />;
    pageTitle = 'Settings';
  } else {
    pageContent = <Dashboard />;
    pageTitle = 'Dashboard';
  }

  return <AppLayout activePageTitle={pageTitle}>{pageContent}</AppLayout>;
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </RouterProvider>
  );
}
