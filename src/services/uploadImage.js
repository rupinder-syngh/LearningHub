const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const logger = require('../utils/logger');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    try {
        return new Promise((resolve, reject) => {
            const cloudUploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: process.env.CLOUDINARY_DIR_NAME,
                },
                (error, result) => {
                    if (result) {
                        resolve(result.url);
                    } else {
                        reject(error);
                    }
                },
            );

            streamifier.createReadStream(filePath).pipe(cloudUploadStream);
        });
    } catch (err) {
        logger.error(err.message);
        throw new Error(err.message);
    }
};

module.exports = uploadImage;
