const express = require('express');
const router2 = express.Router();
const userController = require('../app/controller/usercontroller');


router2.post('/register_p', userController.register);

router2.post('/login_p',userController.authenticate)




module.exports = router2;
