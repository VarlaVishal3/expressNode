const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users.js');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel.js');
const {generateotp} = require('../helpers/generateotp.js');


const newUser = async(req,res) =>{
    const { name, address ,age, email, password, role} = req.body;
        console.log("name,address,age", name, address,age);
        const userfind = await User.findOne({name: req.body.name , email: req.body.email});
    if(userfind)
    res.status(404).send('The User with given name & email already exists');
        const user = await new User({
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            role: req.body.role

        }).save();
        
    console.log("new user is added");
    res.send( user);
}

const getUser = async(req,res) =>{
    const user = await User.findOne({name: req.body.name});
    if(!user)
    res.status(404).send('The User with given id was not found');
    res.send(user);
}

const deleteUser  = async(req,res) =>{
    const user = await User.findOne({name: req.body.name});
    
    if(!user)
    res.status(404).send('The User with given id was not found');
    else
    {
       const res= await User.deleteOne({_id: user.id});

        console.log('user deleted', res)  ;
    }
}


const updateUser = async(req, res) =>{
    const user = await User.findOne({name: req.body.name});
    
    if(!user)
    res.status(404).send('The User with given id was not found');
    else
    {
       const res= await User.updateOne({_id: user.id}, {name: req.body.name, age: req.body.age});

        console.log('user updated', res);
        res.send('user is updated')
    }
}

const userLogin = async(req, res) =>{
    const user = await User.findOne({email: req.body.email });

    if(!user && !bcrypt.compareSync(req.body.password,user.password))
    {   
        console.log('invalid credentials');

        return res.status(404).json({message: 'The credentials are not valid'});   
    }
    generateotp(req.body.email,res)
    console.log('Valid credentials');
           
     
}
const verifyOTP = async (req,res) =>{
    
    const resultuser = await User.findOne({email: req.body.email})
    if(!resultuser)
    { 
    console.log("invalid user");
    return res.status(404).json({message : "user doesn't exist"});
    }
    const checkdocument = await OTP.findOne({email : req.body.email})
    if(!checkdocument){
        console.log("OTP is expired");
        return res.status(404).json({message : "OTP is expired please request the OTP again"});
    }
    
    const resultotp = await OTP.findOne({ email:req.body.email, otp: req.body.otp });
    if(!resultotp)
    { 
    console.log("invalid otp");
    return res.status(404).json({message : "Invalid OTP please try again"});
    }
    return res.status(200).json({message: "you are successfully logged in"});
}

module.exports= {newUser, getUser,deleteUser,updateUser,userLogin,verifyOTP};


