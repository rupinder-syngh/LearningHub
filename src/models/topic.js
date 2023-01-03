const { Schema, default: mongoose } = require('mongoose');

const topicSchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    duration: { type: String, required: [true, 'duration is required'] },
    courseId: { type: mongoose.Types.ObjectId, ref: 'course' },
});

const Topic = new mongoose.model('Topic', topicSchema); // eslint-disable-line new-cap

module.exports = Topic;
