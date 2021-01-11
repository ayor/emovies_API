const express = require('express');
const videoController = require('../controller/videoController');
const router = express.Router();

router.get('/video', videoController.getVideos);
router.get('/video/:id', videoController.getVideo);




module.exports = router;