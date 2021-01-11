const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true  
    },
    imageUrl:{
        type: String,
        required: true  
    },
    price:{
        type: Number,
        required: true
    },
    year:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Video', videoSchema)