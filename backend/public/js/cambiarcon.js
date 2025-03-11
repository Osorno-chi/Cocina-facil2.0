const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../services/password.services');

// ... existing routes ...

// Request password reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await requestPasswordReset(email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const result = await resetPassword(token, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;