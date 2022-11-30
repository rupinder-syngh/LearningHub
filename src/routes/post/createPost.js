const Post = require('../../models/post');
const logger = require('../../utils/logger');

const createPost = async (req, res) => {
    try {
        /* Info: Post creation */
        const postData = req.body;
        postData.author = req.headers?.userPayload?.id;
        const postToSave = new Post(postData);
        postData.savedPost = await postToSave.save();

        logger.info('Post created successfully');
        return res.status(200).json({
            message: 'Post created successfully',
            data: {},
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = createPost;
