const { Schema, default: mongoose } = require('mongoose');

const subTopic = new Schema({
    name: { type: String },
    description: { type: String },
});

const topicSchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    content: [{ type: subTopic }],
    duration: { type: String, required: [true, 'duration is required'] },
    course: { type: mongoose.Types.ObjectId, ref: 'course' },
});

const Topic = new mongoose.model('Topic', topicSchema); // eslint-disable-line new-cap

module.exports = Topic;
