const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Razorpay = require ('razorpay');
const prd = require('./models/products.js');
const usr = require('./models/users.js');
const mailSender =  require('./helpers/mailer.js');

mongoose.connect(process.env.DB_URL).then(()=>{console.log("Connected");}).catch(()=>{ console.log("Not connected");})
const express = require('express');
const Userroutes = require('./routes/users.js');
const Productroutes = require('./routes/products.js');
const Subscrroutes = require('./routes/subscriptionRouter.js');
const Orderroutes = require ('./routes/orderRouter.js');
const {authenticate} = require('./helpers/middleware.js');


const app = express();
app.use(express.static('expressNode'));
app.use(express.json());
app.use('/user', Userroutes);
app.use('/product', Productroutes);
app.use('/subscription', Subscrroutes);
app.use('/orders', Orderroutes);

app.get("/razorPay", (req, res) => {
    res.sendFile("index.html", { root: process.cwd() });
  });

const instance = new Razorpay ({
    key_id : process.env.RAZORPAY_ID,
    key_secret : process.env.RAZORPAY_SECRET
})
app.listen(3000, ()=> console.log('Listening on port 3000'));