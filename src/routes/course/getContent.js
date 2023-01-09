const Content = require('../../models/content');
const logger = require('../../utils/logger');

const getContent = async (req, res) => {
    try {
        const { topicId } = req.query;
        const content = await Content.find({ topicId }, { name: 1, description: 1, links: 1 });
        return res.status(200).json({
            message: 'Success',
            data: {
                content,
            },
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = getContent;