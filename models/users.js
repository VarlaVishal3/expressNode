const {v4} = require ('uuid');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ 
        _id: {type: String ,default: v4},
        name: { 
            type: String, 
            require: true
        }, 
        address: { 
            type: String, 
            require: true
        }, 
        age: Number, 
        mobile: Number ,
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true,
            select: false
        },
        role: {
            type: String,
            require: true
        }


}) ;

const User = mongoose.model("Users", UserSchema);
module.exports = User;

