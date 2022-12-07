const cloudinary = require('cloudinary').v2;
const logger = require('../utils/logger');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath, fileName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { public_id: fileName });
        logger.info(JSON.stringify(result.url));
        return result.url;
    } catch (err) {
        logger.error(err.message);
        throw new Error(err.message);
    }
};

module.exports = uploadImage;
