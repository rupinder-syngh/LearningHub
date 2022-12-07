const logger = require('../../utils/logger');
const uploadImageToCloud = require('../../services/uploadImage');
const getUuid = require('../../utils/getUuid');

const uploadImage = async (req, res) => {
    try {
        logger.info(JSON.stringify(req?.files));
        const fileName = await getUuid();
        const imageUrl = await uploadImageToCloud(req?.files?.image[0]?.path, fileName);
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
