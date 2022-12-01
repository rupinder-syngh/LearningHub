const logger = require('../../utils/logger');

const imageUpload = async (req, res) => {
    try {
        logger.info(req.file);
        res.status(200).json({
            message: 'file uploaded successfully',
            data: {},
        });
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = imageUpload;
