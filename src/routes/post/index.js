const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');
const uploadToS3 = require('../../services/uploadToS3');

const createPost = require('./createPost');
const imageUpload = require('./imageUpload');
const getPosts = require('./getPosts');
const getPost = require('./getPost');

const createPostValidator = [
    inputValidators.auth,
    inputValidators['post-title'],
    inputValidators['post-body'],
];

const getPostsValidator = [
    inputValidators.skip,
];

const getPostValidator = [
    inputValidators.auth,
    inputValidators['post-id'],
];

router.post('/create', createPostValidator, apiInputValidator, verifyAccessToken, createPost);
router.post('/imageUpload', uploadToS3, imageUpload);
router.get('/list', getPostsValidator, apiInputValidator, getPosts);
router.get('/:id', getPostValidator, apiInputValidator, verifyAccessToken, getPost);

module.exports = router;
