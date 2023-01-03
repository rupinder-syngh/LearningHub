const Content = require('../../models/content');

const createContent = async (req, res) => {
    try {
        const {
            name, description, links, topicId,
        } = req.body;
        await Content.create({
            name, description, links, topicId,
        });
        return res.status(200).json({
            message: 'Success',
            data: {},
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = createContent;
