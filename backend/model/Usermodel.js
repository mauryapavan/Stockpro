const mongoose =require("mongoose")
const { UserSchema } = require("../schemas/user")
 const user=new mongoose.model("user",UserSchema);
 module.exports={user};