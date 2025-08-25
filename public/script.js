function calculatePayroll() {
  // Logic to calculate payroll
  alert("Payroll calculation triggered!");
}

function exportPayrollData() {
  // Logic to export payroll data
  alert("Payroll data export triggered!");
}

function calculate() {
  // Logic to calculate total salary
  const basicSalary = parseFloat(document.getElementById("basicSalary").value);
  const allowances = parseFloat(document.getElementById("allowances").value);
  const deductions = parseFloat(document.getElementById("deductions").value);
  const overtime = parseFloat(document.getElementById("overtime").value);
  const totalSalary = basicSalary + allowances + overtime - deductions;
  document.getElementById(
    "calculatedSalary"
  ).innerText = `Total Salary: ${totalSalary}`;
}

function savePayroll() {
  // Logic to save payroll data
  alert("Payroll data saved!");
}

function cancel() {
  // Logic to cancel actions and clear fields
  document.getElementById("payrollForm").reset();
}

function updateTaxRates() {
  // Logic to update tax rates
  alert("Tax rates update triggered!");
}

function calculateTax() {
  // Logic to calculate tax
  alert("Tax calculation triggered!");
}

function exportTaxData() {
  // Logic to export tax data
  alert("Tax data export triggered!");
}

function saveTaxRate() {
  // Logic to save tax rate
  alert("Tax rate saved!");
}

function generatePayrollReport() {
  // Logic to generate payroll report
  alert("Payroll report generation triggered!");
}

function generateTaxReport() {
  // Logic to generate tax report
  alert("Tax report generation triggered!");
}

function generateAttendanceReport() {
  // Logic to generate attendance report
  alert("Attendance report generation triggered!");
}

function saveProfile() {
  // Logic to save user profile
  alert("Profile saved!");
}

function logout() {
  // Logic to logout user
  alert("Logged out!");
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.success) {
    alert("Login successful!");
    // Redirect to dashboard or home
    window.location.href = "/dashboard.html";
  } else {
    alert(data.message || "Login failed");
  }
}

// Show/Hide Signup Modal
document.getElementById("showSignupBtn").onclick = function () {
  document.getElementById("signupModal").style.display = "flex";
};
document.getElementById("closeSignup").onclick = function () {
  document.getElementById("signupModal").style.display = "none";
};
// Handle Registration
document.getElementById("signupForm").onsubmit = async function (e) {
  e.preventDefault();
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  document.getElementById("signupMsg").style.color = data.success
    ? "green"
    : "red";
  document.getElementById("signupMsg").innerText = data.message;
  if (data.success)
    setTimeout(() => {
      document.getElementById("signupModal").style.display = "none";
    }, 1500);
};
