const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../mongo-db');

const isAuth = (req, res, next) => {
    const token = req.get('authorization').split(' ')[1];
    if (!token) {
        const error = new Error('Unauthenticated user');
        error.statusCode = 401;
        throw error;
    }
    let verifiedUser;
    try {
        verifiedUser = jwt.verify(token, JWT_SECRET);
        
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
    if (!verifiedUser) {
        const error = new Error('Unauthenticated user');
        error.statusCode = 401;
        throw error;
    }
    req.userId = verifiedUser.id;
    next();
}

module.exports = isAuth; 