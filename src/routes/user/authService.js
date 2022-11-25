const jwt = require('jsonwebtoken');
const { expiresIn } = require('config').get('Server').get('jwt');
require('dotenv').config();

const getAccessToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    } catch (err) {
        throw new Error(err.message);
    }
};

const verifyAccessToken = async (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAccessToken,
    verifyAccessToken,
};
