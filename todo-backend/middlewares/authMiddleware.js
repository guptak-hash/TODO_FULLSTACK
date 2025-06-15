const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    try {
        // Check if authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ msg: 'Authorization header missing' });
        };

        // Extract token
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: 'Token not provided' });
        };

        // decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('deoded >> ',decoded)
        // console.log('role passed >> ',decoded.role)
        // attach userId to req object
        req.userId = decoded.userId;
        req.email = decoded.email;
        next();

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Something went wrong. Please login again' })

    };
};

module.exports = authMiddleware