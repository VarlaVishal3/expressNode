
const mongoose = require('mongoose');
    const ProductsSchema = new mongoose.Schema({ 
        name: { 
            type: String, 
            require: true
        }, 
        description: { 
            type: String, 
            require: true
        }, 
        cost: {
            type: Number,
            require: true
        },
        item_type:{
          type: String,
          require: true  
        }
       
    }) 
   const Product = mongoose.model("Products",ProductsSchema)
   module.exports= Product;