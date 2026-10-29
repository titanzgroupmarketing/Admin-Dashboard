-- =========================================================================
-- DOMI HR / TITANZ MANAGEMENT SYSTEM — DEMO SEED DATA
-- Currency: AED
-- =========================================================================

USE DomiHR;
GO

INSERT INTO Companies (CompanyID, CompanyName, TradingName, TaxRegistrationNumber, AddressLine, Phone, Email, DefaultCurrency, Timezone)
VALUES ('COMP-001', 'Titanz Security Group', 'Titanz Management System', 'TRN-10048291040003', 'Level 24, Boulevard Plaza Tower 1, Downtown Dubai, UAE', '+971 4 820 9900', 'hr@titanzsecurity.ae', 'AED', 'Asia/Dubai');

INSERT INTO Roles (RoleName, Description) VALUES
('Super Administrator', 'Full system access and security administrative rights'),
('HR Administrator', 'Workforce management, onboarding, and attendance oversight'),
('Payroll Officer', 'Calculation, run creation, and component adjustments'),
('Payroll Approver', 'Maker-checker sign-off and authorization'),
('Department Manager', 'Team shift assignment and attendance approvals'),
('Employee', 'Self-service portal for clocking and viewing own payslips');

INSERT INTO Branches (BranchID, CompanyID, BranchName, LocationCity) VALUES
('BR-01', 'COMP-001', 'Dubai Main HQ', 'Dubai'),
('BR-02', 'COMP-001', 'Abu Dhabi Regional Office', 'Abu Dhabi'),
('BR-03', 'COMP-001', 'Sharjah Operations Hub', 'Sharjah'),
('BR-04', 'COMP-001', 'Ras Al Khaimah Depot', 'Ras Al Khaimah');

INSERT INTO Departments (DepartmentID, CompanyID, DepartmentName, CostCenterCode) VALUES
('DEP-01', 'COMP-001', 'Executive Protection', 'CC-101'),
('DEP-02', 'COMP-001', 'Operations & Guarding', 'CC-102'),
('DEP-03', 'COMP-001', 'Surveillance & Control Room', 'CC-103'),
('DEP-04', 'COMP-001', 'Aviation & Port Security', 'CC-104'),
('DEP-05', 'COMP-001', 'Finance & Payroll', 'CC-201'),
('DEP-06', 'COMP-001', 'Human Resources & Compliance', 'CC-202'),
('DEP-07', 'COMP-001', 'IT & Electronic Systems', 'CC-301');

-- Seed super admin user
INSERT INTO Users (UserID, CompanyID, Email, PasswordHash, FullName, RoleID)
VALUES ('USR-001', 'COMP-001', 'admin@titanzsecurity.ae', '$2a$12$K89sS9zXwFw.qN.u1234567890abcdefghijklmnopqrstuv', 'Tariq Al-Mansoor', 1);
GO
