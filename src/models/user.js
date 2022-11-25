const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
}, { timestamps: true });

const User = new mongoose.model('User', userSchema); // eslint-disable-line new-cap
module.exports = User;
