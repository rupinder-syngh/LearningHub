const logger = require('../../utils/logger');
const uploadImageToCloud = require('../../services/uploadImage');

const uploadImage = async (req, res) => {
    try {
        const imageUrl = await uploadImageToCloud(req?.files?.image[0]?.buffer);
        res.status(200).json({
            message: 'file uploaded successfully',
            data: {
                url: imageUrl,
            },
        });
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = uploadImage;
