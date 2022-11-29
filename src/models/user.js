const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'firstName is required'] },
    lastName: { type: String },
    email: { type: String, required: [true, 'email is required'], unique: true },
    password: { type: String, required: [true, 'password is required'] },
    emailVerificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
}, { timestamps: true });

userSchema.pre('save', async function checkForDupEmail(next) {
    const userFound = await this.collection.findOne({ email: this.email });
    if (userFound) {
        throw new Error('User already exists with this email Id');
    }
    next();
});

const User = new mongoose.model('User', userSchema); // eslint-disable-line new-cap
module.exports = User;
