const {v4} = require ('uuid');
const mongoose = require('mongoose');
const SubscriptionSchema = new mongoose.Schema({ 
        
        name: { 
            type: String, 
            require: true
        }, 
        
        Valid_till: {
            type: Number,
            require: true
        }, 
        price: {
            type: Number,
            require: true
        }
        
}) ;

const Subscription = mongoose.model("Subscriptions", SubscriptionSchema);
module.exports = Subscription;