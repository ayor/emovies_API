const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../mongo-db');


exports.signin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    let customer;
    try {

        customer = id ? await Customer.findById(id) : await Customer.findOne({ email: email });
        if (!customer) {
            let err = new Error('Customer does not exist');
            err.statusCode = 401
            throw err
        }


        let passwordIsEqual = await bcrypt.compare(password, customer.password);

      

        if (!passwordIsEqual) {
            if( ( password !== customer.password)){
                let err = new Error('Invalid email or password');
                err.statusCode = 401;
                throw err;
            }
        }

        const token = jwt.sign({
            email,
            id: customer._id
        }, JWT_SECRET, { expiresIn: '1h' });

        const expiryDate = Date.now() + 3600000;

        res.status(200)
            .json({
                token,
                data: customer,
                expiresIn : new Date(expiryDate) 
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

exports.signup = async (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const imageUrl = req.file.path

    if (!req.file) {
        const error = new Error('No image uploaded');
        error.statusCode = 422;
    }

    try {
        const customer = await Customer.findOne({ email: email });
        if (customer) {
            let err = new Error('Customer already exist');
            err.statusCode = 422
            throw err
        }
        const hashedPW = await bcrypt.hash(password, 12);
        const savedCustomer =await new Customer({
            firstname,
            lastname,
            email,
            password: hashedPW,
            imageUrl,
        });

        await savedCustomer.save();

        res.status(201).json({
            message: 'Succesfully created user',
            data: savedCustomer
        });
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }

}   