const User = require('../models/users.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eduardo.osocervantes@gmail.com',
        pass: 'nwwu ohzz mukf pnga'
    }
});

const resetTokens = new Map();

const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const requestPasswordReset = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('No existe una cuenta con este correo electrónico');
        }

        const resetToken = generateResetToken();
        const resetExpires = Date.now() + 3600000; // 1 hour

        resetTokens.set(resetToken, {
            email,
            expires: resetExpires
        });

        const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: 'eduardo.osocervantes@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña - Cocina Fácil',
            html: `
                <h2>Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetUrl}">Restablecer Contraseña</a>
                <p>Este enlace expirará en 1 hora.</p>
                <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            `
        });

        return { message: 'Se ha enviado un enlace de recuperación a tu correo' };
    } catch (error) {
        throw new Error(error.message);
    }
};

const resetPassword = async (token, newPassword) => {
    try {
        const resetData = resetTokens.get(token);
        
        if (!resetData) {
            throw new Error('Token inválido o expirado');
        }

        if (Date.now() > resetData.expires) {
            resetTokens.delete(token);
            throw new Error('El token ha expirado');
        }

        const user = await User.findOne({ email: resetData.email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        resetTokens.delete(token);

        return { message: 'Contraseña actualizada exitosamente' };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { requestPasswordReset, resetPassword };