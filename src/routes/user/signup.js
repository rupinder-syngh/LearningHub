const bcrypt = require('bcrypt');
const User = require('../../models/user');
const getUuid = require('../../utils/getUuid');
const sendEmail = require('../../services/sendEmail');
const constants = require('../../../config/constants');
const { getAccessToken } = require('./authService');
const logger = require('../../utils/logger');

const signup = async (req, res) => {
    try {
        /* Info: user creation */
        const userData = req.body;
        const passwordHash = await bcrypt.hash(userData.password, 10);
        userData.password = passwordHash;
        userData.emailVerificationToken = await getUuid();
        const userToSave = new User(userData);
        userData.savedUser = await userToSave.save();

        /* Info: email integration */
        const emailMsg = constants.email.verifyEmail(
            userData.email,
            userData.emailVerificationToken,
        );
        sendEmail(emailMsg);

        /* Info: get jwt */
        const accessToken = await getAccessToken({
            id: userData.savedUser._id, // eslint-disable-line no-underscore-dangle
            firstName: userData.firstName,
        });

        logger.info('user created successfully');
        return res.status(200).json({
            message: 'Signup successful',
            data: { accessToken },
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const userData = await User.findOne({ emailVerificationToken: token });
        if (!userData) {
            throw new Error('Invalid verification token!');
        } else {
            await User.updateOne({ emailVerificationToken: token }, { $set: { isVerified: true } });
        }
        return res.status(200).json({
            message: 'Email verified successfully!',
            data: {},
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = {
    signup,
    verifyEmail,
};
