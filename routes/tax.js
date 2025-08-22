const express = require('express');
const router = express.Router();

// POST route to save tax data
router.post('/save', (req, res) => {
    const { income, taxRate, taxAmount } = req.body;
    // Logic to save tax data in the database
    const savedTax = { id: 1, income, taxRate, taxAmount }; // Mocked response
    res.json(savedTax);
});

// POST route to update tax rates
router.post('/update', (req, res) => {
    const { taxRate } = req.body;
    // Logic to update tax rates in the database
    res.sendStatus(200); // Respond with success
});

module.exports = router;
