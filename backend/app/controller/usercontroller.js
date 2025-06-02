const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usermodel = require('../modal/usermodal');

module.exports = {
  register: async function(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await usermodel.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Don't hash here - let the pre-save hook handle it
      const newUser = new usermodel({
        email: email.toLowerCase().trim(),
        password // raw password
      });

      const savedUser = await newUser.save();
      res.status(201).json({ message: "Registration successful", user: savedUser });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  },

  authenticate: async function (req, res) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();

      console.log('Login attempt for:', email); // Debug log

      const userinfo = await usermodel.findOne({ email });
      if (!userinfo) {
        return res.status(404).json({ status: "error", message: "User not found!" });
      }

      console.log('Stored password hash:', userinfo.password); // Debug log

      const isMatch = await bcrypt.compare(password, userinfo.password);
      console.log('Password match result:', isMatch); // Debug log

      if (!isMatch) {
        return res.status(401).json({ status: "error", message: "Incorrect password" });
      }

      // On success, create a JWT token
      const token = jwt.sign(
        { id: userinfo._id, email: userinfo.email },
        "your_jwt_secret_key", // replace with your secret key from env/config
        { expiresIn: '1h' }
      );

      res.status(200).json({
        status: "success",
        message: "Authentication successful",
        token: token,
        user: { id: userinfo._id, email: userinfo.email }
      });

    } catch (err) {
      console.error("Authentication error:", err);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }
};
