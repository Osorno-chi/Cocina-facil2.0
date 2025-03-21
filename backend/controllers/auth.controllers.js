const { registerUser, loginUser, forgotPasswordService } = require('../services/auth.services');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await registerUser(username, email, password);
    res.status(201).json({ok:true, response});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    res.status(200).json({ok:true, response});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    console.log ("controller")
      const { email } = req.body;
      const response = await forgotPasswordService(email);
      res.json(response);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, forgotPassword };