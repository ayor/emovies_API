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
    },
    total:{
        type: Number,
        required: true
    },
    shippingMode:{
        type: String,
        required: true
    },
    shippingFee:{
        type: Number,
        required: true
    },
    paystackReference:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema)