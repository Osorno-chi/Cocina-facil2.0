const express = require('express');
const validateSchema = require("../middlewares/validateSchema.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schemas");
const { register, login, forgotPassword } = require('../controllers/auth.controllers');
const verifyCaptcha = require('../libs/recapchap')

const router = express.Router();

router.post('/register', validateSchema(registerSchema), verifyCaptcha, register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/forgot-password', forgotPassword);

module.exports = router;