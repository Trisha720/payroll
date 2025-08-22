const express = require("express")
const router = express.Router()
const Payroll = require("../models/Payroll")
const Employee = require("../models/Employee")

// Get all payroll records
router.get("/", async (req, res) => {
  try {
    const payrollRecords = await Payroll.getAll()
    res.json({
      success: true,
      data: payrollRecords,
    })
  } catch (error) {
    console.error("Error fetching payroll records:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching payroll records",
      error: error.message,
    })
  }
})

// Get payroll records for specific employee
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const payrollRecords = await Payroll.getByEmployeeId(req.params.employeeId)
    res.json({
      success: true,
      data: payrollRecords,
    })
  } catch (error) {
    console.error("Error fetching employee payroll:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching employee payroll",
      error: error.message,
    })
  }
})

// Calculate and create payroll
router.post("/calculate", async (req, res) => {
  try {
    const { employee_id, pay_period_start, pay_period_end, overtime_hours, bonus, deductions } = req.body

    // Get employee details
    const employee = await Employee.getById(employee_id)
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      })
    }

    // Calculate payroll
    const basicSalary = Number.parseFloat(employee.salary)
    const overtimeRate = basicSalary / 160 // Assuming 160 working hours per month
    const overtimePay = (overtime_hours || 0) * overtimeRate
    const grossPay = basicSalary + overtimePay + (bonus || 0)
    const taxDeduction = grossPay * 0.1 // 10% tax
    const totalDeductions = (deductions || 0) + taxDeduction
    const netPay = grossPay - totalDeductions

    const payrollData = {
      employee_id,
      pay_period_start,
      pay_period_end,
      basic_salary: basicSalary,
      overtime_hours: overtime_hours || 0,
      overtime_rate: overtimeRate,
      overtime_pay: overtimePay,
      bonus: bonus || 0,
      deductions: deductions || 0,
      tax_deduction: taxDeduction,
      gross_pay: grossPay,
      net_pay: netPay,
      status: "draft",
    }

    const payrollId = await Payroll.create(payrollData)

    res.status(201).json({
      success: true,
      message: "Payroll calculated and created successfully",
      data: { id: payrollId, ...payrollData },
    })
  } catch (error) {
    console.error("Error calculating payroll:", error)
    res.status(500).json({
      success: false,
      message: "Error calculating payroll",
      error: error.message,
    })
  }
})

// Update payroll status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body
    const updated = await Payroll.updateStatus(req.params.id, status)

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Payroll record not found",
      })
    }

    res.json({
      success: true,
      message: "Payroll status updated successfully",
    })
  } catch (error) {
    console.error("Error updating payroll status:", error)
    res.status(500).json({
      success: false,
      message: "Error updating payroll status",
      error: error.message,
    })
  }
})

module.exports = router
