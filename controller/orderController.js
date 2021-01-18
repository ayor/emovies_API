const Order = require('../models/order');
const Customer = require('../models/customer');
const createInvoice  = require('../util/create-pdf');

exports.createOrder = async (req, res, next) => {
   
    try {
        const order = {
            ...req.body
        }

        const newOrder = new Order({ ...order, total: parseFloat(order.total) });
        const customer = await Customer.findById(order.customerId);
        const invoiceOrder = {
            ...order,
            _id: newOrder._id.toString()
        }
        await createInvoice({invoiceOrder, customer });
        await newOrder.save();

        

        customer.orders.push(newOrder._id);

        await customer.save();
        

        //create invoice
      


        res.status(201).json({
            message: "Successfully created a new order",
            order: newOrder
        });


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


// exports.getInvoice = async (req, res, next) => {
//     try {
//         const orderId = req.params.orderId;

//         const order = await Order.findById(orderId);

//         if (!order) {
//             const err = new Error('there are no orders')
//             err.statusCode = 404;
//             throw err;
//         }


//     } catch (error) {
//         error.statusCode = error.statusCode || 500
//         next(error)
//     };

//     res.status(201).json({
//         order,
//         message: "Successfully created invoice"
//     })



// }