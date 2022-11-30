const jwt = require('jsonwebtoken');
require('dotenv').config();
const { expiresIn } = require('config').get('Server').get('jwt');
const logger = require('../../utils/logger');

const getAccessToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    } catch (err) {
        throw new Error(err.message);
    }
};

const verifyAccessToken = async (req, res, next) => {
    try {
        req.headers.userPayload = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, process.env.JWT_SECRET_KEY);
        return next();
    } catch (err) {
        logger.error(err.message);
        return res.status(401).json({
            error: err.message,
        });
    }
};

module.exports = {
    getAccessToken,
    verifyAccessToken,
};
