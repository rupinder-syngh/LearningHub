const Subscription = require('../../models/subscription');
const Course = require('../../models/course');
const logger = require('../../utils/logger');

const startCourse = async (req, res) => {
    try {
        const { userPayload } = req.headers;
        const { courseId } = req.body;

        // check courseId
        const course = await Course.findOne({ id: courseId });
        if (!course) {
            throw new Error('No course exists with this id');
        }

        const startDate = new Date().getTime();
        const endDate = startDate + (course.duration * 24 * 60 * 60);
        await Subscription.create({
            userId: userPayload?.id,
            courseId,
            startDate,
            endDate,
        });

        return res.status(200).json({
            message: 'Success',
            data: {},
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = startCourse;
