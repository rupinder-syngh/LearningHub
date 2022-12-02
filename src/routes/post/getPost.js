const Post = require('../../models/post');
const logger = require('../../utils/logger');

const getPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const postData = await Post.findOne({ _id: postId }).populate('author', { firstName: 1, lastName: 1, _id: 0 });
        if (!postData) {
            throw new Error('Invalid post id');
        }
        return res.status(200).json({
            message: 'Success',
            data: postData,
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = getPost;
