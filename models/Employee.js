const { pool } = require("../config/database")

class Employee {
  // Create employees table if not exists
  static async createTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                employee_id VARCHAR(50) UNIQUE NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20),
                department VARCHAR(100),
                position VARCHAR(100),
                salary DECIMAL(10, 2) NOT NULL,
                hire_date DATE NOT NULL,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `

    try {
      await pool.execute(query)
      console.log("✅ Employees table created/verified")
    } catch (error) {
      console.error("❌ Error creating employees table:", error)
      throw error
    }
  }

  // Get all employees
  static async getAll() {
    const query = 'SELECT * FROM employees WHERE status = "active" ORDER BY created_at DESC'
    const [rows] = await pool.execute(query)
    return rows
  }

  // Get employee by ID
  static async getById(id) {
    const query = "SELECT * FROM employees WHERE id = ?"
    const [rows] = await pool.execute(query, [id])
    return rows[0]
  }

  // Create new employee
  static async create(employeeData) {
    const query = `
            INSERT INTO employees (employee_id, first_name, last_name, email, phone, department, position, salary, hire_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

    const values = [
      employeeData.employee_id,
      employeeData.first_name,
      employeeData.last_name,
      employeeData.email,
      employeeData.phone,
      employeeData.department,
      employeeData.position,
      employeeData.salary,
      employeeData.hire_date,
    ]

    const [result] = await pool.execute(query, values)
    return result.insertId
  }

  // Update employee
  static async update(id, employeeData) {
    const query = `
            UPDATE employees 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ?, position = ?, salary = ?
            WHERE id = ?
        `

    const values = [
      employeeData.first_name,
      employeeData.last_name,
      employeeData.email,
      employeeData.phone,
      employeeData.department,
      employeeData.position,
      employeeData.salary,
      id,
    ]

    const [result] = await pool.execute(query, values)
    return result.affectedRows > 0
  }

  // Delete employee (soft delete)
  static async delete(id) {
    const query = 'UPDATE employees SET status = "inactive" WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }
}

module.exports = Employee
