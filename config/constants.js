const verifyEmailLink = "http://localhost:3000/user/verifyEmail/";
const resetPasswordLink = "http://localhost:3000/user/resetPassword/";
const { from: emailFromId } = require('config').get('Server').email;
const { body, param } = require('express-validator');

module.exports = {
    "email": {
        "verifyEmail" : (to, token) => {
            return {
                "subject": "Activate your LearningHub account now",
                "to": to,
                "from": emailFromId,
                "text": "sample email",
                "html": `<p>You’re just one click away from getting started with LearningHub.
                    All you need to do is to verify your email address to activate your LearningHub account.
                    ${verifyEmailLink + token}</p>`
            }
        },
        "forgotPassword" : (to, token) => {
            return {
                "subject": "Reset your password for LearninHub",
                "to": to,
                "from": emailFromId,
                "text": "sample email",
                "html": `<p>Click on the following link to reset your password for the LearningHub.
                    ${resetPasswordLink + token}</p>`
            }
        }
    },
    "inputValidators": {
        "firstName": body('firstName').exists().withMessage('firstName is required').trim()
                     .isString()
                     .withMessage('must be a string')
                     .isLength({ min: 2, max: 20 })
                     .withMessage('length should be b/w 2 and 20'),
        "lastName":  body('lastName').optional().trim().isString()
                     .withMessage('must be a string')
                     .isLength({ min: 2, max: 20 })
                     .withMessage('length should be b/w 2 and 20'),
        "email":     body('email').exists().withMessage('email is required').trim().isEmail().withMessage('should be a valid email'),
        "password":  body('password').exists().withMessage('password is required').trim()
                     .isString()
                     .withMessage('should be a string')
                     .isLength({ min: 8 })
                     .withMessage('password should be minimum 8 chars long')
                     .trim(),
        "token-body": body('token').exists().withMessage('token is required').trim()
                      .isString()
                      .withMessage('should be a string'),
        "token-param": param('token').exists().withMessage('token is required').trim()
                      .isString()
                      .withMessage('should be a string'),                                    
    }
}