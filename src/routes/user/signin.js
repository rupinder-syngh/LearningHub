const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const user = require('../../models/user');
const { getAccessToken } = require('./authService');
const logger = require('../../utils/logger');

const signin = async (req, res) => {
    try {
    /* Info: input validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error({ errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        /* Info: check user credentials */
        const { email, password } = req.body;
        const userData = await user.findOne({ email });
        if (userData) {
            const isPasswordCorrect = await bcrypt.compare(password, userData.password);
            if (!isPasswordCorrect) {
                throw new Error('Incorrect password');
            }
            if (!userData.isVerified) {
                throw new Error('Account not verified');
            }
        } else {
            throw new Error('No user exists with this email id!');
        }

        /* Info: get jwt */
        const accessToken = await getAccessToken({
            id: userData._id, // eslint-disable-line no-underscore-dangle
            firstName: userData.firstName,
        });

        return res.status(200).json({
            message: 'signin successful',
            data: { accessToken },
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = signin;
