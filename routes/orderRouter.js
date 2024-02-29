const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/ordersController.js');



router.post('/createOrder',  ordersController.newOrder);
router.post('/getOrder', ordersController.getOrder)

module.exports = router;