require('dotenv').config()
var jwt = require('jsonwebtoken');
const { user } = require('../model/Usermodel');


const auth= async (req, res, next) => {
    const token = req.cookies.token
    // console.log("hiiiiii")
    //console.log(token)
    if (!token) {
      return res.json({ status: false })
    }
    jwt.verify(token, process.env.secret_token, async (err, data) => {
  
      if (err) {
        console.log(err)
        return res.json({ status: false })
      } else {
        let email = data.email;
        const users = await user.findOne({ email });
        if (users) { return res.json({ status: true, users: users }) }
        else { return res.json({ status: false }) }
      }
    })
}

module.exports={auth};