const serverConfig = require('config').get('Server');
const verifyEmailLink = `${serverConfig.host}/user/verifyEmail/`;
const resetPasswordLink = `${serverConfig.host}/user/resetPassword/`;
const { from: emailFromId } = serverConfig.email;
const { body, param, header, query } = require('express-validator');

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
        "auth":       header('authorization').exists().withMessage('authorization is required').trim()
                      .isString()
                      .withMessage('must be a string')
                      .matches(/^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm)
                      .withMessage('Invalid authorization'),
        "post-title": body('title').exists().withMessage('title is required').trim()
                      .isString()
                      .withMessage('must be a string')
                      .isLength({ min: 10, max: 100 })
                      .withMessage('length should be b/w 10 and 100'),
        "post-body":  body('body').exists().withMessage('body is required').trim()
                      .isString()
                      .withMessage('must be a string')
                      .isLength({ min: 1000 })
                      .withMessage('post content should be minimum 1000 chars long'),
        "skip":       query('skip').optional().trim().isInt({ min: 0 })
                      .withMessage('should be a postive integer'),
        "post-id":     param('id').exists().withMessage('post id is required').trim()
                      .isString()
                      .withMessage('should be a string'),
        "category":    query('category').optional().trim().isIn(['NODEJS','REACTJS','REACTNATIVE','PYTHON']).withMessage('invalid category'),                                                       
        "courseId":    query('courseId').exists().withMessage('course Id is required').trim().isMongoId().withMessage('invalid id'),
        "topicId":     query('topicId').exists().withMessage('topic Id is required').trim().isMongoId().withMessage('invalid id'),
        "courseId-body":    body('courseId').exists().withMessage('course Id is required').trim().isMongoId().withMessage('invalid id'),
    }
}