const { default: mongoose } = require('mongoose');
const config = require('config');

const dbConfig = config.get('Server.db');

const connectToDb = async () => {
    try {
        return await mongoose.connect(`${dbConfig.url}`);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    connectToDb,
};
