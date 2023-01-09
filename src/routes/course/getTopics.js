const Topic = require('../../models/topic');
const logger = require('../../utils/logger');

const getTopics = async (req, res) => {
    try {
        const { courseId } = req.query;
        const topics = await Topic.find({ courseId }, { title: 1, duration: 1 });
        return res.status(200).json({
            message: 'Success',
            data: {
                topics,
            },
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = getTopics;
