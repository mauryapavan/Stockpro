// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = require("mongoose");

var UserSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
       required:true
    },
    orders:[{
         type: Schema.Types.ObjectId,
        ref:"order"
    }]

});
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports={UserSchema};