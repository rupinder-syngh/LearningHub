const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');
const uploadToS3 = require('../../services/uploadToS3');

const createPost = require('./createPost');
const imageUpload = require('./imageUpload');

const createPostValidator = [
    inputValidators.auth,
    inputValidators['post-title'],
    inputValidators['post-body'],
];

router.post('/create', createPostValidator, apiInputValidator, verifyAccessToken, createPost);
router.post('/imageUpload', uploadToS3, imageUpload);

module.exports = router;
