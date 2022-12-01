const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN,
});

console.log('process env: ', process.env);

const uploadToS3 = multer({
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
}).single('image');

module.exports = uploadToS3;
