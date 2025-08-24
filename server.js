require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); // using mysql2 (recommended)
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "trisha@2004", // your MySQL password
  database: "payroll_system", // your DB name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL Database.");
});

// Serve static frontend files (login.html, signup.html, dashboard.html, etc.)
app.use(express.static(path.join(__dirname, "public")));

// ================== REGISTER ==================
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });

  // Check if username exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("DB SELECT error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length > 0)
        return res.json({ success: false, message: "Username already exists" });

      // Hash password
      const hash = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (err2) => {
          if (err2) {
            console.error("DB INSERT error:", err2);
            return res.json({ success: false, message: "Registration failed" });
          }
          res.json({ success: true, message: "Registration successful!" });
        }
      );
    }
  );
});

// ================== LOGIN ==================
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("DB SELECT error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length === 0)
        return res.json({ success: false, message: "Invalid credentials" });

      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(
    `🚀 Payroll Management Server running at http://localhost:${PORT}`
  );
  console.log(
    `📊 Dashboard available at http://localhost:${PORT}/dashboard.html`
  );
});
