const mysql = require("mysql2/promise");

// Database config
const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "trisha@2004",
  database: "payroll_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
};

// Create pool
const pool = mysql.createPool(dbConfig);

// Simple connection test function
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database connected successfully");
    console.log(
      `📍 Connected to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    );
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Export both pool and testConnection
module.exports = { pool, testConnection };
