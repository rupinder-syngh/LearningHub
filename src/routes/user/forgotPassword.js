const bcrypt = require('bcrypt');
const User = require('../../models/user');
const getUuid = require('../../utils/getUuid');
const sendEmail = require('../../services/sendEmail');
const constants = require('../../../config/constants');
const logger = require('../../utils/logger');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            throw new Error('No user exists with this email Id');
        }
        const forgotPasswordToken = await getUuid();
        await User.updateOne({ email }, { $set: { forgotPasswordToken } });

        /* Info: email integration */
        const emailMsg = await constants.email.forgotPassword(userData.email, forgotPasswordToken);
        sendEmail(emailMsg);

        return res.status(200).json({
            message: 'Password reset email sent',
            data: {},
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        await User.updateOne({ forgotPasswordToken: token }, { $set: { password: passwordHash } });
        return res.status(200).json({
            message: 'Password updated successfully',
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
    forgotPassword,
    resetPassword,
};
