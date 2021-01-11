const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:[
        {
            type: Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    status:{
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('Customer', customerSchema);