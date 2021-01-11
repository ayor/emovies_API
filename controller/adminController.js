const Customer = require('../models/customer');
const Video = require('../models/video');

exports.createVideo = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const year = req.body.year;
    const imageUrl = req.file.path;

    if (!imageUrl) {
        const error = new error('Invalid image selected'); 
        error.statusCode = 422; 
        next(error);
    }

    try {
        const video = new Video({
            title,
            description,
            price,
            year,
            imageUrl
    
        })
    
        await video.save(); 
    
        res.status(201).json({
            message: "Succesfully created video", 
            video
        })
    } catch (error) {
        error.statusCode = error.statusCode || 500; 
        next(error); 
    }

}


