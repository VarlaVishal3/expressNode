const Subscr = require("../models/subscriptionModel");


const newSubscr = async(req,res)=> {
    const{name, valid_till, price}= req.body;
    console.log(name, valid_till, price);
    const subscrfind = await Subscr.findOne({name: req.body.name});
    if(subscrfind)
    res.status(404).send('A pla with similar name already exists');
const subscr = new Subscr({
    name: req.body.name,
    valid_till: req.body.valid_till,
    price: req.body.price
}).save();
console.log('new subscription label  is added');
res.send(subscr);
}

module.exports= {newSubscr};
