# Payroll Management System

A web-based payroll management system built with Node.js, Express, and MySQL.

## Features

- Employee Management (CRUD operations)
- Payroll Calculation and Processing
- Tax Management
- Attendance Tracking
- Leave Management
- MySQL Database Integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a MySQL database:
   \`\`\`bash
   mysql -u root -p < scripts/create_database.sql
   \`\`\`

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

5. Start the server:
   \`\`\`bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   \`\`\`

6. Access the application at `http://localhost:3000`

## Environment Variables

- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: payroll_management)
- `PORT` - Server port (default: 3000)

## API Endpoints

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Payroll
- `GET /payroll` - Get all payroll records
- `GET /payroll/employee/:employeeId` - Get payroll by employee
- `POST /payroll/calculate` - Calculate and create payroll
- `PATCH /payroll/:id/status` - Update payroll status

## Database Schema

The system uses two main tables:
- `employees` - Store employee information
- `payroll` - Store payroll calculations and records

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL with mysql2 driver
- **Frontend**: HTML, CSS, JavaScript
- **Development**: Nodemon for auto-restart
