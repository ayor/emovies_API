const express = require('express');
const router = express.Router(); 
const isAuth = require('../util/is-auth');
const orderController = require('../controller/orderController');

router.post('/order', isAuth, orderController.createOrder);

// router.get('/order/:orderId', isAuth, orderController.getInvoice);

module.exports = router;

