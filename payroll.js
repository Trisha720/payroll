const express = require('express');
const router = express.Router();

// Example route for payroll
router.get('/', (req, res) => {
    res.send('Payroll management home page');
});

module.exports = router;
