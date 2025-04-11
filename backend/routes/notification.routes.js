const express = require('express');
const router = express.Router();
const { sendRecipeNotification, sendNewsletterToSubscribers } = require('../services/email.services');
const auth = require('../middlewares/validateSchema.middleware');


router.post('/notify-recipe', auth, async (req, res) => {
    try {
        const { recipients, recipe } = req.body;
        await sendRecipeNotification(recipients, recipe);
        res.json({ message: 'Notificación enviada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/send-newsletter', auth, async (req, res) => {
    try {
        const { subscribers, content } = req.body;
        await sendNewsletterToSubscribers(subscribers, content);
        res.json({ message: 'Newsletter enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;