const express = require('express');

const router = express.Router();

const userController = require('../controllers/users.js');

const {authenticate, authorize} = require('../helpers/middleware.js');


router.get('/login',userController.userLogin)

router.post('/addUser', authenticate,authorize, userController.newUser);

router.get('/getUser', authenticate,authorize, userController.getUser);

router.delete('/deleteUser', authenticate,authorize, userController.deleteUser);

router.put('/updateUser', authenticate,authorize, userController.updateUser);

module.exports = router;
