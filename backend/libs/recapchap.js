const axios = require('axios');
const { URLSearchParams } = require('url');

// Importa tu configuración y errores personalizados
const config = require('../config/config')

const verifyCaptcha = async (req, res, next) => {
    try {
        // Obtener el captcha del cuerpo de la solicitud
        const { captcha } = req.body;
        
        if (!captcha) {
            throw new Error('captcha de reCAPTCHA requerido');
        }

        // Crear datos para la solicitud POST
        const params = new URLSearchParams();
        params.append('secret', config.RECAPTCHA_SECRET_KEY);
        params.append('response', token);

        // Verificar el captcha con Google
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            params
        );

        const verificationResult = response.data;

        if (!verificationResult.success) {
            throw new Error('Verificación de reCAPTCHA fallida');
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyCaptcha;