const { Schema, default: mongoose } = require('mongoose');

const contentSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    description: { type: String },
    links: [{ type: String }],
    topicId: { type: mongoose.Types.ObjectId, ref: 'topic' },
});

const Content = new mongoose.model('Content', contentSchema); // eslint-disable-line new-cap

module.exports = Content;
