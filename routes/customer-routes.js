const express = require('express');
const isAuth = require('../util/is-auth');
const customerController = require('../controller/customerController');
const router = express.Router();

router.get('/userinfo', isAuth, customerController.getUserInfo)


module.exports = router;