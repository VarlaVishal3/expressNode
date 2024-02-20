const express = require ('express');

const router = express.Router();

const productController = require('../controllers/products.js');

router.post('/newProduct',productController.newProduct);

module.exports = router;

// router.get('/prodInfoCost',productController.prodInfoCost);