const {Schema}=require("mongoose");
 const Orderscheema= new Schema({
    name:String,
    qty:Number,
    price:Number,
    mode:String
 })

 module.exports={Orderscheema};