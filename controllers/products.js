// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
const Product = require('../models/products.js');
const newProduct = async(req,res) =>{
     const { name, description ,cost, item_type} = req.body;
        console.log("name,description,cost,item_type", name,description,cost,item_type);
        const productfind = await Product.findOne({name: req.body.name});
    if(productfind)
    return res.status(404).send('The Product with given name already exists');

    console.log("adding the product");
        const product = await new Product({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            item_type: req.body.item_type
        }).save();
        
    console.log("new product is added");
    return res.status(200).json({product: product });
}


const productInfo = async(req,res) =>{
 
    
    console.log("new product is added");
    return res.status(200).json({product: product });
}

// const getUser = async(req,res) =>{
//     const user = await User.findOne({name: req.body.name});
//     if(!user)
//     res.status(404).send('The User with given id was not found');
//     res.send(user);
// }

// const deleteUser  = async(req,res) =>{
//     const user = await User.findOne({name: req.body.name});
    
//     if(!user)
//     res.status(404).send('The User with given id was not found');
//     else
//     {
//        const res= await User.deleteOne({_id: user.id});

//         console.log('user deleted', res)  ;
//     }
// }


// const updateUser = async(req, res) =>{
//     const user = await User.findOne({name: req.body.name});
    
//     if(!user)
//     res.status(404).send('The User with given id was not found');
//     else
//     {
//        const res= await User.updateOne({_id: user.id}, {name: req.body.name, age: req.body.age});

//         console.log('user updated', res);
//         res.send('user is updated')
//     }
// }

module.exports = {newProduct, productInfo};