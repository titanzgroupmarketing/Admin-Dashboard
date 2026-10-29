-- =========================================================================
-- DOMI HR / TITANZ MANAGEMENT SYSTEM — PRODUCTION DATABASE SCHEMA
-- Target RDBMS: Microsoft SQL Server (2019 / 2022 / Azure SQL)
-- Database Name: DomiHR
-- =========================================================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'DomiHR')
BEGIN
    CREATE DATABASE DomiHR;
END
GO

USE DomiHR;
GO

-- 1. COMPANIES & SETTINGS
CREATE TABLE Companies (
    CompanyID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyName NVARCHAR(200) NOT NULL,
    TradingName NVARCHAR(200) NULL,
    TaxRegistrationNumber NVARCHAR(100) NULL,
    AddressLine NVARCHAR(300) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    DefaultCurrency VARCHAR(3) NOT NULL DEFAULT 'AED',
    Timezone NVARCHAR(100) NOT NULL DEFAULT 'Asia/Dubai',
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 2. BRANCHES & DEPARTMENTS
CREATE TABLE Branches (
    BranchID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    BranchName NVARCHAR(150) NOT NULL,
    LocationCity NVARCHAR(100) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1
);

CREATE TABLE Departments (
    DepartmentID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    DepartmentName NVARCHAR(150) NOT NULL,
    CostCenterCode NVARCHAR(50) NULL,
    IsActive BIT NOT NULL DEFAULT 1
);

-- 3. USERS, ROLES & PERMISSIONS
CREATE TABLE Roles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(300) NULL
);

CREATE TABLE Users (
    UserID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(150) NOT NULL,
    RoleID INT NOT NULL FOREIGN KEY REFERENCES Roles(RoleID),
    IsActive BIT NOT NULL DEFAULT 1,
    LastLoginAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 4. EMPLOYEES & COMPENSATION
CREATE TABLE Employees (
    EmployeeID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    UserID NVARCHAR(50) NULL FOREIGN KEY REFERENCES Users(UserID),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    DepartmentID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Departments(DepartmentID),
    BranchID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Branches(BranchID),
    JobTitle NVARCHAR(150) NOT NULL,
    EmploymentType NVARCHAR(50) NOT NULL DEFAULT 'Full-time',
    Status NVARCHAR(50) NOT NULL DEFAULT 'Active', -- Active, Probation, On Leave, Resigned, Terminated
    JoiningDate DATE NOT NULL,
    ProbationEndDate DATE NULL,
    
    -- Monetary & Compensation (Decimal-Safe)
    BasicSalary DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    HousingAllowance DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    TransportAllowance DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    OtherAllowances DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    Currency VARCHAR(3) NOT NULL DEFAULT 'AED',
    
    -- Banking details
    BankName NVARCHAR(150) NOT NULL,
    IBAN NVARCHAR(50) NOT NULL,
    EmergencyContact NVARCHAR(250) NULL,
    AvatarURL NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 5. ATTENDANCE & SHIFTS
CREATE TABLE AttendanceRecords (
    AttendanceID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    EmployeeID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Employees(EmployeeID),
    AttendanceDate DATE NOT NULL,
    ScheduledStart TIME NOT NULL,
    ScheduledEnd TIME NOT NULL,
    ClockIn TIME NULL,
    ClockOut TIME NULL,
    WorkedDurationHours DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    BreakDurationHours DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    OvertimeHours DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    Status NVARCHAR(50) NOT NULL, -- Present, Late, Absent, Approved Leave, Early Departure, Missing Clock-out
    ExceptionNote NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE AttendanceAdjustments (
    AdjustmentID NVARCHAR(50) NOT NULL PRIMARY KEY,
    AttendanceID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES AttendanceRecords(AttendanceID),
    PreviousStatus NVARCHAR(50) NOT NULL,
    NewStatus NVARCHAR(50) NOT NULL,
    Reason NVARCHAR(500) NOT NULL,
    ReviewedByUserID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    ReviewedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 6. PAYROLL RUNS & SNAPSHOTS
CREATE TABLE PayrollRuns (
    RunID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    PeriodCode VARCHAR(20) NOT NULL, -- e.g. 2026-M04
    PeriodName NVARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status NVARCHAR(50) NOT NULL, -- Draft, Calculated, Pending Approval, Approved, Finalized, Published, Paid
    Currency VARCHAR(3) NOT NULL DEFAULT 'AED',
    EmployeeCount INT NOT NULL DEFAULT 0,
    GrossEarnings DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    EmployeeDeductions DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    NetPayable DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    EmployerContributions DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    TotalEmployerCost DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    CreatedByUserID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    ApprovedByUserID NVARCHAR(50) NULL FOREIGN KEY REFERENCES Users(UserID),
    FinalizedByUserID NVARCHAR(50) NULL FOREIGN KEY REFERENCES Users(UserID),
    FinalizedAt DATETIME2 NULL,
    PublishedAt DATETIME2 NULL,
    PaymentStatus NVARCHAR(50) NOT NULL DEFAULT 'Unpaid',
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 7. ITEMIZE PAYSLIPS (HISTORICAL IMMUTABLE SNAPSHOT)
CREATE TABLE Payslips (
    PayslipID NVARCHAR(50) NOT NULL PRIMARY KEY,
    RunID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES PayrollRuns(RunID),
    PayslipNumber NVARCHAR(50) NOT NULL UNIQUE,
    EmployeeID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Employees(EmployeeID),
    PeriodCode VARCHAR(20) NOT NULL,
    PeriodName NVARCHAR(100) NOT NULL,
    PaymentDate DATE NOT NULL,
    Currency VARCHAR(3) NOT NULL DEFAULT 'AED',
    
    -- Earnings Breakdown
    BasicSalary DECIMAL(18, 2) NOT NULL,
    HousingAllowance DECIMAL(18, 2) NOT NULL,
    TransportAllowance DECIMAL(18, 2) NOT NULL,
    OtherAllowances DECIMAL(18, 2) NOT NULL,
    ApprovedOvertime DECIMAL(18, 2) NOT NULL,
    Bonuses DECIMAL(18, 2) NOT NULL,
    GrossEarnings DECIMAL(18, 2) NOT NULL,
    
    -- Deductions Breakdown
    UnpaidLeaveDeductions DECIMAL(18, 2) NOT NULL,
    LoanRepayments DECIMAL(18, 2) NOT NULL,
    OtherDeductions DECIMAL(18, 2) NOT NULL,
    TotalDeductions DECIMAL(18, 2) NOT NULL,
    
    -- Net Pay & Employer Costs
    NetPay DECIMAL(18, 2) NOT NULL,
    EmployerContributions DECIMAL(18, 2) NOT NULL,
    EmployerCost DECIMAL(18, 2) NOT NULL,
    
    Status NVARCHAR(50) NOT NULL DEFAULT 'Draft Ready', -- Draft Ready, Published
    PublishedAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 8. OCR JOBS & DOCUMENT PROCESSING
CREATE TABLE OCRJobs (
    JobID NVARCHAR(50) NOT NULL PRIMARY KEY,
    CompanyID NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Companies(CompanyID),
    DocumentType NVARCHAR(100) NOT NULL,
    FileName NVARCHAR(255) NOT NULL,
    UploadedBy NVARCHAR(150) NOT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending Review', -- Pending Review, Verified & Imported, Rejected
    ConfidenceScore DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    ExtractedPayloadJson NVARCHAR(MAX) NOT NULL,
    VerifiedBy NVARCHAR(150) NULL,
    VerifiedAt DATETIME2 NULL
);

-- 9. AUDIT LOGS
CREATE TABLE AuditLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    Timestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    Actor NVARCHAR(150) NOT NULL,
    Action NVARCHAR(100) NOT NULL,
    Entity NVARCHAR(150) NOT NULL,
    Details NVARCHAR(MAX) NOT NULL
);
GO
