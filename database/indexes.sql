-- =========================================================================
-- DOMI HR / TITANZ MANAGEMENT SYSTEM — PERFORMANCE INDEXES
-- =========================================================================

USE DomiHR;
GO

-- Employee indexes for search, status, and company filtering
CREATE NONCLUSTERED INDEX IX_Employees_Company_Status ON Employees(CompanyID, Status) INCLUDE (FirstName, LastName, Email, DepartmentID);
CREATE NONCLUSTERED INDEX IX_Employees_Department ON Employees(DepartmentID);
CREATE NONCLUSTERED INDEX IX_Employees_Branch ON Employees(BranchID);

-- Attendance indexes for quick daily roster and employee monthly lookup
CREATE NONCLUSTERED INDEX IX_Attendance_Date_Status ON AttendanceRecords(AttendanceDate, Status) INCLUDE (EmployeeID, ClockIn, ClockOut);
CREATE NONCLUSTERED INDEX IX_Attendance_Employee_Date ON AttendanceRecords(EmployeeID, AttendanceDate);

-- Payroll & Payslip indexes
CREATE NONCLUSTERED INDEX IX_PayrollRuns_Period ON PayrollRuns(PeriodCode, Status);
CREATE NONCLUSTERED INDEX IX_Payslips_Run ON Payslips(RunID, Status);
CREATE NONCLUSTERED INDEX IX_Payslips_Employee_Period ON Payslips(EmployeeID, PeriodCode);

-- Audit log index
CREATE NONCLUSTERED INDEX IX_AuditLogs_Timestamp ON AuditLogs(Timestamp DESC);
GO
