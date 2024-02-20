const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const prd = require('./models/products.js');
const usr = require('./models/users.js');
const mailSender =  require('./helpers/mailer.js');

mongoose.connect(process.env.DB_URL).then(()=>{console.log("Connected");}).catch(()=>{ console.log("Not connected");})
const express = require('express');
const Userroutes = require('./routes/users.js');
const Productroutes = require('./routes/products.js');
const {authenticate} = require('./helpers/middleware.js')
const app = express();
app.use(express.json());
app.use('/user', Userroutes);
app.use('/product', Productroutes)

app.use('/sendEmail', mailSender)


// const customers = [{id: 1,name: 'Vishal Varla',add: 'Nagarkurnool'},
// {id: 2,name: 'Prashant Beri',add: 'Kadapa'},
// {id: 3,name: 'Sujith Nelki',add: 'Karimnagar'}];

// // app.get('/',(req, res) => {
// //     res.send('Hello World');
// // });
// app.get('/customers',(req,res)=>{
//     res.send(customers);
// });
// app.get('/customers/:id',(req,res)=>{
//     const customer = customers.find(c => c.id === parseInt(req.params.id));
//     if(!customer)
//     res.status(404).send('The Customer with given id was not found');
//     res.send(customer);
// });
// app.post('/customers',(req, res)=>{
//     const { name, add } = req.body;
//     console.log("name,add", name, add);
//     const customer={
//         id: customers.length +1,
//         name: req.body.name,
//         add: req.body.add
//     };
//     customers.push(customer);
//     res.send(customer);
// });

// app.put('/customers/:id', (req, res)=>{
//     const customer = customers.find(c => c.id === parseInt(req.params.id));
//     if(!customer)
//     res.status(404).send('The Customer with given id was not found');
    
//     customer.name = req.body.name;
//     customer.address = req.body.add;
//     res.send(customer);
// })
app.listen(3000, ()=> console.log('Listening on port 3000'));