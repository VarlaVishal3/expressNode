const express = require('express');

const router = express.Router();

const subscriptionController = require('../controllers/subscriptionController.js');



router.post('/addPlan', subscriptionController.newSubscr);

module.exports = router;