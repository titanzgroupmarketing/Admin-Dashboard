-- =========================================================================
-- DOMI HR / TITANZ MANAGEMENT SYSTEM — DEVELOPMENT ADMINISTRATOR SETUP
-- Development Only Script: Sets up initial Super Admin and test accounts.
-- =========================================================================

USE DomiHR;
GO

-- Development accounts for testing:
-- 1. Super Admin: admin@titanzsecurity.ae / Admin@1234
-- 2. HR Admin: tariq.mansoor@titanzsecurity.ae / Hr@1234
-- 3. Payroll Officer: zayd.khoury@titanzsecurity.ae / Payroll@1234
-- 4. Employee: bilal.qureshi@titanzsecurity.ae / Emp@1234

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@titanzsecurity.ae')
BEGIN
    INSERT INTO Users (UserID, CompanyID, Email, PasswordHash, FullName, RoleID, IsActive)
    VALUES (
        'DEV-ADMIN-001',
        'COMP-001',
        'admin@titanzsecurity.ae',
        -- Precomputed bcrypt hash for development
        '$2b$12$e80yvI.E64sQ0lV47.5Qte9g8z55Uke9GvU9gqD5aH.P810q7e4iC',
        'System Administrator',
        1,
        1
    );
    PRINT 'Development Super Admin created successfully.';
END
ELSE
BEGIN
    PRINT 'Admin user already exists.';
END
GO
