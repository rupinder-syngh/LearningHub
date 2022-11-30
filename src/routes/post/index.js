const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');

const createPost = require('./createPost');

const createPostValidator = [
    inputValidators.auth,
    inputValidators['post-title'],
    inputValidators['post-body'],
];

router.post('/create', createPostValidator, apiInputValidator, verifyAccessToken, createPost);

module.exports = router;
