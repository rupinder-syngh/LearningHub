const router = require('express').Router();
const { inputValidators } = require('../../../config/constants');
const apiInputValidator = require('../../utils/apiInputValidator');
const { verifyAccessToken } = require('../user/authService');

const createCourse = require('./createCourse');
const createTopic = require('./createTopic');
const createContent = require('./createContent');
const getCourses = require('./getCourses');
const getTopics = require('./getTopics');
const getContent = require('./getContent');

const getCoursesValidator = [
    inputValidators.category,
    inputValidators.skip,
];

const getTopicsValidator = [
    inputValidators.courseId,
];

const getContentValidator = [
    inputValidators.topicId,
];

router.post('/createCourse', createCourse);
router.post('/createTopic', createTopic);
router.post('/createContent', createContent);
router.get('/list', getCoursesValidator, apiInputValidator, verifyAccessToken, getCourses);
router.get('/getTopics', getTopicsValidator, apiInputValidator, verifyAccessToken, getTopics);
router.get('/getContent', getContentValidator, apiInputValidator, verifyAccessToken, getContent);

module.exports = router;
