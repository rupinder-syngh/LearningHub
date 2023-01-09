const Topic = require('../../models/topic');
const logger = require('../../utils/logger');

const createTopic = async (req, res) => {
    try {
        const { title, duration, courseId } = req.body;
        const topic = await Topic.create({ title, duration, courseId });
        return res.status(200).json({
            message: 'Success',
            data: { id: topic._id }, // eslint-disable-line no-underscore-dangle
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = createTopic;
