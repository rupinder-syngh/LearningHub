const { validationResult } = require('express-validator');
const logger = require('./logger');

module.exports = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error({ errors: `${errors.array()}` });
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    } catch (err) {
        logger.error(err.message);
        throw new Error(err.message);
    }
};
