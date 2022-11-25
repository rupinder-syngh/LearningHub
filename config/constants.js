const verifyEmailLink = "http://localhost:3000/user/verifyEmail/";
const resetPasswordLink = "http://localhost:3000/user/resetPassword/";
const { from: emailFromId } = require('config').get('Server').email;

module.exports = {
    "email": {
        "verifyEmail" : (to, token) => {
            return {
                "subject": "Activate your LearningHub account now",
                "to": to,
                "from": emailFromId,
                "text": "sample email",
                "html": `<p>You’re just one click away from getting started with LearningHub.
                    All you need to do is to verify your email address to activate your LearningHub account.
                    ${verifyEmailLink + token}</p>`
            }
        },
        "forgotPassword" : (to, token) => {
            return {
                "subject": "Reset your password for LearninHub",
                "to": to,
                "from": emailFromId,
                "text": "sample email",
                "html": `<p>Click on the following link to reset your password for the LearningHub.
                    ${resetPasswordLink + token}</p>`
            }
        }
    }
}