const router = require('express').Router();
const { body, param } = require('express-validator');

const { signup, verifyEmail } = require('./signup');
const signin = require('./signin');
const { forgotPassword, resetPassword } = require('./forgotPassword');

const signupValidator = [
    body('firstName').exists().withMessage('firstName is required').trim()
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 2, max: 20 })
        .withMessage('length should be b/w 2 and 20'),
    body('lastName').optional().trim().isString()
        .withMessage('must be a string')
        .isLength({ min: 2, max: 20 })
        .withMessage('length should be b/w 2 and 20'),
    body('email').exists().withMessage('email is required').trim()
        .isEmail()
        .withMessage('should be a valid email'),
    body('password').exists().withMessage('password is required').trim()
        .isString()
        .withMessage('should be a string')
        .isLength({ min: 8 })
        .withMessage('password should be minimum 8 chars long'),
];

const signinValidator = [
    body('email').exists().withMessage('email is required').trim()
        .isEmail()
        .withMessage('should be a valid email')
        .trim(),
    body('password').exists().withMessage('password is required').trim()
        .isString()
        .withMessage('should be a string')
        .isLength({ min: 8 })
        .withMessage('password should be minimum 8 chars long')
        .trim(),
];

const verifyEmailValidator = [
    param('token').exists().withMessage('token is required').trim(),
];

router.post('/signup', signupValidator, signup);
router.get('/verifyEmail/:token', verifyEmailValidator, verifyEmail);
router.post('/signin', signinValidator, signin);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;
