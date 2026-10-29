# DOMI HR — Enterprise Employee Management, Attendance, Payroll & OCR System

## 1. Project Mission

Act as a senior full-stack software architect, enterprise UI/UX designer, database architect, payroll systems engineer, security engineer, and QA specialist.

Build **Domi HR**, a functional, responsive, full-stack employee management system for HR teams, payroll officers, finance teams, managers, and employees.

This is not a static prototype. Implement the frontend, backend APIs, Microsoft SQL Server database, authentication, authorization, business logic, payroll calculations, payslips, printing, OCR workflows, reporting, settings, and tests.

Prioritize correctness, security, maintainability, accessibility, and a premium enterprise user experience. If any requirement is unclear, choose a sensible enterprise-grade default and document it. Do not stop after building the landing page or dashboard.

## 2. Technology Stack

### Frontend
- React with Vite
- JavaScript/JSX or TypeScript, chosen consistently throughout
- Tailwind CSS
- React Router DOM
- Lucide React for all interface icons
- Axios or a well-structured Fetch API client
- React Hook Form and Zod where useful
- Recharts or another suitable charting library
- A date utility library where useful

### Backend
- Node.js and Express.js
- `mssql` for Microsoft SQL Server
- `cors`, `dotenv`, `helmet`
- `nodemon` for backend development
- `bcrypt` or `bcryptjs` for password hashing
- Secure session management or appropriately designed short-lived authentication tokens
- Request validation and rate-limiting middleware
- `multer` or equivalent controlled upload middleware
- Structured logging and centralized error handling

### Database
Use Microsoft SQL Server. The development database must be named **DomiHR**. Use SQL Server `DECIMAL` types for monetary values, appropriate date/time types, primary and foreign keys, unique and check constraints, and indexes.

Do not replace SQL Server persistence with browser storage, JSON files, or in-memory arrays. Browser storage may be used only for non-sensitive UI preferences.

Use current, mutually compatible package versions. Never expose database credentials or server secrets to the frontend.

## 3. Project Structure

Use a maintainable modular architecture. A suggested structure:

```text
domi-hr/
  client/
    src/
      assets/
      components/
        common/
        layout/
        forms/
        tables/
        charts/
        employees/
        attendance/
        payroll/
        ocr/
      layouts/
        AppLayout.jsx
        AuthLayout.jsx
      pages/
        LoginLanding.jsx
        AdminLogin.jsx
        EmployeeLogin.jsx
        Dashboard.jsx
        Attendance.jsx
        Employees.jsx
        EmployeeDetails.jsx
        Payroll.jsx
        Payslips.jsx
        PayslipDetails.jsx
        PrintPayslip.jsx
        Settings.jsx
        Reports.jsx
        NotFound.jsx
      hooks/
      services/
      context/
      utils/
      validations/
      App.jsx
      main.jsx
  server/
    src/
      config/
      controllers/
      middleware/
      routes/
      services/
        auth/
        employees/
        attendance/
        payroll/
        payslips/
        ocr/
        reports/
      repositories/
      validators/
      utils/
      app.js
      server.js
    tests/
  database/
    schema.sql
    indexes.sql
    seed.sql
    development-admin.sql
  tests/
  .env.example
  package.json
  README.md
```

Improve this structure if needed, but keep frontend, backend, data access, and business logic separated. Build reusable components rather than duplicating page code.

## 4. Brand and Visual System

Product name: **Domi HR**  
Business branding shown in the supplied login screenshot: **Titanz Management System**  
Footer branding in the reference: **Titanz Security Group**

Use a professional enterprise SaaS visual system:
- Deep navy-purple: approximately `#201B4F`
- White: `#FFFFFF`
- Muted blue-gray: approximately `#A4B5DC`
- Main text: approximately `#111827`
- Light card background: approximately `#F8FAFC`
- Border: approximately `#E2E8F0`
- Success green, warning amber, error red, and informational blue

Use a readable modern sans-serif font such as Inter or a similar alternative. Use consistent spacing, restrained shadows, subtle borders, controlled corner radii, and clear typography. Avoid unnecessary gradients, visual clutter, excessive animation, and generic AI dashboard decoration.

Use Lucide React icons consistently. Do not use emoji as interface icons. Centralize design tokens and shared components for buttons, cards, tables, badges, forms, dialogs, dropdowns, alerts, pagination, loading indicators, and empty states.

## 5. Login Landing Page — Match the Uploaded Screenshot

**Treat the uploaded screenshot as the primary visual reference.** It is a design specification, not merely inspiration. Match its layout, proportions, colors, spacing, typography, text wrapping, and hierarchy as closely as possible. Do not replace it with a generic login template.

### Desktop layout
- Full viewport height.
- Two side-by-side panels, each approximately 50% of the viewport width.
- Left panel: solid deep navy-purple, approximately `#201B4F`.
- Right panel: clean white.
- No sidebar, dashboard navigation, unnecessary illustrations, charts, or decorative cards on this page.

### Left branding panel
Position the content toward the left with generous padding and vertically around the middle of the panel.

Heading, on two lines:

**Titanz**  
**Management System**

Use large, bold, white, geometric sans-serif typography, around 48–54px on a large desktop, with balanced line spacing.

Supporting text:

> Streamlining workforce operation, track attendance, manage payroll, and empower team securely.

Use muted blue-gray text, around 18–20px on desktop, line height approximately 1.7, and constrain the width so it wraps into roughly two lines at the reference viewport size.

Keep the panel simple and spacious. Do not add imagery unless required to reproduce an element actually present in the screenshot.

### Right portal panel
Center a content container around 360–400px wide, vertically around the middle of the panel. Align its content to the left.

Heading:

**Welcome Back**

Use dark text, semibold or bold, approximately 32px on desktop.

Subtitle:

> Select your portal to securely access the portal

Use approximately 16px dark text.

### Portal cards
Create two clickable cards, each approximately 108px tall, full width, with 26–28px internal padding, a light-gray background, thin subtle border, and 9–11px corner radius.

Card 1 label: **Admin Portal**  
Card 2 label: **Employee Portal**

Use Lucide React for a small muted blue-gray arrow icon. Follow the screenshot's placement: the arrow appears beneath the label. Space the cards approximately 16–18px apart. Make the entire card clickable and keyboard accessible, with visible focus and subtle hover states.

### Footer
Display:

> © [current year] Titanz Security Group. All rights reserved

Use small muted blue-gray typography, approximately 14px, positioned below the portal cards with comfortable spacing and aligned to the same left edge. Use the actual year dynamically.

### Responsive behavior
- Desktop: retain the 50/50 split and full-height layout.
- Tablet: preserve the split when space permits; reduce type sizes and padding gracefully.
- Mobile: stack the panels or turn the branding into a compact top section. Keep portal selection prominent and avoid excessive scrolling.
- Prevent horizontal overflow and ensure cards remain touch-friendly.

### Portal routing and authentication
- `/login`: portal selection landing page.
- `/login/admin`: administrator sign-in form.
- `/login/employee`: employee sign-in form.

Admin Portal navigates to `/login/admin`. Employee Portal navigates to `/login/employee`. Both forms must authenticate against the Express backend. Admin access must require appropriate administrative roles. Employee access must not grant administrative privileges. Enforce all permissions on the backend, regardless of the selected portal.

Provide a back-to-portal-selection link. Implement validation, loading states, accessible errors, secure password handling, and appropriate rate limiting. Do not simulate successful login.

After implementation, compare the rendered login page with the screenshot at the same viewport dimensions and adjust panel proportions, alignment, text wrapping, card size, spacing, and typography.

## 6. Routing and Shared Layout

Implement these routes:
- `/login`
- `/login/admin`
- `/login/employee`
- `/dashboard`
- `/attendance`
- `/employees`
- `/employees/:id`
- `/payroll`
- `/payslips`
- `/payslips/:id`
- `/print/payslips/:id`
- `/reports`
- `/settings`

Root behavior: redirect authenticated users to an authorized workspace; redirect unauthenticated users to `/login`.

Create a reusable `AppLayout` containing sidebar, top bar, and main content. The sidebar must appear on authenticated application pages **except** the login landing page, admin login, employee login, and dedicated print payslip page.

Sidebar items with Lucide icons:
- Dashboard
- Attendance
- Employees
- Payroll
- Payslips
- Reports
- Settings

Use React Router navigation, active-route highlighting, and accessible labels/tooltips. Support a collapsible desktop sidebar and mobile slide-out drawer with backdrop and close action.

Top bar: sidebar toggle, page title/breadcrumb, quick search/navigation where useful, notifications, user avatar/name/role, profile menu, and logout. Avoid clutter. Display only actions permitted for the current role.

## 7. Authentication, Users, and Permissions

Implement real authentication backed by SQL Server. Hash passwords using an appropriate password-hashing algorithm. Use secure session management or a properly designed token architecture. If using cookies, configure secure, HttpOnly, SameSite settings and CSRF protection as appropriate. Do not put long-lived sensitive tokens in insecure browser storage.

Roles:
1. Super Administrator
2. HR Administrator
3. Payroll Officer
4. Payroll Approver
5. Department Manager
6. Employee

Implement granular permissions, including:
- View/create/edit employees
- View/edit compensation
- View attendance
- Create/correct attendance
- View/create payroll
- Approve/finalize payroll
- Publish payslips
- View other employees' payslips
- Export payroll data
- Review OCR
- Manage settings and users

Enforce authorization on every protected API endpoint. Hiding a button is not security. Enforce company scope and prevent insecure direct object reference attacks. An employee must not access another employee's salary or payslip by changing a URL ID.

Implement login rate limiting, session expiration, logout/session invalidation, account status checks, safe password recovery or administrator-controlled reset, and audit logging. Never store plaintext passwords or expose password hashes, secrets, or tokens in API responses.

## 8. Dashboard

Create a premium, responsive, data-driven dashboard using real backend queries.

### Welcome and actions
- Personalized greeting
- Current date
- Short operational summary
- Quick actions: Add Employee, Record Attendance, Process Payroll, Generate Payslip, View Reports, subject to permissions

### KPI cards
- Total Employees
- Active Employees
- Present Today
- Absent Today
- On Approved Leave
- Payroll for Selected Period
- Pending Payroll Approvals
- Payslips Awaiting Publication

Where historical data exists, compare with the previous period. If unavailable, show “No previous-period data”; never invent a percentage change.

### Charts
- Employees by department
- Employees by employment status
- Attendance trends
- Monthly payroll expenditure
- Payroll by department
- Headcount trends where history exists

Use readable labels, tooltips, legends, and responsive sizing. Charts must be database-driven.

### Operational panels
- Attendance summary and exceptions
- Payroll overview
- Recent activity with actor, action, timestamp, and record link
- Notifications and pending tasks where useful

Filters may include date range, department, branch, and payroll period. Clearly indicate which components a filter affects. Do not count an employee as absent before the configured attendance cutoff or without considering schedule and approved leave.

Separate employee net pay from employer payroll costs.

## 9. Employee Management

### Employee directory
Build a searchable, filterable, sortable, server-paginated table with:
- Employee ID and portrait
- Full name
- Department
- Job title
- Branch
- Employment type
- Joining date
- Status
- Contact details
- Authorized actions

Support department, branch, status, and employment-type filters; page size; clear filters; and CSV export for authorized users. Do not load every employee into the browser.

### Employee form
Use clear sections.

**Personal:** first, middle, and last name; optional date of birth and other required personal details; profile photo.

**Contact:** work email, optional personal email, phone, emergency contact, optional address.

**Employment:** employee ID, department, title, branch, employment type/status, joining date, optional probation end date, manager, schedule, cost center.

**Payroll (restricted):** basic salary, fixed allowances, recurring earnings, payroll identifier, payment method, necessary bank details, currency, payroll frequency/profile, effective date.

**Documents and notes:** protected attachments and permission-controlled internal notes.

Validate inputs on both client and server. Prevent duplicate employee IDs within the relevant company.

### Employee profile
Include profile header, employment and contact information, attendance history, authorized compensation summary, payroll/payslip history, documents, and audit history.

Statuses may include Active, Probation, On Leave, Suspended, Resigned, and Terminated. Use effective dates and preserve history. Do not permanently delete employees with historical records through ordinary UI actions.

### Bulk import
Support CSV import with downloadable template, validation, preview, duplicate detection, row-level errors, confirmation, import summary, and audit logging. Clearly report successes and failures. Use transactions or controlled batches.

## 10. Attendance Management

Display scheduled, present, absent, late, early departure, approved leave, missing records, and exceptions. Use the selected date, employee schedule, branch, department, and configured cutoff.

Attendance table fields:
- Employee ID/name
- Department
- Scheduled start/end
- Clock-in/out
- Worked duration
- Break duration
- Overtime duration
- Status
- Exception
- Actions

Filters: date/range, employee, department, branch, status, and shift.

Authorized actions: clock-in/out, create missing record, correct attendance, add explanation, request/approve/reject adjustment, review exceptions, export reports.

For each manual correction, preserve previous value, new value, reason, actor, and timestamp. Do not silently overwrite history.

Centralize calculations. Support configured timezone, work schedules, shifts, grace periods, breaks, overtime eligibility, overnight shifts, public holidays, approved leave, and attendance cutoff. Handle shifts crossing midnight and prevent duplicate events.

Do not automatically convert every late arrival into a salary deduction. Attendance-linked payroll items must follow explicitly configured and approved rules. Finalized payroll must preserve the attendance inputs used; later corrections require an auditable adjustment or recalculation workflow.

## 11. Payroll — Financial Correctness Is Critical

Implement payroll as a backend financial transaction system. The backend is authoritative; never trust totals submitted by the browser.

### Payroll workspace
Display payroll period, status, employee count, gross earnings, employee deductions, employer contributions, net payroll payable, payment status, and draft/pending/approved/finalized runs.

Actions:
- Create run
- Calculate
- Validate
- Submit for approval
- Approve/reject with reason
- Finalize
- Generate/publish payslips
- Export summary
- View history and calculation detail

Use a server-enforced state machine, for example Draft → Calculated → Pending Approval → Approved → Finalized → Published → Paid. Adapt as needed. Prevent duplicate runs for the same company/period/run type unless an authorized supplemental or correction run is created.

### Components
Support configurable:
- Basic salary
- Housing, transport, and other allowances
- Approved overtime
- Bonuses and commissions
- Other authorized earnings
- Approved unpaid leave deductions
- Authorized advances and loan repayments
- Other employee deductions
- Employer contributions and employer-paid benefits

Each component should have a code, category, calculation method, effective date, eligibility, rounding policy, approval requirements, and clear treatment in gross earnings, employee net pay, or employer costs. Prevent double counting. Changes must be audited and must not silently rewrite finalized payroll.

### Authoritative formulas
Conceptually:

`Gross Earnings = Basic Salary + Eligible Allowances + Approved Overtime + Bonuses + Other Approved Earnings`

`Employee Deductions = Approved Unpaid Leave Deductions + Authorized Repayments + Other Validated Employee Deductions`

`Net Pay = Gross Earnings - Employee Deductions`

`Employer Payroll Cost = Gross Earnings + Employer Contributions + Employer-Paid Benefits + Other Employer Costs`

These are configurable business concepts, not universal legal rules. Employer costs must not reduce employee net pay unless a specifically valid configured rule says otherwise.

### Decimal-safe arithmetic
Use a decimal arithmetic library such as `decimal.js` or another rigorously tested approach. Do not use native JavaScript floating-point arithmetic as the authoritative monetary calculation method. Store monetary values in SQL Server `DECIMAL`, never `FLOAT` or `REAL`.

Define currency precision and rounding mode explicitly. Preserve sufficient intermediate precision and round at documented calculation boundaries. Apply the same rules throughout the application.

### Required calculation test
Create an automated test with:
- Basic salary: AED 5,000.00
- Housing allowance: AED 1,000.00
- Transport allowance: AED 500.00
- Approved overtime: AED 200.00
- Approved employee deduction: AED 100.00

Expected:
- Gross earnings: AED 6,700.00
- Net pay: AED 6,600.00
- If employer contributions are AED 250.00, employer payroll cost: AED 6,950.00

Employee net pay remains AED 6,600.00.

### Proration, overtime, and currency
Support configurable proration bases such as calendar days, scheduled working days, fixed divisor, or approved organization-specific policy. Do not assume a universal divisor.

Support configurable overtime rates, eligibility, approved hours, applicable compensation basis, effective dates, and limits. Do not hardcode universal overtime multipliers.

Initial demo currency: AED. Use explicit currency codes and precision. Never sum different currencies without an explicit auditable conversion. Reject incompatible currencies if conversion is not implemented.

### Payroll snapshots and controls
Preserve period, employee, compensation snapshot, earnings/deductions breakdown, employer costs, gross, net, currency, rounding policy, proration policy, calculation version, calculation time, attendance references/snapshot, approver, and finalization details.

Before approval, validate missing compensation, inactive/ineligible employees, duplicate entries, missing required attendance, unapproved overtime, invalid deductions, unexpected values, currency mismatch, reconciliation failures, and unusual changes. Distinguish blocking errors from warnings and explain each blocking error.

Use maker-checker controls where configured. Finalized payroll is immutable through ordinary editing. Corrections must use auditable adjustments, reversals, or supplemental runs. Use transactions, concurrency controls, and idempotency where appropriate.

Do not invent statutory deductions, overtime rates, or jurisdiction-specific legal rules. Keep them configurable and require verification before production use.

## 12. Payslips

Create a searchable, filterable, paginated payslip listing with:
- Payslip number
- Employee ID/name
- Department
- Payroll period
- Gross earnings
- Total deductions
- Net pay
- Publication/payment status
- Generated date
- Authorized actions

Support view, print, PDF download, publish, history, and authorized bulk generation/download.

Payslips must include employer identity, employee details, payroll period, itemized earnings, itemized deductions, gross earnings, total deductions, net pay, currency, and configured payment date. Optional items include employer contributions, leave balances, year-to-date totals, and payment reference.

Generate payslips from finalized payroll snapshots. Never recalculate them using current employee data. Employees may access only their own payslips unless a role explicitly permits broader access.

## 13. Dedicated Print Payslip Page

Route: `/print/payslips/:id`

This route must not display the sidebar or standard dashboard navigation.

Create a formal A4 payslip with a white background, professional typography, aligned columns, clear earnings/deductions, prominent net pay, and restrained branding. Ensure legibility in black and white.

Provide Print, Download PDF, and Back controls. Hide controls when printing. Use print-specific CSS, suitable margins, and page-break rules. Do not print navigation, overlays, or screen-only controls.

Use a reliable browser print implementation or server-side PDF generator. Protect PDF endpoints and validate authorization before returning data. Printed/downloaded figures must match finalized payroll exactly.

## 14. OCR and Document Processing

Create a real OCR workflow for supported HR documents, employee forms, attendance sheets, and structured payroll documents. Prioritize employee data and attendance extraction initially.

Support appropriate files such as PNG, JPG/JPEG, PDF, and CSV/XLSX through dedicated parsers where applicable. Validate file size, MIME type, and actual content. Use unique server-generated names and private storage; never execute uploaded files or expose documents through public URLs.

Pipeline:
1. Upload and validate.
2. Record metadata.
3. Run OCR/document parser.
4. Extract structured fields.
5. Provide confidence indicators where supported.
6. Show review screen.
7. Allow authorized correction.
8. Validate and detect duplicates.
9. Require confirmation.
10. Save approved data.
11. Write audit record.

Create an OCR provider abstraction. Use an actual configured engine such as Tesseract or a configured OCR/document intelligence API. If credentials or installation are required, document them. Never fabricate OCR results; return a clear error or pending state if unavailable.

Potential fields include employee ID, names, email, phone, department, job title, joining date, attendance date, clock-in/out, payroll period, earnings, deductions, gross, and net. Extract only fields supported by the document.

Review UI: source preview, extracted fields, confidence, validation errors, duplicate warnings, editable values, confirm/reject/reprocess actions, and source context where practical.

Never insert unverified OCR data directly into official compensation or finalized payroll records. Enforce secure storage, role access, retention rules, and audit logging.

## 15. Settings

Create a clear Settings page with sections:

### Company
Name, logo, address, contact, default currency, timezone, financial year, document branding.

### Payroll
Frequency, cutoff, currencies, precision, rounding, proration, component definitions, employer contributions, overtime, attendance-linked rules, approval thresholds.

### Attendance
Schedules, shifts, grace periods, breaks, overtime eligibility, cutoff, public holidays, leave categories.

### Departments and branches
Create/edit, manager assignment, cost centers, activate/deactivate. Do not delete records referenced by history without a safe archival process.

### Users
Create accounts, assign roles, activate/deactivate, reset passwords, review activity, revoke sessions where supported.

### Roles and permissions
Manage granular permissions and separation of duties. Prevent accidental removal/deactivation of the last active Super Administrator without a recovery mechanism.

### Security
Session duration, password policy, login limits, audit retention, document retention, authentication configuration.

All settings changes must be authorized and audited. Effective-date settings where appropriate. Do not let changed settings silently rewrite finalized payroll.

## 16. Reports

Implement reports for:

**Workforce:** employee directory, headcount by department/branch/status, joiners and leavers.

**Attendance:** daily/monthly attendance, late arrivals, early departures, overtime, missing records, approved adjustments.

**Payroll:** payroll summary, payroll by department, gross earnings, deductions, net payroll, employer costs, history, publication status, adjustments.

Support date ranges, department/branch/employee filters, authorized CSV exports, print-friendly views, and PDF where implemented. Use server-side aggregation and filtering for large datasets. Show report timestamps and selected criteria. Enforce permissions.

## 17. Database Schema

Create a normalized SQL Server database named `DomiHR`. At minimum, provide tables for:

- Companies, CompanySettings, Branches, Departments, CostCenters, JobTitles
- Users, Roles, Permissions, UserRoles, RolePermissions, sessions/reset tokens where applicable
- Employees, EmployeeContacts, EmployeeDocuments, EmploymentHistory, CompensationHistory, EmployeeNotes
- WorkSchedules, ShiftTemplates, EmployeeSchedules, AttendanceRecords, AttendanceEvents, AttendanceAdjustments, AttendanceApprovalHistory, LeaveTypes, LeaveRequests, PublicHolidays
- PayrollProfiles, PayrollPeriods, PayrollRuns, PayrollRunEmployees, PayrollComponents, EmployeeCompensationComponents, PayrollEarnings, PayrollDeductions, EmployerContributions, PayrollApprovals, PayrollAdjustments, PayrollPayments
- Payslips, PayslipPublicationHistory
- UploadedDocuments, OCRJobs, OCRExtractedFields, OCRReviewHistory
- AuditLogs, Notifications, SystemSettings, ImportJobs

Tables may be combined or extended where justified, but preserve required functionality and historical integrity.

Use foreign keys, unique constraints, check constraints, non-null constraints, and indexes. Use `DATETIME2` for timestamps, `DATE` for date-only values, and `DECIMAL` for monetary amounts. Use UTC for audit/operational timestamps where appropriate and interpret business dates using the configured timezone.

Support company scope in the appropriate tables. Employee IDs should be unique within company scope; user email uniqueness should match the authentication model. Preserve compensation, employment, attendance, payroll, approval, and publication history.

Provide executable scripts:
- `database/schema.sql`
- `database/indexes.sql`
- `database/seed.sql`
- `database/development-admin.sql`

Create the database and objects in dependency order. Seed data must be stable and repeatable in development. Never put real production credentials in seed files.

## 18. Demo Data and Visual Assets

Seed:
- One demo company
- Several departments and branches
- At least 25 fictional employees
- Multiple job titles and employment statuses
- Several managers
- Realistic attendance history and exceptions
- Multiple payroll periods and runs in different states
- Payslips with reconciled figures
- OCR sample jobs/states
- Audit events and notifications

Use AED in the initial demo. Never randomize payroll values on every dashboard load. Use fictional names and contact information only.

Create reusable professional portrait assets for one administrator and several distinct fictional employees, plus a login hero asset only if the screenshot actually calls for one. The reference screenshot contains no portraits or hero illustration, so preserve its minimalist design. Use generated images if image generation is available; otherwise use licensed/local placeholders and label them as demo assets. Store assets locally or in a properly configured service. Provide avatar fallbacks and stable paths.

Provide a safe development-only administrator setup via environment variables or a dedicated command. Do not hardcode a universal production password. Document how to change the initial password and disable development seeding in production.

## 19. REST API

Use `/api/v1` as the API prefix. Create versioned, validated REST endpoints with consistent JSON responses and appropriate HTTP status codes.

Suggested endpoint groups:

- Auth: login, logout, current user, password recovery/reset where configured
- Dashboard: summary, attendance, payroll, workforce, recent activity
- Employees: list/create/details/update/status, employee attendance/payroll history, CSV import
- Attendance: list/create/update, adjustments, adjustment approval, summary
- Payroll: list/create runs, details, calculate, validate, submit, approve, reject, finalize, cancel, adjustments
- Payslips: list/details/PDF/publish/bulk generation
- OCR: upload, list/get jobs, reprocess, review, confirm, reject
- Settings: company, payroll, attendance, departments, branches, users, roles
- Reports: workforce, attendance, payroll

Validate path/query/body/file inputs. Use parameterized SQL queries or safe parameterized stored procedures. Implement centralized error handling. Never expose SQL stack traces, server paths, credentials, password hashes, tokens, or sensitive document contents.

## 20. Security and Privacy

Treat employee and payroll data as confidential.

Implement secure password hashing, authentication, server-side role/company authorization, rate limiting, input validation, parameterized SQL, restricted CORS, security headers, safe uploads, protected payslip/document access, audit logs, session expiration and invalidation, and safe errors.

Use CSRF protection where appropriate for cookie-based authentication. Avoid long-lived sensitive tokens in insecure browser storage. Mask sensitive fields where appropriate. Never log passwords or tokens. Restrict exports and document access. Implement controlled retention and archival workflows.

Audit at least:
- Login attempts
- Employee and compensation changes
- Attendance corrections
- Payroll calculations/approvals/finalization
- Payslip publication
- Role changes
- OCR confirmation

Do not claim legal compliance automatically. Verify applicable privacy, employment, and data protection requirements before production deployment.

## 21. Responsiveness and Accessibility

Support large desktop, standard desktop, laptop, tablet, and mobile.

Desktop: persistent/collapsible sidebar, full dashboard grid, usable tables.  
Tablet: collapsible sidebar, responsive cards, scrollable tables where necessary, suitable form columns.  
Mobile: drawer navigation, compact/single-column cards, readable forms, touch-friendly controls, scrollable tables or compact record layouts, and no page-wide horizontal overflow.

Do not merely shrink desktop elements until they are unreadable. Handle long names and identifiers. Use semantic HTML, accessible labels, keyboard navigation, visible focus, sufficient contrast, and reduced-motion support.

Every page needs appropriate loading, error, empty, and success states. Use consistent date and currency formatters. Example currency format: `AED 6,600.00`.

## 22. Performance and Scale

Design for hundreds or thousands of employees and growing historical data.

Use server-side pagination, indexed searches, efficient joins, aggregated dashboard queries, connection pooling, transactions, background jobs for long OCR tasks, and safe caching only where appropriate. Avoid loading all employees/payroll history into browser memory and avoid N+1 queries.

Use concurrency controls for payroll finalization and duplicate prevention. Add health checks and structured logs without sensitive data. Provide database backup and restore guidance.

Keep the architecture extensible for future employee self-service, leave management, expenses, benefits, payment integrations, additional OCR providers, multiple currencies, and multi-company support.

## 23. Testing

Use an appropriate test stack, such as Vitest, React Testing Library, and a backend integration test framework.

### Payroll unit tests
Test salary/allowances/overtime/deductions, employer contributions, zero values, proration, rounding boundaries, decimal precision, invalid components, duplicate runs, currency mismatch, historical compensation changes, and adjustments.

Verify the required example exactly in minor currency units.

### Attendance tests
Test normal clock-in/out, late arrival, early departure, missing clock-out, overnight shifts, breaks, duplicate events, approved leave, manual corrections, overtime, and timezone boundaries.

### Authorization tests
Test unauthenticated requests, own versus another employee's payslip, compensation access, payroll approval, settings changes, and cross-company access.

### OCR tests
Test valid/invalid/oversized uploads, unavailable provider, missing fields, low confidence, duplicates, corrections, rejection, and confirmed imports.

### Integration workflow
1. Create an employee.
2. Record attendance.
3. Approve an attendance adjustment.
4. Create a payroll run.
5. Calculate and validate payroll.
6. Approve with an authorized second user when maker-checker is enabled.
7. Finalize payroll.
8. Generate and publish payslip.
9. Access it with an authorized user.
10. Print/download it.
11. Verify the stored payroll values and printed values match exactly.

Test all routes, protected APIs, responsive navigation, forms, and print layout. Do not mark a feature complete just because its page renders.

## 24. Error Handling

Handle database downtime/timeouts, invalid credentials, permission failures, duplicate employee IDs, duplicate payroll runs, invalid state transitions, OCR outages, invalid uploads, PDF failures, network interruptions, and concurrent updates.

Return clear user-facing messages and detailed but safe server logs. Roll back transactions on failure. Do not retry financial operations in ways that duplicate records or payments. Use idempotency for critical operations where appropriate.

## 25. Development and Deployment

Provide a complete README with prerequisites, SQL Server setup, environment configuration, database initialization, development administrator setup, startup commands, tests, build, deployment, backups, and security checklist.

Include `.env.example` with placeholders such as:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=DomiHR
DB_USER=
DB_PASSWORD=
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
SESSION_SECRET=
OCR_PROVIDER=
OCR_API_KEY=
```

Adjust SQL Server encryption settings for the actual environment. Never commit `.env` or real credentials. Production requires strong secrets, encrypted transport, trusted CORS origins, secure cookies where applicable, protected database access, backups, tested restores, disabled development seeding, safe migrations, and reviewed permissions.

Provide suitable scripts such as `npm run dev`, `npm run build`, `npm run start`, `npm run test`, `npm run db:init`, and `npm run db:seed`, adapting them to the actual project structure. Use nodemon for backend development.

## 26. Implementation Order

Build in this order while maintaining one coherent codebase:

1. Project setup, design system, screenshot-matched login, database, authentication, permissions, seed data.
2. Shared layout, dashboard APIs, employee management.
3. Attendance and correction workflows.
4. Compensation history and tested payroll engine.
5. Payroll approvals, finalization, history, reconciliation.
6. Payslips, publication, PDF/printing.
7. OCR and human verification.
8. Settings, reports, exports.
9. Security, responsiveness, performance, integration testing, deployment documentation.

These are implementation priorities, not permission to leave required features permanently unfinished. Preserve the existing architecture between stages.

## 27. Acceptance Criteria

The project is complete only when:
- The login landing page closely matches the uploaded screenshot.
- Admin and Employee portal cards navigate to distinct login flows.
- All required routes and sidebar navigation work.
- Sidebar is absent on login and print pages.
- SQL Server is the source of truth for business records.
- Employee, attendance, payroll, and payslip data persist.
- Dashboard metrics are database-driven.
- Search, filters, and pagination work.
- Sensitive compensation and payslip data are protected.
- Attendance calculations respect schedules and overnight shifts.
- Payroll uses decimal-safe server-side calculations and reconciles.
- Approval rules are enforced.
- Finalized payroll cannot be silently edited.
- Payslips match finalized payroll snapshots.
- Print/PDF output is professional and accurate.
- OCR genuinely processes configured documents and requires human verification.
- Settings and reports work and respect permissions.
- The app is responsive and accessible.
- Critical tests pass.
- Setup instructions are complete.
- Remaining limitations and external configuration needs are reported honestly.

## 28. Working Rules

1. Build a real full-stack application, not a mockup.
2. Use React, Express, SQL Server, Tailwind CSS, React Router DOM, Lucide React, `mssql`, `cors`, and `nodemon` as specified.
3. Keep business logic out of presentation components.
4. Never make frontend-only payroll calculations authoritative.
5. Never hardcode database-driven dashboard statistics.
6. Never simulate successful OCR if processing has not occurred.
7. Never expose sensitive data to unauthorized users.
8. Never silently overwrite finalized payroll.
9. Never trust monetary totals sent by the browser.
10. Use stable fictional demo data.
11. Generate professional image assets if image generation is available, but preserve the minimalist screenshot design.
12. Do not invent legal payroll rules.
13. Provide complete files, not isolated snippets.
14. If response limits prevent completing everything at once, continue in clearly labeled stages without rebuilding the project from scratch.
15. Report honestly what works, what was tested, and what still requires configuration.

## START

Inspect the uploaded login screenshot first. Establish the visual system and exact portal-selection layout, then create the project architecture, database schema, environment configuration, authentication, and core application shell. Continue through the implementation phases until the full application is functional. Run the build and tests, correct actual errors, and provide a clear implementation report.

Do not stop at a plan, explanation, screenshot, or code snippets. Produce the actual project files supported by the available environment.
