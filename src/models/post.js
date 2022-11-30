const { Schema, default: mongoose } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    body: { type: String, required: [true, 'body is required'] },
    images: [{ type: String }],
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'author is required'] },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = new mongoose.model('Post', postSchema); // eslint-disable-line new-cap
module.exports = Post;
