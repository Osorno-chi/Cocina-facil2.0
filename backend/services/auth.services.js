const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const  {hashPassword,verifyPassword} = require('../utils/security')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const {encryptData, desencryptData} = require('../libs/crypt')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD
  }
});

const registerUser = async (username, email, password) => {
  try {
    const encryptedEmail = encryptData(email);
    const existingUser = await User.findOne({ email: encryptedEmail });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    const hashPwd = await hashPassword(password)
    const newUser = new User({ username, email: encryptedEmail, password: hashPwd });
    await newUser.save();

    return { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const encryptedEmail = encryptData(email);
    const user = await User.findOne({ email: encryptedEmail });
    if (!user) {
      console.log('no usuario')
      throw new Error('Credenciales incorrectas');
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      console.log('contraseña invalida')
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });

    return { token, message: 'Inicio de sesión exitoso' };
  } catch (error) {
    console.log('inicio de secion incorrecto')
    throw new Error(error.message);
  }
};

const forgotPasswordService = async (email) => {
  try {
    const encryptedEmail = encryptData(email);
    console.log ("service")
      const user = await User.findOne({ encryptedEmail });
      if (!user) {
          throw new Error('No existe una cuenta con este correo electrónico');
      }

      const decryptedEmail = desencryptData(user.email);

      // Usar el módulo crypto importado
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hora

      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();

      const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

      await transporter.sendMail({
            from: 'eduardo.osocervantes@gmail.com',
            to: decryptedEmail,
            subject: 'Recuperación de Contraseña - Cocina Fácil',
            html: `
                <h2>Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetUrl}">Restablecer Contraseña</a>
                <p>Este enlace expirará en 1 hora.</p>
            `
        });

      return { message: 'Se ha enviado un enlace de recuperación a tu correo' };
  } catch (error) {
      throw new Error(error.message);
  }
};


module.exports = { registerUser, loginUser, forgotPasswordService };