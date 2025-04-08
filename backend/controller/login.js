require('dotenv').config()
const { user } = require("../model/Usermodel");

const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


const login= async (req, res, next) => {

    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.json({ message: 'All fields are required' })
      }
      const users = await user.findOne({ email });
      if (!users) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const auth = await bcrypt.compare(password.trim(), users.password.trim())
      console.log(auth);
      if (!auth) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const token = jwt.sign({ email: users.email }, process.env.secret_token, { expiresIn: '1h' });
  
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({ message: "User logged in successfully", success: true });
      next()
    } catch (error) {
      console.error(error);
    }
  }

  module.exports={login}