const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const adminController = require('../controller/adminController');

router.post('/video',isAuth, adminController.createVideo);
module.exports = router;
