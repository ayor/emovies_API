const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../mongo-db');

const isAuth = (req, res, next) => {
    const token = req.get('authorization').split(' ')[1];
    if (!token) {
        const error = new Error('Unauthorized user');
        error.statusCode = 403;
        throw error;
    }
    let verifiedUser;
    try {
        verifiedUser = jwt.verify(token, JWT_SECRET);
        
    } catch (error) {
        error.statusCode = 403;
        throw error;
    }
    if (!verifiedUser) {
        const error = new Error('Unauthorized user');
        error.statusCode = 40;
        throw error;
    }
    req.userId = verifiedUser.id;
    next();
}

module.exports = isAuth; 