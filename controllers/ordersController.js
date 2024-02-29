const Razorpay = require ('razorpay');
const subscription = require('../models/subscriptionModel');
const dotenv = require('dotenv');
dotenv.config();
const instance = new Razorpay ({
    key_id : process.env.RAZORPAY_ID,
    key_secret : process.env.RAZORPAY_SECRET
});

const newOrder = async(req,res) =>{
     
    try{

     const order = await instance.orders.create({
        "amount": req.body.amount * 100,
        "currency": "INR",
        "receipt": "receipt#1",
        "partial_payment": false,
        "notes": {
          "key1": "test1",
          "key2": "test2"
        }
      });
      console.log("successfully created order in razorpay")
      res.status(200).send(order);
    }
    catch(err){
        console.log('error while creating order in razorpay');
        res.status(404).send(err.message);
        return;
    }
    
    
    /*const { name} = req.body.name;
    
    const planfind = await subscription.findOne({name: name});
    if(planfind)
    {
        res.status(404).send('There is no plan with requested name');
    }
     
*/
}

const getOrder = async ( req, res ) => {
    console.log("Inside get order", req.body)
    const orderId = req.body.orderId;
    const order = await instance.orders.fetch(orderId);
    console.log("Order", order)
    return res.status(200).json({order: order});
}

module.exports = {newOrder, getOrder};