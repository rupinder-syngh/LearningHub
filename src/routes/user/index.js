const router = require('express').Router();
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
    inputValidators['token-param'],
];

const forgotPasswordValidator = [
    inputValidators.email,
];

const resetPasswordValidator = [
    inputValidators['token-body'],
    inputValidators.password,
];

router.post('/signup', signupValidator, apiInputValidator, signup);
router.get('/verifyEmail/:token', verifyEmailValidator, apiInputValidator, verifyEmail);
router.post('/signin', signinValidator, apiInputValidator, signin);
router.post('/forgotPassword', forgotPasswordValidator, apiInputValidator, forgotPassword);
router.post('/resetPassword', resetPasswordValidator, apiInputValidator, resetPassword);

module.exports = router;
