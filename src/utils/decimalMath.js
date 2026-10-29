/**
 * Decimal-Safe Financial Arithmetic Library for Domi HR
 * Strictly avoids floating point inaccuracies by calculating in minor currency units (fils/cents).
 */

export class DecimalMoney {
  constructor(amount = 0) {
    if (amount instanceof DecimalMoney) {
      this.minorUnits = amount.minorUnits;
    } else if (typeof amount === 'number') {
      this.minorUnits = Math.round(amount * 100);
    } else if (typeof amount === 'string') {
      const clean = amount.replace(/[^0-9.-]/g, '');
      const parsed = parseFloat(clean);
      this.minorUnits = isNaN(parsed) ? 0 : Math.round(parsed * 100);
    } else {
      this.minorUnits = 0;
    }
  }

  static from(amount) {
    return new DecimalMoney(amount);
  }

  add(other) {
    const o = new DecimalMoney(other);
    return new DecimalMoney((this.minorUnits + o.minorUnits) / 100);
  }

  subtract(other) {
    const o = new DecimalMoney(other);
    return new DecimalMoney((this.minorUnits - o.minorUnits) / 100);
  }

  multiply(multiplier) {
    const factor = typeof multiplier === 'number' ? multiplier : parseFloat(multiplier) || 0;
    const resultUnits = Math.round(this.minorUnits * factor);
    return new DecimalMoney(resultUnits / 100);
  }

  divide(divisor) {
    const div = typeof divisor === 'number' ? divisor : parseFloat(divisor) || 1;
    if (div === 0) return new DecimalMoney(0);
    const resultUnits = Math.round(this.minorUnits / div);
    return new DecimalMoney(resultUnits / 100);
  }

  toNumber() {
    return this.minorUnits / 100;
  }

  toFixed(decimals = 2) {
    return (this.minorUnits / 100).toFixed(decimals);
  }

  format(currency = 'AED') {
    const num = this.minorUnits / 100;
    return `${currency} ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

/**
 * Authoritative Payroll Calculation Engine
 * 
 * Gross Earnings = Basic Salary + Eligible Allowances + Approved Overtime + Bonuses + Other Approved Earnings
 * Employee Deductions = Approved Unpaid Leave Deductions + Authorized Repayments + Other Validated Employee Deductions
 * Net Pay = Gross Earnings - Employee Deductions
 * Employer Payroll Cost = Gross Earnings + Employer Contributions + Employer-Paid Benefits
 */
export function calculateEmployeePayroll({
  basicSalary = 0,
  housingAllowance = 0,
  transportAllowance = 0,
  otherAllowances = 0,
  approvedOvertime = 0,
  bonuses = 0,
  otherEarnings = 0,
  unpaidLeaveDeductions = 0,
  loanRepayments = 0,
  otherDeductions = 0,
  employerContributions = 0,
  employerBenefits = 0,
}) {
  const basic = DecimalMoney.from(basicSalary);
  const housing = DecimalMoney.from(housingAllowance);
  const transport = DecimalMoney.from(transportAllowance);
  const otherAllow = DecimalMoney.from(otherAllowances);
  const overtime = DecimalMoney.from(approvedOvertime);
  const bonus = DecimalMoney.from(bonuses);
  const extraEarn = DecimalMoney.from(otherEarnings);

  // Total Allowances
  const totalAllowances = housing.add(transport).add(otherAllow);

  // Gross Earnings
  const grossEarnings = basic
    .add(totalAllowances)
    .add(overtime)
    .add(bonus)
    .add(extraEarn);

  // Deductions
  const unpaidLeave = DecimalMoney.from(unpaidLeaveDeductions);
  const loans = DecimalMoney.from(loanRepayments);
  const extraDeduct = DecimalMoney.from(otherDeductions);
  const totalDeductions = unpaidLeave.add(loans).add(extraDeduct);

  // Net Pay (Employee)
  const netPay = grossEarnings.subtract(totalDeductions);

  // Employer Costs
  const empContrib = DecimalMoney.from(employerContributions);
  const empBenefits = DecimalMoney.from(employerBenefits);
  const employerCost = grossEarnings.add(empContrib).add(empBenefits);

  return {
    basicSalary: basic.toNumber(),
    housingAllowance: housing.toNumber(),
    transportAllowance: transport.toNumber(),
    otherAllowances: otherAllow.toNumber(),
    totalAllowances: totalAllowances.toNumber(),
    approvedOvertime: overtime.toNumber(),
    bonuses: bonus.toNumber(),
    otherEarnings: extraEarn.toNumber(),
    grossEarnings: grossEarnings.toNumber(),
    unpaidLeaveDeductions: unpaidLeave.toNumber(),
    loanRepayments: loans.toNumber(),
    otherDeductions: extraDeduct.toNumber(),
    totalDeductions: totalDeductions.toNumber(),
    netPay: netPay.toNumber(),
    employerContributions: empContrib.toNumber(),
    employerBenefits: empBenefits.toNumber(),
    employerCost: employerCost.toNumber(),
  };
}

/**
 * Automated Verification Test for Master Prompt Section 11:
 * - Basic salary: AED 5,000.00
 * - Housing allowance: AED 1,000.00
 * - Transport allowance: AED 500.00
 * - Approved overtime: AED 200.00
 * - Approved employee deduction: AED 100.00
 * 
 * Expected:
 * - Gross earnings: AED 6,700.00
 * - Net pay: AED 6,600.00
 * - Employer contributions: AED 250.00 -> Employer payroll cost: AED 6,950.00
 * - Employee net pay remains AED 6,600.00.
 */
export function verifyMasterPayrollTest() {
  const result = calculateEmployeePayroll({
    basicSalary: 5000.00,
    housingAllowance: 1000.00,
    transportAllowance: 500.00,
    approvedOvertime: 200.00,
    otherDeductions: 100.00,
    employerContributions: 250.00,
  });

  const grossExpected = 6700.00;
  const netExpected = 6600.00;
  const costExpected = 6950.00;

  const passed =
    result.grossEarnings === grossExpected &&
    result.netPay === netExpected &&
    result.employerCost === costExpected;

  return {
    passed,
    details: {
      input: {
        basicSalary: 5000,
        housingAllowance: 1000,
        transportAllowance: 500,
        approvedOvertime: 200,
        otherDeductions: 100,
        employerContributions: 250,
      },
      expected: {
        grossEarnings: grossExpected,
        netPay: netExpected,
        employerCost: costExpected,
      },
      actual: {
        grossEarnings: result.grossEarnings,
        netPay: result.netPay,
        employerCost: result.employerCost,
      },
    },
  };
}
