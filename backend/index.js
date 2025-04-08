require('dotenv').config()
const express = require("express")
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors = require('cors')


const { holdings } = require("./schemas/holdingdata");

const { positon } = require("./model/Positonmodel");
const { Holding } = require("./model/Holdingmodel");
const { order } = require("../backend/model/ordermodel");
const { user } = require("../backend/model/Usermodel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const { auth } = require("./controller/authentication");
const { login } = require("./controller/login");
const { signin } = require("./controller/Signin");
const { positions } = require('./schemas/positiondata');


app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // React App ka URL
  credentials: true, // Cookies allow karne ke liye
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(bodyParser.json());

dbconnect()
  .then(() => {
    console.log("succes fully connect database")
  })
  .catch((err) => {
    console.log(err);
  })

async function dbconnect() {

  await mongoose.connect(process.env.mongo_url);
}

app.get("/", (req, res) => {
  res.send("today job done and good knight man !!!!!!!!!")
})

// <--------- authentication ------->

app.post("/",auth )


app.get("/allholdings", async (req, res) => {

  
  let data = await Holding.find();

  res.json(data);
})
app.get("/allpositions", async (req, res) => {



  let data = await positon.find();

  res.json(data);
});
app.post("/myorder",async (req,res,next)=>{
  let token=req.body.cookies.token;
  
  let data=jwt.verify(token,process.env.secret_token);
  let email=data.email;
  const users = await user.findOne({email }).populate("orders");
   res.json(users.orders);
})


app.post("/neworder", async (req, res,next) => {
  
  let data=jwt.verify(req.body[1].token,process.env.secret_token);
  let email=data.email;
 
  const users = await user.findOne({email });
  
  
  
  let orders = new order(req.body[0]);
  console.log(orders);
  orders.save()
  .then((res) => {
    //console.log(res) 
    users.orders.push(res._id);
    users.save()
   
  });
  res.json({ status: true })
})

// <--------- sign in ------->
app.post("/signin", signin)
// <___-login______>
app.post("/login", login)


app.listen(process.env.port, () => {
  console.log("app is listen on 3333")
})