const { Schema, default: mongoose } = require('mongoose');

const courseSchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, required: [true, 'description is required'] },
    duration: { type: String, required: [true, 'duration is required'] },
});

const Course = new mongoose.model('Course', courseSchema); // eslint-disable-line new-cap

module.exports = Course;
