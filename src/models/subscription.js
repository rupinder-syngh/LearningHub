const { Schema, default: mongoose } = require('mongoose');

const subscriptionSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    courseId: { type: mongoose.Types.ObjectId, ref: 'course' },
    startDate: { type: String },
    endDate: { type: String },
});

const Subscription = new mongoose.model('Subscription', subscriptionSchema); // eslint-disable-line new-cap

module.exports = Subscription;
