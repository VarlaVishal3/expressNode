const {v4} = require ('uuid');
const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({ 
        
        name: { 
            type: String, 
            require: true
        }, 
        subscriptionName: { 
            type: String, 
            require: true
        }, 
        userEmail: {
            type: string,
            require: true
        }, 
        paymentDate:{
            type: Date,
            default: Date.now, 
        },
        expiryDate:{
            type: Date,
            require: false, 
        },
        amountPaid: {
            type: Number,
            require: true
        }
        
}) ;

const Transactions = mongoose.model("Transactions", TransactionSchema);
module.exports = Transactions;