const express = require("express");
const path = require("path");

const app = express();

// Middleware for parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

const { testConnection } = require("./config/database");
const Employee = require("./models/Employee");
const Payroll = require("./models/Payroll");

const initializeDatabase = async () => {
  try {
    await testConnection();
    await Employee.createTable();
    await Payroll.createTable();
    console.log("✅ Database initialization completed");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }
};

// Initialize database when app starts
initializeDatabase();

// Routes
const employeeRoutes = require("./routes/employee");
const payrollRoutes = require("./routes/payroll");

// Use routes
app.use("/employees", employeeRoutes); // Routes for employee management
app.use("/payroll", payrollRoutes); // Routes for payroll calculations

// Default Route for Main Page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route for Tax Page
app.get("/tax", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "tax.html")); // Serve tax.html
});

// Export the app to be used in server.js
module.exports = app;
// At the top
const authRoutes = require("./routes/auth");

// After other routes
app.use("/api", authRoutes);
