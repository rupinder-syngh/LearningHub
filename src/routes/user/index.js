const router = require('express').Router();
const { body, param } = require('express-validator');
const { inputValidators } = require('../../../config/constants');

const { signup, verifyEmail } = require('./signup');
const signin = require('./signin');
const { forgotPassword, resetPassword } = require('./forgotPassword');
const apiInputValidator = require('../../utils/apiInputValidator');

const signupValidator = [
    inputValidators.firstName,
    inputValidators.lastName,
    inputValidators.email,
    inputValidators.password,
];

const signinValidator = [
    inputValidators.email,
    inputValidators.password,
];

const verifyEmailValidator = [
    param('token').exists().withMessage('token is required').trim()
        .isString()
        .withMessage('should be a string'),
];

const forgotPasswordValidator = [
    inputValidators.email,
];

const resetPasswordValidator = [
    body('token').exists().withMessage('token is required').trim()
        .isString()
        .withMessage('should be a string'),
    inputValidators.password,
];

router.post('/signup', signupValidator, apiInputValidator, signup);
router.get('/verifyEmail/:token', verifyEmailValidator, apiInputValidator, verifyEmail);
router.post('/signin', signinValidator, apiInputValidator, signin);
router.post('/forgotPassword', forgotPasswordValidator, apiInputValidator, forgotPassword);
router.post('/resetPassword', resetPasswordValidator, apiInputValidator, resetPassword);

module.exports = router;
