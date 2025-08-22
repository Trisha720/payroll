const express = require("express")
const router = express.Router()
const Employee = require("../models/Employee")

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.getAll()
    res.json({
      success: true,
      data: employees,
    })
  } catch (error) {
    console.error("Error fetching employees:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: error.message,
    })
  }
})

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.id)
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      })
    }
    res.json({
      success: true,
      data: employee,
    })
  } catch (error) {
    console.error("Error fetching employee:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching employee",
      error: error.message,
    })
  }
})

// Create new employee
router.post("/", async (req, res) => {
  try {
    const employeeId = await Employee.create(req.body)
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: { id: employeeId },
    })
  } catch (error) {
    console.error("Error creating employee:", error)
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    })
  }
})

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.update(req.params.id, req.body)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      })
    }
    res.json({
      success: true,
      message: "Employee updated successfully",
    })
  } catch (error) {
    console.error("Error updating employee:", error)
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message,
    })
  }
})

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      })
    }
    res.json({
      success: true,
      message: "Employee deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting employee:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting employee",
      error: error.message,
    })
  }
})

module.exports = router
