const logger = require('../../utils/logger');
const Post = require('../../models/post');

const getPosts = async (req, res) => {
    try {
        const { skip: postsToSkip } = req.query;
        const posts = await Post.find({}, {
            title: 1, author: 1, likes: 1, createdAt: 1,
        })
            .populate('author', { firstName: 1, lastName: 1, _id: 0 })
            .sort({ createdAt: -1 }).limit(10)
            .skip(postsToSkip);
        return res.status(200).json({
            message: 'Success',
            data: posts,
        });
    } catch (err) {
        logger.error(err.message);
        return res.send(400).json({
            error: err.message,
        });
    }
};

module.exports = getPosts;
