const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (message) => {
    try {
        await sgMail.send(message);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = sendEmail;
