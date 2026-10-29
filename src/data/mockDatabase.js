/**
 * Relational In-Memory Database for Domi HR / Titanz Management System
 * Seeds stable enterprise demo data with persistent localStorage sync.
 */

import { calculateEmployeePayroll, DecimalMoney } from '../utils/decimalMath.js';

export const COMPANY_PROFILE = {
  id: 'COMP-001',
  name: 'Titanz Security Group',
  productName: 'Domi HR',
  taxRegistrationNumber: 'TRN-10048291040003',
  address: 'Level 24, Boulevard Plaza Tower 1, Downtown Dubai, UAE',
  phone: '+971 4 820 9900',
  email: 'hr@titanzsecurity.ae',
  currency: 'AED',
  timezone: 'Asia/Dubai (GST UTC+4)',
  financialYearStart: 'January 1',
  payrollCutoffDay: 25,
  gracePeriodMinutes: 15,
  defaultOvertimeMultiplier: 1.25,
  weekendOvertimeMultiplier: 1.5,
};

export const DEPARTMENTS = [
  'Executive Protection',
  'Operations & Guarding',
  'Surveillance & Control Room',
  'Aviation & Port Security',
  'Finance & Payroll',
  'Human Resources & Compliance',
  'IT & Electronic Systems',
];

export const BRANCHES = [
  'Dubai Main HQ',
  'Abu Dhabi Regional Office',
  'Sharjah Operations Hub',
  'Ras Al Khaimah Depot',
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'TSG-001',
    firstName: 'Tariq',
    lastName: 'Al-Mansoor',
    email: 'tariq.mansoor@titanzsecurity.ae',
    phone: '+971 50 112 3456',
    department: 'Human Resources & Compliance',
    title: 'Director of Human Capital',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2021-03-15',
    basicSalary: 24000.00,
    housingAllowance: 7000.00,
    transportAllowance: 2500.00,
    otherAllowances: 1500.00,
    bankName: 'Emirates NBD',
    iban: 'AE290260000001234567891',
    emergencyContact: 'Fatima Al-Mansoor (+971 50 998 1234)',
    role: 'HR Administrator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-002',
    firstName: 'Zayd',
    lastName: 'Khoury',
    email: 'zayd.khoury@titanzsecurity.ae',
    phone: '+971 52 443 8910',
    department: 'Finance & Payroll',
    title: 'Senior Payroll Officer',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2022-01-10',
    basicSalary: 18500.00,
    housingAllowance: 5000.00,
    transportAllowance: 1500.00,
    otherAllowances: 1000.00,
    bankName: 'First Abu Dhabi Bank (FAB)',
    iban: 'AE030030000004567891234',
    emergencyContact: 'Maya Khoury (+971 52 667 8901)',
    role: 'Payroll Officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-003',
    firstName: 'Omar',
    lastName: 'Farouk',
    email: 'omar.farouk@titanzsecurity.ae',
    phone: '+971 55 987 1122',
    department: 'Operations & Guarding',
    title: 'Head of Security Operations',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2020-06-01',
    basicSalary: 22000.00,
    housingAllowance: 6500.00,
    transportAllowance: 2000.00,
    otherAllowances: 2000.00,
    bankName: 'Abu Dhabi Commercial Bank (ADCB)',
    iban: 'AE550500000007891234567',
    emergencyContact: 'Reem Farouk (+971 55 221 4455)',
    role: 'Department Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-004',
    firstName: 'Rashid',
    lastName: 'Bin Salem',
    email: 'rashid.salem@titanzsecurity.ae',
    phone: '+971 50 665 4321',
    department: 'Executive Protection',
    title: 'Senior Close Protection Officer',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2022-04-12',
    basicSalary: 14000.00,
    housingAllowance: 4000.00,
    transportAllowance: 1500.00,
    otherAllowances: 1500.00,
    bankName: 'Dubai Islamic Bank (DIB)',
    iban: 'AE120240000009876543210',
    emergencyContact: 'Aisha Salem (+971 50 111 8877)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-005',
    firstName: 'Amina',
    lastName: 'Hassan',
    email: 'amina.hassan@titanzsecurity.ae',
    phone: '+971 54 321 0987',
    department: 'Surveillance & Control Room',
    title: 'CCTV Control Room Supervisor',
    branch: 'Sharjah Operations Hub',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-02-01',
    basicSalary: 9500.00,
    housingAllowance: 2500.00,
    transportAllowance: 1000.00,
    otherAllowances: 500.00,
    bankName: 'Mashreq Bank',
    iban: 'AE880330000003216549870',
    emergencyContact: 'Bilal Hassan (+971 54 990 1122)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-006',
    firstName: 'Vikram',
    lastName: 'Singhania',
    email: 'vikram.singh@titanzsecurity.ae',
    phone: '+971 56 778 9900',
    department: 'IT & Electronic Systems',
    title: 'Biometrics & Access Systems Lead',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2022-09-15',
    basicSalary: 16000.00,
    housingAllowance: 4500.00,
    transportAllowance: 1200.00,
    otherAllowances: 800.00,
    bankName: 'Standard Chartered UAE',
    iban: 'AE610140000001597534862',
    emergencyContact: 'Pooja Singh (+971 56 443 2211)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-007',
    firstName: 'Hamad',
    lastName: 'Al-Nuaimi',
    email: 'hamad.nuaimi@titanzsecurity.ae',
    phone: '+971 50 889 0012',
    department: 'Aviation & Port Security',
    title: 'Port Security Commander',
    branch: 'Abu Dhabi Regional Office',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2021-08-20',
    basicSalary: 17500.00,
    housingAllowance: 5000.00,
    transportAllowance: 1500.00,
    otherAllowances: 1000.00,
    bankName: 'Abu Dhabi Islamic Bank (ADIB)',
    iban: 'AE440520000002581473690',
    emergencyContact: 'Sultan Nuaimi (+971 50 776 5544)',
    role: 'Department Manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-008',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@titanzsecurity.ae',
    phone: '+971 52 119 4488',
    department: 'Executive Protection',
    title: 'Tactical Driver & Escort Specialist',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-05-10',
    basicSalary: 11000.00,
    housingAllowance: 3000.00,
    transportAllowance: 1000.00,
    otherAllowances: 1000.00,
    bankName: 'HSBC Middle East',
    iban: 'AE990200000009513572468',
    emergencyContact: 'Elena Vance (+971 52 888 7766)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-009',
    firstName: 'Fatima',
    lastName: 'Zahra',
    email: 'fatima.zahra@titanzsecurity.ae',
    phone: '+971 55 334 5566',
    department: 'Human Resources & Compliance',
    title: 'HR Onboarding & Document Officer',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-10-01',
    basicSalary: 10500.00,
    housingAllowance: 3000.00,
    transportAllowance: 1000.00,
    otherAllowances: 500.00,
    bankName: 'Commercial Bank of Dubai (CBD)',
    iban: 'AE330590000007539514862',
    emergencyContact: 'Tariq Zahra (+971 55 444 3322)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-010',
    firstName: 'Bilal',
    lastName: 'Qureshi',
    email: 'bilal.qureshi@titanzsecurity.ae',
    phone: '+971 50 445 6677',
    department: 'Operations & Guarding',
    title: 'Senior Site Security Officer',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2024-01-15',
    basicSalary: 5000.00,
    housingAllowance: 1000.00,
    transportAllowance: 500.00,
    otherAllowances: 200.00,
    bankName: 'Emirates Islamic',
    iban: 'AE770280000006543219870',
    emergencyContact: 'Nadia Qureshi (+971 50 888 1122)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-011',
    firstName: 'Kareem',
    lastName: 'Mostafa',
    email: 'kareem.mostafa@titanzsecurity.ae',
    phone: '+971 54 887 2211',
    department: 'Operations & Guarding',
    title: 'Mobile Patrol Officer',
    branch: 'Sharjah Operations Hub',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2024-03-01',
    basicSalary: 5200.00,
    housingAllowance: 1100.00,
    transportAllowance: 500.00,
    otherAllowances: 200.00,
    bankName: 'Sharjah Islamic Bank',
    iban: 'AE150390000008529637410',
    emergencyContact: 'Hoda Mostafa (+971 54 222 3344)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-012',
    firstName: 'Suresh',
    lastName: 'Patel',
    email: 'suresh.patel@titanzsecurity.ae',
    phone: '+971 56 123 7890',
    department: 'Operations & Guarding',
    title: 'Perimeter Security Guard',
    branch: 'Ras Al Khaimah Depot',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-11-20',
    basicSalary: 4800.00,
    housingAllowance: 1000.00,
    transportAllowance: 400.00,
    otherAllowances: 200.00,
    bankName: 'RAKBANK',
    iban: 'AE620270000001472583690',
    emergencyContact: 'Sunita Patel (+971 56 999 4433)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-013',
    firstName: 'Dalia',
    lastName: 'El-Sayed',
    email: 'dalia.sayed@titanzsecurity.ae',
    phone: '+971 52 889 3344',
    department: 'Finance & Payroll',
    title: 'Payroll Compliance Analyst',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-07-01',
    basicSalary: 11500.00,
    housingAllowance: 3200.00,
    transportAllowance: 1000.00,
    otherAllowances: 500.00,
    bankName: 'Emirates NBD',
    iban: 'AE820260000003692581470',
    emergencyContact: 'Ahmed El-Sayed (+971 52 555 6677)',
    role: 'Payroll Officer',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-014',
    firstName: 'Mohammad',
    lastName: 'Al-Shehhi',
    email: 'mohammad.shehhi@titanzsecurity.ae',
    phone: '+971 50 332 1199',
    department: 'Aviation & Port Security',
    title: 'Airside Screening Specialist',
    branch: 'Abu Dhabi Regional Office',
    employmentType: 'Full-time',
    status: 'On Leave',
    joiningDate: '2022-11-15',
    basicSalary: 9000.00,
    housingAllowance: 2500.00,
    transportAllowance: 1000.00,
    otherAllowances: 400.00,
    bankName: 'Abu Dhabi Commercial Bank',
    iban: 'AE390500000009517538246',
    emergencyContact: 'Salma Al-Shehhi (+971 50 123 9876)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-015',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@titanzsecurity.ae',
    phone: '+971 55 776 5544',
    department: 'Surveillance & Control Room',
    title: 'Alarm Response Dispatcher',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2024-02-01',
    basicSalary: 8500.00,
    housingAllowance: 2500.00,
    transportAllowance: 1000.00,
    otherAllowances: 300.00,
    bankName: 'Dubai Islamic Bank',
    iban: 'AE460240000001593574862',
    emergencyContact: 'Igor Rostov (+971 55 889 0011)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-016',
    firstName: 'Youssef',
    lastName: 'Nasser',
    email: 'youssef.nasser@titanzsecurity.ae',
    phone: '+971 50 998 7766',
    department: 'Executive Protection',
    title: 'VIP Convoy Commander',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2021-09-01',
    basicSalary: 19000.00,
    housingAllowance: 5500.00,
    transportAllowance: 1800.00,
    otherAllowances: 1200.00,
    bankName: 'First Abu Dhabi Bank',
    iban: 'AE510030000003579514862',
    emergencyContact: 'Mona Nasser (+971 50 665 4433)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-017',
    firstName: 'Hassan',
    lastName: 'Ali',
    email: 'hassan.ali@titanzsecurity.ae',
    phone: '+971 54 112 9988',
    department: 'Operations & Guarding',
    title: 'Corporate Gatekeeper Guard',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2024-04-01',
    basicSalary: 5100.00,
    housingAllowance: 1000.00,
    transportAllowance: 500.00,
    otherAllowances: 200.00,
    bankName: 'Emirates NBD',
    iban: 'AE720260000007894561230',
    emergencyContact: 'Mariam Ali (+971 54 332 1100)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-018',
    firstName: 'Leila',
    lastName: 'Barakat',
    email: 'leila.barakat@titanzsecurity.ae',
    phone: '+971 56 443 8811',
    department: 'Human Resources & Compliance',
    title: 'Workforce Welfare Specialist',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-04-15',
    basicSalary: 11000.00,
    housingAllowance: 3000.00,
    transportAllowance: 1000.00,
    otherAllowances: 500.00,
    bankName: 'Mashreq Bank',
    iban: 'AE190330000001473692580',
    emergencyContact: 'Samir Barakat (+971 56 777 9900)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-019',
    firstName: 'Arthur',
    lastName: 'Pendelton',
    email: 'arthur.pendelton@titanzsecurity.ae',
    phone: '+971 52 334 7799',
    department: 'IT & Electronic Systems',
    title: 'Surveillance Cyber Architect',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2022-07-20',
    basicSalary: 21000.00,
    housingAllowance: 6000.00,
    transportAllowance: 2000.00,
    otherAllowances: 1500.00,
    bankName: 'HSBC Middle East',
    iban: 'AE910200000003691472580',
    emergencyContact: 'Clara Pendelton (+971 52 443 2288)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-020',
    firstName: 'Zainab',
    lastName: 'Al-Husseini',
    email: 'zainab.husseini@titanzsecurity.ae',
    phone: '+971 50 776 2233',
    department: 'Aviation & Port Security',
    title: 'K9 Detection Handler',
    branch: 'Abu Dhabi Regional Office',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-08-10',
    basicSalary: 9800.00,
    housingAllowance: 2600.00,
    transportAllowance: 1000.00,
    otherAllowances: 600.00,
    bankName: 'Abu Dhabi Commercial Bank',
    iban: 'AE080500000002583691470',
    emergencyContact: 'Mustafa Husseini (+971 50 998 4455)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-021',
    firstName: 'Nasir',
    lastName: 'Mahmood',
    email: 'nasir.mahmood@titanzsecurity.ae',
    phone: '+971 55 665 1100',
    department: 'Operations & Guarding',
    title: 'Patrol Dispatch Lead',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2023-01-15',
    basicSalary: 6500.00,
    housingAllowance: 1800.00,
    transportAllowance: 700.00,
    otherAllowances: 300.00,
    bankName: 'Dubai Islamic Bank',
    iban: 'AE640240000008521473690',
    emergencyContact: 'Tahira Mahmood (+971 55 112 3388)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-022',
    firstName: 'Salim',
    lastName: 'Al-Ketbi',
    email: 'salim.ketbi@titanzsecurity.ae',
    phone: '+971 50 119 0088',
    department: 'Operations & Guarding',
    title: 'Armored Transport Driver',
    branch: 'Sharjah Operations Hub',
    employmentType: 'Full-time',
    status: 'Probation',
    joiningDate: '2026-08-01',
    basicSalary: 6200.00,
    housingAllowance: 1500.00,
    transportAllowance: 600.00,
    otherAllowances: 200.00,
    bankName: 'Sharjah Islamic Bank',
    iban: 'AE310390000009517531590',
    emergencyContact: 'Khamis Ketbi (+971 50 887 7766)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-023',
    firstName: 'Jessica',
    lastName: 'Taylor',
    email: 'jessica.taylor@titanzsecurity.ae',
    phone: '+971 52 778 4433',
    department: 'Finance & Payroll',
    title: 'Financial Controller',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2021-12-01',
    basicSalary: 23000.00,
    housingAllowance: 7000.00,
    transportAllowance: 2200.00,
    otherAllowances: 1500.00,
    bankName: 'Standard Chartered UAE',
    iban: 'AE750140000007531594862',
    emergencyContact: 'Simon Taylor (+971 52 119 9900)',
    role: 'Payroll Approver',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-024',
    firstName: 'Ibrahim',
    lastName: 'Ghanem',
    email: 'ibrahim.ghanem@titanzsecurity.ae',
    phone: '+971 54 665 0011',
    department: 'Surveillance & Control Room',
    title: 'Video Analytics Specialist',
    branch: 'Abu Dhabi Regional Office',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2024-05-15',
    basicSalary: 10000.00,
    housingAllowance: 2800.00,
    transportAllowance: 1000.00,
    otherAllowances: 400.00,
    bankName: 'Abu Dhabi Islamic Bank',
    iban: 'AE820520000004561237890',
    emergencyContact: 'Wafa Ghanem (+971 54 887 6655)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TSG-025',
    firstName: 'Mansoor',
    lastName: 'Al-Haddad',
    email: 'mansoor.haddad@titanzsecurity.ae',
    phone: '+971 50 223 4455',
    department: 'Operations & Guarding',
    title: 'Shift Sergeant',
    branch: 'Dubai Main HQ',
    employmentType: 'Full-time',
    status: 'Active',
    joiningDate: '2022-03-01',
    basicSalary: 7800.00,
    housingAllowance: 2000.00,
    transportAllowance: 800.00,
    otherAllowances: 400.00,
    bankName: 'Emirates NBD',
    iban: 'AE190260000001237894560',
    emergencyContact: 'Latifa Haddad (+971 50 443 1122)',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
];

// Attendance Records for Today & recent days
export const INITIAL_ATTENDANCE = [
  {
    id: 'ATT-2026-1029-01',
    employeeId: 'TSG-001',
    employeeName: 'Tariq Al-Mansoor',
    department: 'Human Resources & Compliance',
    date: '2026-10-29',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    clockIn: '07:54',
    clockOut: null,
    workedDurationHours: 8.5,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-02',
    employeeId: 'TSG-002',
    employeeName: 'Zayd Khoury',
    department: 'Finance & Payroll',
    date: '2026-10-29',
    scheduledStart: '08:30',
    scheduledEnd: '17:30',
    clockIn: '08:25',
    clockOut: null,
    workedDurationHours: 8.0,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-03',
    employeeId: 'TSG-003',
    employeeName: 'Omar Farouk',
    department: 'Operations & Guarding',
    date: '2026-10-29',
    scheduledStart: '07:00',
    scheduledEnd: '16:00',
    clockIn: '06:50',
    clockOut: null,
    workedDurationHours: 9.0,
    breakDurationHours: 1.0,
    overtimeHours: 0.5,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-04',
    employeeId: 'TSG-004',
    employeeName: 'Rashid Bin Salem',
    department: 'Executive Protection',
    date: '2026-10-29',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    clockIn: '08:35',
    clockOut: null,
    workedDurationHours: 7.5,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Late',
    exception: 'Late Arrival (35 mins)',
    adjustmentHistory: [
      {
        previousStatus: 'Late',
        newStatus: 'Late',
        reason: 'Traffic delay on Sheikh Zayed Road; manager notified.',
        actor: 'Tariq Al-Mansoor',
        timestamp: '2026-10-29 09:10:00',
      }
    ],
  },
  {
    id: 'ATT-2026-1029-05',
    employeeId: 'TSG-005',
    employeeName: 'Amina Hassan',
    department: 'Surveillance & Control Room',
    date: '2026-10-29',
    scheduledStart: '20:00',
    scheduledEnd: '05:00',
    clockIn: '19:55',
    clockOut: '05:05',
    workedDurationHours: 9.0,
    breakDurationHours: 1.0,
    overtimeHours: 1.0,
    status: 'Present',
    exception: 'Overnight Shift (Completed)',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-06',
    employeeId: 'TSG-006',
    employeeName: 'Vikram Singhania',
    department: 'IT & Electronic Systems',
    date: '2026-10-29',
    scheduledStart: '09:00',
    scheduledEnd: '18:00',
    clockIn: '08:58',
    clockOut: null,
    workedDurationHours: 8.0,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-07',
    employeeId: 'TSG-007',
    employeeName: 'Hamad Al-Nuaimi',
    department: 'Aviation & Port Security',
    date: '2026-10-29',
    scheduledStart: '07:30',
    scheduledEnd: '16:30',
    clockIn: '07:25',
    clockOut: null,
    workedDurationHours: 8.5,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-08',
    employeeId: 'TSG-008',
    employeeName: 'Marcus Vance',
    department: 'Executive Protection',
    date: '2026-10-29',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    clockIn: null,
    clockOut: null,
    workedDurationHours: 0.0,
    breakDurationHours: 0.0,
    overtimeHours: 0.0,
    status: 'Absent',
    exception: 'Unexcused Absence (Pending Investigation)',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-09',
    employeeId: 'TSG-009',
    employeeName: 'Fatima Zahra',
    department: 'Human Resources & Compliance',
    date: '2026-10-29',
    scheduledStart: '08:30',
    scheduledEnd: '17:30',
    clockIn: '08:28',
    clockOut: null,
    workedDurationHours: 8.0,
    breakDurationHours: 1.0,
    overtimeHours: 0.0,
    status: 'Present',
    exception: 'None',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-10',
    employeeId: 'TSG-010',
    employeeName: 'Bilal Qureshi',
    department: 'Operations & Guarding',
    date: '2026-10-29',
    scheduledStart: '07:00',
    scheduledEnd: '16:00',
    clockIn: '06:55',
    clockOut: null,
    workedDurationHours: 8.5,
    breakDurationHours: 1.0,
    overtimeHours: 1.5,
    status: 'Present',
    exception: 'Approved Overtime (Client Event)',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-14',
    employeeId: 'TSG-014',
    employeeName: 'Mohammad Al-Shehhi',
    department: 'Aviation & Port Security',
    date: '2026-10-29',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    clockIn: null,
    clockOut: null,
    workedDurationHours: 0.0,
    breakDurationHours: 0.0,
    overtimeHours: 0.0,
    status: 'Approved Leave',
    exception: 'Annual Leave Approved (HR-LV-9921)',
    adjustmentHistory: [],
  },
  {
    id: 'ATT-2026-1029-17',
    employeeId: 'TSG-017',
    employeeName: 'Hassan Ali',
    department: 'Operations & Guarding',
    date: '2026-10-29',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    clockIn: '07:58',
    clockOut: '14:30',
    workedDurationHours: 6.0,
    breakDurationHours: 0.5,
    overtimeHours: 0.0,
    status: 'Early Departure',
    exception: 'Emergency Medical Release (Approved)',
    adjustmentHistory: [],
  },
];

// Pre-calculated Payroll Runs
export const INITIAL_PAYROLL_RUNS = [
  {
    id: 'RUN-2026-03',
    periodCode: '2026-M03',
    periodName: 'March 2026 Regular Payroll',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'Finalized', // Draft -> Calculated -> Pending Approval -> Approved -> Finalized -> Published -> Paid
    currency: 'AED',
    employeeCount: 25,
    grossEarnings: 312400.00,
    employeeDeductions: 8400.00,
    netPayable: 304000.00,
    employerContributions: 18744.00,
    totalEmployerCost: 331144.00,
    createdBy: 'Zayd Khoury',
    approvedBy: 'Jessica Taylor',
    finalizedBy: 'Tariq Al-Mansoor',
    finalizedAt: '2026-03-26 14:30:00',
    publishedAt: '2026-03-27 09:00:00',
    paymentStatus: 'Paid',
    notes: 'March monthly cycle closed and disbursed via WPS Central Bank transfer.',
  },
  {
    id: 'RUN-2026-04',
    periodCode: '2026-M04',
    periodName: 'April 2026 Regular Payroll',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    status: 'Approved',
    currency: 'AED',
    employeeCount: 25,
    grossEarnings: 315600.00,
    employeeDeductions: 7900.00,
    netPayable: 307700.00,
    employerContributions: 18936.00,
    totalEmployerCost: 334536.00,
    createdBy: 'Zayd Khoury',
    approvedBy: 'Jessica Taylor',
    finalizedBy: null,
    finalizedAt: null,
    publishedAt: null,
    paymentStatus: 'Pending Finalization',
    notes: 'Approved by Financial Controller. Ready for Super Admin finalization and payslip publication.',
  },
  {
    id: 'RUN-2026-05',
    periodCode: '2026-M05',
    periodName: 'May 2026 Regular Payroll (Current)',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    status: 'Calculated',
    currency: 'AED',
    employeeCount: 25,
    grossEarnings: 318200.00,
    employeeDeductions: 6200.00,
    netPayable: 312000.00,
    employerContributions: 19092.00,
    totalEmployerCost: 337292.00,
    createdBy: 'Zayd Khoury',
    approvedBy: null,
    finalizedBy: null,
    finalizedAt: null,
    publishedAt: null,
    paymentStatus: 'Draft In Progress',
    notes: 'Draft calculation for May cycle with updated overtime hours and allowances.',
  },
];

// Generate itemized Payslips for finalized and approved runs
export function generateInitialPayslips() {
  const payslips = [];
  INITIAL_EMPLOYEES.forEach((emp, index) => {
    // Generate for March (Published)
    const run = INITIAL_PAYROLL_RUNS[0];
    const calc = calculateEmployeePayroll({
      basicSalary: emp.basicSalary,
      housingAllowance: emp.housingAllowance,
      transportAllowance: emp.transportAllowance,
      otherAllowances: emp.otherAllowances,
      approvedOvertime: index % 3 === 0 ? 450.00 : 0.00,
      bonuses: index === 0 ? 2000.00 : 0.00,
      otherDeductions: index % 5 === 0 ? 200.00 : 0.00,
      employerContributions: Math.round(emp.basicSalary * 0.06), // 6% pension/cost
    });

    payslips.push({
      id: `PS-2026-03-${emp.id}`,
      runId: run.id,
      payslipNumber: `TSG-PAY-202603-${String(index + 1).padStart(4, '0')}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      department: emp.department,
      jobTitle: emp.title,
      branch: emp.branch,
      bankName: emp.bankName,
      iban: emp.iban,
      periodCode: run.periodCode,
      periodName: run.periodName,
      paymentDate: '2026-03-28',
      currency: 'AED',
      basicSalary: calc.basicSalary,
      housingAllowance: calc.housingAllowance,
      transportAllowance: calc.transportAllowance,
      otherAllowances: calc.otherAllowances,
      approvedOvertime: calc.approvedOvertime,
      bonuses: calc.bonuses,
      grossEarnings: calc.grossEarnings,
      unpaidLeaveDeductions: calc.unpaidLeaveDeductions,
      loanRepayments: calc.loanRepayments,
      otherDeductions: calc.otherDeductions,
      totalDeductions: calc.totalDeductions,
      netPay: calc.netPay,
      employerContributions: calc.employerContributions,
      employerCost: calc.employerCost,
      status: 'Published',
      publishedAt: '2026-03-27 09:00:00',
    });
  });
  return payslips;
}

// Initial OCR Jobs
export const INITIAL_OCR_JOBS = [
  {
    id: 'OCR-JOB-8821',
    documentType: 'Employee Intake & ID Form',
    fileName: 'Emirates_ID_Onboarding_Sami_K.pdf',
    uploadedAt: '2026-10-28 11:20:00',
    uploadedBy: 'Fatima Zahra',
    status: 'Verified & Imported', // Pending Review -> Verified & Imported -> Rejected
    confidenceScore: 98.4,
    extractedFields: {
      employeeId: 'TSG-029',
      fullName: 'Sami Kareem Al-Husseini',
      dateOfBirth: '1992-05-14',
      nationalId: '784-1992-1234567-1',
      nationality: 'United Arab Emirates',
      jobTitle: 'Tactical Surveillance Operator',
      department: 'Surveillance & Control Room',
      basicSalary: 11000.00,
      bankName: 'First Abu Dhabi Bank',
      iban: 'AE440030000009876543210',
    },
    verifiedBy: 'Tariq Al-Mansoor',
    verifiedAt: '2026-10-28 14:15:00',
  },
  {
    id: 'OCR-JOB-8822',
    documentType: 'Weekly Physical Attendance Punch Sheet',
    fileName: 'Port_Khalifa_Checkpoint_Shift_Log_W42.png',
    uploadedAt: '2026-10-29 08:45:00',
    uploadedBy: 'Hamad Al-Nuaimi',
    status: 'Pending Review',
    confidenceScore: 94.2,
    extractedFields: {
      location: 'Khalifa Port Checkpoint 3',
      date: '2026-10-29',
      shiftName: 'Day Shift Guarding (07:00 - 16:00)',
      recordedAttendees: [
        { employeeId: 'TSG-007', name: 'Hamad Al-Nuaimi', clockIn: '07:25', clockOut: '16:30', status: 'Present' },
        { employeeId: 'TSG-010', name: 'Bilal Qureshi', clockIn: '06:55', clockOut: '17:30', status: 'Overtime +1.5h' },
        { employeeId: 'TSG-012', name: 'Suresh Patel', clockIn: '07:05', clockOut: '16:00', status: 'Present' },
        { employeeId: 'TSG-025', name: 'Mansoor Al-Haddad', clockIn: '06:58', clockOut: '16:05', status: 'Present' },
      ],
      supervisorSignatureDetected: true,
      anomalies: 'Manual cross-out detected on row 3; verified by supervisor initials.',
    },
    verifiedBy: null,
    verifiedAt: null,
  },
];

// Audit Trail Events
export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-901',
    timestamp: '2026-10-29 09:10:00',
    actor: 'Tariq Al-Mansoor',
    action: 'ATTENDANCE_CORRECTION',
    entity: 'Attendance (TSG-004)',
    details: 'Logged explanation for late arrival: Sheikh Zayed Road highway congestion.',
  },
  {
    id: 'AUD-902',
    timestamp: '2026-10-28 16:45:00',
    actor: 'Jessica Taylor',
    action: 'PAYROLL_APPROVED',
    entity: 'Payroll Run (RUN-2026-04)',
    details: 'Approved April 2026 cycle for 25 employees totaling AED 307,700.00 net.',
  },
  {
    id: 'AUD-903',
    timestamp: '2026-10-28 14:15:00',
    actor: 'Tariq Al-Mansoor',
    action: 'OCR_VERIFICATION_COMMITTED',
    entity: 'OCR Job (OCR-JOB-8821)',
    details: 'Verified Emirates ID data and drafted employee record for Sami Kareem.',
  },
  {
    id: 'AUD-904',
    timestamp: '2026-10-27 10:00:00',
    actor: 'Zayd Khoury',
    action: 'PAYROLL_CALCULATED',
    entity: 'Payroll Run (RUN-2026-05)',
    details: 'Executed decimal-safe calculation for May draft cycle with 0 rounding errors.',
  },
  {
    id: 'AUD-905',
    timestamp: '2026-10-27 09:00:00',
    actor: 'Tariq Al-Mansoor',
    action: 'PAYSLIPS_PUBLISHED',
    entity: 'Payslips (RUN-2026-03)',
    details: 'Published 25 electronic payslips to employee self-service portal.',
  },
];

/**
 * Storage Manager for Database State
 */
class LocalDatabase {
  constructor() {
    this.storageKey = 'DOMI_HR_TITANZ_DB_V2';
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load from localStorage, initializing fresh', e);
    }

    const initial = {
      company: COMPANY_PROFILE,
      departments: DEPARTMENTS,
      branches: BRANCHES,
      employees: INITIAL_EMPLOYEES,
      attendance: INITIAL_ATTENDANCE,
      payrollRuns: INITIAL_PAYROLL_RUNS,
      payslips: generateInitialPayslips(),
      ocrJobs: INITIAL_OCR_JOBS,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
    this.save(initial);
    return initial;
  }

  save(data) {
    this.data = data;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  resetToDefault() {
    localStorage.removeItem(this.storageKey);
    this.data = this.load();
    return this.data;
  }

  // Employee methods
  getEmployees() {
    return this.data.employees;
  }

  getEmployeeById(id) {
    return this.data.employees.find((e) => e.id === id) || null;
  }

  addEmployee(employee) {
    const newEmp = {
      ...employee,
      id: employee.id || `TSG-${String(this.data.employees.length + 1).padStart(3, '0')}`,
      status: employee.status || 'Active',
      avatar: employee.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    this.data.employees.push(newEmp);
    this.addAuditLog('HR Administrator', 'EMPLOYEE_CREATED', `Employee (${newEmp.id})`, `Created employee dossier for ${newEmp.firstName} ${newEmp.lastName}`);
    this.save(this.data);
    return newEmp;
  }

  updateEmployee(id, updates) {
    const index = this.data.employees.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.employees[index] = { ...this.data.employees[index], ...updates };
      this.addAuditLog('HR Administrator', 'EMPLOYEE_UPDATED', `Employee (${id})`, `Updated details for ${this.data.employees[index].firstName} ${this.data.employees[index].lastName}`);
      this.save(this.data);
      return this.data.employees[index];
    }
    return null;
  }

  // Attendance methods
  getAttendance(filters = {}) {
    let records = [...this.data.attendance];
    if (filters.status && filters.status !== 'All') {
      records = records.filter((r) => r.status === filters.status);
    }
    if (filters.department && filters.department !== 'All') {
      records = records.filter((r) => r.department === filters.department);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      records = records.filter((r) => r.employeeName.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q));
    }
    return records;
  }

  recordClockEvent(employeeId, eventType) {
    const emp = this.getEmployeeById(employeeId);
    if (!emp) return null;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const todayStr = '2026-10-29';

    let record = this.data.attendance.find((r) => r.employeeId === employeeId && r.date === todayStr);

    if (!record) {
      record = {
        id: `ATT-20261029-${String(this.data.attendance.length + 1).padStart(2, '0')}`,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        date: todayStr,
        scheduledStart: '08:00',
        scheduledEnd: '17:00',
        clockIn: timeStr,
        clockOut: null,
        workedDurationHours: 1.0,
        breakDurationHours: 0.0,
        overtimeHours: 0.0,
        status: 'Present',
        exception: 'Self Clock-In via Portal',
        adjustmentHistory: [],
      };
      this.data.attendance.unshift(record);
    } else {
      if (eventType === 'in') {
        record.clockIn = timeStr;
        record.status = 'Present';
      } else {
        record.clockOut = timeStr;
        record.status = 'Present';
      }
    }
    this.addAuditLog(emp.firstName + ' ' + emp.lastName, 'CLOCK_' + eventType.toUpperCase(), `Attendance (${emp.id})`, `Recorded clock-${eventType} at ${timeStr}`);
    this.save(this.data);
    return record;
  }

  correctAttendance(recordId, newStatus, reason, actor = 'HR Administrator') {
    const record = this.data.attendance.find((r) => r.id === recordId);
    if (!record) return null;

    const prev = record.status;
    record.status = newStatus;
    if (!record.adjustmentHistory) record.adjustmentHistory = [];
    record.adjustmentHistory.push({
      previousStatus: prev,
      newStatus,
      reason,
      actor,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });

    this.addAuditLog(actor, 'ATTENDANCE_CORRECTION', `Attendance (${record.employeeId})`, `Corrected status from ${prev} to ${newStatus}. Reason: ${reason}`);
    this.save(this.data);
    return record;
  }

  // Payroll methods
  getPayrollRuns() {
    return this.data.payrollRuns;
  }

  getPayrollRunById(id) {
    return this.data.payrollRuns.find((r) => r.id === id) || null;
  }

  createPayrollRun(periodCode, periodName, startDate, endDate, notes = '') {
    const newRun = {
      id: `RUN-${periodCode.replace(/[^0-9A-Z]/g, '')}`,
      periodCode,
      periodName,
      startDate,
      endDate,
      status: 'Draft',
      currency: 'AED',
      employeeCount: this.data.employees.length,
      grossEarnings: 0.00,
      employeeDeductions: 0.00,
      netPayable: 0.00,
      employerContributions: 0.00,
      totalEmployerCost: 0.00,
      createdBy: 'Zayd Khoury',
      approvedBy: null,
      finalizedBy: null,
      finalizedAt: null,
      publishedAt: null,
      paymentStatus: 'Draft In Progress',
      notes,
    };
    this.data.payrollRuns.unshift(newRun);
    this.addAuditLog('Zayd Khoury', 'PAYROLL_RUN_CREATED', `Payroll Run (${newRun.id})`, `Created draft run for ${periodName}`);
    this.save(this.data);
    return newRun;
  }

  calculatePayrollRun(runId) {
    const run = this.getPayrollRunById(runId);
    if (!run) return null;

    let totalGross = DecimalMoney.from(0);
    let totalDeduct = DecimalMoney.from(0);
    let totalNet = DecimalMoney.from(0);
    let totalEmployerCost = DecimalMoney.from(0);
    let totalEmployerContrib = DecimalMoney.from(0);

    this.data.employees.forEach((emp, i) => {
      const calc = calculateEmployeePayroll({
        basicSalary: emp.basicSalary,
        housingAllowance: emp.housingAllowance,
        transportAllowance: emp.transportAllowance,
        otherAllowances: emp.otherAllowances,
        approvedOvertime: i % 4 === 0 ? 350.00 : 0.00,
        bonuses: i === 1 ? 1500.00 : 0.00,
        otherDeductions: i === 7 ? 300.00 : 0.00,
        employerContributions: Math.round(emp.basicSalary * 0.06),
      });

      totalGross = totalGross.add(calc.grossEarnings);
      totalDeduct = totalDeduct.add(calc.totalDeductions);
      totalNet = totalNet.add(calc.netPay);
      totalEmployerContrib = totalEmployerContrib.add(calc.employerContributions);
      totalEmployerCost = totalEmployerCost.add(calc.employerCost);
    });

    run.grossEarnings = totalGross.toNumber();
    run.employeeDeductions = totalDeduct.toNumber();
    run.netPayable = totalNet.toNumber();
    run.employerContributions = totalEmployerContrib.toNumber();
    run.totalEmployerCost = totalEmployerCost.toNumber();
    run.status = 'Calculated';
    run.employeeCount = this.data.employees.length;

    this.addAuditLog('Zayd Khoury', 'PAYROLL_RUN_CALCULATED', `Payroll Run (${run.id})`, `Calculated ${run.employeeCount} employees. Gross: AED ${run.grossEarnings.toFixed(2)}, Net: AED ${run.netPayable.toFixed(2)}`);
    this.save(this.data);
    return run;
  }

  submitPayrollForApproval(runId) {
    const run = this.getPayrollRunById(runId);
    if (!run) return null;
    run.status = 'Pending Approval';
    this.addAuditLog('Zayd Khoury', 'PAYROLL_SUBMITTED_FOR_APPROVAL', `Payroll Run (${run.id})`, `Submitted ${run.periodName} for maker-checker review`);
    this.save(this.data);
    return run;
  }

  approvePayrollRun(runId, approverName = 'Jessica Taylor') {
    const run = this.getPayrollRunById(runId);
    if (!run) return null;
    run.status = 'Approved';
    run.approvedBy = approverName;
    this.addAuditLog(approverName, 'PAYROLL_APPROVED', `Payroll Run (${run.id})`, `Approved run for disbursement`);
    this.save(this.data);
    return run;
  }

  finalizePayrollRun(runId, finalizerName = 'Tariq Al-Mansoor') {
    const run = this.getPayrollRunById(runId);
    if (!run) return null;
    run.status = 'Finalized';
    run.finalizedBy = finalizerName;
    run.finalizedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Generate Payslips snapshot
    this.data.employees.forEach((emp, index) => {
      const calc = calculateEmployeePayroll({
        basicSalary: emp.basicSalary,
        housingAllowance: emp.housingAllowance,
        transportAllowance: emp.transportAllowance,
        otherAllowances: emp.otherAllowances,
        approvedOvertime: index % 4 === 0 ? 350.00 : 0.00,
        bonuses: index === 1 ? 1500.00 : 0.00,
        otherDeductions: index === 7 ? 300.00 : 0.00,
        employerContributions: Math.round(emp.basicSalary * 0.06),
      });

      const psId = `PS-${run.periodCode}-${emp.id}`;
      const existingIdx = this.data.payslips.findIndex((p) => p.id === psId);
      const payslipObj = {
        id: psId,
        runId: run.id,
        payslipNumber: `TSG-PAY-${run.periodCode.replace('-', '')}-${String(index + 1).padStart(4, '0')}`,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        jobTitle: emp.title,
        branch: emp.branch,
        bankName: emp.bankName,
        iban: emp.iban,
        periodCode: run.periodCode,
        periodName: run.periodName,
        paymentDate: run.endDate,
        currency: 'AED',
        basicSalary: calc.basicSalary,
        housingAllowance: calc.housingAllowance,
        transportAllowance: calc.transportAllowance,
        otherAllowances: calc.otherAllowances,
        approvedOvertime: calc.approvedOvertime,
        bonuses: calc.bonuses,
        grossEarnings: calc.grossEarnings,
        unpaidLeaveDeductions: calc.unpaidLeaveDeductions,
        loanRepayments: calc.loanRepayments,
        otherDeductions: calc.otherDeductions,
        totalDeductions: calc.totalDeductions,
        netPay: calc.netPay,
        employerContributions: calc.employerContributions,
        employerCost: calc.employerCost,
        status: 'Draft Ready',
        publishedAt: null,
      };

      if (existingIdx !== -1) {
        this.data.payslips[existingIdx] = payslipObj;
      } else {
        this.data.payslips.unshift(payslipObj);
      }
    });

    this.addAuditLog(finalizerName, 'PAYROLL_FINALIZED', `Payroll Run (${run.id})`, `Finalized snapshot created. ${this.data.employees.length} payslips generated.`);
    this.save(this.data);
    return run;
  }

  publishPayslipsForRun(runId) {
    const run = this.getPayrollRunById(runId);
    if (!run) return false;
    run.status = 'Published';
    run.publishedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

    this.data.payslips.forEach((ps) => {
      if (ps.runId === runId) {
        ps.status = 'Published';
        ps.publishedAt = run.publishedAt;
      }
    });

    this.addAuditLog('Tariq Al-Mansoor', 'PAYSLIPS_PUBLISHED', `Payroll Run (${run.id})`, `Published payslips to all eligible employees`);
    this.save(this.data);
    return true;
  }

  // Payslip methods
  getPayslips(employeeId = null) {
    if (employeeId) {
      return this.data.payslips.filter((p) => p.employeeId === employeeId);
    }
    return this.data.payslips;
  }

  getPayslipById(id) {
    return this.data.payslips.find((p) => p.id === id) || null;
  }

  // OCR Methods
  getOcrJobs() {
    return this.data.ocrJobs;
  }

  getOcrJobById(id) {
    return this.data.ocrJobs.find((j) => j.id === id) || null;
  }

  addOcrJob(job) {
    const newJob = {
      id: `OCR-JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Pending Review',
      confidenceScore: 95.0,
      ...job,
    };
    this.data.ocrJobs.unshift(newJob);
    this.addAuditLog('HR Administrator', 'OCR_DOCUMENT_UPLOADED', `OCR Job (${newJob.id})`, `Uploaded ${newJob.fileName} for automated extraction`);
    this.save(this.data);
    return newJob;
  }

  verifyAndCommitOcrJob(jobId, verifiedFields, actor = 'Tariq Al-Mansoor') {
    const job = this.getOcrJobById(jobId);
    if (!job) return null;

    job.status = 'Verified & Imported';
    job.verifiedBy = actor;
    job.verifiedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    job.extractedFields = verifiedFields;

    // If it's an employee onboarding document, commit to official employees
    if (verifiedFields.fullName) {
      const parts = verifiedFields.fullName.trim().split(' ');
      const firstName = parts[0] || 'New';
      const lastName = parts.slice(1).join(' ') || 'Employee';

      this.addEmployee({
        id: verifiedFields.employeeId,
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, '')}@titanzsecurity.ae`,
        phone: '+971 50 000 0000',
        department: verifiedFields.department || 'Operations & Guarding',
        title: verifiedFields.jobTitle || 'Security Specialist',
        branch: 'Dubai Main HQ',
        employmentType: 'Full-time',
        status: 'Active',
        joiningDate: '2026-11-01',
        basicSalary: parseFloat(verifiedFields.basicSalary) || 8000,
        housingAllowance: 2500,
        transportAllowance: 1000,
        otherAllowances: 500,
        bankName: verifiedFields.bankName || 'Emirates NBD',
        iban: verifiedFields.iban || 'AE000000000000000000000',
        emergencyContact: 'Emergency Contact Available',
        role: 'Employee',
      });
    }

    this.addAuditLog(actor, 'OCR_VERIFICATION_COMMITTED', `OCR Job (${job.id})`, `Approved human-in-the-loop verification and saved into official records`);
    this.save(this.data);
    return job;
  }

  // Audit Logs
  getAuditLogs() {
    return this.data.auditLogs;
  }

  addAuditLog(actor, action, entity, details) {
    const log = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      action,
      entity,
      details,
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 50) {
      this.data.auditLogs.pop();
    }
  }
}

export const db = new LocalDatabase();
