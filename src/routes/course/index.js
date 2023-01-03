const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');

const createCourse = require('./createCourse');
const createTopic = require('./createTopic');
const createContent = require('./createContent');
const getCourses = require('./getCourses');

const getCoursesValidator = [
    inputValidators.category,
    inputValidators.skip,
];

router.post('/createCourse', createCourse);
router.post('/createTopic', createTopic);
router.post('/createContent', createContent);
router.get('/list', getCoursesValidator, apiInputValidator, verifyAccessToken, getCourses);

module.exports = router;
