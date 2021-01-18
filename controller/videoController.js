const Video = require('../models/video');
const VIDEOS_ITEMS_PER_PAGE = 10; 

exports.getVideos = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const numberOfVideos = await Video.find()
        .countDocuments();


        
        const videos = await Video.find()
        .limit(VIDEOS_ITEMS_PER_PAGE)
        .skip(VIDEOS_ITEMS_PER_PAGE * (page - 1));

        if (!videos) {
            const error = new Error('There are no available videos');
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({
            message: "succesful",
            videos,
            numberOfVideos
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getVideo = async (req, res, next) => {
    const videoId = req.params.id;

    try {
        const video = await Video.findById(videoId);

        if (!video) {
            const error = new Error('Video does not exist');
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({
            video
        })
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        throw error
    }

}
