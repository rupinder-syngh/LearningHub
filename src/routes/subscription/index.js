const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');

const startCourse = require('./startCourse');

const startCourseValidator = [
    inputValidators['courseId-body'],
];

router.post('/startCourse', startCourseValidator, apiInputValidator, verifyAccessToken, startCourse);
