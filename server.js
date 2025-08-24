require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "trisha@2004", // your password
  database: "payroll_system", // your db name
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("DB error on SELECT:", err);
        return res.json({ success: false, message: "Database error" });
      }
      if (results && results.length > 0)
        return res.json({ success: false, message: "Username already exists" });
      const hash = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (err2) => {
          if (err2) {
            console.error("DB error on INSERT:", err2);
            return res.json({ success: false, message: "Registration failed" });
          }
          res.json({ success: true, message: "Registration successful!" });
        }
      );
    }
  );
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (!results || results.length === 0)
        return res.json({ success: false, message: "Invalid credentials" });
      const match = await bcrypt.compare(password, results[0].password);
      if (match) res.json({ success: true, message: "Login successful" });
      else res.json({ success: false, message: "Invalid credentials" });
    }
  );
});

app.listen(PORT, () => {
  console.log(
    `🚀 Payroll Management Server running at http://localhost:${PORT}`
  );
  console.log(
    `📊 Dashboard available at http://localhost:${PORT}/dashboard.html`
  );
});
