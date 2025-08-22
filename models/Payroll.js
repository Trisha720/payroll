const { pool } = require("../config/database")

class Payroll {
  // Create payroll table if not exists
  static async createTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS payroll (
                id INT AUTO_INCREMENT PRIMARY KEY,
                employee_id INT NOT NULL,
                pay_period_start DATE NOT NULL,
                pay_period_end DATE NOT NULL,
                basic_salary DECIMAL(10, 2) NOT NULL,
                overtime_hours DECIMAL(5, 2) DEFAULT 0,
                overtime_rate DECIMAL(10, 2) DEFAULT 0,
                overtime_pay DECIMAL(10, 2) DEFAULT 0,
                bonus DECIMAL(10, 2) DEFAULT 0,
                deductions DECIMAL(10, 2) DEFAULT 0,
                tax_deduction DECIMAL(10, 2) DEFAULT 0,
                gross_pay DECIMAL(10, 2) NOT NULL,
                net_pay DECIMAL(10, 2) NOT NULL,
                status ENUM('draft', 'processed', 'paid') DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
            )
        `

    try {
      await pool.execute(query)
      console.log("✅ Payroll table created/verified")
    } catch (error) {
      console.error("❌ Error creating payroll table:", error)
      throw error
    }
  }

  // Get all payroll records
  static async getAll() {
    const query = `
            SELECT p.*, e.first_name, e.last_name, e.employee_id as emp_id
            FROM payroll p
            JOIN employees e ON p.employee_id = e.id
            ORDER BY p.created_at DESC
        `
    const [rows] = await pool.execute(query)
    return rows
  }

  // Get payroll by employee ID
  static async getByEmployeeId(employeeId) {
    const query = `
            SELECT p.*, e.first_name, e.last_name, e.employee_id as emp_id
            FROM payroll p
            JOIN employees e ON p.employee_id = e.id
            WHERE p.employee_id = ?
            ORDER BY p.created_at DESC
        `
    const [rows] = await pool.execute(query, [employeeId])
    return rows
  }

  // Create payroll record
  static async create(payrollData) {
    const query = `
            INSERT INTO payroll (
                employee_id, pay_period_start, pay_period_end, basic_salary,
                overtime_hours, overtime_rate, overtime_pay, bonus, deductions,
                tax_deduction, gross_pay, net_pay, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

    const values = [
      payrollData.employee_id,
      payrollData.pay_period_start,
      payrollData.pay_period_end,
      payrollData.basic_salary,
      payrollData.overtime_hours || 0,
      payrollData.overtime_rate || 0,
      payrollData.overtime_pay || 0,
      payrollData.bonus || 0,
      payrollData.deductions || 0,
      payrollData.tax_deduction || 0,
      payrollData.gross_pay,
      payrollData.net_pay,
      payrollData.status || "draft",
    ]

    const [result] = await pool.execute(query, values)
    return result.insertId
  }

  // Update payroll status
  static async updateStatus(id, status) {
    const query = "UPDATE payroll SET status = ? WHERE id = ?"
    const [result] = await pool.execute(query, [status, id])
    return result.affectedRows > 0
  }
}

module.exports = Payroll
