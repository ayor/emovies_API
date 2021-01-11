const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
}, timeStamp)

module.exports = mongoose.model('Order', orderSchema)