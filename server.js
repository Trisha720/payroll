require("dotenv").config()
const express = require("express") // Import express
const app = require("./app") // Import the app instance
const PORT = process.env.PORT || 3000 // Changed default port to 3000 and added dotenv support

// Serve static files from the 'public' directory
app.use(express.static("public"))

app.listen(PORT, () => {
  console.log(`🚀 Payroll Management Server running at http://localhost:${PORT}`)
  console.log(`📊 Dashboard available at http://localhost:${PORT}/dashboard.html`)
})
