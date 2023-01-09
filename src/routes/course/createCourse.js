const Course = require('../../models/course');
const logger = require('../../utils/logger');

const createCourse = async (req, res) => {
    try {
        const {
            title, description, duration, category, posterUrl,
        } = req.body;
        const course = await Course.create({
            title, description, duration, category, posterUrl,
        });
        return res.status(200).json({
            message: 'Success',
            data: { id: course._id }, // eslint-disable-line no-underscore-dangle
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = createCourse;
