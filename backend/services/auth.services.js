const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const registerUser = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });

    return { token, message: 'Inicio de sesión exitoso' };
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = { registerUser, loginUser };