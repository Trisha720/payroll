const mysql = require("mysql2/promise")

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "payroll_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
        }
      : false,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: "utf8mb4",
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

const testConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection()
      console.log("✅ MySQL Database connected successfully")
      console.log(`📍 Connected to: ${dbConfig.host}:${dbConfig.port}`)
      connection.release()
      return true
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1} failed:`, error.message)
      if (i === retries - 1) {
        console.error("💥 All connection attempts failed. Please check your database configuration.")
        process.exit(1)
      }
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}

process.on("SIGINT", async () => {
  console.log("🔄 Closing database connections...")
  await pool.end()
  process.exit(0)
})

module.exports = { pool, testConnection }
