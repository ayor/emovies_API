const Customer = require('../models/customer');
const Order = require('../models/order');


exports.getUserInfo = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        let error = new Error('Unauthorized user');
        error.statusCode = 403;
        throw error;
    }
    try {
        const customer = await Customer.findById(userId)
        .populate('orders');
        

        if (!customer) {
            const error = new Error('User does not exist ');
            error.statusCode = 422;
            throw error;
        }

        res.status(200).json({
            message: 'succesful',
            data: customer
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}