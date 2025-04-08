require('dotenv').config()
const { user } = require("../model/Usermodel");
var jwt = require('jsonwebtoken');

const signin= async (req, res, next) => {

    try {
      const { email, password, username } = req.body;
      
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      let users = new user(req.body);
      await users.save()
      const token = jwt.sign({ email: users.email }, process.env.secret_token, { expiresIn: '1h' });
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
  }

  module.exports={signin}